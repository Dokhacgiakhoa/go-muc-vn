import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import products from '../data/products';
import LightboxImage from '../components/LightboxImage';
import GalleryGrid from '../components/GalleryGrid';

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    useEffect(() => {
        if (product) {
            document.title = `${product.title} | Gỗ Mục Gallery`;
            // Scroll to top when entering
            window.scrollTo(0, 0);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-screen bg-wood-dark flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-serif mb-4">Cổ đồ không tồn tại</h2>
                    <Link to="/collection" className="text-white/50 hover:text-white border-b border-white/50 transition-colors">
                        Trở về Bộ Sưu Tập
                    </Link>
                </div>
            </div>
        );
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Đã sao chép liên kết vào bộ nhớ tạm!');
    };

    return (
        <div className="bg-wood-dark min-h-screen text-cream pb-32 pt-24 md:pt-32">
            <div className="container mx-auto px-6 md:px-16 max-w-7xl">
                <Link to="/collection" className="inline-flex items-center text-white/50 hover:text-white mb-8 transition-colors tracking-widest text-xs uppercase group">
                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Quay lại Bộ Sưu Tập
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-24 items-start">
                    {/* Left Column: Main Image */}
                    <div className="md:sticky md:top-24">
                        <div className="aspect-[4/5] w-full overflow-hidden rounded-sm shadow-2xl relative group">
                            <LightboxImage 
                                src={`${import.meta.env.BASE_URL}${product.image}`}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-105"
                            />
                            <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
                            {product.title}
                        </h1>

                        <div className="mb-12">
                            <p className="text-xl md:text-2xl font-serif text-white/90 italic leading-relaxed mb-8 border-l-4 border-white/20 pl-6 py-2">
                                "{product.story}"
                            </p>
                            <div className="prose prose-invert prose-lg max-w-none font-light text-white/80 leading-loose text-justify">
                                <p>{product.description}</p>
                            </div>
                        </div>

                        {/* Specs Table */}
                        <div className="border-t border-white/10 pt-8 mb-12">
                            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">
                                Thông Tin Cổ Đồ
                            </h3>
                            <ul className="space-y-4 text-white/70 font-light text-sm">
                                <li className="grid grid-cols-3 border-b border-dashed border-white/10 pb-2">
                                    <span className="uppercase tracking-wider text-white/40">Chất liệu</span>
                                    <span className="col-span-2 text-white">{product.material}</span>
                                </li>
                                <li className="grid grid-cols-3 border-b border-dashed border-white/10 pb-2">
                                    <span className="uppercase tracking-wider text-white/40">Kích thước</span>
                                    <span className="col-span-2 text-white">{product.dimensions}</span>
                                </li>
                                <li className="grid grid-cols-3 border-b border-dashed border-white/10 pb-2">
                                    <span className="uppercase tracking-wider text-white/40">Trọng lượng</span>
                                    <span className="col-span-2 text-white">{product.weight}</span>
                                </li>
                                <li className="grid grid-cols-3 border-b border-dashed border-white/10 pb-2">
                                    <span className="uppercase tracking-wider text-white/40">Xuất xứ</span>
                                    <span className="col-span-2 text-white">{product.origin}</span>
                                </li>
                            </ul>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link 
                                to="/contact" 
                                className="flex-1 text-center px-8 py-4 bg-white text-wood-dark hover:bg-white/90 transition-all duration-300 uppercase tracking-widest text-sm font-bold"
                            >
                                Liên Hệ Ngay
                            </Link>
                            <button 
                                onClick={handleShare}
                                className="px-8 py-4 border border-white/20 text-white hover:bg-white hover:text-wood-dark transition-all duration-300 uppercase tracking-widest text-sm flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                Chia sẻ
                            </button>
                        </div>
                    </div>
                </div>

                {/* Video / Gallery Section */}
                <div className="mb-24 pt-12 border-t border-white/10">
                    <h3 className="text-xl font-serif text-white mb-12 text-center">
                        Góc Nhìn Cổ Đồ
                    </h3>
                    
                    {/* Video */}
                    <div className="max-w-4xl mx-auto aspect-video bg-black/40 border border-white/10 flex items-center justify-center relative group overflow-hidden mb-16 shadow-2xl">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={product.video} 
                            title={product.title} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        ></iframe>
                    </div>

                    {/* Image Gallery */}
                    <GalleryGrid images={product.gallery} title={product.title} />
                </div>

                <div className="mt-24 text-center">
                    <Link 
                        to="/collection"
                        className="inline-block px-8 py-3 border border-white/20 text-white/60 hover:text-white hover:border-white transition-all duration-300 uppercase tracking-widest text-xs"
                    >
                        Quay lại Bộ Sưu Tập
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;
