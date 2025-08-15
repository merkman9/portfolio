export default function AboutSection() {
  return (
    <section id="about" className="p-8 max-w-3xl page-transition">
      <div className="border-t-2 border-gray-300 mx-8 mb-8"></div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-medium animate-in inline">about</h1>
        <span className="text-xl mx-6 text-gray-500">—</span>
      </div>
      
      <div className="flex gap-10 items-start">
        <div className="flex-1">
          <p className="text-lg leading-relaxed mb-6 animate-in animate-in-delay">
            hi, i'm jordan, a photographer, musician, and multimedia artist. i explore how sound, light, and image can shift our sense of space. i like building experiences that feel both otherworldly and deeply human.
          </p>
          
          <div className="animate-in animate-in-delay-3">
            <h3 className="text-md font-medium mb-3 text-charcoal">tools & software</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ableton live, max/msp, touchdesigner, adobe creative suite, cinema 4d, blender
            </p>
          </div>
        </div>
        <img 
          src="/good1_1755279300863.jpg"
          alt="portrait of jordan"
          className="w-48 h-auto rounded flex-shrink-0 animate-in animate-in-delay-3"
        />
      </div>
    </section>
  );
}