import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const LightboxImage = ({ src, alt, className, containerClassName, gallery = [], initialIndex = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    
    // Lens Zoom State
    const [showLens, setShowLens] = useState(false);
    const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
    const [bgPos, setBgPos] = useState({ x: 0, y: 0 });

    // Use current image from gallery if available
    const currentSrc = gallery.length > 0 ? gallery[currentIndex] : src;
    const currentAlt = gallery.length > 0 ? `Image ${currentIndex + 1}` : alt;

    // Detect Mobile (simplistic check for Touch support)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Disable scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (gallery.length > 0) {
                // Determine index if src is in gallery
                const idx = gallery.findIndex(url => url === src);
                if (idx !== -1) setCurrentIndex(idx);
            }
        } else {
            document.body.style.overflow = 'unset';
            setIsZoomed(false);
            setShowLens(false);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, src, gallery]);

    const handleMouseMove = (e) => {
        if (isTouchDevice || isZoomed) return; // Don't show lens if already full-zoomed or on touch
        
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        setLensPos({ x, y });
        setBgPos({
            x: (x / width) * 100,
            y: (y / height) * 100
        });
        setShowLens(true);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % gallery.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
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
                        className="relative w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setShowLens(false)}
                    >
                        <img 
                            src={currentSrc} 
                            alt={currentAlt}
                            className={`
                                transition-transform duration-300 select-none shadow-2xl max-w-full max-h-full object-contain
                                ${isZoomed ? 'scale-[2.5] cursor-grab active:cursor-grabbing' : 'scale-100 cursor-zoom-in'}
                            `}
                            style={isZoomed ? { transformOrigin: `${bgPos.x}% ${bgPos.y}%` } : {}}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsZoomed(!isZoomed);
                            }}
                        />

                        {/* Lens Zoom (Desktop Only) */}
                        {!isTouchDevice && !isZoomed && showLens && (
                            <div 
                                className="absolute pointer-events-none border border-white/20 rounded-full shadow-2xl z-50 bg-no-repeat bg-white/5"
                                style={{
                                    left: lensPos.x - 100, // Center lens (200px size)
                                    top: lensPos.y - 100,
                                    width: '200px',
                                    height: '200px',
                                    backgroundImage: `url(${currentSrc})`,
                                    backgroundSize: '250%', // Zoom level for lens
                                    backgroundPosition: `${bgPos.x}% ${bgPos.y}%`
                                }}
                            ></div>
                        )}
                        
                        {/* Navigation Buttons (only for gallery) */}
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

                    {/* Gallery Thumbnails List (Desktop) / Dots (Mobile) */}
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

export default LightboxImage;
