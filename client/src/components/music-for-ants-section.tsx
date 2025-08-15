export default function MusicForAntsSection() {
  return (
    <section id="music-for-ants" className="p-8 max-w-3xl page-transition">
      <div className="border-t-2 border-gray-300 mx-8 mb-8"></div>
      
      <h1 className="text-4xl font-medium mb-6 animate-in inline">music for ants</h1>
      <span className="text-xl mx-6 text-gray-500">—</span>
      <div className="text-lg text-gray-700 animate-in-delay max-w-2xl leading-relaxed mt-4 mb-2">
        <p>
          an audiovisual experience that follows the rise and fall of an ant colony.
        </p>
      </div>

      <div className="flex gap-6 items-start mt-8">
        <div className="flex-1 max-w-2xl">
          <div className="aspect-w-16 aspect-h-9 animate-in">
            <iframe
              src="https://www.youtube.com/embed/qa7CRXblC7E"
              title="Music for Ants - Audiovisual Experience"
              className="w-full h-96 rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              aria-label="Music for Ants audiovisual experience video player"
            />
          </div>
        </div>
        
        <div className="w-56 pt-4 flex-shrink-0">
          <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
            <p><span className="font-medium">process:</span> generative composition, custom max/msp patches responding to ant/performer behavior</p>
            <p><span className="font-medium">timeframe:</span> april 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
}