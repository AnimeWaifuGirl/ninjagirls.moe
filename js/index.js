$(document).ready(function(){
	$(".youtube").colorbox({
	  iframe:true,
	  innerWidth:600, //幅の指定
	  innerHeight:430 //高さの指定
	});

	/* 回転 */
	var topChars = [];
	var charObj = {};
	$(window).on("load resize",function(){
		$(".chara .member li").each(function(){
			if(topChars[$(this).index()] == undefined){
				charObj = {
					interval:0,
					moveflg:true,
				};
				topChars.push(charObj);
			}
			if($(window).width()<=720){
				var ram = (Math.random()*(15-5)+5)*1000;
				if(topChars[$(this).index()].interval!=undefined){
					clearInterval(topChars[$(this).index()].interval);
				}
				charObj = {
					interval:setInterval(charReverse,ram,this),
					moveflg:true,
				}
				topChars[$(this).index()] = charObj;
			}else{
				clearInterval(topChars[$(this).index()].interval);
			}
		});
	});

	$(".chara .member li").mouseover(function(){
		charReverse(this);
	});
	function charReverse(own){
		if(topChars[$(".chara .member li").index(own)].moveflg){
			topChars[$(".chara .member li").index(own)].moveflg=false;
		  var obj = $(own);
		  var img = obj.children().children();
		  var sec = 250;
		  var newimg;
		  (img.attr("src").indexOf("_ov")==-1)?newimg = img.attr("src").replace("img","img_ov"):newimg = img.attr("src").replace("img_ov","img");
		  rota(0 , own);
		  function rota(f,self){
				var fl = 0;
				var ba = 90;
				if(f==1){
				  fl=90;
				  ba=0;
				}
				$({deg:fl}).animate({deg:ba}, {
				  duration:sec,
				  progress:function(){
					obj.css({transform:'rotateY('+this.deg+'deg)'});
				  }
				});
				if(f==1){
				  img.attr("src",newimg);
				  obj.animate({opacity:1},sec);
					setTimeout(rev , 250);
				}else{
				  obj.animate({opacity:0},sec,function(){rota(1,self)});
				}
				function rev(){
					topChars[$(".chara .member li").index(self)].moveflg=true;
				}
		  }
		}
	}

	// ランダム引き出し
	var cnt = $(".contents .obj li").eq(0).children().length;
	var f = Math.floor(Math.random()*cnt-1)+1;
	$(".contents .obj li:eq(0) img").each(function(){
		if($(".contents .obj li:eq(0) img").index(this)!=f){
			$(this).addClass("remove");
		}
	});
	$(".contents .obj .remove").remove();
/*
	var imgHtml = $(".contents .obj li:eq(0)");
	switch(Math.floor(Math.random() * (4-1)+1)){
		case 2:
			imgHtml.html("<img src='./images/top/balloon2.png' alt='2'>");
		break;
		case 3:
			imgHtml.html("<img src='./images/top/balloon3.png' alt='3'>");
		break;
		default:
			imgHtml.html("<img src='./images/top/balloon1.png' alt='1'>");
		break;
	}
*/
	//  $(".how .details").css({"position":"relative"});

	$(".how .details .imgs .img").each(function(){
		if($(".how .details .img").index(this)!=0){
			$(this).css({
				"position":"absolute",
				"top":"0",
				"left":"0",
			});
		}else{
			$(this).addClass("active");
		}
	});
	function fadeInOut(){
		var obj = $(".how .details .imgs .active");
		var len = $(".how .details .imgs .img").index(obj);
		if((len+1)==$(".how .details .imgs .img").length) len=-1;
		obj.removeClass("active");
		$(".how .details .imgs div.img:eq("+(parseInt(len)+1)+")").addClass("active");
		$(".how .details .imgs .img").each(function(){
			if($(".how .details .imgs .img").index(this)==(len+1)){
				$(this).animate({
					"opacity":"1",
					"position":"none",
					"z-index":"2",
				},500);
			}else{
				$(this).animate({
					"opacity":"0",
					"position":"absolute",
					"top":"0",
					"left":"0",
					"z-index":"1",
				},500);
			}
		});
	}
	setInterval(fadeInOut,3000);

	$(window).scroll(function () {
		//スクロール位置
		var scl = $(window).scrollTop();

		//storyの位置
		var storyid = document.getElementById( "indexStory" ) ;
		var storyPos = storyid.getBoundingClientRect() ;
		var positionY = storyPos.top + window.pageYOffset ;

		var storyObjList = $("#indexStory .obj li");
		if(scl > positionY-$("#indexStory").height()/1.5){
			storyObjList.eq(0).addClass("leftup");
			storyObjList.eq(1).addClass("rightup");
			storyObjList.eq(0).removeClass("leftdown");
			storyObjList.eq(1).removeClass("rightdown");
		}

	});

});

$.fn.parara = function(){
	var ary = [];
	var selector = $(this.selector);
	$(selector).each(function(){
		var pos = $(this).offset();
		var obj = {
			top: (pos.top / $(".main").height() * 100) + 0,
			dist: $(this).data("dist"),
		};
		$(this).css({
			"position":"absolute",
			"top":obj.top + "%",
		});
		ary.push(obj);
	});
	$(window).scroll(function(){
		$(selector).each(function(){
			var top = ary[$(selector).index(this)].top + ($(window).scrollTop() / $(".main").height() * 100) * ary[$(selector).index(this)].dist;
			$(this).stop();
			$(this).animate({
				"top":top + "%",
			},"easeOutCubic");
		});
	});
}

$(function () {
    var windowWidth = $(window).width();
    var htmlStr = $('.fb-page').html();
    var timer = null;
    $(window).on('resize',function() {
        var resizedWidth = $(window).width();
        if(windowWidth != resizedWidth && resizedWidth < 500) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                $('.fb-page').html(htmlStr);
                window.FB.XFBML.parse();
　　　　　　　　　　　//window.FB.XFBML.parse()で再レンダリングします。
                var windowWidth = $(window).width();
            }, 500);
        }
    });
});
