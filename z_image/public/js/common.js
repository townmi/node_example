$(function(){

	// tijiao

	$("#control p a").on("click", function (){

		var formobj =  document.getElementById("form");

		var data = new FormData(formobj);

    	// data.append('file', $('#file')[0].files[0]);

		$.ajax({
			type: "post",
			url: "http://127.0.0.1:3000/file",
			data: data,
			processData: false,
        	contentType: false,
			success: function (data) {
				
				if(data.target){

					$("#back").attr("src", data.name);

					$("#back").load(function(){



						$("#Img .old").show().css("top", (300-$("#Img .old").height())/2);

						$("#face").css("width" , $("#back").outerWidth()).attr("src", data.name);



						move($("#move"),$("#face"));

					})

				}

				// console.log(data);

			},
			error: function (msg) {
			   	
			}
		});

	});

	function move(obj,face){

		var box = obj;
		var parent = obj.parent();
		var see = true;

		// console.log(parent)

		obj.on("mousedown", function (e){

			// console.log(e)

			var X = e.clientX - box.offset().left;
			var Y = e.clientY - box.offset().top;
			var W = parent.width();
			var H = parent.height();

			console.log(X,Y)

			$(document).on('mousemove', function (e){

				var L = e.clientX - X - parent.offset().left;
				var T = e.clientY - Y - parent.offset().top;

				console.log(L, T)

				if(see){

					if(L < 0+1) L = 0;
					if(T < 0+1) T = 0;
					if(L > W-box.outerWidth()-1) L = W-box.outerWidth();
					if(T > H-box.outerHeight()-1) T = H-box.outerHeight();

				}

				box.css({
					left : L,
					top : T
				});
				face.css({
					left : -L,
					top : -T
				})
			});
			$(document).on('mouseup', function (e){
				$(document).off("mousemove mouseup");
			});

			return false;

		})

	}
})