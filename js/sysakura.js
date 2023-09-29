(function($) {
  setTimeout(flowCanvas,500);
  function flowCanvas(){
    var count = 180;
    var canvas = document.getElementById("sakura");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = "./images/m_f_sakura_flower360.png";
  //  img.src = "./images/f002.png";
    img.onload = start;
    var sizew = 2.3;
    var sizeh = 2.3;
    var posx , posy;
    var flows = [];
    var paturn = "left";
    // 表示サイズ情報
    var cvsw = document.getElementById("sakura").width=$(".main").width();
    var cvsh = document.getElementById("sakura").height=$(".main").height();
    var i = 0;
    function flow(){
      var cvsw = document.getElementById("sakura").width=$(".main").width();
      var cvsh = document.getElementById("sakura").height=$(".main").height();
      ctx.clearRect(0,0,cvsw,cvsh);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fill();
      for(var i=0;i<count;i++){
        flows[i].transy += 0.3 + Math.floor(Math.random()*(2-1)+1);
        switch(paturn){
          case "left":
            flows[i].transx += 1.5;
          break;
          case "center":
  //          flows[i].transx += 2;
          break;
          case "right":
            flows[i].transx -= 2;
          break;
        }
  //      flows[i].transy += 0.5;
        flows[i].rad += flows[i].randam;
        flows[i].cnt++;
        if(flows[i].cnt >= flows[i].randam*25){
          flows[i].rad+=0.5;
          flows[i].randam+=Math.random();
          flows[i].cnt=0;
          flows[i].alpha -= 0.1;
        }
        var rad = flows[i].rad * Math.PI / 180;
        if(flows[i].flg == 1){
          ctx.setTransform(Math.cos(-rad), Math.sin(rad), Math.sin(-rad), Math.cos(-rad)/flows[i].randam, flows[i].transx, flows[i].transy);
        }else{
          ctx.setTransform(Math.cos(rad), Math.sin(-rad), Math.sin(rad), Math.cos(rad)/flows[i].randam, flows[i].transx, flows[i].transy);
        }
        ctx.globalAlpha = flows[i].alpha;
        disp(flows[i]);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if(flows[i].transy > cvsh || flows[i].transx > cvsw){
          flows[i].transx = Math.floor(Math.random()*(cvsw-1)+1);
          flows[i].transy = 0;
          switch(paturn){
            case "left":
            case "right":
              if(Math.floor(Math.random()*(3-1)+1)=="1"){
                flows[i].transx = 0;
                flows[i].transy = Math.floor(Math.random()*(cvsh-1)+1);
              }else{
                flows[i].transx = Math.floor(Math.random()*(cvsw-1)+1);
                flows[i].transy = 0;
              }
            break;
          }
          flows[i].randam = Math.floor(Math.random()*(3-1)+1);
          flows[i].rad = Math.floor(Math.random()*(360-1)+1);
          flows[i].alpha = 1;
        }
      }
    }

    function disp(obj){
      ctx.drawImage(img, 0, 0, obj.sizew, obj.sizeh);
    }

    function start(){
      for(var i=0;i<count;i++){
        obj = {};
  	  var a = Math.floor(Math.random()*(10-1)+1);
        obj.sizew = sizew * a;
        obj.sizeh = sizeh * a;
        obj.transx = Math.floor(Math.random()*(100-1)+1);
        obj.transx = Math.floor(Math.random()*(cvsw-1)+1);
        obj.transy = Math.floor(Math.random()*(cvsh-1)+1);
        obj.rad = Math.floor(Math.random()*(10-1)+1);
        obj.randam = Math.floor(Math.random()*(3-1)+1);
        obj.flg = Math.floor(Math.random()*(3-1)+1);
        obj.alpha = 1;
        obj.cnt = 0;
        disp(obj);
        flows.push(obj);
      }
      setInterval(flow,15);
    };
  }
})(jQuery);
