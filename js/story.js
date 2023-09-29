$(document).ready(function() {
	if ($(window).width() < 1000) {
		$(".pre").colorbox({
			iframe: true,
			innerWidth: "300px", //幅の指定
			innerHeight: "300px" //高さの指定
		});
	} else {
		$(".pre").colorbox({
			iframe: true,
			innerWidth: "600px", //幅の指定
			innerHeight: "430px" //高さの指定
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
	var status = true;
	$(window).on("resize load",function(){
		if(window.innerWidth>640){
			$(".slide li").each(function(){
				var obj = $(".slide li:eq("+$(".slide li").index(this)+") .details");
				$(this).append(obj);
				if(window.innerWidth<800){
					$(".slide li:eq("+$(".slide li").index(this)+") .details").css({"position":"static"});
				}else{
					$(".slide li:eq("+$(".slide li").index(this)+") .details").css({"position":"absolute"});
				}
			});
			if(status){
				status = false;
				$(".mark").css("display","");
				$(".mark li").removeClass("active");
				$(".mark li").eq(0).addClass("active");
				fncIMGClick();
			}
		}else{
			status = true;
			$(".slide li").removeAttr("style");
			$(".slide li").each(function(){
				var obj = $(".slide li:eq("+$(".slide li").index(this)+") .img");
				$(".slide li:eq("+$(".slide li").index(this)+") .details").css({"position":"static"});
				$(this).append(obj);
			});
			$(".mark").css("display","none");
		}
	})


	function fncIMGClick(){
		$(".next img").off();
		var slideFlg = true;
	  $(".slide li").each(function(){

	    if($(this).index()!=0){
	      $(this).css({
	        "opacity":"0",
	        "position":"absolute",
	        "top":"0",
	        "left":"0",
	        "z-index":"1",
	      });
	    }else{
				$(this).css({
	        "z-index":"2",
	      });
			}
	  });
	  $(".next img").click(function(){
			if(slideFlg){
				slideFlg = false;
		    var len = $(".next img").index(this);
		    if((len+1)==$(".next img").length) len=-1;
		    $(".slide li:eq("+(parseInt(len)+1)+")").animate({
		      "opacity":"1",
		      "position":"none",
		      "z-index":"2",
		    },500);
		    $(".slide li:eq("+len+")").animate({
		      "opacity":"0",
		      "position":"absolute",
		      "top":"0",
		      "left":"0",
		      "z-index":"1",
		    },500);
				setTimeout(rem,500);
				function rem(){
					slideFlg = true;
				}
				var markIdx = 0;
				$(".mark li").each(function(){
					if($(this).hasClass("active")){
						markIdx = $(".mark li").index(this);
					}
				});
				$(".mark li").eq(markIdx).removeClass("active")
				if(markIdx==$(".mark li").length-1) markIdx = -1;
				$(".mark li").eq(markIdx+1).addClass("active")
			}
	  });
	}

	$(".slide").before("<ul class='mark'></ul>");
	$(".slide li").each(function(){
		$(".mark").append("<li></li>");
	});
	$(".mark li").eq(0).addClass("active");


});
