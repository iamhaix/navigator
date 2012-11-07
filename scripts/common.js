/*
 * 
 *
 *
 *						------------------------------------------------------------------
 *                      name:icom
 *                      author:Zhang Haixi
 *					    date:2012-06-30
 *						这个库用来实现一些组件函数和常用功能函数,基于base.js
 *						与具体任何业务无关，可以在业务中调用。
 *						-------------------------------------------------------------------
 *
 *
 *
 * 
 */
//include("scripts/base.js");
//~组建类~
var X = icom = {}

/*
 *创建cookie
 */
X.setCookie = function(sName, sValue, oDate, sPath, sDomain, bSecure){

	var s = sName + "=" + encodeURIXomponent(sValue);

	s += ((oDate == null)? "":";expire=" + oDate.toGMTString());
	s += ((sPath == null)? "":";path=" + sPath);
	s += ((sDomain == null)? "":";domain=" + sDomain);
	s += ((bSecure == true)? ";secure":"");
	
	document.cookie = s;
}

/*
 *获取cookie
 */

X.getCookie = function(name) {
	var reg_s = "(?:;)?" + name + "=([^;]*);?";
	var reg = new RegExp(reg_s);

	if (reg.test(document.cookie)) {
		return decodeURIComponent(RegExp["$1"]);
	} else {
		return null;
	}
}


/*
 *删除cookie
 */
X.delCookie = function(sName, sDomain, sPath){
	X.setCookie(sName, "", new Date(0), sPath, sDomain);
}

/*
 *动画：逐渐淡出,最后移除此节点
 *整理自《JavaScript权威指南第六版》P.430
 *
 *@e 事件源event
 *@oncomplete 回调函数，以e为参数。动画结束后调用
 *@time 动画持续时间,默认500ms
 */
X.fadeOut = function(e, oncomplete, time){
	if(typeof e === "string") 
		var v = H.$("#" + e);
	if(!time) time = 500;
	
	//使用Math.sqrt作为一个简单的“缓动函数”来创建动画
	//精巧的非线性：一开始淡出较快，越来越慢
	var ease = Math.sqrt;
	
	//动画开始时间
	var start = (new Date()).getTime();
	animate();
	
	function animate(){
		//已消耗的时间
		var elapsed = (new Date()).getTime() - start;
		//消耗的是总时间的几分之几？
		var fraction = elapsed/time;
		if(fraction < 1){
		//如果动画还没有完成
			//改变透明度
			var opacity = 1 - ease(fraction);
			//设置在v上
			v.style.opacity = String(opacity);
			if(H.isIE)
				v.style.filter = 'alpha(opacity='+opacity*100+')'; //ie
			//调动下一帧
			setTimeout(animate, Math.min(25, time-elapsed));
		}else{
		//否则，动画完成
			v.style.opacity = "0";
			if(H.isIE)
				v.style.filter = 'alpha(opacity=0)'; //ie
				H.remove(e);
			if(oncomplete)
				oncomplete(e);
		}
	}
}

/*
 *动画：逐渐淡入
 *
 *@e 事件源event
 *@oncomplete 回调函数，以e为参数。动画结束后调用
 *@time 动画持续时间,默认500ms
 */
X.fadeIn = function(e, oncomplete, time){
	if(typeof e === "string") 
		var v = H.$("#" + e);
	if(!time) time = 500;
	
	//使用Math.sqrt作为一个简单的“缓动函数”来创建动画
	//精巧的非线性：一开始淡入较慢，越来越快
	var ease = Math.sqrt;
	
	//动画开始时间
	var start = (new Date()).getTime();
	animate();
	
	function animate(){
		//已消耗的时间
		var elapsed = (new Date()).getTime() - start;
		//消耗的是总时间的几分之几？
		var fraction = elapsed/time;
		if(fraction < 1){
		//如果动画还没有完成
			//改变透明度
			var opacity = ease(fraction);
			//设置在v上
			v.style.opacity = String(opacity);
			if(H.isIE)
				v.style.filter = 'alpha(opacity='+opacity*100+')'; //ie
			//调动下一帧
			setTimeout(animate, Math.min(25, time-elapsed));
		}else{
		//否则，动画完成
			v.style.opacity = "1";
			if(H.isIE)
				v.style.filter = 'alpha(opacity=100)'; //ie
			if(oncomplete)
				oncomplete(e);
		}
	}
}

/**
 *伸展功能
 * 
 */
X.stretch = function(e, len, time, oncomplete) {
	var topWid = e.clientWidth;
	var gap = len - topWid;

	if (!time)
		time = 500;

	//使用Math.sqrt作为一个简单的“缓动函数”来创建动画
	//精巧的非线性：一开始淡出较快，越来越慢
	var ease = Math.sqrt;

	//动画开始时间
	var start = (new Date()).getTime();
	animate();

	function animate() {
		//已消耗的时间
		var elapsed = (new Date()).getTime() - start;
		//消耗的是总时间的几分之几？
		var fraction = elapsed / time;
		if (fraction < 1) {
			//如果动画还没有完成
			//改变宽度
			var wid = topWid + fraction * gap;
			//设置在e上
			e.style.width = wid + 'px';
			//调动下一帧
			setTimeout(animate, Math.min(25, time - elapsed));
		} else {
			//否则，动画完成
			e.style.width = len + 'px';
			//$('put-btn').innerHTML = '&lt;';
			//回调事件
			if (oncomplete)
				oncomplete();
		}
	}

}

//收缩函数
X.shrink = function (e, len, time, oncomplete){
		var topWid = e.clientWidth;
		var gap = topWid - len;
		
		if(!time) time = 500;
	
		//使用Math.sqrt作为一个简单的“缓动函数”来创建动画
		//精巧的非线性：一开始淡出较快，越来越慢
		var ease = Math.sqrt;
		
		//动画开始时间
		var start = (new Date()).getTime();
		animate();
		
		function animate(){
			//已消耗的时间
			var elapsed = (new Date()).getTime() - start;
			//消耗的是总时间的几分之几？
			var fraction = elapsed/time;
			if(fraction < 1){
			//如果动画还没有完成
				//改变宽度
				var wid = topWid - fraction * gap;
				//设置在e上
				e.style.width = wid + 'px';
				//调动下一帧
				setTimeout(animate, Math.min(25, time-elapsed));
			}else{
			//否则，动画完成
				e.style.width = len + 'px';
				//$('put-btn').innerHTML = '&gt;';
				//回调事件
				if(oncomplete)
					oncomplete();
			}
		}
}

//伸展收缩事件触发函数
X.toggle = function(e, minLen, maxLen, time, oncomplete1, oncomplete2){
	var wid = e.clientWidth;
		
	if(wid < maxLen){
		X.stretch(e, maxLen, time, oncomplete1);
	}else{
		X.shrink(e, minLen, time, oncomplete2);
	}
}
/*
 *
 *创建一个弹出窗口的方法
 *
 *
 */
X.createPopupWin = function(option){
	
	if (H.$('#' + option.id))
		H.remove(option.id);
	var popupWin = {};
	popupWin.window = H.fragment('<div id="' + option.id + '" class="popupWin"><div class="popupWin_inner_box">'+(option.content || '')+'</div></div>');
	document.body.appendChild(popupWin.window);
	
	//显示灯箱效果
	H.$('#lightBox').style.display = "block";
	
	popupWin.close = function(){
		X.fadeOut(option.id);
		//显示灯箱效果
		H.$('#lightBox').style.display = "none";
	}
	
	H.addEventHandler(H.$('.popupWin_close')[0], 'click', popupWin.close, false);
	
	//添加样式
	var p = H.$('#' + option.id);
	p.style.position = "relative";
	p.style.width = option.width? (option.width + "px") : "400px";
	p.style.height = option.height? (option.height + "px") : "400px";
	p.style.top = option.top? (option.top + "px") : "150px";
	p.style.marginRight = "auto";
	p.style.marginLeft = "auto";
	
	X.fadeIn(option.id, null, 1000);
	
	return popupWin;
}

//日期格式化函数
X.solarday =function(now){  
	var sdobj = new Date(now.getFullYear(),now.getMonth(),now.getDate());      
	var ldobj = new lunar(sdobj);      
	var cl = '';       
	//农历bb'+(cld[d].isleap?'闰 ':' ')+cld[d].lmonth+' 月 '+cld[d].lday+' 日      
	var tt = cday(ldobj.month,ldobj.day);      
	return (now.getFullYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日 农历"+tt+"");      
} 

	/*******************************************************************
	 *日期转换，公立到农历
	 *摘自网络
	 *******************************************************************/
	 
	var lunarinfo = [0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,      
	0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,      
	0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,      
	0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,      
	0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,      
	0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,      
	0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,      
	0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,      
	0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,      
	0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,      
	0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,      
	0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,      
	0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,      
	0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,      
	0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0];  
		 
	//传回农历 y年的总天数      
	var lyeardays = function(y) {      
		var i, sum = 348 ;     
		for(i=0x8000; i>0x8; i>>=1) 
			sum += (this.lunarinfo[y-1900] & i)? 1: 0 ;     
		return(sum+this.leapdays(y));      
	}
		
	//传回农历 y年闰月的天数      
	var leapdays = function(y) {      
		if(this.leapmonth(y))  
			return((this.lunarinfo[y-1900] & 0x10000)? 30: 29);      
		else 
			return(0);      
	}
		
	//传回农历 y年闰哪个月 1-12 , 没闰传回 0      
	var leapmonth = function(y) { 
		return(this.lunarinfo[y-1900] & 0xf);
	}   
	  
	//传回农历 y年m月的总天数      
	var monthdays = function(y,m) { 
		return( (this.lunarinfo[y-1900] & (0x10000>>m))? 30: 29 );
	}
	 
	//算出农历, 传入日期物件, 传回农历日期物件      
	//该物件属性有 .year .month .day .isleap .yearcyl .daycyl .moncyl
	var lunar = function(objdate) {      
		var i, leap=0, temp=0;      
		var basedate = new Date(1900,0,31);      
		var offset   = (objdate - basedate)/86400000;      
		this.daycyl = offset + 40;      
		this.moncyl = 14;      
		for(i=1900; i<2050 && offset>0; i++) {      
			temp = lyeardays(i);      
			offset -= temp;      
			this.moncyl += 12;      
		}      
		if(offset<0) {      
			offset += temp;      
			i--;      
			this.moncyl -= 12;      
		}      
		this.year = i;      
		this.yearcyl = i-1864;      
		leap = leapmonth(i); //闰哪个月      
		this.isleap = false;     
		for(i=1; i<13 && offset>0; i++) {      
			//闰月      
			if(leap>0 && i==(leap+1) && this.isleap==false)      
			{ --i; this.isleap = true; temp = leapdays(this.year); }      
			else     
			{ temp = monthdays(this.year, i); }      
			//解除闰月      
			if(this.isleap==true && i==(leap+1)) this.isleap = false     
			offset -= temp      
			if(this.isleap == false) this.moncyl ++      
		}      
		if(offset==0 && leap>0 && i==leap+1){      
			if(this.isleap)      
			{ this.isleap = false; }      
			else     
			{ this.isleap = true; --i; --this.moncyl;}      
		}
		if(offset<0){ 
			offset += temp; 
			--i;
			--this.moncyl; 
		}      
		this.month = i; 
		this.day = offset + 1;     
	}

	//农历的单位    
	var cday = function(m,d){      
		var nstr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');      
		var nstr2 = new Array('初','十','廿','卅','　');      
		var s;      
		if (m>10){
			s = '十'+nstr1[m-10];
		} else {
			s = nstr1[m];
		} 
		s += '月';
		
		if (s=="十二月") 
			s = "腊月";      
		if (s=="一月") 
			s = "正月";
			
		switch (d) {      
			case 10:s += '初十'; break;      
			case 20:s += '二十'; break;      
			case 30:s += '三十'; break;      
			default:s += nstr2[Math.floor(d/10)]; s += nstr1[d%10];      
		}      
		return(s);      
	}
/***********************************end of Lunar***********************************/


/*
 *以一个对象的x和y属性的方式返回滚动条的偏移量
 *整理自《JavaScript权威指南第6版》P.390
 *@w 指定的窗口
 */
X.getScrollOffsets = function(w){
	//使用指定窗口，若不带参数，则使用当前窗口
	var w = w||window;
	
	//除了IE8及更早的版本以外，其他浏览器均可以用
	if (w.pageXOffset != null) {
		return {x:w.pageXOffset, y:w.pageYOffset};
	}
	var d = w.document;
	if (document.compatMode == "CSS1Compat") {
		return {x:d.documentElement.scrollLeft, y:d.documentElement.scrollTop};
	}
	return {x:d.body.srollLeft, y: d.body.srollTop};
}

/* 
 *拖动绝对定位的HTML元素
 *整理自《JavaScript权威指南第6版》P.462
 *注意：必须是绝对定位的元素
 *
 *@el  要拖动的元素
 *@event mousedown事件对象
 */
X.drag = function(el, event){
	//初始鼠标位置，转换为文档坐标
	var scroll = X.getScrollOffsets();
	var startX = event.clientX + scroll.x;
	var startY = event.clientY + scroll.y;

	//在文档坐标下，待拖动元素的起始位置
	var origX = el.offsetLeft;
	var origY = el.offsetTop;
	
	//计算鼠标触发位置坐标和元素左上角之间的距离
	var deltaX = startX - origX;
	var deltaY = startY - origY;
	
	//注册用于响应接着mousedown事件发生的mouseover和mouseup事件的事件处理程序
	if(document.addEventListener){
		document.addEventListener( "mousemove", moveHandler, true);
		document.addEventListener( "mouseup", upHandler, true);
	}else if (document.attachEvent) {
		el.setCapture();
		el.attachEvent("onmousemove", moveHandler);
		el.attachEvent("onmouseup", upHandler);
		//作为mouseup事件看待鼠标捕获的丢失
		el.attachEvent("onlosecapture", upHandler);
	}

	//不让其他元素看见我们处理了该元素
	H.stopPropagation(event);
	H.preventDefault(event);
	
	/*
	 *元素正被拖动时，即mousemove事件
	 *
	 */
	function moveHandler(e){
		e = H.getEvent(e);
		var scroll = X.getScrollOffsets();
		el.style.left = (e.clientX + scroll.x - deltaX) + "px";
		el.style.top = (e.clientY + scroll.y - deltaY) + "px";

		H.stopPropagation(event);
	}
	
	/*
	 *元素正被拖动时，即mouseup事件
	 *
	 */
	 function upHandler(e){
		e = H.getEvent(e);
	
		//注册用于响应接着mousedown事件发生的mouseover和mouseup事件的事件处理程序
		if(document.addEventListener){
		
			document.removeEventListener( "mouseup", upHandler, true);
			document.removeEventListener( "mousemove", moveHandler, true);
		}else if (document.attachEvent) {
		
			el.detachEvent("onlosecapture", upHandler);
			el.detachEvent("onmouseup", upHandler);
			el.detachEvent("onmousemove", moveHandler);
			el.releaseCapture();
		}
		
		H.stopPropagation(event);
	}
}


