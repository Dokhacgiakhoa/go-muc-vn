import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = "Gỗ Mục - Trang Chủ | Nghệ Thuật Gỗ Độc Bản";
    }, []);

    return (
        <div className="bg-wood-dark min-h-screen">
            {/* Hero / Entrance */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/z7309801553298_21e97b68f9fc256c4425a4b54df6d536.jpg" 
                        alt="Gỗ Mục Gallery" 
                        className="w-full h-full object-cover opacity-60 scale-105 animate-subtle-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-wood-dark"></div>
                    {/* Spotlight effect */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80"></div>
                </div>
                
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <p className="text-xs md:text-base font-light tracking-[0.3em] uppercase mb-4 text-white/60">
                        Triển lãm nghệ thuật gỗ
                    </p>
                    <h1 className="text-5xl md:text-8xl font-serif mb-6 md:mb-8 tracking-wider text-white mix-blend-screen opacity-90">
                        GỖ MỤC
                    </h1>
                    <div className="w-24 h-[1px] bg-white/30 mx-auto mb-8"></div>
                    <p className="text-lg md:text-xl font-light tracking-wide text-white/80 max-w-xl mx-auto leading-relaxed mb-12 italic">
                        "Nơi những đường vân kể chuyện, và thời gian ngưng đọng trong từng thớ gỗ."
                    </p>
                    
                    <Link 
                        to="/collection" 
                        className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 transition-all duration-500"
                    >
                        <span className="text-sm tracking-[0.2em] uppercase text-white group-hover:text-white transition-colors">
                            Vào Tham Quan
                        </span>
                        <span className="w-8 h-[1px] bg-white/50 group-hover:w-12 transition-all duration-500"></span>
                    </Link>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 animate-bounce flex flex-col items-center gap-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase">Cuộn để khám phá</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent"></div>
                </div>
            </section>

            {/* Statement Section */}
            <section className="py-20 md:py-32 px-6 container mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 max-w-6xl mx-auto">
                    <div className="w-full md:w-1/2">
                        <div className="aspect-[4/5] overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000">
                            <img 
                                src="/z7309801590555_abd5a5d680eb8850ad869024322c970c.jpg" 
                                alt="Artisan Work" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 ring-1 ring-white/10 m-4"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 md:mb-8 leading-tight">
                            Độc Bản.<br/>
                            <span className="text-white/50 italic">Duy Nhất.</span>
                        </h2>
                        <p className="text-white/70 font-light leading-loose mb-8 text-justify text-sm md:text-base">
                            Tại Gỗ Mục, chúng tôi không sản xuất hàng loạt. Chúng tôi giám tuyển những tác phẩm nghệ thuật từ gỗ, nơi mỗi vết nứt, mỗi đường vân là một di sản của tự nhiên. 
                            Bạn không chỉ sở hữu một món đồ nội thất, bạn đang lưu giữ một phần của rừng già.
                        </p>
                        <Link to="/collection" className="text-white/50 hover:text-white border-b border-white/20 hover:border-white transition-all pb-1 tracking-widest text-xs md:text-sm uppercase">
                            Xem Bộ Sưu Tập
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
