const images = [
    { src: "/7_0_ Solid Ebony Wood Carved Chinese Phoenix Statue Sculpture Feng Shui Decor.jpg", title: "Phượng Hoàng Lửa" },
    { src: "/Buy Handcrafted Wooden Deer Sculpture – Rustic Animal Figurine, Minimalist Home Décor, Woodland Gift Online in India - Etsy.jpg", title: "Hươu Rừng Tự Nhiên" },
    { src: "/Chiêu Tài Tiến Bảo.jpg", title: "Chiêu Tài Tiến Bảo" },
    { src: "/Ebony Carved Pine and Crane Longevity Ornament Red Carving Craft Solid Wood Home Decor Living Room.jpg", title: "Tùng Hạc Diên Niên" },
    { src: "/Small Tea Set Gift Kung Ornament Exquisite Carving Fu gold Brass Mythical Beast Four Great Practical.jpg", title: "Bộ Trà Kung Fu" },
    { src: "/Traditional Green Tea Ceremony.jpg", title: "Trà Đạo Truyền Thống" },
    { src: "/Wooden tea packaging gift box design with a Chinese style pattern.jpg", title: "Hộp Trà Cổ Điển" },
    { src: "/tải xuống (1).jpg", title: "Nghệ Thuật Trầm Hương" },
    { src: "/tải xuống (2).jpg", title: "Tượng Gỗ Thiền" },
    { src: "/tải xuống (3).jpg", title: "Khay Trà Lũa" },
    { src: "/tải xuống (4).jpg", title: "Vòng Tay Gỗ Sưa" },
    { src: "/tải xuống (5).jpg", title: "Thác Khói Trầm Hương" },
    { src: "/tải xuống (6).jpg", title: "Tiểu Cảnh Non Bộ" },
    { src: "/tải xuống.jpg", title: "Đĩa Gỗ Tứ Linh" },
    { src: "/z7309801553298_21e97b68f9fc256c4425a4b54df6d536.jpg", title: "Bàn Trà Nguyên Khối" },
    { src: "/z7309801559189_d635af1d9bcfeaba08e4ac69f5051000.jpg", title: "Ghế Lười Thư Giãn" },
    { src: "/z7309801572355_f0267f553d78a4d304fd84e7df8a98a0.jpg", title: "Kệ Gỗ Treo Tường" },
    { src: "/z7309801584956_5b7a180663c6c996b395f4d24456fd32.jpg", title: "Bộ Sofa Gỗ Sồi" },
    { src: "/z7309801590555_abd5a5d680eb8850ad869024322c970c.jpg", title: "Bàn Ăn 6 Ghế" },
    { src: "/z7309801598219_ac7132840ca3117bc082a9fa263dcb20.jpg", title: "Đèn Gỗ Thả Trần" },
    { src: "/z7309801610516_6378f779e23e9ea2d2168dc3fc4af499.jpg", title: "Bình Hoa Gỗ Lũa" },
    { src: "/☸️ BÁI PHẬT.jpg", title: "Tượng Phật Di Lặc" }
];

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
                    {images.map((item, index) => (
                        <div key={index} className={`group relative ${index % 2 === 0 ? 'md:translate-y-12' : ''}`}>
                            {/* Frame & Spotlight */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-black shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]">
                                <img 
                                    src={`${import.meta.env.BASE_URL}${item.src}`}
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
                                <p className="text-white/50 text-sm font-light italic">
                                    Gỗ quý, độc bản
                                </p>
                            </div>
                        </div>
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
