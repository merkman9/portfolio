import { useState } from "react";

export default function VideoSection() {
  const videos = [
    {
      id: "-uXBKPRoQF0",
      title: "daydream music video",
      description: "",
      approach: "",
      duration: "",
      timeframe: "september 2023"
    },
    {
      id: "ZIpQ_xM06Qw", 
      title: "bota nela breakdown",
      description: "a video explaining the production of my song bota nela",
      approach: "",
      duration: "",
      timeframe: "june 2023"
    },
    {
      id: "EWmPTLnEebc",
      title: "liminaali tilaa",
      description: "",
      approach: "",
      duration: "",
      timeframe: "june 2023"
    },
    {
      id: "IzvRCN-wqXA",
      title: "petrichor",
      description: "",
      approach: "",
      duration: "",
      timeframe: "march 2023"
    }
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [infoChanging, setInfoChanging] = useState(false);

  const nextVideo = () => {
    setInfoChanging(true);
    setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      setTimeout(() => setInfoChanging(false), 50);
    }, 150);
  };
  
  const prevVideo = () => {
    setInfoChanging(true);
    setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
      setTimeout(() => setInfoChanging(false), 50);
    }, 150);
  };

  return (
    <section id="video" className="p-8 max-w-3xl page-transition">
      <div className="border-t-2 border-gray-300 mx-8 mb-8"></div>
      
      <div className="mb-4">
        <h1 className="text-4xl font-medium animate-in inline">video</h1>
        <span className="text-xl mx-6 text-gray-500">—</span>
      </div>

      <div className="flex gap-6 items-start mt-8">
        <div className="flex-1 max-w-2xl">
          <div className="animate-in">
            <div className="flex justify-center items-center mb-4 gap-4">
              <button
                onClick={prevVideo}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Previous video"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              <div className="flex gap-3">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (index !== currentVideoIndex) {
                        setInfoChanging(true);
                        setTimeout(() => {
                          setCurrentVideoIndex(index);
                          setTimeout(() => setInfoChanging(false), 50);
                        }, 150);
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      index === currentVideoIndex ? 'bg-charcoal' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextVideo}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Next video"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${videos[currentVideoIndex].id}`}
                title={videos[currentVideoIndex].title}
                className="w-full h-96 rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                aria-label={`Video player for ${videos[currentVideoIndex].title}`}
              />
            </div>
          </div>
        </div>
        
        <div className="w-56 pt-16 flex-shrink-0">
          <div className={`text-sm text-gray-600 space-y-3 leading-relaxed transition-opacity duration-300 ${infoChanging ? 'opacity-30' : 'opacity-100'}`}>
            <div>
              <h4 className="text-lg font-medium mb-2 text-charcoal">{videos[currentVideoIndex].title}</h4>
              <p className="text-xs leading-relaxed mb-3">{videos[currentVideoIndex].description}</p>
            </div>
            
            <p><span className="font-medium">timeframe:</span> {videos[currentVideoIndex].timeframe || 'september 2023'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}