import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const LightboxImage = ({ src, alt, className, containerClassName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    // Disable scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setIsZoomed(false); // Reset zoom when closed
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
                    className="fixed inset-0 z-[9999] bg-black/95 overflow-auto grid place-items-center animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    <img 
                        src={src} 
                        alt={alt} 
                        className={`transition-all duration-500 shadow-2xl select-none ${isZoomed ? 'cursor-zoom-out min-w-[150vw] md:min-w-[110vw] h-auto' : 'cursor-zoom-in max-w-[95vw] max-h-[95vh] object-contain'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsZoomed(!isZoomed);
                        }}
                    />

                    {/* Controls */}
                    <div className="absolute top-4 right-4 flex gap-4 z-50">
                        <button 
                            className="bg-black/50 hover:bg-white text-white hover:text-black rounded-full p-3 transition-colors backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsZoomed(!isZoomed);
                            }}
                            title={isZoomed ? "Thu nhỏ" : "Phóng to"}
                        >
                            {isZoomed ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" transform="rotate(45 10 10)" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg>
                            )}
                        </button>
                        <button 
                            className="bg-black/50 hover:bg-white text-white hover:text-black rounded-full p-3 transition-colors backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(false);
                            }}
                            title="Đóng"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className={`absolute bottom-8 left-0 w-full text-center text-white/50 text-sm tracking-widest uppercase pointer-events-none transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
                        {isZoomed ? '' : 'Chạm để phóng to'}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default LightboxImage;
