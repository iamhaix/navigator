/*
 * 
 *
 *
 *						------------------------------------------------------------------
 *                      name:ibase
 *                      author:Zhang Haixi
 *					    date:2012-06-30
 *						这个库用来实现一些基本的兼容代码，DOM操作，事件封装，及原生对象扩展
 *						与具体任何业务无关，可以在业务中调用。
 *						-------------------------------------------------------------------
 *
 *
 *
 * 
 */
 var ua = navigator.userAgent.toLowerCase();
//~底层类~
var H = ibase = {

	/*
	 *浏览器类型判断
	 */
	
	isIE: (ua.match(/mise\/([\d.]+)/)) ? true:false,
	
	isIE5: (this.isIE && (ua.match(/msie ([\d.]+)/))[1] == "5.0") ? true:false,
	
	isIE6: (this.isIE && (ua.match(/msie ([\d.]+)/))[1] == "6.0") ? true:false,
	
	isIE7: (this.isIE && (ua.match(/msie ([\d.]+)/))[1] == "7.0") ? true:false,
	
	isMF: (ua.match(/firefox\/([\d.]+)/)) ? true:false,
	
	isOpera: (ua.match(/opera.([\d.]+)/)) ? true:false,
	
	isSafari: (ua.match(/version\/([\d.]+).*safari/)) ? true:false,
	 
	isChrome: (ua.match(/chrome\/([\d.]+)/)) ? true:false,
	
	isWin: (navigator.platform == "Win32") || (navigator.platform == "windows"),
	
	isMac: (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC")
					|| (navigator.platform == "Macintosh"),
					
	isLinux:(navigator.platform == "X11") && !isWin && !isMac,
}
/*
 *获取event对象
 */
H.getEvent = function(e){
	var evt = e?e: (window.event ? window.event : null);
	return evt;
}

/*
 *获取事件target
 */
H.getTarget = function(){
	var evt = H.getEvent();
	var srcElement = evt.srcElement? evt.srcElement : evt.target; 
	return srcElement;
}

/*
 *格式化event对象，是所有平台下统一
 *
 */
H.formatEvent = function(oEvent){

		if (isIE && isWin)
		{
			oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
			oEvent.eventPhase = 2;
			oEvent.isChar = (oEvent.charCode > 0);
			oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
			oEvent.pageY = oEvent.clientY + document.body.scrollTop;
			oEvent.preventDefalut = function(){

					this.returnValue = false;
			}

			if (oEvent.type == "mouseout")
			{
				oEvent.relatedTarget = oEvent.toElement;
			}else if (oEvent.type == "mouseover")
			{
				oEvent.relatedTarget = oEvent.fromElement;
			}

			oEvent.stopPropagation = function(){
	
				this.cancelBubble = true;
			}

			oEvent.target = oEvent.srcElement;
			oEvent.time = (new Date()).getTime();
		}
		
		return oEvent;
};

/*
 *此方法添加事件处理函数
 *@oTarget 事件目标
 *@sEventType 事件类型 如 mousedown
 *@fnHandler 事件绑定函数
 *@isCapture true为捕获事件，false为冒泡事件
 */
H.addEventHandler = function(oTarget, sEventType, fnHandler, isCapture){
	if (oTarget.addEventListener){
	//如果是兼容DOM的浏览器
		oTarget.addEventListener(sEventType, fnHandler, isCapture);
	}else if (oTarget.attachEvent){
	//如果是IE浏览器
		oTarget.attachEvent("on" + sEventType, fnHandler);
	}else{
		oTarget["on" + sEventType] = fnHandler;
	}
}

/*
 *该方法是删除事件处理函数
 *@oTarget 事件目标
 *@sEventType 事件类型 如 mousedown
 *@fnHandler 事件绑定函数
 *@isCapture true为捕获事件，false为冒泡事件
 */
H.removeEventHandler = function(oTarget, sEventType, fnHandler, isCapture){

	if (oTarget.removeEventListener){
	//如果是兼容DOM的浏览器
		oTarget.removeEventListener(sEventType, fnHandler, isCapture);
	}else if (oTarget.detachEvent){
	//如果是IE浏览器
		oTarget.detachEvent("on" + sEventType, fnHandler);
	}else{
		oTarget["on" + sEventType] = null;
	}
}

/*
 *阻止事件默认行为
 */
H.preventDefault = function(event){
    if (event.preventDefault){ 
	//DOM标准处理
        event.preventDefault();       
    } else {  
	//IE下处理	
        event.returnValue = false;      
    }   
}
/*
 *阻止事件冒泡处理
 *
 */
H.stopPropagation = function(event){      
    if (event.stopPropagation){        
	//DOM标准处理
        event.stopPropagation();     
    } else {     
	//IE下处理	
        event.cancelBubble = true;     
    }    
}      

/*
 *选择器，选择DOM节点，可通过id|class|tagName获取
 *id：以#开头，如  #sid
 *class：以.开始，如  .sclass
 *tagName：直接写tag的name即可，如  em
 */
H.$ = function(i){
	var reg_id = /^#(.*)$/,
		reg_class = /^\.(.*)$/;
	var s;
	if(reg_id.test(i)){
	//如果以#开头，则按照id处理
		var sid = RegExp["$1"];
		s = document.getElementById(sid);
		/*
		if(s == null){
			console.log('can not find id: \"'+ sid + '\"');
		}*/
	}else if(reg_class.test(i)){
	//如果以.开头，则按照class处理
		var iclass = RegExp["$1"];
		s = document.getElementsByClassName(iclass);
		/*if(s.length == 0){
			console.log('can not find class: \"'+ iclass + '\"');
		}*/
	}else{
	//其他情况，按照tag处理
		s = document.getElementsByTagName(i);
		/*if(s.length == 0){
			console.log('can not find tag: \"'+ i + '\"');
		}*/
	}
	
	return s;
}

/*
 *移除某一DOM节点
 *
 */
H.remove = function(i){

	var n = H.$("#"+i);
	n.parentNode.removeChild(n);
}

/*
 *
 *创建一个html片段
 */
H.fragment = function(html){
	var frag = document.createDocumentFragment();
	var elt = document.createElement('div');
	elt.innerHTML = html;
	while(elt.firstChild){
		frag.appendChild(elt.firstChild);
	}
	return frag;
}

/*
 *模拟jsp中的include标签，在一个js文件中引入另一个js文件
 *如 include("scripts/b.js")
 */
function include(path){ 
    var a=document.createElement("script");
    a.type = "text/javascript"; 
    a.src=path; 
    var head=document.getElementsByTagName("head")[0];
    head.appendChild(a);
}

/*
 *扩展String类，trim函数
 *
 *
String.prototype.trim = function(){
	//匹配字符前后空白的正则
	var reg = /^\s+(.*?)\s+$/;
	return this.replace(reg, "$1");
}*/

