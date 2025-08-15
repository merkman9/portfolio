export default function AudioSection() {
  return (
    <section id="audio" className="p-8 max-w-3xl page-transition">
      <div className="border-t-2 border-gray-300 mx-8 mb-8"></div>
      
      <div className="mb-12">
        <h1 className="text-4xl font-medium animate-in inline">audio</h1>
        <span className="text-xl mx-6 text-gray-500">—</span>
      </div>

      <div className="space-y-8 mt-12">
        <div className="bg-warm-beige p-6 rounded-lg animate-in">
          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2 text-charcoal">aigul</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              my first fully realized music project. created in collaboration with several friends.
            </p>
          </div>
          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/indubivalmente/sets/aigul2&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&show_artwork=true"
            title="Audio composition - Aigul EP (full album)"
            aria-label="SoundCloud audio player for full Aigul EP"
          />
        </div>

        <div className="bg-warm-beige p-6 rounded-lg animate-in animate-in-delay">
          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2 text-charcoal">daydream</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              a pop song made with my friends nathan and willa at the Oberlin sonic arts workshop in 2023.
            </p>
          </div>
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/280north/daydream&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
            title="Audio composition - Daydream"
            aria-label="SoundCloud audio player for Daydream track"
          />
        </div>

        <div className="bg-warm-beige p-6 rounded-lg animate-in animate-in-delay-2">
          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2 text-charcoal">unfinished scraps</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              incomplete musical ideas that i want to share so they aren't forgotten
            </p>
          </div>
          <iframe
            width="100%"
            height="450"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/merkai-627225080/tracks&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&show_artwork=true"
            title="Audio compositions - Unfinished scraps"
            aria-label="SoundCloud audio player for unfinished scraps collection"
          />
        </div>
      </div>
    </section>
  );
}