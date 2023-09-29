$(function(){
  // キャラクター画像の自動変更回数
  // 0:無制限　0以外：指定回数変更 -1:停止
  var setCount = 1; // 無制限



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





  var charaflg = true;
  if(setCount>0) setCount++;
	$(".transformBtn img").click(function(){
		charaChanger(true);
	});
	var charaInterval = setInterval(charaChanger, 5000);
  if(setCount==-1){
    clearInterval(charaInterval);
  }

	function charaChanger(bool){
		if(charaflg){
			if(bool && (setCount>1 || setCount==0)){
				clearInterval(charaInterval);
				charaInterval = setInterval(charaChanger, 5000);
			}
			charaflg = false;

      var cFlg = "pc";
			var img = $(".charaImg img");
      if(window.innerWidth<=640){
  			img = $(".charaImgSp img");
        cFlg = "sp";
      }

      /***************/
      var imgSub = "";
      if(cFlg=="pc"){
        // スマホ側を変更
        imgSub = $(".charaImgSp img");
      }else{
        // PC側を変更
        imgSub = $(".charaImg img");
      }
      var imgnameSub = imgSub.attr("src").split("/");
      var filenameSub = imgnameSub[imgnameSub.length-1]
      var fileinfoSub = filenameSub.split(".");
      if(fileinfoSub[0].indexOf("_2")==-1){
        fileinfoSub[0] += "_2";
      }else{
        fileinfoSub[0] = fileinfoSub[0].replace("_2","");
      }
			var setnameSub = imgSub.attr("src").replace(imgnameSub[imgnameSub.length-1],fileinfoSub[0]+"."+fileinfoSub[1]);
      imgSub.attr("src",setnameSub);
      /***************/

			var imgname = img.attr("src").split("/");
			var filename = imgname[imgname.length-1]
			var fileinfo = filename.split(".");
      var classflg = false;
			if(fileinfo[0].indexOf("_2")==-1){
        fileinfo[0] += "_2";
        classflg = true;
      }else{
        fileinfo[0] = fileinfo[0].replace("_2","");
        classflg = false;
      }
			var setname = img.attr("src").replace(imgname[imgname.length-1],fileinfo[0]+"."+fileinfo[1]);
			var pos1 = 10;
			var pos2 = 50;
			for(var i=0;i<3;i++){
				var imgsub = img;
				if(i==2){ pos1 *= -1; pos2 *= -1; }
				if(i!=0) imgsub = $(".charaImg").append("<img src='"+$(".charaImg img").attr("src")+"'>").children().last().css({"position":"absolute","top":0,"right":pos1*(-1),"opacity":0.5,});
				imgsub.animate({right:pos2*(-1),opacity:0},500,function(){
          if(classflg){
            $(".charaImg").addClass("charaImg2");
          }else{
            $(".charaImg").removeClass("charaImg2");
          }
        });
				setTimeout(disp,500,imgsub,i);
			}
			function disp(img , idx){
				img.attr("src",setname);
				if(idx!=0){
					img.animate({opacity:0.2},200);
					img.animate({opacity:0,right:0},500,function(){img.remove()});
				}else{
					img.animate({opacity:1},500);
				}
				if(idx==2){
					setTimeout(flgTrue,500);
				}
			}
			function flgTrue(){
				charaflg = true;
        if(!bool) setCount--;
        if(setCount==1){
          clearInterval(charaInterval);
        }
			}
		}
	}
	$(".changeStop").each(function(){
		clearInterval(charaInterval);
	});

})
