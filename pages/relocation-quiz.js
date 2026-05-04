import { useState } from 'react';
import SEO from '../components/SEO';

const AREA_OPTIONS = [
  'Chapel Hill',
  'Carrboro',
  'Durham',
  'Hillsborough',
  'Pittsboro',
  'Cary',
  'Raleigh',
  'Not sure yet',
];

const TIMELINE_OPTIONS = ['0 to 3 months', '3 to 6 months', '6 to 12 months', 'Just researching'];
const MOVE_OPTIONS = ['Job relocation', 'UNC-related move', 'Family move', 'Lifestyle change', 'Downsizing', 'Move-up purchase', 'Investment', 'Other'];
const PRIORITY_OPTIONS = ['Commute', 'Schools', 'Walkability', 'Space', 'Luxury amenities', 'Lower maintenance', 'New construction', 'Established neighborhoods'];
const HOME_TYPE_OPTIONS = ['Single-family home', 'Townhome', 'Condo', 'Luxury property', 'New construction', 'Not sure yet'];
const PRICE_OPTIONS = ['Under $400,000', '$400,000 to $600,000', '$600,000 to $850,000', '$850,000 to $1.2M', '$1.2M+', 'Prefer not to say yet'];
const SELL_OPTIONS = ['Yes', 'No', 'Not sure yet'];
const FOLLOW_UP_OPTIONS = ['Yes, please', 'Not right now'];

export default function RelocationQuiz() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setError('');

    fetch(form.action || '/netlify-forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Netlify form submission failed');
        setSubmitted(true);
      })
      .catch(() => {
        setError('We could not submit your quiz right now. Please try again or contact Ashley directly.');
      });
  };

  return (
    <>
      <SEO
        title="Triangle Relocation Match Quiz | Ashley Smith"
        description="Take Ashley Smith’s Triangle Relocation Match Quiz to share your goals and receive personal follow-up guidance for Chapel Hill and the greater Triangle."
        path="/relocation-quiz"
      />
      <section className="section">
        <div className="container-wide max-w-4xl">
          <p className="eyebrow mb-3">Relocation Support</p>
          <h1 className="font-serif text-4xl md:text-5xl text-navy leading-tight">Triangle Relocation Match Quiz</h1>
          <p className="mt-4 text-navy/75 text-lg leading-relaxed">
            Not sure where to start? Share your move details, priorities, and timeline. Ashley will follow up with personalized neighborhood and next-step guidance.
          </p>
          <p className="text-sm text-navy/65 mt-3">
            This quiz is for planning support and personal follow-up. It does not provide automated MLS matches or legal, financial, lending, or school-assignment advice.
          </p>

          <div className="mt-8">
            {submitted ? (
              <div className="card text-center py-10">
                <p className="font-serif text-3xl text-navy">Thank you.</p>
                <p className="mt-3 text-navy/70 max-w-2xl mx-auto">
                  Your relocation quiz has been submitted. Ashley will review your details and follow up personally with thoughtful neighborhood and next-step guidance.
                </p>
              </div>
            ) : (
              <form
                name="relocation-quiz"
                method="POST"
                action="/netlify-forms.html"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={onSubmit}
                className="card p-8 md:p-10"
              >
                <input type="hidden" name="form-name" value="relocation-quiz" />
                <input type="hidden" name="client_name" value="Ashley Smith" />
                <input type="hidden" name="form_type" value="relocation_quiz" />
                <input type="hidden" name="lead_source" value="website_relocation_quiz" />
                <input type="hidden" name="page_name" value="relocation_quiz" />
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="label">Where are you moving from?</label>
                    <input name="moving_from" required className="input" placeholder="City and state" />
                  </div>

                  <div>
                    <label className="label">What area are you considering?</label>
                    <select name="preferred_area" required className="input">
                      <option value="">Select one</option>
                      {AREA_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="label">What is your ideal timeline?</label>
                    <select name="timeline" required className="input">
                      <option value="">Select one</option>
                      {TIMELINE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="label">What best describes your move?</label>
                    <select name="move_type" required className="input">
                      <option value="">Select one</option>
                      {MOVE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="label">What matters most?</label>
                    <select name="top_priority" required className="input">
                      <option value="">Select one</option>
                      {PRIORITY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="label">What type of home are you considering?</label>
                    <select name="home_type" required className="input">
                      <option value="">Select one</option>
                      {HOME_TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="label">What price range are you considering?</label>
                    <select name="price_range" required className="input">
                      <option value="">Select one</option>
                      {PRICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="label">Do you need to sell a home before buying?</label>
                    <select name="need_to_sell" required className="input">
                      <option value="">Select one</option>
                      {SELL_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="label">Would you like Ashley to follow up with neighborhood recommendations?</label>
                    <select name="follow_up_preference" required className="input">
                      <option value="">Select one</option>
                      {FOLLOW_UP_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="label">Name</label>
                    <input name="name" required className="input" />
                  </div>

                  <div>
                    <label className="label">Email</label>
                    <input name="email" required type="email" className="input" />
                  </div>

                  <div>
                    <label className="label">Phone</label>
                    <input name="phone" className="input" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="label">Message or extra notes</label>
                    <textarea name="message" rows={4} className="input" placeholder="Anything else Ashley should know before she follows up?" />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">Submit Quiz</button>
                {error && <p className="text-sm text-red-700 mt-4">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
