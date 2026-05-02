import SEO from '../components/SEO';

export default function Terms() {
  return (
    <>
      <SEO title="Terms of Use | Ashley Smith Real Estate" path="/terms" />
      <section className="section">
        <div className="container-narrow max-w-3xl">
          <p className="eyebrow mb-3">Terms of Use</p>
          <h1 className="font-serif text-5xl text-navy">Thoughtful use of this site.</h1>
          <div className="divider-thin mt-6" />
          <div className="prose-luxe mt-8 text-lg">
            <p>
              By using ashleysmithrealestate.netlify.app, you agree to use the content and tools for
              their intended purpose: exploring Triangle real estate and connecting with Ashley Smith,
              Realtor® at Compass North Carolina, LLC.
            </p>
            <p>
              All content — including market figures, school ratings, commute estimates, and listing
              data — is for general guidance only. Verify all material facts independently and consult
              a licensed professional for transaction-specific advice.
            </p>
            <p>
              Compass North Carolina, LLC supports Equal Housing Opportunity and complies with all
              applicable real estate laws and regulations. [Final compliance and legal language
              should be reviewed and approved by Compass North Carolina prior to launch.]
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
