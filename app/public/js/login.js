$(document).ready(function () {


	// POST the user Log in info
	$("#submitLogin").on("click", function(event) {
		event.preventDefault();

		// get data from divs
		const data = {};
		data.username = $("#username").val().trim();
		data.email = $("#email").val().trim();
		data.password = $("#password").val().trim();

		// add validation here !!!!!!!


		
		$.post("/login", data).then(function () {
			$("#logInForm")[0].reset();
		});
		
	});

}); // end of document.ready