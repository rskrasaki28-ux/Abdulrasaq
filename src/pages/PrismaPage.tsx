import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';

export default function PrismaPage() {
  return (
    <main className="bg-black min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />

      {/* Link to second showcase */}
      <div className="bg-black text-center py-10">
        <Link
          to="/velorah"
          className="inline-flex items-center gap-2 text-sm no-underline transition-colors duration-200"
          style={{ color: 'rgba(222,219,200,0.5)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(222,219,200,0.5)')}
        >
          View Velorah showcase →
        </Link>
      </div>
    </main>
  );
}
