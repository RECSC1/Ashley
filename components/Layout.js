import Header from './Header';
import Footer from './Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const hideStickyOn = ['/contact', '/admin', '/client-portal'];
  const showSticky = !hideStickyOn.includes(router.pathname);

  return (
    <div
      className={`min-h-screen flex flex-col bg-ivory ${
        showSticky ? 'has-sticky-cta' : ''
      }`}
    >
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      {showSticky && (
        <div className="md:hidden sticky-cta">
          <Link
            href="/contact"
            className="btn btn-primary shadow-soft text-xs px-5 py-2.5"
          >
            Schedule a Consultation
          </Link>
        </div>
      )}
    </div>
  );
}
