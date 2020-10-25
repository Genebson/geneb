$(document).ready(function(){
$(".main-slider").owlCarousel({
    items:7,
    margin: 60,
    loop: true,
    autoplay: true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:3,
        },
        1000:{
            items:3,
        }
    }

  });
});