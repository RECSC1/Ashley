import SEO from '../components/SEO';

const COMMUNITIES = [
  {
    name: 'Chapel Hill',
    buyer: 'UNC affiliates, move-up buyers, and relocation clients who want established neighborhoods with long-term value.',
    lifestyle: 'Classic college-town energy, mature trees, local dining, and a strong sense of community.',
    housing: 'Traditional homes, newer infill options, luxury enclaves, and select lower-maintenance neighborhoods.',
    bestFit: 'Best for buyers who want Chapel Hill roots, access to UNC, and a balanced lifestyle with polished local amenities.',
  },
  {
    name: 'Carrboro',
    buyer: 'Buyers who value character, walkability, and a connected local culture.',
    lifestyle: 'Creative, independent, and community-focused with easy access to downtown Chapel Hill.',
    housing: 'Historic cottages, townhomes, and established neighborhoods with personality over cookie-cutter layout.',
    bestFit: 'Great for buyers who want a vibrant local feel and daily convenience near UNC and Chapel Hill.',
  },
  {
    name: 'Durham',
    buyer: 'Professionals, medical and university buyers, investors, and relocation clients wanting city variety.',
    lifestyle: 'Dynamic food scene, arts presence, and mixed urban-suburban living options.',
    housing: 'Downtown condos, historic neighborhoods, newer construction communities, and luxury pockets.',
    bestFit: 'A strong fit for buyers who want range, from urban convenience to neighborhood-driven living.',
  },
  {
    name: 'Hillsborough',
    buyer: 'Buyers seeking a calmer pace, charm, and room to breathe without losing Triangle access.',
    lifestyle: 'Historic small-town setting with green space, local shops, and a slower rhythm.',
    housing: 'Historic homes, newer neighborhood builds, and properties with more land.',
    bestFit: 'Best for buyers who want small-town character with practical access to Chapel Hill and Durham.',
  },
  {
    name: 'Pittsboro',
    buyer: 'Relocation and local buyers who prioritize space, privacy, and long-term growth potential.',
    lifestyle: 'A blend of rural calm and emerging community development across Chatham County.',
    housing: 'Newer master-planned options, custom homes, and land-forward properties.',
    bestFit: 'Ideal for buyers who want flexibility, room, and a more relaxed daily pace.',
  },
  {
    name: 'Cary',
    buyer: 'Move-up families, tech and RTP professionals, and buyers looking for polished suburban living.',
    lifestyle: 'Highly organized, amenity-rich, and commuter-friendly with excellent day-to-day convenience.',
    housing: 'Master-planned communities, townhomes, newer construction, and executive-style homes.',
    bestFit: 'Excellent for buyers who want efficient commutes, neighborhood amenities, and clean planning.',
  },
  {
    name: 'Raleigh',
    buyer: 'Professionals, investors, and relocation clients looking for broad neighborhood choice.',
    lifestyle: 'Capital-city energy with everything from historic pockets to modern mixed-use districts.',
    housing: 'Condos, bungalows, townhomes, and luxury homes depending on submarket.',
    bestFit: 'A great match for buyers who want variety, career access, and lifestyle flexibility.',
  },
];

const PRIORITIES = [
  'Commute',
  'Schools',
  'Walkability',
  'New construction',
  'Luxury options',
  'Lower maintenance living',
  'UNC-related moves',
  'Access to Raleigh, Durham, and RTP',
];

export default function TriangleCommunityGuide() {
  return (
    <>
      <SEO
        title="Triangle Community Match Guide | Ashley Smith"
        description="Explore Chapel Hill, Carrboro, Durham, Hillsborough, Pittsboro, Cary, and Raleigh with Ashley Smith’s Triangle Community Match Guide for relocation and local buyers."
        path="/triangle-community-guide"
      />

      <section className="section">
        <div className="container-wide max-w-6xl">
          <div className="card bg-navy text-ivory">
            <p className="eyebrow text-ivory/80 mb-3">Relocation and Local Buyer Planning</p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight">Triangle Community Match Guide</h1>
            <p className="mt-4 text-ivory/80 text-lg max-w-3xl">
              Helpful area guidance for buyers relocating to Chapel Hill and the greater Triangle.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="/relocation-quiz" className="btn btn-gold">Take the Relocation Match Quiz</a>
              <a href="/contact" className="btn btn-outline border-ivory text-ivory hover:bg-ivory hover:text-navy">Contact Ashley</a>
            </div>
          </div>

          <div className="card mt-8">
            <h2 className="font-serif text-3xl text-navy">Compare communities with confidence</h2>
            <p className="text-navy/75 mt-3 leading-relaxed">
              Ashley helps buyers compare Chapel Hill, Carrboro, Durham, Hillsborough, Pittsboro, Cary, Raleigh, and Triangle-wide options based on lifestyle, commute, home style, budget, timeline, and local fit.
              This guide is a starting point, not a replacement for personalized guidance.
            </p>
            <p className="text-sm text-navy/65 mt-3">
              Ashley can help you compare options based on your goals. For current homes and market details, connect directly with Ashley.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {COMMUNITIES.map((community) => (
              <article key={community.name} id={community.name.toLowerCase().replace(/\s+/g, '-')} className="card flex flex-col scroll-mt-24">
                <p className="font-serif text-2xl text-navy">{community.name}</p>
                <div className="space-y-3 mt-4 text-sm text-navy/80 flex-1">
                  <p><span className="font-medium text-navy">General buyer profile:</span> {community.buyer}</p>
                  <p><span className="font-medium text-navy">Lifestyle notes:</span> {community.lifestyle}</p>
                  <p><span className="font-medium text-navy">Housing style notes:</span> {community.housing}</p>
                  <p><span className="font-medium text-navy">Best fit:</span> {community.bestFit}</p>
                </div>
                <a href="/contact" className="btn btn-primary mt-6">Ask Ashley about this area</a>
              </article>
            ))}
          </div>

          <div id="greater-triangle" className="card mt-8 scroll-mt-24">
            <p className="font-serif text-2xl text-navy">Greater Triangle</p>
            <div className="space-y-3 mt-4 text-sm text-navy/80">
              <p><span className="font-medium text-navy">General buyer profile:</span> Buyers exploring the full Triangle region who want to compare communities, commutes, and lifestyle options before narrowing their search.</p>
              <p><span className="font-medium text-navy">Lifestyle notes:</span> The Triangle offers a range of settings from urban energy to small-town charm, all connected by major employers, universities, and a growing cultural scene.</p>
              <p><span className="font-medium text-navy">Housing style notes:</span> Everything from downtown condos and historic bungalows to master-planned communities, custom estates, and land-forward properties.</p>
              <p><span className="font-medium text-navy">Best fit:</span> Ideal for relocation buyers, flexible professionals, and anyone who wants expert guidance comparing communities across the region.</p>
            </div>
            <a href="/contact" className="btn btn-primary mt-6">Ask Ashley about the Triangle</a>
          </div>

          <div className="card mt-8">
            <h2 className="font-serif text-3xl text-navy">Common buyer priorities Ashley can help you sort through</h2>
            <p className="text-navy/75 mt-3">Whether you are relocating or moving within the Triangle, priority clarity usually makes the search faster and less stressful.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
              {PRIORITIES.map((priority) => (
                <div key={priority} className="rounded-xl border border-taupe/30 bg-ivory px-4 py-3 text-sm text-navy font-medium">
                  {priority}
                </div>
              ))}
            </div>
            <p className="text-xs text-taupe mt-5">School assignments, pricing, and inventory can change. Ashley provides personalized guidance based on your timing and goals.</p>
          </div>

          <div className="card mt-8 bg-warmwhite border border-taupe/30">
            <h2 className="font-serif text-3xl text-navy">Ready for personalized guidance?</h2>
            <p className="text-navy/75 mt-3">Take the Triangle Relocation Match Quiz to share your goals, or contact Ashley for one-on-one guidance tailored to your timeline.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="/relocation-quiz" className="btn btn-primary">Take the Triangle Relocation Match Quiz</a>
              <a href="/contact" className="btn btn-outline">Contact Ashley</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
