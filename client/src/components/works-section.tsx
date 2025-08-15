import { useState } from "react";
import GalleryModal from "./gallery-modal";

export default function WorksSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const projects = [
    {
      title: "scanning electron microscope",
      description: "electron microscopy capture and post-processing exploring <em>microscopic worlds</em>",
      image: "/sem-1_1755279287483.jpg",
      alt: "SEM microscopy image showing intricate surface detail"
    },
    {
      title: "black & white film",
      description: "35mm film shooting and darkroom development capturing <em>light, grain, and memory</em>",
      image: "/film-1_1755279273354.jpg", 
      alt: "Black and white film photograph with atmospheric lighting"
    },
    {
      title: "music for ants",
      description: "an audiovisual experience based on the rise and fall of an <em>ant colony</em>",
      image: "https://img.youtube.com/vi/qa7CRXblC7E/maxresdefault.jpg",
      alt: "Music for ants audiovisual project thumbnail"
    },
    {
      title: "audio compositions",
      description: "echoes, loops, and fragments from the dream-state — <em>audio collages of emotion</em>",
      image: "https://w1.sndcdn.com/artworks-000793465131-2b8h9y-t500x500.jpg",
      alt: "Abstract audio composition artwork"
    }
  ];


  return (
    <section id="works" className="p-8 max-w-3xl page-transition">
      <div className="mb-16">
        <h1 className="text-4xl font-medium mb-2 animate-in inline">work</h1>
        <span className="text-xl mx-6 text-gray-500">—</span>
        <div className="text-lg text-gray-600 animate-in-delay max-w-2xl leading-relaxed">
          <p>
            a collection of analog and digital explorations across media — 
            each project investigates the intersection between technology, art, and human experience.
          </p>
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 stagger-children mt-12">
          {projects.map((project, index) => (
            <article key={index} className="gallery-item group" tabIndex={0} role="button">
              <img 
                src={project.image}
                alt={project.alt}
                className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer" 
                onClick={() => setSelectedImage(project.image)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedImage(project.image);
                  }
                }}
              />
              <h3 className="text-xl font-medium mb-2">{project.title}</h3>
              <p 
                className="text-lg opacity-80 mb-3"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </article>
          ))}
        </div>

      </div>

      {selectedImage && (
        <GalleryModal
          src={selectedImage}
          alt="Full size image"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}
