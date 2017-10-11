$(document).ready(function() {
	console.log("im here");

	$("#content").empty();


	getAllProducts();

	

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


function getAllProducts () {
	// first we get all categories 
	$.get("/api/get-all-categories", data => {
		var arr = [];
		for (var i in data ) {
			arr.push(data[i]);
		}
		console.log(JSON.stringify(data));
		getProductsByCategory(arr, 0, arr.length);

	});
}

function getProductsByCategory (arr, element, length) {
	// end recursion
	if (element === length) return;


	$.get(`/api/get-products-by-categories/${arr[element].id}`, function(data) {
		console.log(`product ${JSON.stringify(data)}`);
		makeTableForProduct(arr[element].name, data);

		// recursive call
		getProductsByCategory(arr, element + 1, length);
	});
	
	
}

// <thead>
//     <tr>
//       <th>#</th>
//       <th>First Name</th>
//       <th>Last Name</th>
//       <th>Username</th>
//     </tr>
//   </thead>

//   <button type="button" class="btn btn-danger">

function makeTableForProduct (category, data) {
	console.log ("making new table");

	// grabing content div making a list 
	var contentDiv = $("#content");

	// making unorder list 
	var unOrderedList = $("<ul>").addClass("list-group");

	// maing list element for the title
	var listItem = $("<li>").addClass("list-group-item active text-center");
	var title = $("<p>").addClass("card-text").html(category);

	// add title to first list element
	listItem.append(title);

	// making list element for the table
	var listItemTable = $("<li>").addClass("list-group-item")
	var table = $("<table>").addClass("table table-striped");

	

	// making the table head
	var tableHead = $("<thead>");
	var tableHeadRow= $("<tr>");
	var tableHeadId = $("<th>").html("ID");
	var tableHeadProduct = $("<th>").html("Product Name"); 
	var tableHeadAction = $("<th>").html("Action");

	// creating table head
	tableHead.append(tableHeadRow).append(tableHeadId).append(tableHeadProduct).append(tableHeadAction);

	// adding table head to table
	table.append(tableHead);


	// making table content
	var tableBody = $("<tbody>");
	for(var i in data){
		var tableBodyRow= $("<tr>");
		var tableBodyId = $("<th>").html(data[i].id);
		var tableBodyProduct = $("<th>").html(data[i].name); 		
		
		var btn = $("<button>", {
			on : {
				click : function () {
					$.ajax({
      					method: "DELETE",
				    	url: `/admin/remove-product/${data[i].id}`
				    }).done(function (data) {
				    	$("#content").empty();
						getAllProducts();
				    	console.log("success");
				    });
				}
			}
		}).addClass("btn btn-danger").html("DELETE");
		var tableBodyAction = $("<th>").append(btn);
		//append everything to te row then to the table body
		tableBodyRow.append(tableBodyId).append(tableBodyProduct).append(tableBodyAction);

		tableBody.append(tableBodyRow);

	}

	// adding tbody to table
	table.append(tableBody);
	// adding table to second elemnet of list
	listItemTable.append(table);

	// adding list elements to unorder list
	unOrderedList.append(listItem).append(listItemTable);

	contentDiv.append(unOrderedList);

}