/*
 * 
 *
 *
 *						------------------------------------------------------------------
 *                      name:ipage
 *                      author:Zhang Haixi
 *					    date:2012-07-01
 *						这个库用来实现与页面有关的函数,基于base.js和common.js
 *						
 *						-------------------------------------------------------------------
 *
 *
 *
 * 
 */
 //~页面类~
 var Z = iPage = {
	//记录是否已经登录
	isLogin : false,
	
	//页面是否已被锁定
	isLocked : false,
	
	//页面是否共享
	isOpen : false,
	
	//当前时间
	currentTime : null,
	
	//未登录时显示
	ILOGIN: "登录",
	
	//未登录时显示
	IREGISTER: "注册",
	
	init: function(){
	
		//登录
		H.$('#loginSpan').onclick = function(){
			Z.user.loginTo();
		};
		//注册
		H.$('#registerSpan').onclick = function(){
			Z.user.registerIn();
		};
		//当前时间
		currentTime = Z.getCurrentTime();
		H.$('#todaydate').innerHTML = currentTime;
		//alert(H.$('#registerSpan'));
		//抽屉事件
		H.$('.put-btn')[0].onclick = function(){
			var that = this;
			X.toggle(H.$('#top-level'), 20, 1000, 500,function(){
						that.innerHTML = '&lt;';
					},function(){
						that.innerHTML = '&gt;';
					});
		};
		//模块拖动
		if (!Z.isLocked) {
			var toolbars = H.$('.toolbar');
			var len = toolbars.length;
			for (var i = 0; i < len; i++) {
				toolbars[i].onmouseover = function(){
					this.style.cursor = "move";
				}
				toolbars[i].onmousedown = function(e){
					X.drag(this.parentNode, e)
				}
			}
		}
		//模块隐藏
		//-----search模块功能-------
		//1.选择搜索引擎
		//2.选择搜索卡片
		//--------website模块功能---------
		

		//配置首页
		var q = H.$('.config');
		var len = q.length;
		for (var i = (len-1); i >= 0; i--){
			q[i].onclick = function(){
				Z.pageConfig();
			}
		}
		
	},
	//~用户类~
	user : {
		
		//登录用户名
		userName: null,
		
		//检测是否已登录,cookie中是否存在userId
		checkIsLogin: function(){
		
			Z.isLogin = X.getCookie("userId") ? true : false;
			
			if(isLogin){
				H.$('#loginSpan').innerHTML = userName;
				H.$('#registerSpan').innerHTML = "";
			}else{
				H.$('#loginSpan').innerHTML = ILOGIN;
				H.$('#registerSpan').innerHTML = IREGISTER;
			}
		},
		
		//用户登录方法
		loginTo : function(){
			//创建登录窗口
			var loginWindow = X.createPopupWin({//登录
				id:'login_popupWin',
				content:'<form class="content_popupWin" ><div><span class="popupWin_close">X</span></div><h1>Login</h1><fieldset><label for="userName">用户名: </label><input type="text" name="userName" id="userName" class="inputBox"/></fieldset><fieldset><label for="password">密   码: </label><input type="password" name="password" id="password" class="inputBox"/></fieldset><fieldset class="rememberMe"><input type="checkbox" class="rememberMe" name="rememberMe"/><label for="rememberMe" id="rememberMe"> 自动登录</label></fieldset> <fieldset><span class="loginbtn">登  录</span><a class="registerlink">免费注册</a></fieldset></form>',
				width:350,
				top:-100
			});
			
			var q = H.$('.loginbtn');
			var len = q.length;
			for (var i = (len-1); i >= 0; i--){
				q[i].onclick = function(){
					//???????????????登录业务，与后台链接
				}
			}
			
			var k = H.$('.registerlink');
			var len2 = k.length;
			for (var i = (len2-1); i >= 0; i--){
				k[i].onclick = function(){
					H.remove('login_popupWin');
					Z.user.registerIn();
				}
			}
			
		},
		
		//用户注册
		registerIn : function(){
			var registerWindow = X.createPopupWin({//注册
				id:'register_popupWin',
				top:-100,
				width:550,
				content:'<form class="content_popupWin"><div><span class="popupWin_close">X</span><div><h1>Rigester</h1><fieldset><label for="userName">用户名：</label><input type="text" id="userName" name="userName" class="inputBox"/><em></em><span class="itip">10个字符以内，中英文都行</span></fieldset><fieldset><label for="email">邮箱：</label><input type="email" id="email" name="email" class="inputBox"/><em></em><span class="itip">您的常用邮箱,作为另一个登录名</span></fieldset><fieldset><label for="password">密码：</label><input type="password" id="password" name="password" class="inputBox"/><em></em><span class="itip">6-25位数字字母组合</span></fieldset><fieldset><label for="pwdAgain">确认密码：</label><input type="password" id="pwdAgain" name="pwdAgain" class="inputBox"/><em></em><span class="itip">确认密码</span></fieldset><fieldset id="proto"><input type="checkbox" id="acceptProtocol" class="protocol" checked="checked"><a class="protocol" href="others/protocol.html">接受新导航用户协议</a></fieldset><fieldset><span class="registerbtn">立即注册</span><a class="loginlink">登录</a></fieldset></form>'
			});
			
			//M对象，标记表单各个字段是够验证通过
			var M = {
				userName:false,
				email:false,
				password:false,
				pwdAgain:false,			
			}
			
			var q = H.$('.registerBtn');
			var len = q.length;
			for (var i = (len-1); i >= 0; i--){
				q[i].onclick = function(){
					//???????????????注册业务，与后台链接
				}
			}
			
			var k = H.$('.loginlink');
			var len2 = k.length;
			for (var i = (len2-1); i >= 0; i--){
				k[i].onclick = function(){
					H.remove('register_popupWin');
					Z.user.loginTo();
				}
			}
		},
		
		logoutTo: function(){
			/*$.getJSON('userLogoutAction.action',function(){
				//清空cookie刷新当前页
				ZHX.setCookie('username','');
				ZHX.setCookie('password','');
				ZHX.setCookie('userId','');								
				location.replace("firstPage.jsp");
			});*/
		}
	},
	
	//首页配置
	pageConfig: function(){
	
		var winContent = '<form class="content_popupWin"><div><span class="popupWin_close">X</span>' 
						+ '<div><h1>Configuration<span id="back"><span class="undo back">'
						+ '<a href="#">撤销并返回首页</a></span>|<span class="save back"><a href="#">保存并返回首页</a></span></span></h1>' 
						+ '<div id="tab_config"><ul><li class="basic_config">基本设置</li><li class="module_config">常用模块</li><li class="entrance_config">快速入口</li></ul></div>' 
						+ '<div id="basic_config" class="clearfix"><form action="????.asp" method="POST">'
						+ 	'<p class="isOpen item"><span>页面配置是否开放共享</span><span class="radio"><label for="isyesOpen"><input type="radio" name="isOpen" value="isyesOpen"/>是</label><label for="isnotOpen"><input type="radio" name="isOpen" name="isnotOpen" checked="check"/>否</span></p><p class="itip">开放之后，您的首页配置将完全对外开放共享，别人可以查看或使用您的配置方案，但您的个人信息不会被公开</p>'
						+ 	'<p class="isLocked item"><span>是否锁定页面</span><span class="radio"><label for="isyesLocked"><input type="radio" name="isLocked" value="isyesLocked" />是</label><label for="isnotLocked"><input type="radio" name="isLocked" value="isnotLocked" checked="check"/>否</label></span></p><p class="itip">所定之后，您首页的所有模块不再可以改变位置，但可以通过每个模块的配置按钮进行内容配置</p>'
						+ '</form></div>'
						+ '<div id="module_config">'
						+ 	'<div id="modulehit" class="hit"><span class="left">模块名称</span><span class="center">模块描述</span><span class="right">显示该模块</span></div>'
						+   '<p id="mywebsite"><span class="left">我的常用网址</span><span class="center">配置自己的常用网址导航</span><span class="right"><input type="checkbox" name="displayMySites" checked="check"/></span></p>'
						+   '<p id="myweather"><span class="left">天气预报</span><span class="center">呈现您所在城市的未来三天的天气预报</span><span class="right"><input type="checkbox" name="displayMyWeather"/></span></p>'
						+   '<p id="myemail"><span class="left">我的邮箱</span><span class="center">配置自己的常用邮箱，作为该邮箱的快速登录入口</span><span class="right"><input type="checkbox" name="displayMyEmail" /></span></p>'
						+   '<p id="mynews"><span class="left">热点新闻</span><span class="center">为您推送最热点的新闻</span><span class="right"><input type="checkbox" name="displayMyNews" /></span></p>'
						+   '<div id="addMyselfModule" class="clearfix">'
						+		'<div id="addbtn">添加自定义模块</div>'
						+		'<form action="addModule.action" method="POST"><p><label for="module_name">模块名称:<input type="text" name="module_name" /></label></p>'
						+		'<p><label for="module_desc">模块描述:<input type="text" name="module_desc" /></label></p>'
						+		'<p><button name="module_ok">完成</button><button name="module_undo" >放弃</button></p></form>'
						+	'</div>'
						+ '</div>'
						+ '<div id="entrance_config">'
						+ 	'<p class="hit">您所选择的站点将直接显示在常用网址模块</p>'
						+	'<div id="socialSites" class="item clearfix"><em>社交</em>'
						+		'<span><a href="#" added="0">QQ空间</a><a href="#" added="0">朋友网</a><a href="#" added="0">人人网</a><a href="#" added="0">开心网</a><a href="#" added="0">新浪微博</a>'
						+		'<a href="#" added="0">QQ空间</a><a href="#" added="0">朋友网</a><a href="#" added="0">人人网</a><a href="#" added="0">开心网</a><a href="#" added="0">新浪微博</a>'
						+		'</span>'
						+	'</div>'
						+	'<div id="musicSites" class="item clearfix"><em>社交</em>'
						+		'<span><a href="#" added="0">QQ空间</a><a href="#" added="0">朋友网</a><a href="#" added="0">人人网</a><a href="#" added="0">开心网</a><a href="#" added="0">新浪微博</a>'
						+		'<a href="#" added="0">QQ空间</a><a href="#" added="0">朋友网</a><a href="#" added="0">人人网</a><a href="#" added="0">开心网</a><a href="#" added="0">新浪微博</a>'
						+		'</span>'
						+	'</div>'
						+	'<div id="emailSites" class="item clearfix"><em>社交</em>'
						+		'<span><a href="#" added="0">QQ空间</a><a href="#" added="0">朋友网</a><a href="#" added="0">人人网</a><a href="#" added="0">开心网</a><a href="#" added="0">新浪微博</a>'
						+		'<a href="#" added="0">QQ空间</a><a href="#" added="0">朋友网</a><a href="#" added="0">人人网</a><a href="#" added="0">开心网</a><a href="#" added="0">新浪微博</a>'
						+		'</span>'
						+	'</div>'
						+	'<div id="vedioSites" class="item clearfix"><em>社交</em>'
						+		'<span><a href="#" added="0">QQ空间</a><a href="#" added="0">朋友网</a><a href="#" added="0">人人网</a><a href="#" added="0">开心网</a><a href="#" added="0">新浪微博</a>'
						+		'<a href="#" added="0">QQ空间</a><a href="#" added="0">朋友网</a><a href="#" added="0">人人网</a><a href="#" added="0">开心网</a><a href="#" added="0">新浪微博</a>'
						+		'</span>'
						+	'</div>'
						+ '</div>';
						
		var configWindow = X.createPopupWin({
				id:'config_popupWin',
				top:-100,
				width:620,
				height:500,
				content: winContent
		});
		//?????
		
		
		/*
		 *用于激活每一个tab的事件
		 *
		 *使用方法：tabClickEvent({
		 *	            activeTab: 'basic_config',
		 *              sleepTabs: ['module_config', 'entrance_config'],
		 *           });
		*/
		var tabClickEvent = function (a){
		
			if(a.activeTab) {
				//改变激活的tab样式
				H.$('.'+a.activeTab)[0].style.backgroundColor = "#FFFFFF";
				H.$('.'+a.activeTab)[0].style.color = "#111111";
				//tab内容块的改变
				H.$('#'+a.activeTab).style.display = "block";
				console.log(a.activeTab);
			}
			
			if(a.sleepTabs) {
				console.log(a.sleepTabs.join(','));
				//设置别的tab事件效果
				for (var i = 0, l = a.sleepTabs.length; i < l; i++) {
					H.$('.'+a.sleepTabs[i])[0].style.backgroundColor = "#2584CE";
					H.$('.'+a.sleepTabs[i])[0].style.color = "#EEEEEE";
					H.$('#'+a.sleepTabs[i]).style.display = "none";
				}
			}
			
		};
		
		tabClickEvent({
				activeTab: 'basic_config',
				sleepTabs: ['module_config', 'entrance_config'],
		});
		
		//所有的tab的class
		var tabs = ['basic_config', 'module_config', 'entrance_config'];
		var t = tabs.slice(0);//数组深拷贝
		var l = t.length;
		var tem = [];
		for (var i = 0; i < l; t = tabs.slice(0),i++) {
			var tempActiveTab = t[i];
			t.splice(i,1);//删除该被激活tab，剩下的t就是sleepTabs
			//tem[i] = t.slice(0);
			tem[i] = {
					activeTab: tempActiveTab,
					sleepTabs: t,
				};
			H.addEventHandler(H.$('.'+tempActiveTab)[0], 'click', tabClickEvent(tem[i]), false);
			/*H.$('.'+tempActiveTab)[0].onclick = function(){
				var f = tabs.indexOf(tempActiveTab);
				tabClickEvent(tem[f]);
				console.log(t.join(','));
			};*/
			//console.log(tem[i].join(','));
		}
	},
	
	//获取当前时间，并且格式化
	getCurrentTime: function(){
		var d = new Date();
		return X.solarday(d);
	}
 };
 

 window.onload = function(){
 	
	Z.init();
 }
 
 