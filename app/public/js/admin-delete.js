$(document).ready(function() {
	console.log("im here");


	$("#submitbtnId").on("click", function (event) {
		var category = $("#dropDownSelect").val();
		$.ajax({
			method: "DELETE",
			url: `/admin/remove-category/${category}`
		}).done(function (data){
			console.log("success");
		});
	});


});