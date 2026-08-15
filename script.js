// Revo Coffee - shared interactions
(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Menu category tabs
  const tabs = document.querySelectorAll('.menu-tab');
  if (tabs.length) {
    tabs.forEach(tab => tab.addEventListener('click', () => {
      const target = document.getElementById(tab.dataset.target);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.pageYOffset - 150;
      window.scrollTo({ top, behavior: 'smooth' });
    }));

    const categories = document.querySelectorAll('.menu-category');
    const setActive = id => tabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-160px 0px -60% 0px', threshold: 0 });
    categories.forEach(cat => observer.observe(cat));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  // Site-wide Arabic / English translation.
  // The button is independent from document direction, so it never jumps sides.
  const AR_EN = {
    'الرئيسية':'Home','المنيو':'Menu','منتجاتنا':'Products','عن الكافيه':'About Us','تواصل معنا':'Contact Us',
    'بريك من الصداع':'A Break From The Headache','كوباية':'A Cup','تفرق معاك':'Makes A Difference',
    'من قهوة الصباح لحد سموزي العصاري، ريڤو كوفي بيقدملك مشروبات بتتحضر طازة، بخامات مختارة، وطعم بيرجعلك نشاطك من أول رشفة.':'From morning coffee to afternoon smoothies, Revo Coffee serves freshly prepared drinks made with carefully selected ingredients and a taste that brings your energy back from the first sip.',
    'شوف المنيو ☕':'View Menu ☕','اعرف قصتنا':'Our Story','ESTD':'ESTD','مين إحنا':'Who We Are',
    'مش مجرد كافيه.. دي وقفة في وسط يومك':'More Than A Café — Your Pause In The Day',
    'ريڤو كوفي اتولد من فكرة بسيطة: كل حد محتاج لحظة يوقف فيها ياخد نفسه، وكوباية تساعده يكمل يومه. بنحضّر كل مشروب بعناية من غير استعجال.':'Revo Coffee was born from a simple idea: everyone needs a moment to pause, breathe, and enjoy a cup that helps them keep going. Every drink is prepared with care, never in a rush.',
    'اقرأ قصتنا كاملة ←':'Read Our Full Story →','الأكتر طلبًا':'Most Popular','مشروبات لازم تجربها':'Drinks You Have To Try',
    'لمحة سريعة من منيونا الكبير، من الحار للبارد.':'A quick look at our menu, from hot drinks to cold favorites.',
    'قهوة':'Coffee','قهوة تركي':'Turkish Coffee','على الطريقة الأصلية، بريحة بن محمصة طازة وقوام كثيف.':'Traditional Turkish-style coffee with freshly roasted beans and a rich, full body.',
    'اسبريسو':'Espresso','لاتيه':'Latte','شوت اسبريسو غني مع لبن مبخر وطبقة فوم ناعمة.':'A rich espresso shot with steamed milk and a smooth layer of foam.',
    'سموزي':'Smoothie','سموزي مانجو':'Mango Smoothie','فاكهة طازة مثلجة بقوام كريمي منعش يفتحلك نهارك.':'Chilled fresh fruit with a creamy, refreshing texture to brighten your day.',
    'آيس كوفي':'Iced Coffee','ايس سبانيش لاتيه':'Iced Spanish Latte','اسبريسو بارد مع لبن مكثف محلى، توازن حلاوة وقوة.':'Cold espresso with sweetened condensed milk — a perfect balance of sweetness and bold coffee.',
    'جاهز تطلب كوبايتك؟':'Ready To Order Your Cup?','تعالى زورنا أو شوف المنيو كامل وقرر إيه اللي هيفرق معاك النهاردة.':'Come visit us or explore the full menu and choose what will make your day better.',
    'افتح المنيو الكامل':'Open Full Menu',
    'كل مشروباتنا في مكان واحد — اختار قسمك وابدأ الطلب':'All our drinks in one place — choose your category and start your order',
    'المشروبات الساخنة':'Hot Drinks','مشروبات الاسبريسو':'Espresso Drinks','الاسموزي':'Smoothies','الميلك شيك':'Milkshakes','ايس كوفي':'Iced Coffee','الميكسات':'Mixes',
    'شاي':'Tea','شاي نعناع':'Mint Tea','شاي بلبن':'Milk Tea','شاي كرك':'Karak Tea','شاي فواكه':'Fruit Tea','أعشاب':'Herbal Tea','كوفي ميكس':'Coffee Mix',
    'قهوة تركي دبل':'Double Turkish Coffee','كابتشينو':'Cappuccino','قهوة فرنساوي':'French Coffee','قهوة بندق':'Hazelnut Coffee','(هوت)':'(Hot)',
    'اسبريسو سنجل':'Single Espresso','اسبريسو دابل':'Double Espresso','كورتادو':'Cortado','فلات وايت':'Flat White','ميكياتو':'Macchiato',
    'سموزي ليمون نعناع':'Lemon Mint Smoothie','سموزي فراولة':'Strawberry Smoothie','سموزي بلوبيري':'Blueberry Smoothie','سموزي باشون فروت':'Passion Fruit Smoothie','سموزي خوخ':'Peach Smoothie','سموزي بطيخ':'Watermelon Smoothie','بلح بلبن':'Dates With Milk',
    '(كل الأصناف بسعر ٧٥ ج.م)':'(All items are 75 EGP)','ميلك شيك كيوي':'Kiwi Milkshake','ميلك شيك مانجا':'Mango Milkshake','ميلك شيك لوتس':'Lotus Milkshake','ميلك شيك كراميل':'Caramel Milkshake','ميلك شيك ڤانيليا':'Vanilla Milkshake','ميلك شيك باشون فروت':'Passion Fruit Milkshake','ميلك شيك خوخ':'Peach Milkshake','ميلك شيك بلوبيري':'Blueberry Milkshake','ميلك شيك فراولة':'Strawberry Milkshake','ميلك شيك أوريو':'Oreo Milkshake',
    'مشروبات الايس كوفي':'Iced Coffee Drinks','ايس لاتيه':'Iced Latte','ايس سبانيش لاتيه':'Iced Spanish Latte','ايس كراميل ميكياتو':'Iced Caramel Macchiato','ايس موكا':'Iced Mocha','ايس ماتشا':'Iced Matcha','فرابيه كراميل':'Caramel Frappe','فرابيه ڤانيليا':'Vanilla Frappe','فرابتشينو':'Frappuccino',
    'مانجا كيوي':'Mango Kiwi','مانجا باشون فروت':'Mango Passion Fruit','خوخ باشون فروت':'Peach Passion Fruit','كيوي موز':'Kiwi Banana',
    'قصتنا':'Our Story','بريك من الصداع — إزاي بدأنا وليه بنعمل اللي بنعمله':'A Break From The Headache — How We Started And Why We Do What We Do',
    'من البداية':'From The Beginning','ريڤو مش مجرد اسم.. دي فكرة':'Revo Is More Than A Name — It Is An Idea',
    'سنة ٢٠٢٦، بدأنا ريڤو من هدف واضح: كل حد بيمر بيوم طويل، مزنوق، أو حاسس بصداع الشغل والزحمة — يستاهل مكان يرجّعله نشاطه وتركيزه من كوباية واحدة كويسة.':'In 2026, we started Revo with a clear goal: anyone having a long, busy day deserves a place that brings back their energy and focus with one great cup.',
    'اسم "ريڤو" مأخوذ من فكرة الـ Revive — إحياء وإرجاع النشاط. وده اللي بنحاول نقدمه في كل كوباية: بن مختار بعناية، تحضير مظبوط، وخدمة سريعة من غير ما نضحي بالجودة.':'The name "Revo" comes from the idea of Revive — bringing energy back. That is what we aim to serve in every cup: carefully selected beans, precise preparation, and fast service without sacrificing quality.',
    'مش بس قهوة — عندنا سموزي وميلك شيك ومشروبات باردة وساخنة لكل الأذواق، عشان ريڤو يبقى محطتك اليومية أيًا كان مزاجك.':'Not just coffee — we also have smoothies, milkshakes, and hot and cold drinks for every taste, so Revo can be your daily stop whatever your mood.',
    'قيمنا':'Our Values','اللي بنلتزم بيه في كل كوباية':'What We Stand For In Every Cup','جودة ثابتة':'Consistent Quality','كل مشروب بيتحضر بنفس المقادير والعناية، مهما كان الوقت أو الزحمة.':'Every drink is prepared with the same care and proportions, no matter the time or how busy we are.',
    'سرعة من غير تنازل':'Speed Without Compromise','وقتك مهم، وطلبك بيوصلك بسرعة من غير ما نضحي بالطعم.':'Your time matters, and your order reaches you quickly without compromising taste.',
    'خامات طازة':'Fresh Ingredients','فاكهة طازة، بن محمص جيد، ومكونات مختارة بعناية لكل صنف.':'Fresh fruit, well-roasted coffee beans, and carefully selected ingredients for every item.',
    'ضيافة حقيقية':'Genuine Hospitality','هدفنا إنك تحس إنك في مكانك، مش بس زبون بيطلب ويمشي.':'Our goal is for you to feel at home, not like a customer who simply orders and leaves.',
    'رحلتنا':'Our Journey','محطات ريڤو':'Revo Milestones','افتتاح ريڤو كوفي':'Revo Coffee Opens','أول باب فتحناه، وأول كوباية قدمناها بفكرة "بريك من الصداع".':'Our first door opened and our first cup was served with the idea of "A Break From The Headache."',
    'منيو':'Menu','توسيع المنيو':'Menu Expansion','ضفنا الاسموزي والميلك شيك ومشروبات الايس كوفي عشان نغطي كل الأذواق.':'We added smoothies, milkshakes, and iced coffee drinks to cover every taste.',
    'دلوقتي':'Now','محطتك اليومية':'Your Daily Stop','بنكمل نطور ونضيف أصناف جديدة، وهدفنا نفضل اختيارك الأول كل يوم.':'We keep improving and adding new items, with the goal of staying your first choice every day.',
    'يلا شوف المنيو':'Check The Menu','جرب كوباية ريڤو النهاردة وقولنا رأيك.':'Try a Revo cup today and tell us what you think.','افتح المنيو':'Open Menu',
    'موجودين نسمعك ونستقبلك في أي وقت':'We Are Here To Hear From You And Welcome You Anytime','العنوان':'Address','اتصل بينا':'Call Us','ابعتلنا إيميل':'Email Us','مواعيد العمل':'Opening Hours',
    'السبت – الخميس':'Saturday – Thursday','الجمعة':'Friday','تابعنا على السوشيال ميديا':'Follow Us On Social Media','أنشاص الرمل - شارع سوق الأربع (بجوار بيتزا جيكا)':'Anshas El Raml - Souq El Arbaa Street (Next To Pizza Geka)',
    'أنشاص الرمل - شارع سوق الأربع':'Anshas El Raml - Souq El Arbaa Street','يوميًا: ٩ ص - ١ ص':'Daily: 9 AM - 1 AM','* حط رابط خرائط جوجل الحقيقي هنا لما يبقى متاح':'* Add the real Google Maps link here when available',
    'روابط':'Links','تواصل':'Contact','جميع الحقوق محفوظة':'All Rights Reserved','منتجات ريڤو كوفي':'Revo Coffee Products',
    'مجموعة من منتجاتنا وصورنا الحقيقية — من غير إضافة منتجات من خارج قائمتك.':'A collection of our real product photos — with no products added from outside your list.',
    'شوف منتجات ريڤو كوفي بالصور واختار اللي يعجبك':'Explore Revo Coffee through our real product photos and choose your favorite.',
    'منتج ريڤو':'Revo Product','شوف المنيو ☕':'View Menu ☕'
  };

  const EN_AR = Object.fromEntries(Object.entries(AR_EN).map(([ar,en]) => [en,ar]));
  const langToggle = document.getElementById('langToggle');

  function translateTextNodes(root, dictionary) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement || ['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement.tagName)) continue;
      nodes.push(node);
    }
    nodes.forEach(textNode => {
      const original = textNode.nodeValue;
      const trimmed = original.trim();
      if (!trimmed || !dictionary[trimmed]) return;
      textNode.nodeValue = original.replace(trimmed, dictionary[trimmed]);
    });
  }

  function translateAttributes(dictionary) {
    document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el => {
      ['placeholder','title','aria-label'].forEach(attr => {
        const value = el.getAttribute(attr);
        if (value && dictionary[value]) el.setAttribute(attr, dictionary[value]);
      });
    });
  }

  function applyLanguage(lang) {
    const isEnglish = lang === 'en';
    document.documentElement.lang = isEnglish ? 'en' : 'ar';
    document.documentElement.dir = isEnglish ? 'ltr' : 'rtl';
    document.body.classList.toggle('lang-en', isEnglish);
    document.body.classList.toggle('lang-ar', !isEnglish);
    translateTextNodes(document.body, isEnglish ? AR_EN : EN_AR);
    translateAttributes(isEnglish ? AR_EN : EN_AR);
    if (langToggle) {
      langToggle.textContent = isEnglish ? 'AR' : 'EN';
      langToggle.setAttribute('aria-label', isEnglish ? 'Switch to Arabic' : 'تغيير اللغة');
      langToggle.setAttribute('data-lang', lang);
    }
    localStorage.setItem('revo-lang', lang);
  }

  if (langToggle) {
    const saved = localStorage.getItem('revo-lang') || 'ar';
    applyLanguage(saved);
    langToggle.addEventListener('click', () => {
      const current = localStorage.getItem('revo-lang') || 'ar';
      applyLanguage(current === 'ar' ? 'en' : 'ar');
    });
  }
})();
