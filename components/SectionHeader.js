export default function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-navy/70 leading-relaxed text-lg">{subtitle}</p>
      )}
      <div className={`divider-thin mt-6 ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}
