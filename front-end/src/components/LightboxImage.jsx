import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const LightboxImage = ({ src, alt, className, containerClassName }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Disable scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
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
                    e.preventDefault(); // Prevent link navigation if inside a link
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
                    className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center transition-opacity duration-300 animate-in fade-in"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                    }}
                >
                    <img 
                        src={src} 
                        alt={alt} 
                        className="max-w-[95vw] max-h-[95vh] object-contain shadow-2xl animate-in zoom-in-95 duration-300 select-none"
                    />
                    <button 
                        className="absolute top-4 right-4 text-white/50 hover:text-white p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="absolute bottom-8 left-0 w-full text-center text-white/50 text-sm tracking-widest uppercase pointer-events-none">
                        Chạm để đóng
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default LightboxImage;
