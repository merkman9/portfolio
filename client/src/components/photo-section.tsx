import { useState } from "react";
import GalleryModal from "./gallery-modal";

export default function PhotoSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<'sem' | 'film' | null>(null);

  // SEM Images
  const semImages = [
    {
      src: "/sem-1_1755279287483.jpg",
      alt: "SEM image - delicate organic fibers with intricate spinal structures"
    },
    {
      src: "/sem-2_1755279287475.jpg",
      alt: "SEM image - curved surface revealing detailed textural patterns and cracks"
    },
    {
      src: "/sem-3_1755279287483.jpg",
      alt: "SEM image - parallel rod-like structures in geometric formation"
    },
    {
      src: "/sem-4_1755279287484.jpg",
      alt: "SEM image - complex cellular landscape with varied organic forms"
    },
    {
      src: "/sem-5_1755279287484.jpg",
      alt: "SEM image - layered, scale-like structure with flowing organic patterns"
    },
    {
      src: "/sem-6_1755279287485.jpg",
      alt: "SEM image - rough, mineral-like formations with spherical elements"
    },
    {
      src: "/sem-7_1755279287485.jpg",
      alt: "SEM image - sharp crystalline structures emerging from organic matter"
    },
    {
      src: "/sem-8_1755279287485.jpg",
      alt: "SEM image - crystalline formation with parallel striations and geometric precision"
    },
    {
      src: "/sem-9_1755279287486.jpg",
      alt: "SEM image - complex folded structures resembling coral or fungal formations"
    },
    {
      src: "/sem-10_1755279287486.jpg",
      alt: "SEM image - dramatic silhouette of organic spikes against bright background"
    },
    {
      src: "/sem-11_1755279287486.jpg",
      alt: "SEM image - intricate star-like biological structure with radiating spikes"
    }
  ];

  // Film Photos
  const filmImages = [
    {
      src: "/film-1_1755279273354.jpg",
      alt: "Black and white film photograph - atmospheric interior scene"
    },
    {
      src: "/film-2_1755279273362.jpg",
      alt: "Black and white film photograph - performer in motion"
    },
    {
      src: "/film-3_1755279273362.jpg",
      alt: "Black and white film photograph - roses and interior details"
    },
    {
      src: "/film-4_1755279273362.jpg",
      alt: "Black and white film photograph - workspace scene with motion blur"
    },
    {
      src: "/film-5_1755279273363.jpg",
      alt: "Black and white film photograph - coffee cup with steam"
    },
    {
      src: "/film-6_1755279273363.jpg",
      alt: "Black and white film photograph - pottery wheel in motion"
    },
    {
      src: "/film-7_1755279273363.jpg",
      alt: "Black and white film photograph - flowing water over rocks"
    },
    {
      src: "/film-8_1755279273364.jpg",
      alt: "Black and white film photograph - delicate plant stems with thorns"
    },
    {
      src: "/film-9_1755279273364.jpg",
      alt: "Black and white film photograph - water droplets and reflective surfaces"
    }
  ];

  const [currentSemIndex, setCurrentSemIndex] = useState(0);
  const [currentFilmIndex, setCurrentFilmIndex] = useState(0);
  const [semImageChanging, setSemImageChanging] = useState(false);
  const [filmImageChanging, setFilmImageChanging] = useState(false);

  const nextSemImage = () => {
    setSemImageChanging(true);
    setTimeout(() => {
      setCurrentSemIndex((prev) => (prev + 1) % semImages.length);
      setTimeout(() => setSemImageChanging(false), 150);
    }, 200);
  };
  
  const prevSemImage = () => {
    setSemImageChanging(true);
    setTimeout(() => {
      setCurrentSemIndex((prev) => (prev - 1 + semImages.length) % semImages.length);
      setTimeout(() => setSemImageChanging(false), 150);
    }, 200);
  };
  
  const nextFilmImage = () => {
    setFilmImageChanging(true);
    setTimeout(() => {
      setCurrentFilmIndex((prev) => (prev + 1) % filmImages.length);
      setTimeout(() => setFilmImageChanging(false), 150);
    }, 200);
  };
  
  const prevFilmImage = () => {
    setFilmImageChanging(true);
    setTimeout(() => {
      setCurrentFilmIndex((prev) => (prev - 1 + filmImages.length) % filmImages.length);
      setTimeout(() => setFilmImageChanging(false), 150);
    }, 200);
  };

  return (
    <section id="photo" className="p-8 pt-16 max-w-3xl page-transition">
      <div className="mb-4">
        <h1 className="text-4xl font-medium animate-in inline">photo</h1>
        <span className="text-xl mx-6 text-gray-500">—</span>
      </div>

      {/* SEM Images Gallery */}
      <div className="mt-12 mb-20">
        <div className="flex gap-6 items-start">
          <div className="flex-1 max-w-2xl">
            <div className="relative bg-warm-beige rounded-lg p-6">
              <div className="flex justify-center items-center mb-4 gap-4">
                <button
                  onClick={prevSemImage}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Previous SEM image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                
                <div className="flex gap-3">
                  {semImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index !== currentSemIndex) {
                          setSemImageChanging(true);
                          setTimeout(() => {
                            setCurrentSemIndex(index);
                            setTimeout(() => setSemImageChanging(false), 150);
                          }, 200);
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-700 ${
                        index === currentSemIndex ? 'bg-charcoal' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to SEM image ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSemImage}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Next SEM image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
              
              <div className="flex justify-center items-center h-96 relative overflow-hidden">
                <img
                  src={semImages[currentSemIndex].src}
                  alt={semImages[currentSemIndex].alt}
                  className={`max-w-full max-h-full object-contain cursor-pointer rounded border-2 border-transparent hover:border-gray-400 transition-all duration-800 ease-out image-fade-transition ${semImageChanging ? 'changing' : ''}`}
                  onClick={() => {
                    setSelectedImageIndex(currentSemIndex);
                    setSelectedGallery('sem');
                  }}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedImageIndex(currentSemIndex);
                      setSelectedGallery('sem');
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="w-56 pt-8 flex-shrink-0">
            <h3 className="text-xl font-medium mb-6">scanning electron microscopy</h3>
            <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
              <p><span className="font-medium">subjects:</span> plant matter, insects, and metallic objects</p>
              <p><span className="font-medium">timeframe:</span> january 2024 - march 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Film Photos Gallery */}
      <div className="mb-8 mt-20">
        <div className="flex gap-6 items-start">
          <div className="flex-1 max-w-2xl">
            <div className="relative bg-warm-beige rounded-lg p-6">
              <div className="flex justify-center items-center mb-4 gap-4">
                <button
                  onClick={prevFilmImage}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Previous film photo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                
                <div className="flex gap-3">
                  {filmImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index !== currentFilmIndex) {
                          setFilmImageChanging(true);
                          setTimeout(() => {
                            setCurrentFilmIndex(index);
                            setTimeout(() => setFilmImageChanging(false), 150);
                          }, 200);
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-700 ${
                        index === currentFilmIndex ? 'bg-charcoal' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to film photo ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextFilmImage}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Next film photo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
              
              <div className="flex justify-center items-center h-96 relative overflow-hidden">
                <img
                  src={filmImages[currentFilmIndex].src}
                  alt={filmImages[currentFilmIndex].alt}
                  className={`max-w-full max-h-full object-contain cursor-pointer rounded border-2 border-transparent hover:border-gray-400 transition-all duration-800 ease-out image-fade-transition ${filmImageChanging ? 'changing' : ''}`}
                  onClick={() => {
                    setSelectedImageIndex(currentFilmIndex);
                    setSelectedGallery('film');
                  }}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedImageIndex(currentFilmIndex);
                      setSelectedGallery('film');
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="w-56 pt-8 flex-shrink-0">
            <h3 className="text-xl font-medium mb-6">black & white film</h3>
            <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
              <p><span className="font-medium">timeframe:</span> april 2023 - present</p>
            </div>
          </div>
        </div>
      </div>

      {selectedImageIndex !== null && selectedGallery && (
        <GalleryModal
          images={selectedGallery === 'sem' ? semImages : filmImages}
          currentIndex={selectedImageIndex}
          onClose={() => {
            setSelectedImageIndex(null);
            setSelectedGallery(null);
          }}
          onNext={() => {
            const images = selectedGallery === 'sem' ? semImages : filmImages;
            const newIndex = (selectedImageIndex + 1) % images.length;
            setSelectedImageIndex(newIndex);
            if (selectedGallery === 'sem') {
              setCurrentSemIndex(newIndex);
            } else {
              setCurrentFilmIndex(newIndex);
            }
          }}
          onPrev={() => {
            const images = selectedGallery === 'sem' ? semImages : filmImages;
            const newIndex = (selectedImageIndex - 1 + images.length) % images.length;
            setSelectedImageIndex(newIndex);
            if (selectedGallery === 'sem') {
              setCurrentSemIndex(newIndex);
            } else {
              setCurrentFilmIndex(newIndex);
            }
          }}
        />
      )}
    </section>
  );
}