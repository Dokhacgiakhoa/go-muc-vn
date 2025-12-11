import streamlit as st
import cv2
import numpy as np

# --- Mock Database ---
PRODUCTS = {
    "8934602001072": {
        "name": "Hộp Gỗ Trắc Chạm Khắc", 
        "price": "1,500 USD", 
        "desc": "Tuyệt tác chạm khắc thủ công từ thế kỷ 18, gỗ trắc đỏ quý hiếm.",
        "img": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600"
    },
    "8934588013113": {
        "name": "Bình Gốm Chu Đậu", 
        "price": "5,000 USD", 
        "desc": "Gốm men lam tinh xảo, niên đại triều Trần - Lê, biểu tượng văn hóa.",
        "img": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600"
    },
    "8936017368153": {
        "name": "Ấn Triện Ngọc Tỷ", 
        "price": "12,000 USD", 
        "desc": "Ngọc bích nguyên khối, chạm khắc rồng phượng, vật phẩm cung đình.",
        "img": "https://images.unsplash.com/photo-1605391696004-98c47b74408d?auto=format&fit=crop&q=80&w=600"
    },
    "123456789": {
        "name": "Đồng Hồ Quả Quýt Cổ", 
        "price": "850 USD", 
        "desc": "Cơ chế Thụy Sĩ nguyên bản, vỏ vàng 18k, hoạt động hoàn hảo.",
        "img": "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=600"
    },
    "sculpture_1": {
        "name": "Tượng Phật Gỗ Hương",
        "price": "2,200 USD",
        "desc": "Tượng gỗ hương điêu khắc tinh xảo, thần thái uy nghiêm.",
        "img": "https://images.unsplash.com/photo-1614726367015-816e16f39383?auto=format&fit=crop&q=80&w=600"
    },
    "vase_2": {
        "name": "Lục Bình Minh Mạng",
        "price": "3,800 USD",
        "desc": "Cặp lục bình men rạn, họa tiết tùng cúc trúc mai.",
        "img": "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&q=80&w=600"
    },
    "coin_1": {
        "name": "Tiền Xu Cổ Đông Dương",
        "price": "450 USD",
        "desc": "Bộ sưu tập tiền xu bạc thời Pháp thuộc, bảo quản tốt.",
        "img": "https://images.unsplash.com/photo-1620288627223-537a90588c2e?auto=format&fit=crop&q=80&w=600"
    },
    "painting_1": {
        "name": "Tranh Sơn Mài Cổ",
        "price": "6,500 USD",
        "desc": "Tranh sơn mài nghệ thuật, chủ đề làng quê Việt Nam.",
        "img": "https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?auto=format&fit=crop&q=80&w=600"
    }

}

st.set_page_config(page_title="Cổ Vật Tinh Hoa", page_icon="🏺", layout="wide")

# --- Custom CSS (Dark Luxury Style) ---
def inject_custom_css():
    st.markdown(
        """
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Roboto:wght@300;400&display=swap');

            /* --- Theme Colors & Background --- */
            .stApp {
                background-color: #0f0f0f;
                color: #e0e0e0;
                font-family: 'Roboto', sans-serif;
            }

            h1, h2, h3, h4, .stHtml {
                font-family: 'Playfair Display', serif;
            }
            
            /* --- Navbar Styling --- */
            /* We use Streamlit columns but style the buttons to look like links */
            div[data-testid="stHorizontalBlock"] {
                background-color: rgba(15, 15, 15, 0.95);
                border-bottom: 1px solid #333;
                padding: 10px 0;
            }
            
            /* Style nav buttons */
            .nav-btn > button {
                background-color: transparent !important;
                color: #aaa !important;
                border: none !important;
                font-family: 'Roboto', sans-serif !important;
                font-weight: 300 !important;
                text-transform: uppercase !important;
                letter-spacing: 2px !important;
                font-size: 0.9rem !important;
                margin-top: 5px;
            }
            .nav-btn > button:hover {
                color: #d4af37 !important; /* Gold hover */
            }
            .nav-btn > button:focus {
                color: #d4af37 !important;
                box-shadow: none !important;
            }
            .nav-active > button {
                color: #d4af37 !important;
                font-weight: bold !important;
                border-bottom: 2px solid #d4af37 !important;
            }

            /* --- Hero Section --- */
            .hero-section {
                position: relative;
                text-align: center;
                color: white;
                padding: 6rem 1rem;
                background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8));
                border-bottom: 1px solid #333;
                margin-bottom: 3rem;
            }
            .hero-title {
                font-size: 4rem;
                font-weight: 700;
                margin-bottom: 1rem;
                color: #f5f5f5;
                 text-shadow: 0 2px 10px rgba(0,0,0,0.5);
            }
            .hero-subtitle {
                font-family: 'Roboto', sans-serif;
                font-size: 1.2rem;
                color: #bbbbbb;
                margin-bottom: 3rem;
                letter-spacing: 1px;
                text-transform: uppercase;
            }

            /* --- Scanner Page Styles --- */
            .scanner-wrapper {
                max-width: 800px;
                margin: 4rem auto;
                text-align: center;
                background: rgba(26, 26, 26, 0.5);
                padding: 3rem;
                border: 1px solid #333;
                border-radius: 8px;
            }
            .scanner-instruction {
                color: #d4af37;
                font-size: 1.2rem;
                margin-bottom: 2rem;
                font-family: 'Playfair Display', serif;
            }
            
            [data-testid="stCameraInput"] {
                border: 2px solid #d4af37;
                border-radius: 4px;
                box-shadow: 0 0 30px rgba(212, 175, 55, 0.1);
            }

            /* --- Product Card (Dark Luxury) --- */
            .luxury-card {
                background-color: #1a1a1a;
                border: 1px solid #333;
                transition: transform 0.3s, border-color 0.3s;
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            .luxury-card:hover {
                transform: translateY(-5px);
                border-color: #d4af37;
            }
            .card-img-container {
                position: relative;
                padding-top: 100%; /* 1:1 Aspect Ratio */
                overflow: hidden;
            }
            .card-img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s;
            }
            .luxury-card:hover .card-img {
                transform: scale(1.05);
            }
            .card-details {
                padding: 1.5rem;
                flex-grow: 1;
            }
            .card-name {
                font-family: 'Playfair Display', serif;
                font-size: 1.2rem;
                color: #fff;
                margin-bottom: 0.5rem;
            }
            .card-price {
                color: #d4af37;
                font-size: 1rem;
                font-weight: bold;
                letter-spacing: 1px;
            }
            
            /* --- Footer --- */
            .footer-container {
                margin-top: 5rem;
                padding: 4rem 2rem;
                background-color: #0a0a0a;
                border-top: 1px solid #333;
                color: #666;
                font-size: 0.9rem;
            }
            
            /* Hide boilerplate */
            #MainMenu, footer, header {visibility: hidden;}
            .block-container {
                padding-top: 0rem;
                padding-left: 0rem;
                padding-right: 0rem;
                max-width: 100%;
            }
        </style>
        """,
        unsafe_allow_html=True
    )

def main():
    inject_custom_css()

    # --- Session State ---
    if 'page' not in st.session_state:
        st.session_state.page = 'home'

    # --- Navigation Bar (Functional) ---
    # Using Columns to simulate the Navbar layout
    # Logo on Left, Links on Right
    
    # We use a container to apply the CSS background class if styling 'stHorizontalBlock' works,
    # otherwise relying on the custom css injection above.
    
    col_logo, col_home, col_scan, col_prod, col_intro = st.columns([3, 1, 1, 1, 1])

    with col_logo:
        st.markdown('<div style="font-family: \'Playfair Display\'; font-size: 1.8rem; font-weight: 700; color: #d4af37; padding-left: 1rem;">🏺 Cổ Vật Tinh Hoa</div>', unsafe_allow_html=True)

    # Helper to create buttons with active state class
    def nav_button(label, page_key, col):
        with col:
            # Trick: Streamlit buttons don't support classes natively easily without component hack,
            # so we use standard buttons and targeted CSS based on column order or just general style.
            # We highlight the active one by logical styling if needed, but for now just hover effects.
            if st.button(label, key=f"nav_{page_key}"):
                 st.session_state.page = page_key
                 st.rerun()

    # Apply 'nav-btn' style to these columns implicitly via CSS selectors on 'div.stButton' inside the columns?
    # Actually, global CSS handles it generally. 
    
    nav_button("TRANG CHỦ", 'home', col_home)
    nav_button("TRA CỨU", 'scanner', col_scan)
    nav_button("BỘ SƯU TẬP", 'products', col_prod)
    nav_button("GIỚI THIỆU", 'intro', col_intro)


    # --- Router ---
    if st.session_state.page == 'home':
        render_home_page()
    elif st.session_state.page == 'scanner':
        render_scanner_page()
    elif st.session_state.page == 'products':
        render_products_page()
    else:
        render_home_page() # Default

def render_home_page():
    # --- Hero Section (No Scanner) ---
    st.markdown(
        """
        <div class="hero-section">
            <div class="hero-title">Vẻ Đẹp Vượt Thời Gian</div>
            <div class="hero-subtitle">Nơi lưu giữ hồn cốt của lịch sử và nghệ thuật</div>
            <br>
        </div>
        """,
        unsafe_allow_html=True
    )

    # --- Latest Artifacts Section ---
    st.markdown("<div style='padding: 2rem 5%;'>", unsafe_allow_html=True)
    st.markdown(
        """
        <div class="section-header">
            <div class="section-title">Hiện vật mới nhất</div>
        </div>
        """, 
        unsafe_allow_html=True
    )

    cols = st.columns(4)
    items = list(PRODUCTS.items())[:4] # Show top 4
    
    for i, col in enumerate(cols):
        if i < len(items):
            code, info = items[i]
            with col:
                st.markdown(
                    f"""
                    <div class="luxury-card">
                        <div class="card-img-container">
                            <img src="{info['img']}" class="card-img">
                        </div>
                        <div class="card-details">
                            <div class="card-name">{info['name']}</div>
                            <div class="card-price">{info['price']}</div>
                        </div>
                    </div>
                    """,
                    unsafe_allow_html=True
                )
    st.markdown("</div>", unsafe_allow_html=True)

    render_footer()

def render_scanner_page():
    st.markdown("<div style='padding-top: 2rem;'></div>", unsafe_allow_html=True)
    st.markdown(
        """
        <h2 style='text-align: center; color: #d4af37;'>PHÒNG THẨM ĐỊNH</h2>
        <p style='text-align: center; color: #888;'>Sử dụng công nghệ quang học để định danh hiện vật</p>
        """, 
        unsafe_allow_html=True
    )

    # Use columns to center the scanner
    c1, c2, c3 = st.columns([1, 2, 1])
    with c2:
        img_file = st.camera_input("Scanner", label_visibility="hidden")

        if img_file is not None:
            bytes_data = img_file.getvalue()
            cv2_img = cv2.imdecode(np.frombuffer(bytes_data, np.uint8), cv2.IMREAD_COLOR)

            bd = cv2.barcode.BarcodeDetector()
            retval, decoded_info, decoded_type, points = bd.decode(cv2_img)
            
            found = False
            if retval:
                for barcode_data in decoded_info:
                    if barcode_data:
                        found = True
                        product = PRODUCTS.get(barcode_data)
                        
                        if product:
                             print_report(product, barcode_data)
                        else:
                            st.error(f"❌ Mã hiện vật không tồn tại: {barcode_data}")
            
            if not found:
                st.warning("⚠️ Không thể đọc mã. Hãy giữ yên hiện vật và đảm bảo đủ sáng.")

def render_products_page():
    st.markdown("<div style='padding: 2rem 5%;'>", unsafe_allow_html=True)
    st.markdown("<h2 style='color: #d4af37; border-bottom: 2px solid #333; padding-bottom: 1rem; margin-bottom: 2rem;'>BỘ SƯU TẬP</h2>", unsafe_allow_html=True)
    
    # Grid of all items
    items = list(PRODUCTS.items())
    rows = [items[i:i + 4] for i in range(0, len(items), 4)]
    
    for row in rows:
        cols = st.columns(4)
        for i, (code, info) in enumerate(row):
            with cols[i]:
                 st.markdown(
                    f"""
                    <div class="luxury-card" style="margin-bottom: 30px;">
                        <div class="card-img-container">
                            <img src="{info['img']}" class="card-img">
                        </div>
                        <div class="card-details">
                            <div class="card-name">{info['name']}</div>
                            <div class="card-price">{info['price']}</div>
                            <div style="color: #666; font-size: 0.8rem; margin-top: 10px;">{info['desc']}</div>
                        </div>
                    </div>
                    """,
                    unsafe_allow_html=True
                )
    st.markdown("</div>", unsafe_allow_html=True)
    render_footer()

def print_report(product, code):
    st.markdown(
        f"""
        <div style="background: rgba(212, 175, 55, 0.05); border: 1px solid #d4af37; padding: 2rem; margin-top: 2rem; border-radius: 4px;">
            <div style="display: flex; gap: 2rem; align-items: flex-start;">
                <img src="{product['img']}" style="width: 200px; height: 200px; object-fit: cover; border: 1px solid #555;">
                <div>
                    <div style="color: #666; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px;">KẾT QUẢ THẨM ĐỊNH</div>
                    <h2 style="color: #d4af37; margin: 0.5rem 0;">{product['name']}</h2>
                    <div style="font-family: 'Playfair Display'; font-size: 1.8rem; color: #fff; margin: 10px 0;">{product['price']}</div>
                    <p style="color: #ccc; line-height: 1.6;">{product['desc']}</p>
                    <div style="margin-top: 20px; font-family: 'Courier Prime'; color: #d4af37;">Mã định danh: {code}</div>
                </div>
            </div>
        </div>
        """,
        unsafe_allow_html=True
    )

def render_footer():
    st.markdown(
        """
        <div class="footer-container">
            <div style="text-align: center; font-size: 0.8rem;">
                © 2024 Cổ Vật Tinh Hoa. Bảo lưu mọi quyền.
            </div>
        </div>
        """,
        unsafe_allow_html=True
    )

if __name__ == "__main__":
    main()
