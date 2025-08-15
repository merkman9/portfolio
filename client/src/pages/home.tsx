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
    const animatedElements = document.querySelectorAll('.animate-in, .stagger-children');
    
    // Manual scroll-based section detection
    const handleScroll = () => {
      const sections = ['photo', 'audio', 'video', 'music-for-ants', 'about', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of viewport
      
      let currentSection = 'photo'; // default
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.pageYOffset + rect.top;
          const elementBottom = elementTop + rect.height;
          
          // Check if scroll position is within this section
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            currentSection = sectionId;
            break;
          }
          
          // For short sections, give them priority if they're mostly visible
          if (rect.height < window.innerHeight * 0.6) {
            const elementCenter = elementTop + rect.height / 2;
            if (Math.abs(scrollPosition - elementCenter) < rect.height) {
              currentSection = sectionId;
              break;
            }
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Observer for scroll animations only
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

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    animatedElements.forEach((element) => animationObserver.observe(element));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      animationObserver.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close mobile menu first
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      
      // Simple smooth scroll to section
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
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
