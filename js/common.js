$(document).ready(function(){
	/* pagetop */
	$(".pagetop").click(function(){
	$('body,html').animate({
		scrollTop: 0},500);
	return false;
	});


	var menuList = $(".menuBox ul");
	menuList.css({"display":"none","opacity":"0"});

	$(".menuBtn").click(function(){
		if($(this).hasClass('close')){
			menuList.stop().animate({
				opacity:0
			},function(){
				menuList.css({"display":"none"});
			});
			$(this).removeClass("close");
		}
		else{
			menuList.css({"display":"block"}).stop().animate({
			opacity:1
			});
			$(this).addClass("close");
		}
	});
});
