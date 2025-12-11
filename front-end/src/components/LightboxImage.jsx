import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const LightboxImage = ({ src, alt, className, containerClassName, gallery = [], initialIndex = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    
    // Lens Zoom State (Desktop)
    const [showLens, setShowLens] = useState(false);
    const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
    const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
    const [imgDim, setImgDim] = useState({ w: 0, h: 0 }); // New state for image dimensions

    // Mobile Pinch/Zoom State
    const [scale, setScale] = useState(1);
    const [startDist, setStartDist] = useState(0);

    // Use current image from gallery if available
    const currentSrc = gallery.length > 0 ? gallery[currentIndex] : src;
    const currentAlt = gallery.length > 0 ? `Image ${currentIndex + 1}` : alt;

    // Detect Mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Disable scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (gallery.length > 0) {
                const idx = gallery.findIndex(url => url === src);
                if (idx !== -1) setCurrentIndex(idx);
            }
        } else {
            document.body.style.overflow = 'unset';
            setShowLens(false);
            setScale(1); // Reset scale
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, src, gallery]);

    // Desktop: Lens Effect
    const handlePointerMove = (e) => {
        if (e.pointerType !== 'mouse') return;
        
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const { naturalWidth, naturalHeight } = e.currentTarget;
        
        const x = e.clientX - left;
        const y = e.clientY - top;

        // Calculate rendered dimensions (object-fit: contain logic)
        const imageRatio = naturalWidth / naturalHeight;
        const containerRatio = width / height;
        
        let renderedWidth, renderedHeight, offsetX, offsetY;

        if (containerRatio > imageRatio) {
            // Container is wider -> Height is full, Width is scaled
            renderedHeight = height;
            renderedWidth = height * imageRatio;
            offsetX = (width - renderedWidth) / 2;
            offsetY = 0;
        } else {
            // Container is taller -> Width is full, Height is scaled
            renderedWidth = width;
            renderedHeight = width / imageRatio;
            offsetX = 0;
            offsetY = (height - renderedHeight) / 2;
        }

        const ZOOM = 2.5;

        setLensPos({ x: e.clientX, y: e.clientY });
        setImgDim({ w: renderedWidth, h: renderedHeight });
        setBgPos({
            x: 125 - (x - offsetX) * ZOOM,
            y: 125 - (y - offsetY) * ZOOM
        });
        setShowLens(true);
    };

    // Mobile: Pinch Logic
    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            setStartDist(dist);
        }
    };

    const handleTouchMove = (e) => {
        if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            if (startDist > 0) {
                const newScale = Math.min(Math.max(1, scale * (dist / startDist)), 4);
                setScale(newScale);
            }
        }
    };
    
    // Helper to navigation
    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % gallery.length);
        setScale(1);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
        setScale(1);
    };

    return (
        <>
            {/* Thumbnail */}
            <div 
                className={`${containerClassName || ''} cursor-zoom-in group`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(true);
                }}
            >
                <img 
                    src={src} 
                    alt={alt} 
                    className={className} 
                />
            </div>

            {/* Lightbox Overlay */}
            {isOpen && createPortal(
                <div 
                    className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Main Image Container */}
                    <div 
                        className="relative w-full h-full flex items-center justify-center p-4 md:p-12 pb-24 md:pb-32 overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        <img 
                            src={currentSrc} 
                            alt={currentAlt}
                            className="transition-transform duration-200 select-none shadow-2xl max-w-full max-h-full object-contain"
                            style={{ 
                                transform: `scale(${scale})`,
                                cursor: isTouchDevice ? 'default' : (showLens ? 'none' : 'crosshair')
                            }}
                            onPointerMove={handlePointerMove}
                            onPointerLeave={() => setShowLens(false)}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Lens Zoom (Desktop Only) */}
                        {!isTouchDevice && showLens && (
                            <div 
                                className="fixed pointer-events-none border border-white/20 rounded-full shadow-2xl z-50 bg-no-repeat bg-white/5"
                                style={{
                                    left: lensPos.x - 125,
                                    top: lensPos.y - 125,
                                    width: '250px',
                                    height: '250px',
                                    backgroundImage: `url(${currentSrc})`,
                                    backgroundSize: `${imgDim.w * 2.5}px ${imgDim.h * 2.5}px`, // Zoom x2.5
                                    backgroundPosition: `${bgPos.x}px ${bgPos.y}px`
                                }}
                            ></div>
                        )}
                        
                        {/* Navigation Buttons */}
                        {gallery.length > 1 && (
                            <>
                                <button 
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 transition-colors z-50 bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm"
                                    onClick={handlePrev}
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button 
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 transition-colors z-50 bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm"
                                    onClick={handleNext}
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Gallery Thumbnails List */}
                    {gallery.length > 1 && (
                        <div className="absolute bottom-8 left-0 w-full flex justify-center gap-2 px-4 z-50 pointer-events-none">
                             <div className="flex gap-2 p-2 bg-black/40 rounded-full backdrop-blur-md pointer-events-auto overflow-x-auto max-w-[90vw] hide-scrollbar">
                                {gallery.map((img, idx) => (
                                    <div 
                                        key={idx}
                                        className={`w-12 h-12 md:w-16 md:h-16 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all ${currentIndex === idx ? 'border-white opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentIndex(idx);
                                        }}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}

                    {/* Close Button */}
                    <button 
                        className="absolute top-4 right-4 text-white/50 hover:text-white p-4 z-50 bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                        }}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>,
                document.body
            )}
        </>
    );
};

export default LightboxImage;
