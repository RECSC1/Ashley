// Commute Time Finder — server-side routing API integration.
//
// Configure ONE of the following environment variables in Netlify
// (Site configuration → Environment variables) to enable live results:
//
//   GOOGLE_MAPS_API_KEY   — Google Maps Distance Matrix API key (preferred,
//                           supports traffic-aware timing via departure_time)
//   MAPBOX_ACCESS_TOKEN   — Mapbox secret access token (uses Geocoding +
//                           Directions APIs)
//
// If neither is present, the endpoint returns { configured: false } and the
// UI displays a clear "live data pending API integration" message. The
// frontend never invents commute times.

const MODE_MAP_GOOGLE = {
  Driving: 'driving',
  Walking: 'walking',
  Biking: 'bicycling',
  Transit: 'transit',
};

const MODE_MAP_MAPBOX = {
  Driving: 'driving-traffic',
  Walking: 'walking',
  Biking: 'cycling',
  Transit: 'driving-traffic', // Mapbox has no transit profile; fall back to driving
};

const DEPART_OFFSETS_SEC = {
  'Leave now': 0,
  'Morning commute': 0,        // resolved to next 8:00am local
  'Afternoon commute': 0,      // resolved to next 12:30pm local
  'Evening commute': 0,        // resolved to next 5:30pm local
};

function nextCommuteEpoch(label) {
  const now = new Date();
  const target = new Date(now);
  if (label === 'Morning commute') target.setHours(8, 0, 0, 0);
  else if (label === 'Afternoon commute') target.setHours(12, 30, 0, 0);
  else if (label === 'Evening commute') target.setHours(17, 30, 0, 0);
  else return Math.floor(now.getTime() / 1000);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 1);
  return Math.floor(target.getTime() / 1000);
}

async function callGoogle({ origin, dest, mode, depart, key }) {
  const params = new URLSearchParams({
    origins: origin,
    destinations: dest,
    mode: MODE_MAP_GOOGLE[mode] || 'driving',
    units: 'imperial',
    key,
  });
  if ((MODE_MAP_GOOGLE[mode] || 'driving') === 'driving') {
    params.set('departure_time', String(nextCommuteEpoch(depart)));
    params.set('traffic_model', 'best_guess');
  }
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google API HTTP ${res.status}`);
  const json = await res.json();
  if (json.status !== 'OK') {
    throw new Error(`Google API status: ${json.status}${json.error_message ? ' — ' + json.error_message : ''}`);
  }
  const row = json.rows?.[0]?.elements?.[0];
  if (!row || row.status !== 'OK') {
    throw new Error(`No route found (${row?.status || 'unknown'})`);
  }
  const seconds = row.duration_in_traffic?.value ?? row.duration?.value;
  const meters = row.distance?.value;
  return {
    configured: true,
    provider: 'google',
    origin: json.origin_addresses?.[0] || origin,
    dest: json.destination_addresses?.[0] || dest,
    mode,
    depart,
    minutes: Math.round(seconds / 60),
    miles: Number((meters / 1609.344).toFixed(1)),
    duration_text: row.duration_in_traffic?.text || row.duration?.text,
    distance_text: row.distance?.text,
    traffic_aware: !!row.duration_in_traffic,
    summary: null,
  };
}

async function geocodeMapbox(query, token) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?limit=1&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Mapbox geocoding HTTP ${res.status}`);
  const json = await res.json();
  const feat = json.features?.[0];
  if (!feat) throw new Error(`Could not locate "${query}"`);
  return { coords: feat.center, label: feat.place_name };
}

async function callMapbox({ origin, dest, mode, depart, token }) {
  const [o, d] = await Promise.all([
    geocodeMapbox(origin, token),
    geocodeMapbox(dest, token),
  ]);
  const profile = MODE_MAP_MAPBOX[mode] || 'driving-traffic';
  const coords = `${o.coords[0]},${o.coords[1]};${d.coords[0]},${d.coords[1]}`;
  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coords}?overview=simplified&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Mapbox directions HTTP ${res.status}`);
  const json = await res.json();
  const route = json.routes?.[0];
  if (!route) throw new Error('No route found');
  return {
    configured: true,
    provider: 'mapbox',
    origin: o.label,
    dest: d.label,
    mode,
    depart,
    minutes: Math.round(route.duration / 60),
    miles: Number((route.distance / 1609.344).toFixed(1)),
    duration_text: null,
    distance_text: null,
    traffic_aware: profile === 'driving-traffic',
    summary: route.legs?.[0]?.summary || null,
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }
  const { origin, dest, mode = 'Driving', depart = 'Leave now' } = body;
  if (!origin || !dest) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing origin or destination' }) };
  }

  const googleKey = process.env.GOOGLE_MAPS_API_KEY;
  const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;

  try {
    if (googleKey) {
      const result = await callGoogle({ origin, dest, mode, depart, key: googleKey });
      return { statusCode: 200, body: JSON.stringify(result) };
    }
    if (mapboxToken) {
      const result = await callMapbox({ origin, dest, mode, depart, token: mapboxToken });
      return { statusCode: 200, body: JSON.stringify(result) };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        configured: false,
        origin,
        dest,
        mode,
        depart,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        configured: !!(googleKey || mapboxToken),
        error: err.message || String(err),
        origin,
        dest,
        mode,
        depart,
      }),
    };
  }
};
