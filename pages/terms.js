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
              By using ashleysmithrealestate.live, you agree to use the content and tools for
              their intended purpose: exploring Triangle real estate and connecting with Ashley Smith,
              Realtor® at Compass North Carolina, LLC.
            </p>
            <p>
              All content — including market figures, school ratings, commute estimates, and listing
              data — is for general guidance only. Verify all material facts independently and consult
              a licensed professional for transaction-specific advice.
            </p>
            <p>
              This website does not display live MLS or IDX data. Listings and recent sales shown
              on this site are transactions in which Ashley Smith represented a buyer and/or seller,
              entered manually and deemed reliable but not guaranteed. Any market metrics marked as
              placeholders do not represent live market data.
            </p>
            <p>
              Any home valuation request is for general informational purposes only and is not an
              appraisal, CMA, broker price opinion, or guarantee of market value. Information
              provided through website tools is for general guidance only and should be
              independently verified.
            </p>
            <p>
              Ashley Smith is a licensed real estate agent affiliated with Compass, a licensed real estate broker and abides by Equal Housing Opportunity laws. All material presented herein is intended for informational purposes only. Information is compiled from sources deemed reliable but is subject to errors, omissions, changes in price, condition, sale, or withdrawal without notice. This is not intended to solicit property already listed. Photos may be virtually staged or digitally enhanced and may not reflect actual property conditions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
