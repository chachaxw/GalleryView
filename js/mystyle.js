// JavaScript Document

window.onload=function(){
   var oNav=document.getElementById('menu');
   var oUl=oNav.getElementsByTagName('ul')[0];
   var aLi=oUl.getElementsByTagName('li');
   var oI=oUl.getElementsByTagName('i')[0];
   var oDrag=document.getElementById('videoBox');
   var disX=0;
   var disY=0;
   var show=true;
   oNav.onclick=function(){
	  if(show){
	     startMove(oI,{opacity:100});
		 oUl.style.display="block";
		 
		 var i=0;
		 
		 var timer=setInterval(function(){
			 
			 startMove(aLi[i],{top:35,opacity:100});
			 i++;
			 if(i==aLi.length)
			 {
			     clearInterval(timer);	 
			 }
		 },100);
      }
	  else
	  {
		 startMove(oI,{opacity:0});
		 
		 var i=0;
		 
		 var timer=setInterval(function(){
			 
			 startMove(aLi[i],{top:-20,opacity:0});
			 i++;
			 if(i==aLi.length)
			 {
			     clearInterval(timer);	 
			 }
		 },100);
		 setTimeout(function(){
		     oUl.style.display="none";
		 },500);
		 
	  }
	  if(show)
	     show=false;
	  else
	     show=true;
   }
  //拖拽功能
   oDrag.onmousedown=function(ev){
	  var oEvent=ev||event;
	  
	  disX=oEvent.clientX-oDrag.offsetLeft;
	  disY=oEvent.clientY-oDrag.offsetTop;
	  
	  if(oDrag.setCapture)//IE浏览器下
	  {
		  oDrag.onmousemove=mouseMove;  
		  oDrag.onmouseup=mouseUp;
		  oDrag.setCapture;
	  }
	  else//在chrome.FF等浏览器下
	  {
		  document.onmousemove=mouseMove;
		  document.onmouseup=mouseUp;
	  }
	  oDrag.setCapture();//事件捕获
      return false;//阻止浏览器默认行为，防止在火狐下出现bug.
	  
	  function mouseMove(ev)
          {  
              var oEvent=ev||event;
              var l=oEvent.clientX-disX;
			  var t=oEvent.clientY-disY;
			  
			  if(l<0)
			  {
				 l=0;
			  }
			  else if(l>document.documentElement.clientWidth-oDrag.offsetWidth-90)
			  {   
				 l=document.documentElement.clientWidth-oDrag.offsetWidth-90;
			  }
			  if(t<=0)
			  {
				 t=0;  
			  }
			  else if(t>document.documentElement.clientHeight-oDrag.offsetHeight)
			  {
				  document.documentElement.clientHeight-oDrag.offsetHeight;
			  }
	          oDrag.style.left=l+'px';
	          oDrag.style.top=t+'px';
			  
          };
	   function mouseUp(ev){
		   this.onmousemove=null;
		   this.onmouseup=null;
		   if(oDrag.releaseCapture)
		     oDrag.releaseCapture();   
	   };
   };
   //幻灯片功能

   var oImgBox=document.getElementById('imgBox');
   var aBtn=document.getElementById('liststyle').getElementsByTagName('li');
   var oUl1=document.getElementById('images');
   var oImg=oUl1.getElementsByTagName('img');
   var now=0;
   var timer=null;
   
   for(var i=0;i<aBtn.length;i++)
   {
	   aBtn[i].index=i;//给每个按钮加入一个属性index，而值就等于它自身在aBtn数组中的号
	   aBtn[i].onclick=function()
	   {
		   now=this.index;
		   tab();
	   }
   }
   function tab()
   {
	    for(var i=0;i<aBtn.length;i++)
        {
	       aBtn[i].className="";
		   startMove(oImg[i],{opacity:30});
		}
   	    aBtn[now].className="active";
		startMove(oImg[now],{opacity:100});
		startMove(oUl1,{top:-472*now});
   };
   function next()
   {
	   now++;
	   if(now==aBtn.length)   
	   {
		   now=0;   
	   }
	   tab();
   };
   timer=setInterval(next,4000);
   oImgBox.onmouseover=function(){clearInterval(timer)};
   oImgBox.onmouseout=function(){timer=setInterval(next,3000)};
}