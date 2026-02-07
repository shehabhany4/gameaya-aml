const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 250) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('#carouselExampleIndicators');
  const contentItems = document.querySelector('.content1 .items');
  
  // تفعيل التغيير التلقائي للصور كل 5 ثواني
  const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: 7000, 
    ride: 'carousel'
  });
  
  // إعادة الأنيميشن عند تغيير الصورة
  carousel.addEventListener('slide.bs.carousel', function () {
    // إزالة الأنيميشن
    contentItems.style.animation = 'none';
    
    // إعادة تشغيل الأنيميشن بعد وقت قصير
    setTimeout(() => {
      contentItems.style.animation = 'coitem 1s ease forwards';
    }, 10);
  });
});

const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 200; 

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});



// JavaScript للتحكم في الكاروسيل - Infinite Loop
document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('servicesCarousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  let currentIndex = 0;
  let cardsToShow = 4;
  let isTransitioning = false;
  
  // استنساخ الكروت للحركة اللانهائية
  const originalCards = Array.from(track.children);
  
  // إضافة نسخ في البداية والنهاية
  originalCards.forEach(card => {
    const cloneBefore = card.cloneNode(true);
    const cloneAfter = card.cloneNode(true);
    track.appendChild(cloneAfter);
  });
  
  originalCards.forEach(card => {
    const cloneBefore = card.cloneNode(true);
    track.insertBefore(cloneBefore, track.firstChild);
  });
  
  const allCards = document.querySelectorAll('.service-card-wrapper');
  const totalOriginalCards = originalCards.length;
  
  // البداية من النسخة الأصلية (بعد النسخ المستنسخة)
  currentIndex = totalOriginalCards;
  
  // تحديد عدد الكروت المعروضة حسب حجم الشاشة
  function updateCardsToShow() {
    if (window.innerWidth <= 576) {
      cardsToShow = 1;
    } else if (window.innerWidth <= 768) {
      cardsToShow = 2;
    } else if (window.innerWidth <= 992) {
      cardsToShow = 3;
    } else {
      cardsToShow = 4;
    }
  }
  
  function updateCarousel(smooth = true) {
    const cardWidth = allCards[0].offsetWidth;
    const gap = 24; // 1.5rem = 24px
    const moveAmount = (cardWidth + gap) * currentIndex;
    
    if (smooth) {
      track.style.transition = 'transform 0.5s ease-in-out';
    } else {
      track.style.transition = 'none';
    }
    
    track.style.transform = `translateX(${moveAmount}px)`;
  }
  
  function handleTransitionEnd() {
    if (isTransitioning) {
      isTransitioning = false;
      
      // إذا وصلنا لنهاية النسخ، نرجع للبداية
      if (currentIndex >= totalOriginalCards * 2) {
        currentIndex = totalOriginalCards;
        updateCarousel(false);
      }
      
      // إذا وصلنا لبداية النسخ، نروح للنهاية
      if (currentIndex <= 0) {
        currentIndex = totalOriginalCards;
        updateCarousel(false);
      }
    }
  }
  
  track.addEventListener('transitionend', handleTransitionEnd);
  
  // الزر التالي (يحرك لليسار)
  nextBtn.addEventListener('click', function() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel();
  });
  
  // الزر السابق (يحرك لليمين)
  prevBtn.addEventListener('click', function() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarousel();
  });
  
  // Auto-play infinite
  let autoplayInterval = setInterval(function() {
    if (!isTransitioning) {
      isTransitioning = true;
      currentIndex++;
      updateCarousel();
    }
  }, 3000);
  
  // إيقاف Auto-play عند التفاعل وإعادة تشغيله
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(function() {
      if (!isTransitioning) {
        isTransitioning = true;
        currentIndex++;
        updateCarousel();
      }
    }, 3000);
  }
  
  prevBtn.addEventListener('click', resetAutoplay);
  nextBtn.addEventListener('click', resetAutoplay);
  
  // تحديث عند تغيير حجم الشاشة
  window.addEventListener('resize', function() {
    updateCardsToShow();
    updateCarousel(false);
  });
  
  updateCardsToShow();
  updateCarousel(false);
});



// JavaScript للمركز الإعلامي - Infinite Loop
document.addEventListener('DOMContentLoaded', function() {
  const newsTrack = document.getElementById('newsSlider');
  const mediaPrevBtn = document.getElementById('mediaPrevBtn');
  const mediaNextBtn = document.getElementById('mediaNextBtn');
  
  let newsCurrentIndex = 0;
  let newsCardsToShow = 3;
  let isNewsTransitioning = false;
  
  // استنساخ الكروت للحركة اللانهائية
  const newsOriginalCards = Array.from(newsTrack.children);
  
  // إضافة نسخ في النهاية
  newsOriginalCards.forEach(card => {
    const cloneAfter = card.cloneNode(true);
    newsTrack.appendChild(cloneAfter);
  });
  
  // إضافة نسخ في البداية
  newsOriginalCards.forEach(card => {
    const cloneBefore = card.cloneNode(true);
    newsTrack.insertBefore(cloneBefore, newsTrack.firstChild);
  });
  
  const allNewsCards = document.querySelectorAll('.news-card-wrapper');
  const totalNewsOriginalCards = newsOriginalCards.length;
  
  // البداية من النسخة الأصلية
  newsCurrentIndex = totalNewsOriginalCards;
  
  // تحديد عدد الكروت المعروضة حسب حجم الشاشة
  function updateNewsCardsToShow() {
    if (window.innerWidth <= 576) {
      newsCardsToShow = 1;
    } else if (window.innerWidth <= 768) {
      newsCardsToShow = 2;
    } else {
      newsCardsToShow = 3;
    }
  }
  
  function updateNewsCarousel(smooth = true) {
    const cardWidth = allNewsCards[0].offsetWidth;
    const gap = 24; // 1.5rem
    const moveAmount = (cardWidth + gap) * newsCurrentIndex;
    
    if (smooth) {
      newsTrack.style.transition = 'transform 0.5s ease-in-out';
    } else {
      newsTrack.style.transition = 'none';
    }
    
    newsTrack.style.transform = `translateX(${moveAmount}px)`;
  }
  
  function handleNewsTransitionEnd() {
    if (isNewsTransitioning) {
      isNewsTransitioning = false;
      
      // إذا وصلنا لنهاية النسخ، نرجع للبداية
      if (newsCurrentIndex >= totalNewsOriginalCards * 2) {
        newsCurrentIndex = totalNewsOriginalCards;
        updateNewsCarousel(false);
      }
      
      // إذا وصلنا لبداية النسخ، نروح للنهاية
      if (newsCurrentIndex <= 0) {
        newsCurrentIndex = totalNewsOriginalCards;
        updateNewsCarousel(false);
      }
    }
  }
  
  newsTrack.addEventListener('transitionend', handleNewsTransitionEnd);
  
  // الزر التالي
  mediaNextBtn.addEventListener('click', function() {
    if (isNewsTransitioning) return;
    isNewsTransitioning = true;
    newsCurrentIndex++;
    updateNewsCarousel();
  });
  
  // الزر السابق
  mediaPrevBtn.addEventListener('click', function() {
    if (isNewsTransitioning) return;
    isNewsTransitioning = true;
    newsCurrentIndex--;
    updateNewsCarousel();
  });
  
  // Auto-play infinite
  let newsAutoplayInterval = setInterval(function() {
    if (!isNewsTransitioning) {
      isNewsTransitioning = true;
      newsCurrentIndex++;
      updateNewsCarousel();
    }
  }, 3500);
  
  // إعادة تشغيل Auto-play عند التفاعل
  function resetNewsAutoplay() {
    clearInterval(newsAutoplayInterval);
    newsAutoplayInterval = setInterval(function() {
      if (!isNewsTransitioning) {
        isNewsTransitioning = true;
        newsCurrentIndex++;
        updateNewsCarousel();
      }
    }, 3500);
  }
  
  mediaPrevBtn.addEventListener('click', resetNewsAutoplay);
  mediaNextBtn.addEventListener('click', resetNewsAutoplay);
  
  // تحديث عند تغيير حجم الشاشة
  window.addEventListener('resize', function() {
    updateNewsCardsToShow();
    updateNewsCarousel(false);
  });
  
  updateNewsCardsToShow();
  updateNewsCarousel(false);
});
