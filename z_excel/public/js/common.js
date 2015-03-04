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

					window.location.reload();

				}

			},
			error: function (msg) {
			   	
			}
		});

	})

	// $("#control td .delete").on("click", function (){
		
	// 	$.ajax({
	// 		type: "post",
	// 		url: "http://127.0.0.1:3000/delete",
	// 		data: {
	// 			"del" : $(this).parents("tr").attr("title")
	// 		},

	// 		dataType: "json",
	// 		success: function (data) {
	// 		    // Play with returned data in JSON format
	// 		},
	// 		error: function (msg) {
			   	
	// 		}
	// 	});

	// })

})