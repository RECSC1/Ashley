export default function FaqSection({ faqs = [], heading = 'Frequently asked questions' }) {
  if (!faqs.length) return null;
  return (
    <section className="faq-block">
      <h2>{heading}</h2>
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </section>
  );
}
