import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { KEYS } from '../lib/store';

const AREAS = ['Chapel Hill', 'Carrboro', 'Durham', 'Hillsborough', 'Pittsboro', 'Cary', 'Raleigh', 'Greater Triangle'];

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Ashley Smith | Chapel Hill & Triangle Realtor®"
        description="Connect with Ashley Smith, Realtor® at Compass North Carolina, LLC. Serving Chapel Hill, Carrboro, Durham, Cary, Raleigh, and the broader Triangle. Schedule a calm, no-pressure consultation."
        path="/contact"
      />
      <section className="section">
        <div className="container-wide grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Contact</p>
            <h1 className="font-serif text-5xl text-navy leading-tight">A thoughtful first conversation.</h1>
            <div className="divider-thin mt-6" />
            <p className="mt-6 text-navy/75 text-lg leading-relaxed">
              Ashley meets each client where they are — exploring, planning, or ready to begin. Share a
              little about your goals and she will follow up personally.
            </p>
            <div className="mt-8 space-y-2 text-navy/80 text-sm">
              <p className="font-serif text-2xl text-navy">Ashley Smith</p>
              <p>Realtor® · Luxury Certified · Relocation Certified</p>
              <p>Compass North Carolina, LLC</p>
              <p className="pt-3"><span className="text-gold uppercase tracking-widewide text-xs mr-2">Phone</span>[Ashley's phone number]</p>
              <p><span className="text-gold uppercase tracking-widewide text-xs mr-2">Email</span>[Ashley's email]</p>
              <p><span className="text-gold uppercase tracking-widewide text-xs mr-2">Social</span>[Instagram] · [Facebook] · [LinkedIn]</p>
            </div>
            <div className="mt-8">
              <p className="eyebrow mb-3">Service areas</p>
              <div className="flex flex-wrap gap-2">
                {AREAS.map((a) => <span key={a} className="badge bg-warmwhite border border-taupe/30 text-navy/80">{a}</span>)}
              </div>
            </div>
            <div className="mt-8 rounded-2xl overflow-hidden border border-taupe/30 aspect-[16/9] bg-gradient-to-br from-sage/30 via-warmwhite to-blush/30 flex items-center justify-center">
              <span className="text-xs uppercase tracking-widewide text-taupe">[Service area map placeholder]</span>
            </div>
          </div>
          <div className="lg:col-span-7">
            <LeadForm
              showTimeline
              storageKey={KEYS.CONTACT}
              interestOptions={[
                'Buying',
                'Selling',
                'Relocating',
                'Luxury Real Estate',
                'Investing',
                'UNC-related Move',
                'Commute-Friendly Home Search',
                'General Consultation',
              ]}
              title="Schedule a Consultation"
              subtitle="Calm, considered, no pressure. Ashley will respond within one business day."
            />
          </div>
        </div>
      </section>
    </>
  );
}
