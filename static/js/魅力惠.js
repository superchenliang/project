$(function(){
	//商品
	var goods_photo = $(".goods_photo");
	for(var n = 0;n < goods_photo.length;n++){
		goods_photo.eq(n).on("mouseenter",function(){
			$(this).find(".blackbox").show();
			$(this).find("img").stop().animate({width:340,height:212,margin:-10},1000);
			$(this).on("mouseleave",function(){
				$(".blackbox").hide();
				$(this).find("img").stop().animate({width:320,height:192,margin:0},500);
			})
		})

	}
	//今日新上轮播图
	$(".goods_lun a").first().clone().appendTo(".goods_lun");
	var size = $(".goods_lun a").length;
	var i = 0;
	var timer = setInterval(function(){
		move();
		i++;
	},2000)
	function move(){
		if(i >= size){
			$(".goods_lun").css("left",0);
			i = 1;
		}
		$(".goods_lun").stop().animate({left: -i*320},1000)
	}
	//活动即将开始，json传值
	function brands(data){
		for(var i = 0;i < data.length;i++){
			var obj = data[i];
			var brand = $("<div></div>");
			brand.addClass("brand");
			var tab = $("<img src=" + obj.src + " />");
			var brand_name = $("<div></div>");
			brand_name.addClass("brand_name");
			var h5 = $("<h5>" + obj.name + "</h5>");
			var sale = $("<p><span>" + obj.sale + "</span>折起</p>")
			$(brand_name).append(h5,sale);
			var black = $("<div></div>");
			$(black).addClass("black");
			var subscribe = $("<div></div>");
			$(subscribe).addClass("subscribe");
			var uls = $("<ul><li><a href='#'>" + obj.preview + "</a></li><li><a href='#'>" + obj.subscribe + "</a></li></ul>");
			if(obj.preview == undefined){
				uls = $("<ul><li class='only'><a href='#'>" + obj.subscribe + "</a></li></ul>");
				
			}
			$(uls).appendTo(subscribe);
			$(subscribe).appendTo(black);
			$(brand).append(tab,brand_name,black);
			$(brand).appendTo(".brands");
		}
		//活动即将开始，触碰商标
		for(var m = 0;m < $(".brand").length;m++){
			$(".brand").eq(m).on("mouseenter",function(){
				$(this).find(".black").show();
				$(this).on("mouseleave",function(){
					$(this).find(".black").hide();
				})
			})
		}
	}
	//初始显示
	var week = $(".tab ul li");
	$.get("json/活动即将开始1.json",function(data){
		brands(data);
	})
	week.eq(0).addClass("back");
	//星期切换
	for(var j = 0;j < week.length;j++){
		week.eq(j).on("click",function(){
			$(".brand").remove();
			var index =$(this).index();
			$(this).addClass("back").siblings().removeClass();
			var jSon = "json/活动即将开始" + (index + 1) + ".json";
			$.get(jSon,function(data){
				brands(data);
			})
		})
	}
	//页面滚动
	var nav_top = $(".nav").offset().top;
	$(window).scroll(function(){
		//商品列表滚动
		if($(document).scrollTop() >= 0 && $(document).scrollTop() <= 300){
			$(".content_out").css("marginTop", -$(document).scrollTop()-100);
		}else{
			$(".content_out").css("marginTop", "-400px");
		}
		//返回顶部
		if($(window).scrollTop() >= window.innerHeight){
			$(".return").show();
			$(".return").on("click",function(){
				$(window).scrollTop(0);
			})
		}else{
			$(".return").hide();
		}
	})
})