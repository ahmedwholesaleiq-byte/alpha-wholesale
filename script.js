// رقم الواتساب الخاص بالمنصة (اكتب رقمك بدون أصفار أو زائد في البداية)
const MY_WHATSAPP = "9647700000000"; 

// لوحة تحكم المنتجات (تعديل السعر، الصور، الوصف، والفئة)
const products = [
    {
        id: 1,
        title: "كفر السيليكون الملكي السائل",
        type: "cases", // نوع المنتج (cases, screens, protection, accessories)
        model: "iphone15", // موديل الهاتف (iphone15, iphone14, iphone13, etc.)
        modelText: "سلسلة iPhone 15", // النص المكتوب على الكرت
        price: "1,500", // السعر د.ع (اكتبه كما تحب أن يظهر)
        img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500", // رابط الصورة
        colors: ["#000000", "#1e3a8a", "#b91c1c"], // دوائر الألوان المتاحة
        description: "سيليكون ناعم مضاد للبصمات مع بطانة داخلية لحماية الهاتف. يدعم الماج سيف بالكامل."
    },
    {
        id: 2,
        title: "شاشة حماية نانو سيراميك المقاومة للكسر",
        type: "screens",
        model: "iphone15",
        modelText: "iPhone 15 Pro / Max",
        price: "2,000",
        img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
        colors: ["#ffffff"],
        description: "شاشة جيل نانو سيراميك مرنة توفر حماية قصوى ضد الصدمات الحادة والخدوش اليومية بدون تقليل حساسية اللمس."
    },
    {
        id: 3,
        title: "لزقة حماية الظهر الحرارية - شفاف مطفي",
        type: "protection",
        model: "iphone14",
        modelText: "سلسلة iPhone 14 بالكامل",
        price: "1,000",
        img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
        colors: ["#rgba(255,255,255,0.2)"],
        description: "لزقة حرارية لحماية ظهر الهاتف من الخدوش الناتجة عن الأتربة داخل الكفر، تعطي ملمس مطفي فخم."
    },
    {
        id: 4,
        title: "ستاند ومسكة ألفا الذكية خلف الهاتف",
        type: "accessories",
        model: "all", // يدعم كل الأنواع
        modelText: "يدعم جميع الهواتف",
        price: "3,500",
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        colors: ["#000000", "#00ffcc"],
        description: "مسكة مغناطيسية قوية متوافقة مع الماج سيف لتثبيت الهاتف في السيارة أو أثناء المشاهدة."
    },

    // 🌟 خانة مستقبلية 1: (فقط املأ البيانات وسيعرض في الموقع فوراً!)
    {
        id: 5,
        title: "اسم المنتج الجديد (اكتبه هنا مستقبلاً)",
        type: "accessories", // حدد الفئة (cases أو screens أو protection أو accessories)
        model: "future", // الموديل
        modelText: "الموديل المستهدف هنا",
        price: "000", // السعر
        img: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500", // رابط الصورة
        colors: ["#ffffff"], 
        description: "اكتب وصف المنتج وميزاته للتجار هنا."
    },

    // 🌟 خانة مستقبلية 2 جاهزة للزيادة:
    {
        id: 6,
        title: "منتج إضافي قادم",
        type: "cases",
        model: "iphone12",
        modelText: "سلسلة iPhone 12",
        price: "1,250",
        img: "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?w=500",
        colors: ["#000000"],
        description: "وصف تفصيلي جاهز للتعديل في أي وقت."
    }
];

// ربط وظائف النظام بالواجهة
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-btn');
const whatsappBtn = document.getElementById('whatsappBtn');

function displayProducts(list) {
    productsGrid.innerHTML = "";
    if(list.length === 0) {
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">لم نجد منتجات تطابق بحثك حالياً.</p>`;
        return;
    }

    list.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('case-card');
        card.innerHTML = `
            <div class="img-box"><img src="${item.img}" alt="${item.title}"></div>
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
    document.getElementById('modalMainImg').src = item.img;
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
        ring.innerHTML = `<div class="color-inner" style="background-color: ${color}"></div>`;
        palette.appendChild(ring);
    });

    const message = `مرحباً فريق Alpha Wholesale، أود الاستفسار عن طلب كمية من:\n📦 المنتج: ${item.title}\n📱 الموديل: ${item.modelText}\n💰 السعر: ${item.price} د.ع للقطعة.`;
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

// تشغيل عند التحميل المباشر
displayProducts(products);
