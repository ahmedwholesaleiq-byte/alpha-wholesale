// 📱 رقم الواتساب الرسمي لمنصة ألفا (تم التحديث لرقمك الحقيقي)
const MY_WHATSAPP = "9647751079578"; 

// 📦 قاعدة بيانات المنتجات (الأسعار، الصور، وخانات الألوان المستقلة)
const products = [
    {
        id: 1,
        title: "كفر السيليكون الملكي السائل لآيفون",
        type: "cases",          // الصنف التجاري
        model: "iphone15",      // فلتر الموديل
        modelText: "iPhone 15 Pro / Max",
        price: "1,500",         // خانة تعديل السعر المباشر
        img: "case1.jpg",       // خانة الصورة (امسح الاسم وحط اسم صورتك الحقيقية)
        colors: ["black", "olive", "red", "blue"], // خانة الألوان (اكتب اسم أي لون بالإنجليزية لتظهر دائرته)
        description: "سيليكون سائل عالي الجودة مضاد للصدمات والبصمات، مع بطانة داخلية مخملية لحماية جسم الهاتف بالكامل ومقاومة الخدوش."
    },
    {
        id: 2,
        title: "شاشة حماية نانو سيراميك المرنة ضد الكسر",
        type: "screens",
        model: "iphone15",
        modelText: "iPhone 15 Pro",
        price: "2,000",
        img: "screen1.jpg",    // خانة الصورة
        colors: ["clear", "black"], // شفاف وأسود
        description: "جيل نانو سيراميك مطور مرن ومقاوم للصدمات الحادة، يوفر حماية قصوى للشاشة مع الحفاظ على دقة الألوان وسلاسة اللمس."
    },
    {
        id: 3,
        title: "لزقة حماية الظهر والزوايا الحرارية - مطفي",
        type: "protection",
        model: "iphone14",
        modelText: "iPhone 14 Pro Max",
        price: "1,000",
        img: "protection1.jpg", // خانة الصورة
        colors: ["clear"],      // لون شفاف
        description: "حماية حرارية متكاملة لظهر الهاتف وجوانبه تحميه من الأتربة والاحتكاك داخل الكفر، تعطي ملمساً مطفياً فخماً وثباتاً ممتازاً."
    },
    {
        id: 4,
        title: "ستاند ومسكة ألفا التكتيكية المغناطيسية",
        type: "accessories",
        model: "all",
        modelText: "جميع موديلات الآيفون",
        price: "3,500",
        img: "accessory1.jpg",  // خانة الصورة
        colors: ["black", "olive", "gold"], // الخيارات المتاحة
        description: "قاعدة مغناطيسية متوافقة مع MagSafe بالكامل، مصنوعة من ألومنيوم الطائرات، تستخدم كمسكة يد أو ستاند للمشاهدة."
    }
];

// ⚙️ محرك النظام الذكي لربط الواجهة بالبيانات والفلترة والبحث
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-btn');
const whatsappBtn = document.getElementById('whatsappBtn');

function displayProducts(list) {
    productsGrid.innerHTML = "";
    if(list.length === 0) {
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0; font-size: 14px;">لم يتم العثور على مواد تطابق خيارات البحث الحالية.</p>`;
        return;
    }

    list.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('case-card');
        card.innerHTML = `
            <div class="img-box"><img src="${item.img}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500';"></div>
            <div class="details-box">
                <h3>${item.title}</h3>
                <span class="tag-cat">${item.modelText}</span>
                <div class="price-row">
                    <div class="cost">${item.price} د.ع</div>
                    <button class="action-btn">تفاصيل</button>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openModal(item));
        productsGrid.appendChild(card);
    });
}

function openModal(item) {
    const modalImg = document.getElementById('modalMainImg');
    modalImg.src = item.img;
    modalImg.onerror = function() { this.src = 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500'; };
    
    document.getElementById('modalTitle').innerText = item.title;
    document.getElementById('modalModelTag').innerText = item.modelText;
    document.getElementById('modalTypeTag').innerText = document.querySelector(`[data-type="${item.type}"]`).innerText;
    document.getElementById('modalPrice').innerText = item.price;
    document.getElementById('modalDescription').innerText = item.description;

    const palette = document.getElementById('modalColors');
    palette.innerHTML = "";
    item.colors.forEach(color => {
        const ring = document.createElement('div');
        ring.classList.add('color-ring');
        // تحويل كلمة clear إلى لون شفاف هادئ برمجياً لتظهر الدائرة صحيحة
        const finalColor = color === 'clear' ? 'rgba(255,255,255,0.2)' : color;
        ring.innerHTML = `<div class="color-inner" style="background-color: ${finalColor}"></div>`;
        palette.appendChild(ring);
    });

    const message = `مرحباً كادر منصة Alpha Wholesale، أود الاستفسار وتجهيز كمية جملة من:\n📦 المادة: ${item.title}\n📱 الموديل: ${item.modelText}\n💰 السعر المعتمد: ${item.price} د.ع.`;
    whatsappBtn.href = `https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(message)}`;
    modal.style.display = "flex";
}

closeModal.addEventListener('click', () => modal.style.display = "none");
window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = "none"; });

function handleFiltering() {
    const text = searchInput.value.toLowerCase().trim();
    const activeType = document.querySelector('#typeFilters .tab-btn.active').dataset.type;
    const activeModel = document.querySelector('#modelFilters .tab-btn.active').dataset.model;

    const filtered = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(text) || p.description.toLowerCase().includes(text);
        const matchesType = activeType === 'all' || p.type === activeType;
        const matchesModel = activeModel === 'all' || p.model === activeModel || p.model === 'all';
        return matchesSearch && matchesType && matchesModel;
    });
    displayProducts(filtered);
}

searchInput.addEventListener('input', handleFiltering);

document.querySelectorAll('.filter-tabs').forEach(container => {
    container.addEventListener('click', (e) => {
        if(e.target.classList.contains('tab-btn')) {
            container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            handleFiltering();
        }
    });
});

// تشغيل المنصة فوراً
displayProducts(products);
