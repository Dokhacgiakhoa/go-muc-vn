import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import products from '../data/products';

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
                    <h2 className="text-2xl font-serif mb-4">Tác phẩm không tồn tại</h2>
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
        <div className="bg-wood-dark min-h-screen text-cream pb-32">
            {/* Hero Image */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <img 
                    src={`${import.meta.env.BASE_URL}${product.image}`}
                    alt={product.title}
                    className="w-full h-full object-cover animate-subtle-zoom opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wood-dark via-transparent to-black/30"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="container mx-auto">
                        <Link to="/collection" className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors tracking-widest text-xs uppercase group">
                            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Bộ Sưu Tập
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 leading-tight">
                            {product.title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-16 mt-16 max-w-5xl">
                {/* Story Section */}
                <div className="mb-24 text-center md:text-left">
                    <p className="text-2xl md:text-3xl font-serif text-white/90 italic leading-relaxed mb-12 border-l-4 border-white/20 pl-6 md:pl-10 py-2">
                        "{product.story}"
                    </p>
                    <div className="prose prose-invert prose-lg max-w-none font-light text-white/80 leading-loose text-justify md:text-left">
                        <p>{product.description}</p>
                    </div>
                </div>

                {/* Video / Gallery Section */}
                <div className="mb-24">
                    <h3 className="text-xl font-serif text-white mb-8 border-b border-white/10 pb-4 inline-block pr-12">
                        Góc Nhìn Tác Phẩm
                    </h3>
                    
                    {/* Video */}
                    <div className="aspect-video w-full bg-black/40 border border-white/10 flex items-center justify-center relative group overflow-hidden mb-12">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {product.gallery && product.gallery.map((img, idx) => (
                            <div key={idx} className="aspect-[4/5] overflow-hidden relative group cursor-zoom-in">
                                <img 
                                    src={`${import.meta.env.BASE_URL}${img}`}
                                    alt={`${product.title} detail ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-500"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactions */}
                <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-12 gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-white/40 text-sm tracking-widest uppercase mb-2">Liên hệ sở hữu</p>
                        <p className="text-xl text-white">090 123 4567</p>
                    </div>
                    
                    <div className="flex gap-6">
                        <button 
                            onClick={handleShare}
                            className="px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-wood-dark transition-all duration-300 uppercase tracking-widest text-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                            Chia sẻ
                        </button>
                        <Link 
                            to="/contact" 
                            className="px-8 py-3 bg-white text-wood-dark hover:bg-white/90 transition-all duration-300 uppercase tracking-widest text-sm font-medium"
                        >
                            Tư Vấn Ngay
                        </Link>
                    </div>
                </div>
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
    );
};

export default ProductDetail;
