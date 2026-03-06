import $ from 'jquery';

$(document).ready(function () {
  // --- Animation Observers ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate on scroll
  const elementsToObverse = $('.fade-in-on-scroll, .reveal');
  elementsToObverse.each(function () {
    $(this).addClass('reveal');
    observer.observe(this);
  });


  // --- Accordion Logic ---
  $('.accordion-item h4').on('click', function () {
    const parent = $(this).parent();

    // If clicking on active item, slide up (optional behavior)
    if (parent.hasClass('active')) {
      parent.removeClass('active');
      $(this).next('p').slideUp(300);
      return;
    }

    // Remove active class from all and slide them up
    $('.accordion-item').removeClass('active');
    $('.accordion-item p').slideUp(300);

    // Add active to current and slide it down
    parent.addClass('active');
    $(this).next('p').slideDown(300);
  });


  // --- Fetch Dummy API (Mocking "This month's best seller") ---
  const dummyCarousel = $('#dummy-carousel');

  $.ajax({
    // Using simple photo API for product image simulation
    url: 'https://jsonplaceholder.typicode.com/photos?_limit=4',
    method: 'GET',
    success: function (data) {
      dummyCarousel.empty(); // Remove loading text

      const realPrices = [329, 149, 199, 89]; // Fake prices
      const names = ["Und Chair", "Orange Sofa", "Wood Table", "Wall Shelf"];

      // We mix our real images with dummy names/prices to simulate real API fetch if needed
      // Actually we will use our real local images based on the mockup to make it 100% same
      const realImages = [
        "/images/Rectangle 6793.png",
        "/images/Rectangle 6794.png",
        "/images/Rectangle 6798.png",
        "/images/Rectangle 6800.png"
      ];

      data.forEach((item, index) => {
        const productCard = $(`
          <div class="product-card">
            <img src="${realImages[index]}" alt="${names[index]}" loading="lazy" />
            <div class="product-info">
              <span class="price">$${realPrices[index]}</span>
              <h3>${names[index]}</h3>
            </div>
          </div>
        `);
        dummyCarousel.append(productCard);
      });
    },
    error: function (err) {
      dummyCarousel.html('<p class="loading" style="color: red;">Failed to load recommended products.</p>');
      console.error('API Fetch Error:', err);
    }
  });


  // --- Simple Carousel Navigation Logic ---
  let scrollPosition = 0;

  $('.nav-btn.next').on('click', function () {
    const cardWidth = $('.product-card').outerWidth() + 24; // width + gap
    const containerWidth = $('.best-seller .container').width();
    const scrollMax = dummyCarousel[0].scrollWidth - containerWidth;

    if (scrollPosition < scrollMax) {
      scrollPosition += cardWidth;
      // Clamp
      if (scrollPosition > scrollMax) scrollPosition = scrollMax;
      dummyCarousel.css('transform', `translateX(-${scrollPosition}px)`);
    }
  });

  $('.nav-btn.prev').on('click', function () {
    const cardWidth = $('.product-card').outerWidth() + 24;

    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      if (scrollPosition < 0) scrollPosition = 0;
      dummyCarousel.css('transform', `translateX(-${scrollPosition}px)`);
    }
  });


  // --- Mobile Hamburger Menu ---
  $('.hamburger').on('click', function () {
    $('.nav-links').slideToggle(300);
    // Might need more CSS logic to look perfect on mobile layout
  });
});
