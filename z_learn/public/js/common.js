$(function(){

	$("#red").on("click", function(){

		$.ajax({
			type: "post",
			url: "http://127.0.0.1:3000/reg",
			data: {
				"login":true
			},
			dataType: "json"
			success: function (data) {

				console.log(data);

			},
			error: function (msg) {
			   		
			   	// console.log(msg);

			}
		})

	})

})