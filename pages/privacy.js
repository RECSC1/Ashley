import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy | Ashley Smith Real Estate" path="/privacy" />
      <section className="section">
        <div className="container-narrow max-w-3xl">
          <p className="eyebrow mb-3">Privacy Policy</p>
          <h1 className="font-serif text-5xl text-navy">Your information, treated with care.</h1>
          <div className="divider-thin mt-6" />
          <div className="prose-luxe mt-8 text-lg">
            <p>
              Ashley Smith and Compass North Carolina, LLC are committed to protecting your privacy.
              This page outlines how information submitted through the website — including names,
              emails, phone numbers, and tool inputs — is handled.
            </p>
            <p>
              Submitted information is used solely to support your real estate goals and to follow up
              with relevant guidance. We do not sell or rent your personal information.
            </p>
            <p>
              Cookies and lightweight analytics may be used to improve the experience and understand
              site usage in aggregate. You can control cookie behavior in your browser at any time.
            </p>
            <p>
              For questions about this policy, please contact Ashley directly at{' '}
              <a href="mailto:ashley.m.smith@compass.com" className="text-gold hover:underline">ashley.m.smith@compass.com</a>.
            </p>
            <p className="text-sm text-navy/60 mt-6">
              Ashley Smith is a licensed real estate agent affiliated with Compass, a licensed real estate broker and abides by Equal Housing Opportunity laws. All material presented herein is intended for informational purposes only. Information is compiled from sources deemed reliable but is subject to errors, omissions, changes in price, condition, sale, or withdrawal without notice. This is not intended to solicit property already listed. Photos may be virtually staged or digitally enhanced and may not reflect actual property conditions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
