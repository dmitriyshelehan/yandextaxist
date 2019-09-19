window.addEventListener('load', function(e) {
    // Loader
    setTimeout(function(e) {
      $('.loader').addClass('js-hide');
    }, 1000);


    // Sandwich button
    $('#js-sandwich').click(function(e) {
        $(this).toggleClass('js-close');
        $('.mobile').toggleClass('js-show');
    });

    $('.mobile__item').click(function(e) {
      $('.mobile').removeClass('js-show');
      $('#js-sandwich').removeClass('js-close');
    });
    
    // Accordion
    $('.faq__headline').click(function(e) {
        $('.faq__headline').removeClass('js-is-active');
        $('.faq__content').removeClass('js-is-active');
        $(this).addClass('js-is-active');
        $(this).next().addClass('js-is-active');
    });

    $('#accordion').accordion();

    // Scroll
  $("a").on("click", function(event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        1000,
        function() {
          window.location.hash = hash;
        }
      );
    }
  });
  // End Scroll

  // WOW
  new WOW().init();

  // Socials
  $('.socials__item--phone').click(function(e) {
    e.preventDefault();

    $('.socials__item').toggleClass('js-active');
  });
});


