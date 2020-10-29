$(document).ready(function(){
  
  $('.carousel').carousel({
    
    interval:6000
      
  }); 

// page index

  $(".footer-top .fa-search ").click(function () {

    $(".header-links input[type='search']").fadeToggle(150)
    $(this).toggleClass("text-secondary")

  })

  $(".box2 .fa-search").click(function () {

    $(".header-links input[type='search']").fadeToggle(150)
    $(this).toggleClass("text-secondary")
  })

  $(".box2 .fa-bars").click(function () {

     $(".nav-right").animate({right:0},200) 
  })

  $(".nav-right .links i").click(function () {

    $(".nav-right").animate({right:"-1000px"},200) 
 })

 $(window).scroll(function () {

  if($(window).scrollTop() >= 400)
  {
    $(".but-scroll i").fadeIn(100)
  }else
  {
    $(".but-scroll i").fadeOut(100)
  }

  })

 $(".but-scroll i").click(function () {

  $("html , body").animate({scrollTop:"0"},1000)
})

// page Register

  $("#radio-sup").on("click" , function(){

    $("#text-input").attr("placeholder" , "اسم المصنع")

    });

  $("#radio-cus").on("click" , function(){

    $("#text-input").attr("placeholder" , "اسم الاتليه")
  
  });

// page porducer

  $(".but-num li").on("click" , function (){

    $(this).addClass("active").siblings().removeClass("active");

  });

// page porduct

  $(".view-img  .links-des li").click(function (){

    $(this).addClass("active").siblings().removeClass("active");
    $(".view-img  .boxs .box").hide();
    $("." + $(this).data('show')).fadeIn().siblings().fadeOut()

  });

});
