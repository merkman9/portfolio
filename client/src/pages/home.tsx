import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import PhotoSection from "@/components/photo-section";
import AudioSection from "@/components/audio-section";
import VideoSection from "@/components/video-section";
import MusicForAntsSection from "@/components/music-for-ants-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  const [activeSection, setActiveSection] = useState("photo");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const animatedElements = document.querySelectorAll('.animate-in, .stagger-children');
    
    // Observer for active section tracking
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        // Find the most visible section to avoid jittering
        let mostVisibleSection = null;
        let maxRatio = 0;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id;
          }
        });
        
        // Only update if we have a section that's at least 30% visible
        if (mostVisibleSection && maxRatio > 0.3) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        threshold: [0.3, 0.6],
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    // Observer for scroll animations
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
    animatedElements.forEach((element) => animationObserver.observe(element));
    
    return () => {
      sectionObserver.disconnect();
      animationObserver.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="font-garamond text-charcoal bg-white">
      {/* Skip link for keyboard navigation */}
      <a href="#main" className="skip">
        skip to content
      </a>

      <Sidebar 
        activeSection={activeSection} 
        onNavigate={scrollToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main id="main" className="md:ml-52 min-h-screen">
        <PhotoSection />
        <AudioSection />
        <VideoSection />
        <MusicForAntsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}
