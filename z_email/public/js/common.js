$(function(){

	// tijiao

	$("#control p a").on("click", function (){

		$.ajax({
			type: "post",
			url: "http://127.0.0.1:3000/email",
			data: {
				"email": $("#email").val()
			},
			dataType: "json",
			success: function (data) {
				
				// if(data.target){

				// 	window.location.reload();

				// }
				console.log(data);

			},
			error: function (msg) {
			   	
			}
		});

	})

})