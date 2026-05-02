export default function Home() {
  return (
    <main className="bg-warm-white" style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
      <section style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h1>Ashley Smith</h1>
        <p className="text-muted-taupe">Real Estate</p>
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Welcome</h2>
          <p>
            Helping you find a place to call home. Get in touch to start your
            journey.
          </p>
          <a className="btn btn-primary" href="mailto:hello@ashleysmithrealestate.com">
            Contact Ashley
          </a>
        </div>
      </section>
    </main>
  );
}
