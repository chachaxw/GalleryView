//js运动框架
  function getStyle(obj,name)
  {
	  if(obj.currentStyle)
	  { 
	      return obj.currentStyle[name];
	  }
      else
	  {
	      return getComputedStyle(obj,false)[name];
	  }
  };//用来获取行间样式。
  var timer=null;
  function startMove(obj,json,fun){
      clearInterval(obj.timer);
	  obj.timer=setInterval(function(){
      var stop=true;
      for(var attr in json){
		  var cur=0;
		  if (attr=='opacity')
		  {
			  cur=Math.round(parseFloat(getStyle(obj,attr))*100);//Math.round的作用是四舍五入。
		  }
		  else
		  {
		      cur=parseInt(getStyle(obj,attr));   
		  }
	      var speed=(json[attr]-cur)/5;
		  speed=speed>0?Math.ceil(speed):Math.floor(speed);

		  if (cur!=json[attr])
		      stop=false;
		  
		  if(attr=='opacity')
		  {
			   obj.style.filter='alpha(opacity:'+(cur+speed)+')';
			   obj.style.opacity=(cur+speed)/100;
		  }
		  else
		  {
               obj.style[attr]=cur+speed+'px';
		  }
	 }
	 if(stop)
		  {
		      clearInterval(obj.timer);
			  if(fun)fun();
		  }
     },30);
  }