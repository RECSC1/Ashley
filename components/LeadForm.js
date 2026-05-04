import { useState } from 'react';
import { logEvent, KEYS } from '../lib/store';

const INTEREST_OPTIONS = [
  'Buying',
  'Selling',
  'Relocating',
  'Luxury Real Estate',
  'Investing',
  'UNC-related Move',
  'Just Exploring',
];

export default function LeadForm({
  compact = false,
  interestOptions = INTEREST_OPTIONS,
  storageKey = KEYS.CONTACT,
  showTimeline = false,
  title = 'Begin the Conversation',
  subtitle = 'Share a little about your goals and Ashley will follow up personally.',
  formName = 'contact',
  pageName = 'contact',
  formType = 'general-contact',
  leadSource = 'website',
  clientName = 'Ashley Smith',
}) {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({});

  const onChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    logEvent(storageKey, data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card text-center py-10">
        <p className="font-serif text-3xl text-navy">Thank you.</p>
        <p className="mt-3 text-navy/70 max-w-md mx-auto">
          Your note has reached Ashley. You can expect a thoughtful, personal reply within
          one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      name={formName}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className={`card ${compact ? '' : 'p-8 md:p-10'}`}
    >
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="page_name" value={pageName} />
      <input type="hidden" name="form_type" value={formType} />
      <input type="hidden" name="lead_source" value={leadSource} />
      <input type="hidden" name="client_name" value={clientName} />
      <p className="hidden">
        <label>
          Don't fill this out: <input name="bot-field" onChange={onChange} />
        </label>
      </p>
      {title && (
        <div className="mb-6">
          <p className="eyebrow mb-2">Connect</p>
          <h3 className="font-serif text-3xl text-navy">{title}</h3>
          {subtitle && <p className="text-navy/70 mt-2">{subtitle}</p>}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">First name</label>
          <input name="first_name" required onChange={onChange} className="input" />
        </div>
        <div>
          <label className="label">Last name</label>
          <input name="last_name" required onChange={onChange} className="input" />
        </div>
        <div>
          <label className="label">Email</label>
          <input name="email" required type="email" onChange={onChange} className="input" />
        </div>
        <div>
          <label className="label">Phone</label>
          <input name="phone" onChange={onChange} className="input" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">I'm interested in</label>
          <select name="interest" onChange={onChange} className="input">
            <option value="">Select an option</option>
            {interestOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        {showTimeline && (
          <div className="sm:col-span-2">
            <label className="label">Timeline</label>
            <select name="timeline" onChange={onChange} className="input">
              <option value="">Select a timeline</option>
              <option>Within 30 days</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
              <option>6–12 months</option>
              <option>Just exploring</option>
            </select>
          </div>
        )}
        <div className="sm:col-span-2">
          <label className="label">Message</label>
          <textarea name="message" rows={4} onChange={onChange} className="input" />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
        Schedule a Consultation
      </button>
      <p className="text-[11px] text-taupe mt-4">
        Your information is kept private and used solely to support your real estate goals.
      </p>
    </form>
  );
}
