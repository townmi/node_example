$(function(){

	// tijiao

	$("#control p a").on("click", function (){

		console.log($("#file"));

		$.ajax({
			type: "post",
			url: "http://127.0.0.1:3000/file",
			data: {
			},

			dataType: "json",
			success: function (data) {

			},
			error: function (msg) {
			   	
			}
		});

	})

	$("#control td .delete").on("click", function (){
		
		$.ajax({
			type: "post",
			url: "http://127.0.0.1:3000/delete",
			data: {
				"del" : $(this).parents("tr").attr("title")
			},

			dataType: "json",
			success: function (data) {
			    // Play with returned data in JSON format
			},
			error: function (msg) {
			   	
			}
		});

	})

})