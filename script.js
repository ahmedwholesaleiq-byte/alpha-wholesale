// رقم تليفون فريقك الأساسي لاستقبال رسائل التجار عبر الواتساب (اكتب الرقم هنا بدون أصفار أو علامة زائد - مثلاً 9647xxxxxxxx)
const MY_WHATSAPP = "9647700000000"; 

// قاعدة بيانات المنتجات الفخمة المتوفرة من علي إكسبريس
const products = [
    {
        id: 1,
        title: "كفر السيليكون الملكي السائل لآيفون",
        category: "iphone15",
        categoryText: "سلسلة iPhone 15",
        price: "1,000",
        img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
        colors: ["#000000", "#1e3a8a", "#b91c1c", "#10b981"],
        description: "كفر سيليكون ناعم مضاد للبصمات ومقاوم للخدش مع تدعيم داخلي مبطن بالميكروفيبر لحماية ظهر الهاتف بالكامل. يدعم الماج سيف بكفاءة."
    },
    {
        id: 2,
        title: "كفر رادار المدرع المقاوم للصدمات الشديدة",
        category: "iphone15",
        categoryText: "سلسلة iPhone 15",
        price: "1,200",
        img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
        colors: ["#1e293b", "#000000"],
        description: "كفر ذو متانة عسكرية وحواف بارزة جداً لحماية الشاشة والكاميرا من السقوط القوي. ممتاز جداً لأصحاب المهن والأنشطة الشاقة."
    },
    {
        id: 3,
        title: "كفر الكريستال الشفاف النقي المضاد للاصفرار",
        category: "iphone14",
        categoryText: "سلسلة iPhone 14",
        price: "1,000",
        img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
        colors: ["#ffffff", "#64748b"],
        description: "مصنوع من مواد بولي كربونات ألمانية عالية النقاء تقاوم الأشعة فوق البنفسجية وتمنع الاصفرار لمدة طويلة، ليظهر لون الآيفون الحقيقي بكامل جماله."
    },
    {
        id: 4,
        title: "كفر فيبر كاربون الرياضي الترا سليم",
        category: "iphone13",
        categoryText: "سلسلة iPhone 13",
        price: "1,000",
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        colors: ["#000000", "#3b82f6"],
        description: "كفر خفيف الوزن جداً ونحيف مصمم من خامة الفايبر كاربون الفاخرة، يعطي الهاتف مظهراً رياضياً فخماً دون إضافة أي حجم زائد."
    }
];

const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.tab-btn');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-btn');
const whatsappBtn = document.getElementById('whatsappBtn');

// دالة العرض المتطور للكروت
function displayProducts(list) {
    productsGrid.innerHTML = "";
    if(list.length === 0) {
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 16px; padding: 40px 0;">لا توجد كفرات متوفرة بهذا الاسم حالياً.</p>`;
        return;
    }

    list.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('case-card');
        card.innerHTML = `
            <div class="img-box">
                <img src="${item.img}" alt="${item.title}">
            </div>
            <div class="details-box">
                <h3>${item.title}</h3>
                <span class="tag-cat">${item.categoryText}</span>
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

// دالة فتح التفاصيل والربط مع واتساب
function openModal(item) {
    document.getElementById('modalMainImg').src = item.img;
    document.getElementById('modalTitle').innerText = item.title;
    document.getElementById('modalCategory').innerText = item.categoryText;
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

    // تجهيز رسالة احترافية للواتساب عند الضغط على زر الطلب
    const message = `مرحباً فريق Alpha Wholesale، أريد الاستفسار/طلب كمية من:\n- المنتج: ${item.title}\n- الموديل: ${item.categoryText}\n- السعر المذكور: ${item.price} دينار للقطعة.`;
    whatsappBtn.href = `https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(message)}`;

    modal.style.display = "flex";
}

// إغلاق المودال
closeModal.addEventListener('click', () => modal.style.display = "none");
window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = "none"; });

// التصفية والبحث الفوري
function handleFilterAndSearch() {
    const text = searchInput.value.toLowerCase().trim();
    const currentTab = document.querySelector('.tab-btn.active').dataset.filter;

    const filtered = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(text) || p.description.toLowerCase().includes(text);
        const matchesTab = currentTab === 'all' || p.category === currentTab;
        return matchesSearch && matchesTab;
    });

    displayProducts(filtered);
}

searchInput.addEventListener('input', handleFilterAndSearch);

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        handleFilterAndSearch();
    });
});

// البداية
displayProducts(products);
          
