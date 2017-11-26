$(document).ready(function() {
  $('body').append($('<div class=load>'));
  $('.product-image .add-to-cart a').click(function() {
    $('.load').load("trangchu/popup_cart");
  });
  $('.responsive').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<button type="button" data-role="none" class="slick-prev" style="display: block;">Previous</button>',
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    ]
  });
  $('.autoplay').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: '<button type="button" data-role="none" class="slick-prev" style="display: block;">Previous</button>',
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    ]
  });
  $('.one-time').slick({
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    prevArrow: '<button type="button" data-role="none" class="slick-prev" style="display: block;">Previous</button>',
    nextArrow: '<button type="button" data-role="none" class="slick-next" style="display: block;">Next</button>',
  });
  $('.multiple-items').slick({
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 2000,
    autoplay: true,
    prevArrow: '<button type="button" data-role="none" class="slick-prev" style="display: block;">Previous</button>',
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    ]
  });
  $('.slide-logo').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 2000,
    autoplay: true,
    prevArrow: '<button type="button" data-role="none" class="slick-prev" style="display: block;">Previous</button>',
    responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    ]
  });
  jQuery('#back-top').on('click', function() {
    jQuery("html, body").animate({
      scrollTop: 0
    }, "slow");
  });
  var currentP = 0;
  jQuery(window).scroll(function() {
    var headerH = jQuery('.header-container').height();
    var navH = jQuery('.nav-container').height();
    headerH += navH;
    var scrollP = jQuery(window).scrollTop();
    if (jQuery(window).width() > 1024) {
      if (scrollP != currentP) {
        if (scrollP >= headerH) {
          jQuery('#back-top').addClass('show');
          jQuery('.nav-container').addClass('ontop');
        } else {
          jQuery('#back-top').removeClass('show');
          jQuery('.nav-container').removeClass('ontop');
        }
        currentP = jQuery(window).scrollTop();
      }
    }
  });
  jQuery('.sidebar-toggler').on('click', function() {
    if (jQuery('.sidebar-sub').hasClass('sub-open')) {
      jQuery('.sidebar-sub').addClass('sub-close');
      jQuery('.sidebar-sub').removeClass('sub-open');
      jQuery('.wrapper').addClass('sub-close');
      jQuery('.wrapper').removeClass('sub-open');
      jQuery('.home-slider').addClass('sub-close');
      jQuery('.home-slider').removeClass('sub-open');
    } else {
      jQuery('.sidebar-sub').removeClass('sub-close');
      jQuery('.sidebar-sub').addClass('sub-open');
      jQuery('.wrapper').removeClass('sub-close');
      jQuery('.wrapper').addClass('sub-open');
      jQuery('.home-slider').removeClass('sub-close');
      jQuery('.home-slider').addClass('sub-open');
    }
  });
  jQuery("#wsearchsubmit").click(function() {
    if (jQuery("#ws").width() == 0) {
      if (jQuery("#ws").hasClass("show")) {
        jQuery("#ws").removeClass("show");
      } else {
        jQuery("#ws").addClass("show");
        return false;
      }
    }
  });
  jQuery('.horizontal-menu .nav-menu > ul').superfish({
    delay: 100,
    speed: 'fast'
  });
  jQuery('.primary-menu-container ul.nav-menu').superfish({
    delay: 100,
    speed: 'fast'
  });
  jQuery('.top-menu-container .nav-menu > ul').superfish({
    delay: 100,
    speed: 'fast'
  });
  jQuery('.top-menu-container ul.nav-menu').superfish({
    delay: 100,
    speed: 'fast'
  });
  var mobileMenuWrapper = jQuery('.mobile-menu-container');
  mobileMenuWrapper.find('.menu-item-has-children').each(function() {
    var linkItem = jQuery(this).find('a').first();
    linkItem.after('<i class="fa fa-plus"></i>');
  });
  var totalMenuLevelFirst = jQuery('.mobile-menu-container .nav-menu > li').length;
  var mobileMenuH = totalMenuLevelFirst * 40 + 10;
  jQuery('.mbmenu-toggler').on('click', function() {
    if (mobileMenuWrapper.hasClass('open')) {
      mobileMenuWrapper.removeClass('open');
      mobileMenuWrapper.animate({
        'height': 0
      }, 'fast');
    } else {
      mobileMenuWrapper.addClass('open');
      mobileMenuWrapper.animate({
        'height': mobileMenuH
      }, 'fast');
    }
  });
  jQuery('.mobile-menu-container li.menu-item-has-children').each(function() {
    jQuery(this).css({
      'height': 40,
      'overflow': 'hidden'
    });
  });
  jQuery('.mobile-menu-container li.menu-item-has-children').each(function() {
    var parentLi = jQuery(this);
    var dropdownUl = parentLi.find('ul.sub-menu').first();
    parentLi.find('.fa').first().on('click', function() {
      parentLi.parents('li.menu-item-has-children').css('height', 'auto');
      mobileMenuWrapper.css({
        'height': 'auto'
      });
      var dropdownUlheight = dropdownUl.outerHeight() + 40;
      if (parentLi.hasClass('opensubmenu')) {
        parentLi.removeClass('opensubmenu');
        parentLi.animate({
          'height': 40
        }, 'fast', function() {
          mobileMenuH = mobileMenuWrapper.outerHeight();
        });
        parentLi.find('.fa').first().removeClass('fa-minus');
        parentLi.find('.fa').first().addClass('fa-plus');
      } else {
        parentLi.addClass('opensubmenu');
        parentLi.animate({
          'height': dropdownUlheight
        }, 'fast', function() {
          mobileMenuH = mobileMenuWrapper.outerHeight();
        });
        parentLi.find('.fa').first().addClass('fa-minus');
        parentLi.find('.fa').first().removeClass('fa-plus');
      }
    });
  });
  if (jQuery(window).width() > 1024) {
    jQuery('.widget_shopping_cart').on('mouseover', function() {
      var mCartHeight = jQuery('.mini_cart_inner').outerHeight();
      var cCartHeight = jQuery('.mini_cart_content').outerHeight();
      if (cCartHeight < mCartHeight) {
        jQuery('.mini_cart_content').stop(true, false).animate({
          'height': mCartHeight
        });
      }
    });
    jQuery('.widget_shopping_cart').on('mouseleave', function() {
      jQuery('.mini_cart_content').animate({
        'height': '0'
      });
    });
  }
  jQuery('.widget_shopping_cart').on('click', function(event) {
    if (jQuery(window).width() < 1025) {
      var closed = false;
      var mCartHeight = jQuery('.mini_cart_inner').outerHeight();
      var mCartToggler = jQuery('.cart-toggler');
      if (jQuery('.mini_cart_content').height() == 0) {
        closed = true;
      }
      if (mCartToggler.is(event.target) || mCartToggler.has(event.target).length != 0 || mCartToggler.is(event.target)) {
        event.preventDefault();
        if (closed) {
          jQuery('.mini_cart_content').animate({
            'height': mCartHeight
          });
          closed = false;
        } else {
          jQuery('.mini_cart_content').animate({
            'height': '0'
          }, function() {
            closed = true;
          });
        }
      }
    }
  });
  jQuery('body').on('added_to_cart', function(event, fragments, cart_hash) {
    jQuery('.atc-notice-wrapper').fadeIn();
  });
  $( ".slick-dots button" ).addClass( "remove" );
  $(".remove").remove();
});