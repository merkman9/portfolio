import { useEffect, useState } from "react";

interface ImageType {
  src: string;
  alt: string;
}

interface GalleryModalProps {
  images: ImageType[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryModal({ images, currentIndex, onClose, onNext, onPrev }: GalleryModalProps) {
  const currentImage = images[currentIndex];
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Pause all videos and audio when lightbox opens
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      const src = iframe.src;
      iframe.src = '';
      iframe.src = src;
    });
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
        setScale(1);
        setPosition({ x: 0, y: 0 });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
        setScale(1);
        setPosition({ x: 0, y: 0 });
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setScale(prev => Math.min(prev * 1.2, 5));
      } else if (e.key === '-') {
        e.preventDefault();
        setScale(prev => Math.max(prev / 1.2, 0.5));
      } else if (e.key === '0') {
        e.preventDefault();
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 1.1 : 0.9;
        setScale(prev => Math.min(Math.max(prev * delta, 0.5), 5));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [onClose, onNext, onPrev]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsDragging(false);
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev * 1.2, 5));
  };
  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev / 1.2, 0.5));
  };
  const resetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };
  
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNext();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPrev();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="fullscreen-modal" onClick={onClose}>
      <div className="fullscreen-controls">
        <button onClick={zoomOut} aria-label="Zoom out">−</button>
        <button onClick={resetZoom} aria-label="Reset zoom">1:1</button>
        <button onClick={zoomIn} aria-label="Zoom in">+</button>
        <button onClick={handleClose} aria-label="Close fullscreen">×</button>
      </div>
      
      <div className="fullscreen-nav">
        <button onClick={handlePrev} aria-label="Previous image" className="nav-button prev-button">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button onClick={handleNext} aria-label="Next image" className="nav-button next-button">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      
      <img
        src={currentImage.src}
        alt={currentImage.alt}
        className={`fullscreen-content ${isDragging ? 'cursor-grabbing' : scale > 1 ? 'cursor-grab' : 'cursor-zoom-in'}`}
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease'
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (scale === 1) {
            zoomIn(e);
          }
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}
