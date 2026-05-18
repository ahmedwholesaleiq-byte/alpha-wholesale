// 📱 رقم الواتساب الرسمي لمنصة ألفا
const MY_WHATSAPP = "9647751079578"; 

// 🎨 مصفوفة الألوان الكاملة (الغامقة، الباهتة، والحديثة) لأسواق الكفرات
const AVAILABLE_COLORS = [
    { name: "أسود ملكي", code: "#0b0c10" },
    { name: "زيتوني تكتيكي", code: "#556b2f" },
    { name: "كحلي غامق", code: "#1a2536" },
    { name: "رمادي تيتانيوم", code: "#70777a" },
    { name: "صحراوي باهت", code: "#c2b280" },
    { name: "ماروني غامق", code: "#4a0e17" },
    { name: "بنفسجي داكن", code: "#2e1a47" },
    { name: "أزرق سيراميك", code: "#4682b4" },
    { name: "أخضر بوند", code: "#004b49" },
    { name: "وردي باهت", code: "#e6b8b8" },
    { name: "أبيض ناصع", code: "#ffffff" },
    { name: "شفاف نقي", code: "clear" }
];

// 📦 تحميل المنتجات من ذاكرة الموقع أو وضع منتجات افتراضية إذا كانت فارغة
let defaultProducts = [
    {
        id: 1,
        title: "كفر السيليكون الملكي السائل لآيفون",
        type: "cases",
        model: "iphone16promax",
        modelText: "iPhone 16 Pro Max",
        price: "1,500",
        img: "case1.jpg",
        colors: ["#0b0c10", "#556b2f", "#4a0e17"],
        description: "سيليكون سائل عالي الجودة مضاد للصدمات والبصمات مع بطانة داخلية مخملية لحماية جسم الهاتف."
    },
    {
        id: 2,
        title: "شاشة حماية نانو سيراميك المرنة ضد الكسر",
        type: "screens",
        model: "iphone15promax",
        modelText: "iPhone 15 Pro Max",
        price: "2,000",
        img: "screen1.jpg",
        colors: ["clear", "#0b0c10"],
        description: "جيل نانو سيراميك مطور مرن ومقاوم للصدمات الحادة يوفر حماية قصوى للشاشة."
    }
];

let products = JSON.parse(localStorage.getItem('alpha_products')) || defaultProducts;

// ⚙️ ربط عناصر الواجهة
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-btn');
const whatsappBtn = document.getElementById('whatsappBtn');
const adminToggleBtn = document.getElementById('adminToggleBtn');
const adminPanel = document.getElementById('adminPanel');
const colorsSelectorGrid = document.getElementById('colorsSelectorGrid');
const saveProductBtn = document.getElementById('saveProductBtn');

// 🛠️ بناء خيارات الألوان داخل لوحة التحكم تلقائياً
function buildColorsSelector() {
    if (!colorsSelectorGrid) return;
    colorsSelectorGrid.innerHTML = "";
    AVAILABLE_COLORS.forEach((color, index) => {
        const item = document.createElement('label');
        item.classList.add('color-check-item');
        const finalColor = color.code === 'clear' ? 'rgba(255,255,255,0.2)' : color.code;
        item.innerHTML = `
            <input type="checkbox" name="pColors" value="${color.code}">
            <span class="color-preview-dot" style="background-color: ${finalColor}"></span>
            ${color.name}
        `;
        colorsSelectorGrid.appendChild(item);
    });
}

// 🔓 فتح وإغلاق لوحة التحكم بكلمة مرور ذكية
adminToggleBtn.addEventListener('click', () => {
    if (adminPanel.style.display === "block") {
        adminPanel.style.display = "none";
        document.body.classList.remove('admin-mode');
    } else {
        let password = prompt("أدخل رمز الدخول السري للوحة التحكم:");
        if (password === "1234") { // يمكنك تغيير الرمز "1234" لأي رمز تريده
            adminPanel.style.display = "block";
            document.body.classList.add('admin-mode');
            buildColorsSelector();
            window.scrollTo({ top: adminPanel.offsetTop - 20, behavior: 'smooth' });
        } else {
            alert("الرمز السري غير صحيح! الصلاحية للمسؤول فقط.");
        }
    }
});

// 💾 وظيفة حفظ وإضافة منتج جديد
saveProductBtn.addEventListener('click', () => {
    const title = document.getElementById('pTitle').value.trim();
    const price = document.getElementById('pPrice').value.trim();
    const img = document.getElementById('pImg').value.trim();
    const type = document.getElementById('pType').value;
    const model = document.getElementById('pModel').value;
    const modelText = document.getElementById('pModelText').value.trim();
    const description = document.getElementById('pDesc').value.trim();
    
    // جمع الألوان المحددة
    const checkedColors = [];
    document.querySelectorAll('input[name="pColors"]:checked').forEach(cb => {
        checkedColors.push(cb.value);
    });

    if (!title || !price || !modelText) {
        alert("يرجى ملء الحقول الأساسية: اسم المادة، السعر، واسم الموديل.");
        return;
    }

    const newProduct = {
        id: Date.now(), // رقم تعريفي فريد
        title: title,
        type: type,
        model: model,
        modelText: modelText,
        price: price,
        img: img || "case1.jpg",
        colors: checkedColors.length > 0 ? checkedColors : ["clear"],
        description: description || "لا توجد تفاصيل إضافية متاح حالياً."
    };

    products.unshift(newProduct); // إضافة المنتج في البداية
    localStorage.setItem('alpha_products', JSON.stringify(products)); // الحفظ بالذاكرة
    
    alert("تمت إضافة المادة وحفظها في المخزن بنجاح! 🎉");
    
    // تصفير الاستمارة
    document.getElementById('pTitle').value = "";
    document.getElementById('pPrice').value = "";
    document.getElementById('pImg').value = "";
    document.getElementById('pModelText').value = "";
    document.getElementById('pDesc').value = "";
    
    handleFiltering(); // تحديث العرض
});

// ❌ وظيفة حذف منتج من المخزن
window.deleteItem = function(id, event) {
    event.stopPropagation(); // منع فتح تفاصيل الكرت عند الضغط على حذف
    if (confirm("هل أنت متأكد من مسح هذه المادة نهائياً من المخزن؟")) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('alpha_products', JSON.stringify(products));
        handleFiltering();
    }
};

// 🖥️ عرض المنتجات في الشبكة
function displayProducts(list) {
    productsGrid.innerHTML = "";
    if (list.length === 0) {
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0; font-size: 14px;">لم يتم العثور على مواد تطابق خيارات البحث.</p>`;
        return;
    }

    list.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('case-card');
        card.innerHTML = `
            <button class="delete-item-badge" onclick="deleteItem(${item.id}, event)">&times;</button>
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

// 🔍 فتح نافذة التفاصيل والطلب
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
        const finalColor = color === 'clear' ? 'rgba(255,255,255,0.2)' : color;
        ring.innerHTML = `<div class="color-inner" style="background-color: ${finalColor}"></div>`;
        palette.appendChild(ring);
    });

    const message = `مرحباً كادر منصة Alpha Wholesale، أود الاستفسار وتجهيز كمية جملة من:\n📦 المادة: ${item.title}\n📱 الموديل: ${item.modelText}\n💰 السعر المعتمد: ${item.price} د.ع.`;
    whatsappBtn.href = `https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(message)}`;
    modal.style.display = "flex";
}

closeModal.addEventListener('click', () => modal.style.display = "none");
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = "none"; });

// 🔎 الفلترة والبحث الذكي
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
        if (e.target.classList.contains('tab-btn')) {
            container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            handleFiltering();
        }
    });
});

// تشغيل النظام فوراً
displayProducts(products);
