(function($) {

  $.fn.sysonicmove = function(options){
    var element = $(this);
    element.each(function(){
      if(element.attr("class").indexOf("active") == -1 && element.attr("class").indexOf("actived") == -1){
        element.addClass("active");
        console.log("test");
        var sy = new sonicmove(element.eq(element.index(this)) , options);
      }
    });
  }
  var parm = {
    effect: "vertical",
    width: 0,
    height: 0,
    sidew: 100,
    motiontime: 800,
  };
  var sonicmove = function(element, opt){
    $.extend(parm,opt);
    var p = sonicmove.prototype;
    var d = element.after("<div>").next().css({
      "position":"relative",
      "width":element.width(),
      "height":element.height(),
    });
    d.append(element).children();
    element.css({"opacity":0});
    var src = element.attr("src");
    switch (parm.effect){
      case "horizon":
        horizon();
      break;
      case "vertical":
        vertical();
      break;
      case "horizon2":
        horizon2();
      break;
    }

    function horizon(){
      // 左
      var l = element.before("<img>").prev().attr("src",src).addClass("sonicside").css({
        "position":"absolute",
        "top":0,
        "left":parm.sidew,
        "opacity": 0,
      });
      // 右
      var r = element.before("<img>").prev().attr("src",src).addClass("sonicside").css({
        "position":"absolute",
        "top":0,
        "right":parm.sidew,
        "opacity": 0,
      });
      $(".sonicside").animate({"opacity":0.5,"left":0},parm.motiontime,function(){this.remove()});
      element.animate({"opacity":1},parm.motiontime);
    }

    function vertical(){
      // 左
      var l = element.before("<img>").prev().attr("src",src).addClass("sonicside").css({
        "position":"absolute",
        "top": - parm.sidew * 2,
        "left": 0,
        "opacity": 0,
      });
      // 右
      var r = element.before("<img>").prev().attr("src",src).addClass("sonicside").css({
        "position":"absolute",
        "top": - parm.sidew,
        "left":0,
        "opacity": 0,
      });
      $(".sonicside").animate({"opacity":0.5,"top":0},parm.motiontime,function(){this.remove()});
      element.animate({"opacity":1},parm.motiontime);
    }

    function horizon2(){
      // 右
      for(var i=0;i<3;i++){
        var right = parm.sidew;
        var classnm = "sonicside right";
        if(i==1){
          right += 20;
          classnm = "sonicsides right";
        }else if(i==2){
          right -= 20;
          classnm = "sonicsides right";
        }
        var l = element.before("<img>").prev().attr("src",src).addClass(classnm).css({
          "position":"absolute",
          "top":0,
          "left":right,
          "opacity": 0,
        });
      }

      // 左
      for(var i=0;i<3;i++){
        var left = parm.sidew;
        var classnm = "sonicside left";
        if(i==1){
          left += 20;
          classnm = "sonicsides left";
        }else if(i==2){
          left -= 20;
          classnm = "sonicsides left";
        }
        var r = element.before("<img>").prev().attr("src",src).addClass(classnm).css({
          "position":"absolute",
          "top":0,
          "right":left,
          "opacity": 0,
        });
      }


      $(".sonicside").animate({"opacity":0.7,"left":0},parm.motiontime,function(){
        this.remove()
      });
      $(".sonicsides").animate({"opacity":0.4,"left":0},parm.motiontime,function(){
        this.remove()
      });
      setTimeout(sms , 200 , element);
//      element.animate({"opacity":1},parm.motiontime,function(){
//        $(this).addClass("actived").removeClass("active");
//      });

//      var time = parm.motiontime*0.1;
//      setTimeout(dispon,time,".left");
//      setTimeout(dispon,time+30,"");

      var time = parm.motiontime*0.1;
      setTimeout(dispon,time,".left");
      setTimeout(dispon,time+30,"");
      var time = parm.motiontime*0.5;
      setTimeout(dispon,time,".left");
      setTimeout(dispon,time+30,"");

//      var time = parm.motiontime*0.2;
//      setTimeout(dispon,time,".active");
//      setTimeout(dispon,time+30,"");
      var time = parm.motiontime*0.2;
      setTimeout(dispon,time,".active");
      setTimeout(dispon,time+30,"");
//      var time = parm.motiontime*0.6;
//      setTimeout(dispon,time,".active");
//      setTimeout(dispon,time+30,"");

//      var time = parm.motiontime*0.3;
//      setTimeout(dispon,time,".right");
//      setTimeout(dispon,time+30,"");
      var time = parm.motiontime*0.3;
      setTimeout(dispon,time,".right");
      setTimeout(dispon,time+30,"");
      var time = parm.motiontime*0.6;
      setTimeout(dispon,time,".right");
      setTimeout(dispon,time+30,"");
    }

    function dispon(classnm){
      $(".left").css("display","block");
      $(".active").css("display","block");
      $(".right").css("display","block");
      if(classnm!=""){
        $(classnm).css("display","none");
      }
    }
  };

  function sms(element){
    element.animate({"opacity":1},parm.motiontime*0.8,function(){
      $(this).addClass("actived").removeClass("active");
    });
  }
})(jQuery);
