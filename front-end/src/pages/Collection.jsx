import products from '../data/products';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Collection = () => {
    useEffect(() => {
        document.title = "Bộ Sưu Tập | Gỗ Mục Gallery";
    }, []);

    return (
        <div className="bg-wood-dark min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 md:mb-24">
                    <p className="text-white/40 tracking-[0.3em] uppercase text-xs md:text-sm mb-4">Space 01</p>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Không Gian Trưng Bày</h1>
                    <div className="w-16 h-[1px] bg-white/20 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-y-32">
                    {products.map((item, index) => (
                        <Link to={`/product/${item.id}`} key={item.id} className={`group relative block ${index % 2 === 0 ? 'md:translate-y-12' : ''}`}>
                            {/* Frame & Spotlight */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-black shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]">
                                <img 
                                    src={`${import.meta.env.BASE_URL}${item.image}`}
                                    alt={item.title} 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                            </div>

                            {/* Exhibition Tag */}
                            <div className="mt-6 border-l border-white/20 pl-4 transition-all duration-500 group-hover:border-white/60">
                                <span className="block text-white/30 text-xs tracking-widest mb-1">NO. {String(index + 1).padStart(3, '0')}</span>
                                <h3 className="text-xl font-serif text-white/90 mb-2 group-hover:text-white transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-white/50 text-sm font-light italic truncate pr-4">
                                    {item.story}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div className="mt-32 text-center">
                    <p className="text-white/30 italic text-sm">"Hết không gian trưng bày"</p>
                </div>
            </div>
        </div>
    );
};

export default Collection;
