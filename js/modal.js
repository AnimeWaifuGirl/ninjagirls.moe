$(function(){
  if($(window).width() < 1000){
    $(".pre").colorbox({
          iframe:true,
          innerWidth:"300px", //幅の指定
          innerHeight:"300px" //高さの指定
      });
  }else{
    $(".pre").colorbox({
          iframe:true,
          innerWidth:"600px", //幅の指定
          innerHeight:"430px" //高さの指定
      });
  }

  $(window).on("resize",function(){
    if($(window).width() < 1000){
      $.colorbox.resize({
        innerWidth:'300px',
        innerHeight:'300px',
      });
    }else{
      $.colorbox.resize({
        innerWidth:"600px", //幅の指定
    		innerHeight:"430px" //高さの指定
      });
    }
  });
})
