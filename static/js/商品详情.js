$(function(){
	//女士字体变红
	$(".list_left").children("li").eq(1).children("a").css("color","red");
	//左侧图片
	var li_small = $(".pic").find("li");
	for(var i = 0;i < li_small.length;i++){
		li_small.eq(i).on("click",function(){
			var i = $(this).index();
			$(".img").eq(i).show().siblings(".img").hide();
			$(".big_img").eq(i).show().siblings(".big_img").hide();
		})
	}
	//放大镜
	$(".small_img").on("mousemove",function(evt){
		evt = evt || window.event;
		var leftMove = evt.pageX - $(".small_img").offset().left - $(".small_area").width() / 2;
		var topMove = evt.pageY - $(".small_img").offset().top - $(".small_area").height() / 2;
		if(leftMove <= 0){
			leftMove = 0;
		}
		else if(leftMove >= $(".small_img").width() - $(".small_area").width()){
			leftMove = $(".small_img").width() - $(".small_area").width();
		}
		if(topMove <= 0){
			topMove = 0;
		}
		else if(topMove >= $(".small_img").height() - $(".small_area").height()){
			topMove = $(".small_img").height() - $(".small_area").height();
		}
		$(".small_area").css({left:leftMove,top:topMove});
		$(".big_img").css({left:leftMove*-2,top:topMove*-2});
		$(".small_area").show();
		$(".big_area").show();
	})
	$(".small_img").on("mouseleave",function(){
		$(".small_area").hide();
		$(".big_area").hide();
	})
	//右侧商品数量加减
	var count = 1;
	$(".add").on("click",function(){
		count++;
		$(".number").html(count);
		if($(".number").html() != 1){
			$(".reduce").css("color","black");
		}
	})
	
	$(".reduce").on("click",function(){
		if($(".number").html() > 1){
			count--;
			$(".number").html(count);
		}else{
			$(".reduce").css("color","#ccc");
			$(".number").html() = 1;
		}
	})
	//cookie,同步商品信息
	var product = $.cookie("products");
	if(product){product = JSON.parse(product)};
	$.get("json/商品详情.json",function(data){
		for(var i = 0;i < data.length;i++){
			var obj = data[i];
			if(obj.id == product[0].id){
				$(".content_header").find("li").eq(2).find("a").text(obj.name);
				$(".content_header").find("li").eq(3).text(obj.title);
				$(".img").eq(0).attr({"src":obj.src1,"title":obj.title});
				$(".img").eq(1).attr({"src":obj.src2,"title":obj.title});
				$(".img").eq(2).attr({"src":obj.src3,"title":obj.title});
				$(".img").eq(3).attr({"src":obj.src4,"title":obj.title});
				$(".big_img").eq(0).attr({"src":obj.src1});
				$(".big_img").eq(1).attr({"src":obj.src2});
				$(".big_img").eq(2).attr({"src":obj.src3});
				$(".big_img").eq(3).attr({"src":obj.src4});
				$(".pic").find("img").eq(0).attr({"src":obj.index1,"title":obj.title});
				$(".pic").find("img").eq(1).attr({"src":obj.index2,"title":obj.title});
				$(".pic").find("img").eq(2).attr({"src":obj.index3,"title":obj.title});
				$(".pic").find("img").eq(3).attr({"src":obj.index4,"title":obj.title});
				$(".goods_right").find("h3").html(obj.title);
				$(".price").text(obj.price);
				$(".original_price").html(obj.original_price);
				$(".smallImg").attr("src",obj.index1);
				$(".btn").attr("id",obj.id);
				//商品加入购物袋
				$(".btn").on("click",function(evt){
					evt.preventDefault();
					var products1 = $.cookie("goods") ? JSON.parse($.cookie("goods")) : [];
					var isExists = false;
					for (var i = 0; i < products1.length; i++) {
						if ($(".btn").attr("id") == products1[i].id) {
							products1[i].num++;
							isExists = true;
						}
					}
					if (!isExists) {
						var product1 = {
							id: $(".btn").attr("id"),
							num: $(".number").html()
						}
						products1.push(product1);
					}
					var sum = $(".sum").html()*1;
					var number = $(".number").html()*1;
					$(".sum").html(number + sum);
					$.cookie("goods", JSON.stringify(products1), {expires:100, path:"/"});
				})
			}
		}
	})
	
})