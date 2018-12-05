$(function(){
	//账户名
	$("#user").on("focus",function(){
		$(this).on("blur",function(){
			//验证是否为空，电话和邮箱，或都不是
			var reg_user_phone = /^1[3578]\d{9}$/;
			var reg_user_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\.[a-zA-Z]+$/;
			if($(this).val() == ""){
				$("#entry_user").show();
				$("#entry_user_true").hide();
			}else if(reg_user_phone.test($(this).val())){
				$("#entry_user").hide();
				$("#entry_user_true").hide();
				$(".code2").show();
				$(".phone_code").show();
			}else if(reg_user_email.test($(this).val())){
				$("#entry_user").hide();
				$("#entry_user_true").hide();
				$(".code2").hide();
				$(".phone_code").hide();
			}
			else{
				$("#entry_user").hide();
				$("#entry_user_true").show();
			}
		})
	})
	//密码
	var down1 = /^[0-9]{6,20}$/;
	var down2 = /^[a-z]{6,20}$/;
	var down3 = /^[A-Z]{6,20}$/;
	var down4 = /^[\s\.\,\/\-\_]{6,20}$/;
	var middle1 = /^[0-9a-z]{6,20}$/;
	var middle2 = /^[0-9A-Z]{6,20}$/;
	var middle3 = /^[A-Za-z]{6,20}$/;
	var middle4 = /^([0-9\s\.\,\/\-\_]){6,20}$/;
	var middle5 = /^([a-z\s\.\,\/\-\_]){6,20}$/;
	var middle6 = /^([A-Z\s\.\,\/\-\_]){6,20}$/;
	var top1 = /^[0-9a-zA-Z]{6,20}$/;
	var top2 = /^([a-zA-Z\s\.\,\/\-\_]){6,20}$/;
	var top3 = /^([0-9A-Z\s\.\,\/\-\_]){6,20}$/;
	var top4 = /^([a-z0-9\s\.\,\/\-\_]){6,20}$/;
	var top5 = /^([A-Za-z0-9\s\.\,\/\-\_]){6,20}$/;
	$("#password").on("focus",function(){
		$(window).keyup(function(){
			if($("#password").val() != ""){
				var value_p = $("#password").val();
				$("#entry_password").hide();
				$("#entry_password_last").show();
				$("#entry_password_danger").hide();
				$(".password").show();
				$(".password").find("span").eq(0).css("background","black").siblings().css("background","rgb(146,146,146)");
				if(down1.test(value_p) || down2.test(value_p) || down3.test(value_p) || down4.test(value_p)){
					$("#entry_password_last").hide();
					$("#entry_password_danger").show();
				}else if(middle1.test(value_p) || middle2.test(value_p) || middle3.test(value_p) || middle4.test(value_p) || middle5.test(value_p) || middle6.test(value_p)){
					console.log($("#password").val());
					$("#entry_password_last").hide();
					$("#entry_password_danger").hide();
					$(".password").find("span").eq(1).css("background","black");
				}else if(top1.test(value_p) || top2.test(value_p) || top3.test(value_p) || top4.test(value_p) || top5.test(value_p)){
					$("#entry_password_last").hide();
					$("#entry_password_danger").hide();
					$(".password").find("span").css("background","black");
				}
			}else{
				$("#entry_password").show();
				$("#entry_password_last").hide();
				$("#entry_password_danger").hide();
				$(".password").hide();
			}
		})
	})
	//确认密码
	$("#_password").on("blur",function(){
		if($("#_password").val() != $("#password").val()){
			$("#disagree").show();
		}else{
			$("#disagree").hide();
		}
	})
	//验证码
	$("#Txtidcode").on("focus",function(){
		$("#entry_code").show();
		$("#entry_code_true").hide();
		$(this).on("blur",function(){
			var IsBy = $.idcode.validateCode();
			if(IsBy){
				$("#entry_code").hide();
				$("#entry_code_true").hide();
			}else{
				$("#entry_code").hide();
				$("#entry_code_true").show();
			}
		})
	})
	//您将收到魅力惠每日最新上线邮件
	$("#checkbox").click(function(){
		if($(this).hasClass("checkbox1")){
			$(this).removeClass("checkbox1").addClass("checkbox2");
		}else if($(this).hasClass("checkbox2")){
			$(this).removeClass("checkbox2").addClass("checkbox1");
		}
	})
	$.idcode.setCode();
	//点击立即注册，注册账号
	$("#register").on("click",function(){
		//注册(cookie存储)
		var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
		//先判断是否存在该用户
		for (var i=0; i<users.length; i++) {
			if(users[i].name == $("#user").val() ) {
				$("#again").show();
				return;
			}
		}
		//注册用户
		var user = {
			name: $("#user").val(),
			pwd: $("#password").val()
		}
		users.push(user); 
		$.cookie("users", JSON.stringify(users), {expires:22, path:"/"});
		window.open("登录页面.html");
		console.log( $.cookie("users") );
	})
	//会员登录
	$("#login").click(function(){
		var users = $.cookie("users");
		console.log(users);
		if (users) {
			users = JSON.parse(users); //cookie中的所有注册过的用户
			var isExists = false; //表示是否存在该用户
			for (var i=0; i<users.length; i++) {
				if ( users[i].name == $("#user").val() && users[i].pwd == $("#password").val() ) {
					window.open("魅力惠.html");
					$("#wrong").hide();
					isExists = true;
				}
			}
			if (!isExists) {
				$("#wrong").show();
			}
			
		}
		else {
			alert("不存在用户, 请先注册!");
		}
	})
})