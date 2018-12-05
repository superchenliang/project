$(function(){
	//手机下载APP
	$(".header_right").find("li").eq(2).on("mouseenter",function(){
		$(".download").show();
		$(this).on("mouseleave",function(){
			$(".download").hide();
		})
	})
	//列表菜单
	var list_left_li = $(".list_left>li");
	for(var i = 0;i < list_left_li.length;i++){
		list_left_li.eq(i).on("mouseenter",function(){
			$(this).find(".smallnav").show();
			$(this).on("mouseleave",function(){
				$(".smallnav").hide();
			})
		})

	}	
	//购物袋
	$(".list_right").on("mouseenter",function(){
		$(".shopping").stop().slideDown("slow");
		$(this).on("mouseleave",function(){
			$(".shopping").stop().slideUp("slow");
		})
	})
	$(".shopping").find("a").on("click",function(){
		$(".shopping").stop().slideUp("fast");
	})
	
	var count = $.cookie("goods");
	var sum = 0;
	if(count == undefined){
		$(".sum").html(sum);
	}else{
		count = JSON.parse(count);
		for(var i = 0;i < count.length;i++){
			var num = count[i].num * 1;
			sum += num;
		}
		$(".sum").html(sum);
	}
	
	//页面滚动
	var nav_top = $(".nav").offset().top;
	$(window).scroll(function(){
		//吸顶菜单栏
		if(nav_top <= $(document).scrollTop()){
			$(".nav").css({position:"fixed",top:0})
		}else{
			$(".nav").css("position", "static")
		}
	})
})