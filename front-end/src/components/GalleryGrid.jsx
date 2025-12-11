import LightboxImage from './LightboxImage';

const GalleryGrid = ({ images, title }) => {
    if (!images || images.length === 0) return null;

    // Use the full gallery for all items so any click can navigate through all
    const fullGallery = images.map(img => `${import.meta.env.BASE_URL}${img}`);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
                <div key={idx} className="aspect-[4/5] overflow-hidden relative group">
                    <LightboxImage 
                        src={`${import.meta.env.BASE_URL}${img}`}
                        gallery={fullGallery}
                        initialIndex={idx}
                        alt={`${title} detail ${idx + 1}`}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 opacity-100 md:opacity-70 md:group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-500 pointer-events-none"></div>
                </div>
            ))}
        </div>
    );
};

export default GalleryGrid;
