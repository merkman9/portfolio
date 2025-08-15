import * as React from "react";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Sidebar({ activeSection, onNavigate, isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Auto-close menu when scrolling for better reading experience
      if (isMobileMenuOpen && window.scrollY > 50) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  return (
    <>
      {/* Enhanced Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden fixed top-3 left-3 z-50 p-2.5 rounded-full backdrop-blur-sm border transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'bg-white/95 border-gray-300 shadow-lg scale-110' 
            : isScrolled 
              ? 'bg-white/40 border-gray-200 shadow-md hover:bg-white/50' 
              : 'bg-white/60 border-gray-100 shadow-sm hover:bg-white/80'
        }`}
        aria-label="Toggle menu"
      >
        <svg className={`w-5 h-5 transition-all duration-300 ${
          isMobileMenuOpen ? 'text-charcoal' : 'text-gray-700'
        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-52 bg-warm-beige p-8 overflow-y-auto flex-col">
        {/* Brand */}
        <div className="mb-8">
          <h2 className="text-2xl font-medium mb-2 max-w-40 leading-tight">
            <button 
              onClick={() => onNavigate('photo')}
              className="hover:opacity-80 transition-opacity text-left"
            >
              jordan mendelevitch
            </button>
          </h2>
          <div className="w-16 h-px bg-charcoal opacity-30"></div>
        </div>

        {/* Navigation */}
        <nav className="flex-1" role="navigation" aria-label="Main navigation">
          <ul className="space-y-2">
            <li>
              <div className="relative">
                <button
                  onClick={() => onNavigate('photo')}
                  className={`nav-link text-lg block py-2 text-charcoal hover:text-charcoal text-left ${
                    ['photo', 'audio', 'video', 'music-for-ants'].includes(activeSection) ? 'font-semibold' : ''
                  }`}
                  aria-current={['photo', 'audio', 'video', 'music-for-ants'].includes(activeSection) ? 'page' : undefined}
                >
                  work
                </button>
                <div className="ml-6 mt-2 mb-3 space-y-1">
                  <button
                    onClick={() => onNavigate('photo')}
                    className={`nav-link text-sm block py-1 text-charcoal hover:text-charcoal text-left opacity-80 relative ${
                      activeSection === 'photo' ? 'font-semibold opacity-100' : ''
                    }`}
                  >
                    {activeSection === 'photo' && <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-charcoal rounded-full"></span>}
                    photo
                  </button>
                  <button
                    onClick={() => onNavigate('audio')}
                    className={`nav-link text-sm block py-1 text-charcoal hover:text-charcoal text-left opacity-80 relative ${
                      activeSection === 'audio' ? 'font-semibold opacity-100' : ''
                    }`}
                  >
                    {activeSection === 'audio' && <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-charcoal rounded-full"></span>}
                    audio
                  </button>
                  <button
                    onClick={() => onNavigate('video')}
                    className={`nav-link text-sm block py-1 text-charcoal hover:text-charcoal text-left opacity-80 relative ${
                      activeSection === 'video' ? 'font-semibold opacity-100' : ''
                    }`}
                  >
                    {activeSection === 'video' && <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-charcoal rounded-full"></span>}
                    video
                  </button>
                  <button
                    onClick={() => onNavigate('music-for-ants')}
                    className={`nav-link text-sm block py-1 text-charcoal hover:text-charcoal text-left opacity-80 relative ${
                      activeSection === 'music-for-ants' ? 'font-semibold opacity-100' : ''
                    }`}
                  >
                    {activeSection === 'music-for-ants' && <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-charcoal rounded-full"></span>}
                    music for ants
                  </button>
                </div>
              </div>
            </li>
            <li>
              <button
                onClick={() => onNavigate('about')}
                className={`nav-link text-lg block py-2 text-charcoal hover:text-charcoal text-left ${
                  activeSection === 'about' ? 'font-semibold' : ''
                }`}
                aria-current={activeSection === 'about' ? 'page' : undefined}
              >
                about
              </button>
            </li>
            <li className="-mt-3">
              <button
                onClick={() => onNavigate('contact')}
                className={`nav-link text-lg block py-2 text-charcoal hover:text-charcoal text-left ${
                  activeSection === 'contact' ? 'font-semibold' : ''
                }`}
                aria-current={activeSection === 'contact' ? 'page' : undefined}
              >
                contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-6 mt-auto">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener"
            aria-label="linkedin profile (opens in new tab)"
            className="text-charcoal hover:opacity-70 transition-opacity"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="mailto:merkaifx@gmail.com"
            aria-label="send email"
            className="text-charcoal hover:opacity-70 transition-opacity"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 11.39l9.455-7.568h.909c.904 0 1.636.732 1.636 1.636z"/>
            </svg>
          </a>
          <a
            href="https://soundcloud.com/indubivalmente"
            target="_blank"
            rel="noopener"
            aria-label="soundcloud profile (opens in new tab)"
            className="text-charcoal hover:opacity-70 transition-opacity"
          >
            <img 
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/soundcloud.svg" 
              alt="SoundCloud" 
              className="w-4 h-4"
            />
          </a>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <aside className={`md:hidden fixed left-0 top-0 h-full w-48 bg-warm-beige pt-12 pl-10 pr-6 pb-6 overflow-y-auto flex flex-col z-50 transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand */}
        <div className="mb-4 ml-2 mt-3">
          <h2 className="text-xl font-medium mb-2 max-w-40 leading-tight">
            <button 
              onClick={() => {
                onNavigate('photo');
                setIsMobileMenuOpen(false);
              }}
              className="hover:opacity-80 transition-opacity text-left"
            >
              jordan mendelevitch
            </button>
          </h2>
          <div className="w-16 h-px bg-charcoal opacity-30"></div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 ml-2" role="navigation" aria-label="Main navigation">
          <ul className="space-y-2">
            <li>
              <div className="relative">
                <button
                  onClick={() => {
                    onNavigate('photo');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`nav-link text-lg block py-2 text-charcoal hover:text-charcoal text-left w-full ${
                    ['photo', 'audio', 'video', 'music-for-ants'].includes(activeSection) ? 'font-semibold' : ''
                  }`}
                  aria-current={['photo', 'audio', 'video', 'music-for-ants'].includes(activeSection) ? 'page' : undefined}
                >
                  work
                </button>
                <div className="ml-6 mt-2 mb-3 space-y-1">
                  <button
                    onClick={() => {
                      onNavigate('photo');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`nav-link text-sm block py-1 text-charcoal hover:text-charcoal text-left opacity-80 relative w-full ${
                      activeSection === 'photo' ? 'font-semibold opacity-100' : ''
                    }`}
                  >
                    {activeSection === 'photo' && <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-charcoal rounded-full"></span>}
                    photo
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('audio');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`nav-link text-sm block py-1 text-charcoal hover:text-charcoal text-left opacity-80 relative w-full ${
                      activeSection === 'audio' ? 'font-semibold opacity-100' : ''
                    }`}
                  >
                    {activeSection === 'audio' && <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-charcoal rounded-full"></span>}
                    audio
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('video');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`nav-link text-sm block py-1 text-charcoal hover:text-charcoal text-left opacity-80 relative w-full ${
                      activeSection === 'video' ? 'font-semibold opacity-100' : ''
                    }`}
                  >
                    {activeSection === 'video' && <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-charcoal rounded-full"></span>}
                    video
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('music-for-ants');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`nav-link text-sm block py-1 text-charcoal hover:text-charcoal text-left opacity-80 relative w-full ${
                      activeSection === 'music-for-ants' ? 'font-semibold opacity-100' : ''
                    }`}
                  >
                    {activeSection === 'music-for-ants' && <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-charcoal rounded-full"></span>}
                    music for ants
                  </button>
                </div>
              </div>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`nav-link text-lg block py-2 text-charcoal hover:text-charcoal text-left w-full ${
                  activeSection === 'about' ? 'font-semibold' : ''
                }`}
                aria-current={activeSection === 'about' ? 'page' : undefined}
              >
                about
              </button>
            </li>
            <li className="-mt-3">
              <button
                onClick={() => {
                  onNavigate('contact');
                  setIsMobileMenuOpen(false);
                }}
                className={`nav-link text-lg block py-2 text-charcoal hover:text-charcoal text-left w-full ${
                  activeSection === 'contact' ? 'font-semibold' : ''
                }`}
                aria-current={activeSection === 'contact' ? 'page' : undefined}
              >
                contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-6 mt-auto">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener"
            aria-label="linkedin profile (opens in new tab)"
            className="text-charcoal hover:opacity-70 transition-opacity"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="mailto:merkaifx@gmail.com"
            aria-label="send email"
            className="text-charcoal hover:opacity-70 transition-opacity"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 11.39l9.455-7.568h.909c.904 0 1.636.732 1.636 1.636z"/>
            </svg>
          </a>
          <a
            href="https://soundcloud.com/indubivalmente"
            target="_blank"
            rel="noopener"
            aria-label="soundcloud profile (opens in new tab)"
            className="text-charcoal hover:opacity-70 transition-opacity"
          >
            <img 
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/soundcloud.svg" 
              alt="SoundCloud" 
              className="w-4 h-4"
            />
          </a>
        </div>
      </aside>
    </>
  );
}
