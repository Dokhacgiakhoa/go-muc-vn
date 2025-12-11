import { useEffect } from 'react';

const Contact = () => {
    useEffect(() => {
        document.title = "Liên Hệ | Gỗ Mục Gallery";
    }, []);

    return (
        <div className="bg-wood-dark min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 md:mb-24">
                    <p className="text-white/40 tracking-[0.3em] uppercase text-xs md:text-sm mb-4">Kết Nối</p>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Liên Hệ</h1>
                    <div className="w-16 h-[1px] bg-white/20 mx-auto"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-12 md:gap-16 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="w-full md:w-1/2 p-0 md:p-8 md:border-l border-white/10">
                        <h2 className="text-2xl md:text-3xl font-serif text-white mb-8 md:mb-12">Tại Xưởng</h2>
                        
                        <div className="space-y-8">
                            <div className="group">
                                <h3 className="text-xs md:text-sm tracking-widest text-white/50 uppercase mb-2 group-hover:text-white transition-colors">Địa Chỉ</h3>
                                <p className="text-lg md:text-xl text-white/90 font-light">123 Đường Xưởng Gỗ, Làng Nghề Mộc, Việt Nam</p>
                            </div>
                            
                            <div className="group">
                                <h3 className="text-xs md:text-sm tracking-widest text-white/50 uppercase mb-2 group-hover:text-white transition-colors">Liên Lạc</h3>
                                <p className="text-lg md:text-xl text-white/90 font-light">+84 90 123 4567</p>
                                <p className="text-lg md:text-xl text-white/90 font-light">contact@gomuc.vn</p>
                            </div>

                            <div className="group">
                                <h3 className="text-xs md:text-sm tracking-widest text-white/50 uppercase mb-2 group-hover:text-white transition-colors">Giờ Mở Cửa</h3>
                                <p className="text-lg md:text-xl text-white/90 font-light">Thứ 2 - Thứ 7: 8:00 - 17:30</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full md:w-1/2">
                         <h2 className="text-2xl md:text-3xl font-serif text-white mb-8 md:mb-12">Gửi Thư</h2>
                         <form className="space-y-8">
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    id="name" 
                                    className="w-full py-4 bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-white transition-colors placeholder-transparent peer"
                                    placeholder="Họ Tên"
                                />
                                <label htmlFor="name" className="absolute left-0 top-4 text-white/50 transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-placeholder-shown:top-4 peer-placeholder-shown:text-base pointer-events-none">Họ Tên</label>
                            </div>
                            
                            <div className="relative group">
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="w-full py-4 bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-white transition-colors placeholder-transparent peer"
                                    placeholder="Email"
                                />
                                <label htmlFor="email" className="absolute left-0 top-4 text-white/50 transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-placeholder-shown:top-4 peer-placeholder-shown:text-base pointer-events-none">Email</label>
                            </div>
                            
                            <div className="relative group">
                                <textarea 
                                    id="message" 
                                    rows="4" 
                                    className="w-full py-4 bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-white transition-colors placeholder-transparent peer resize-none"
                                    placeholder="Lời Nhắn"
                                ></textarea>
                                <label htmlFor="message" className="absolute left-0 top-4 text-white/50 transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-placeholder-shown:top-4 peer-placeholder-shown:text-base pointer-events-none">Lời Nhắn</label>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="mt-8 px-12 py-4 border border-white/30 text-white hover:bg-white hover:text-wood-dark transition-all duration-500 uppercase tracking-widest text-sm"
                            >
                                Gửi Tin Nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
