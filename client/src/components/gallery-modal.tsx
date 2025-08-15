import { useEffect, useState, useRef } from "react";

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
  
  // Touch handling state
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [lastTouchCenter, setLastTouchCenter] = useState({ x: 0, y: 0 });
  const [isTouching, setIsTouching] = useState(false);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper functions for touch handling
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const getTouchCenter = (touches: React.TouchList) => {
    if (touches.length === 1) {
      return { x: touches[0].clientX, y: touches[0].clientY };
    }
    const touch1 = touches[0];
    const touch2 = touches[1];
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2
    };
  };

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
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
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

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsTouching(true);
    
    if (e.touches.length === 1) {
      // Single touch - start tracking for swipe
      const touch = e.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
      
      if (scale > 1) {
        // Start dragging if zoomed
        setIsDragging(true);
        setDragStart({
          x: touch.clientX - position.x,
          y: touch.clientY - position.y
        });
      }
    } else if (e.touches.length === 2) {
      // Two touches - start pinch zoom
      setLastTouchDistance(getTouchDistance(e.touches));
      setLastTouchCenter(getTouchCenter(e.touches));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 1 && scale > 1 && isDragging) {
      // Single touch drag when zoomed
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    } else if (e.touches.length === 2) {
      // Two touch pinch zoom
      const newDistance = getTouchDistance(e.touches);
      const newCenter = getTouchCenter(e.touches);
      
      if (lastTouchDistance > 0) {
        const scaleFactor = newDistance / lastTouchDistance;
        const newScale = Math.min(Math.max(scale * scaleFactor, 0.5), 5);
        setScale(newScale);
        
        // Adjust position to zoom towards touch center
        const deltaX = newCenter.x - lastTouchCenter.x;
        const deltaY = newCenter.y - lastTouchCenter.y;
        setPosition(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));
      }
      
      setLastTouchDistance(newDistance);
      setLastTouchCenter(newCenter);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsTouching(false);
    setIsDragging(false);
    
    if (e.changedTouches.length === 1 && scale === 1) {
      // Handle swipe navigation when not zoomed
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Only trigger swipe if it's a significant horizontal movement
      if (distance > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          // Swipe right - previous image
          handlePrev(e as any);
        } else {
          // Swipe left - next image
          handleNext(e as any);
        }
      }
    }
    
    setLastTouchDistance(0);
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
        <button onClick={zoomOut} aria-label="Zoom out" className="touch-target">−</button>
        <button onClick={resetZoom} aria-label="Reset zoom" className="touch-target">1:1</button>
        <button onClick={zoomIn} aria-label="Zoom in" className="touch-target">+</button>
        <button onClick={handleClose} aria-label="Close fullscreen" className="touch-target">×</button>
      </div>
      
      <div className="fullscreen-nav">
        <button onClick={handlePrev} aria-label="Previous image" className="nav-button prev-button touch-target">
          <svg className="w-8 h-8 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button onClick={handleNext} aria-label="Next image" className="nav-button next-button touch-target">
          <svg className="w-8 h-8 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      
      {/* Mobile swipe hint */}
      <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm z-10">
        Swipe to navigate • Pinch to zoom
      </div>
      
      <img
        src={currentImage.src}
        alt={currentImage.alt}
        className={`fullscreen-content ${isDragging || isTouching ? 'cursor-grabbing' : scale > 1 ? 'cursor-grab' : 'cursor-zoom-in'}`}
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transition: (isDragging || isTouching) ? 'none' : 'transform 0.2s ease',
          touchAction: 'none'
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (scale === 1 && !isTouching) {
            zoomIn(e);
          }
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}
