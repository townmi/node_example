$(function(){

	// tijiao

	$("#control p a").on("click", function (){

		if(!$("#name").val() || !$("#price").val() || !$("#number").val() || !$("#date").val() || !$("#pro_u").val() || !$("#user").val()) return;

		$.ajax({
			type: "post",
			url: "http://127.0.0.1:3000/post",
			data: {
				"name" : $("#name").val(),
				"price": $("#price").val(),
				"number": $("#number").val(),
				"date" : $("#date").val(),
				"pro_u" : $("#pro_u").val(),
				"user" :$("#user").val()
			},

			dataType: "json",
			success: function (data) {
				if(data.target){

					window.location.reload();

				}
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
			    if(data.target){

			    	window.location.reload();

			    }
			},
			error: function (msg) {
			   	
			}
		});

	})

})