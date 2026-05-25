import PortfolioNav from '../components/portfolio/PortfolioNav';
import PortfolioHero from '../components/portfolio/PortfolioHero';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import VideoInterlude from '../components/portfolio/VideoInterlude';
import CaseStudiesSection from '../components/portfolio/CaseStudiesSection';
import CertificationsSection from '../components/portfolio/CertificationsSection';
import HobbiesSection from '../components/portfolio/HobbiesSection';
import ContactSection from '../components/portfolio/ContactSection';

export default function PortfolioPage() {
  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden">
      <PortfolioNav />
      <PortfolioHero />
      <ProjectsSection />
      <VideoInterlude />
      <CaseStudiesSection />
      <CertificationsSection />
      <HobbiesSection />
      <ContactSection />
    </div>
  );
}
