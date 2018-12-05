$(function(){
	//女士字体变红
	$(".list_left").children("li").eq(1).children("a").css("color","red");
	//活动剩余时间
	
	//勾选框
	var lis = $(".type").find("li");
	var _lis = $(".choose").find("li");
	for(var i = 0;i < lis.length;i++){
		lis.eq(i).click(function(){
			var i = $(this).index();
			$(this).find("span").toggleClass("active");
			if($(this).find("span").hasClass("active")){
				$(".choose").show();
				$(".choose ul").children("li").eq(i).show();
			}else{
				$(".choose ul").children("li").eq(i).hide();
			}
			var isTrue = lis.find("span").hasClass("active");
			if(!isTrue){
				$(".choose").hide();
			}
		})
	//已选条件
		_lis.eq(i).click(function(){
			var i = $(this).index();
			$(this).hide();
			lis.find("span").eq(i).removeClass();
			if(_lis.parent().height() == 0){
				$(".choose").hide();
			}
		})
	}
	$(".choose").find("b").click(function(){
		lis.find("span").removeClass();
		_lis.hide();
		$(".choose").hide();
	})
	//商品查询吸顶
	var product_query_top = $(".product_query").offset().top - 42;
	$(window).scroll(function(){
		if(product_query_top <= $(document).scrollTop()){
			$(".product_query").css({"position":"fixed","top":42,"padding-bottom":"15px"});
		}else{
			$(".product_query").css({"position":"static","padding-bottom":"10px"});
		}
	})
	//单品
	$.get("json/商品列表.json",function(data){
		for(var n = 0;n < data.length;n++){
			var obj = data[n];
			var product = $("<div class='product' id=" + obj.id + "></div>");
			var product_img = $("<div class='product_img'></div>");
			var a = $("<a href='#'></a>");
			var product_label = $("<div class='product_label'>" + obj.buyer + "</div>");
			var img1 = $("<img src=" + obj.src1 + " title=" + obj.title + " class='img_first'/>");
			var img2 = $("<img src=" + obj.src2 + " title=" + obj.title + " />");
			var img3 = $("<img src=" + obj.src3 + " title=" + obj.title + " />");
			if(obj.buyer == undefined){
				a.append(img1,img2,img3);
			}else{
				a.append(product_label,img1,img2,img3);
			}
			product_img.append(a);
			var product_content = $("<div class='product_content'></div>");
			var brand_name = $("<p><a href='#'>" + obj.name + "</a></p>");
			var goods_name = $("<p><a href='#'>" + obj.title + "</a></p>");
			var price = $("<p><span>" + obj.price + "</span><span>" + obj.original_price + "</span></p>");
			product_content.append(brand_name,goods_name,price);
			var product_pic = $("<div class='product_pic'></div>");
			var index1 = $("<ul><li><img src=" + obj.index1 + "</li>");
			var index2 = $("<li><img src=" + obj.index2 + "</li>");
			var index3 = $("<li><img src=" + obj.index3 + "</li></ul>");
			product_pic.append(index1,index2,index3);
			product.append(product_img,product_content,product_pic);
			product.appendTo($(".contentDiv"));	
		}
		//单品展示效果
		for(var j = 0;j < $(".product").length;j++){
			$(".product").eq(j).find(".product_img").on("mouseenter",function(){
				$(this).siblings(".product_content").hide();
				$(this).siblings(".product_pic").show();
			})
			$(".product").eq(j).on("mouseleave",function(){
				$(this).find(".product_content").show();
				$(this).find(".product_pic").hide();
			})
			var li_pic = $(".product").eq(j).find(".product_pic").find("li");
			for(var x = 0;x < li_pic.length;x++){
				li_pic.eq(x).on("mouseenter",function(){
					var x = $(this).index();
					$(this).parents(".product_pic").siblings(".product_img").find("img").eq(x).show().siblings().hide();
				})
			}
		}
		$(".product").on("click",function(evt){
			var users = [];
			var user={
				id:$(this).attr("id")
			}
			users.push(user);
			$.cookie("products",JSON.stringify(users),{expires:100,path:"/"});
			evt.preventDefault();
			window.open("商品详情.html");
		})
		
	})
})