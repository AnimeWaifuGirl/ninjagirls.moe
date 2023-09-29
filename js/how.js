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

	var aryFlg = [];
	$(".howList li").each(function(){
		if($(".howList li").index(this) % 2){
			$(this).css({"margin-left":"-250px"});
		}else{
			$(this).css({"margin-left":"250px"});
		}
		aryFlg[$(".howList li").index(this)] = true;
	});
	$(window).on("scroll load resize",function () {
		var scl = $(window).scrollTop();
		$(".howList li").each(function(){
      if(aryFlg[$(".howList li").index(this)]){
  			if(($(this).offset().top - $(window).height()) < $(window).scrollTop()){
					aryFlg[$(".howList li").index(this)] = false;
          margTop = $(".howList li").eq(0).css("margin-top");
          margBottom = $(".howList li").eq(0).css("margin-bottom");
          margCenter = (($(".howList").width() - $(this).width()) / 2)+"px";
          marg = margTop + " 0 " + margBottom + " " + margCenter;
          $(this).animate({
  					opacity: 1,
  					margin: marg,
  				},500,function(){
            $(this).css({"margin":""});
            if($(this).attr("class").indexOf("visible")==-1){
              $(this).addClass("visible");
            }
          });
  			}
      }
		});
	});
})
