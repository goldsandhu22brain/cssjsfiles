
$(document).ready(function () {

	window.onload = function () {
		//Get total no. of CheckBoxes in side the GridView.
		var rowCount = $("#tblRows").attr("data-row-count");
		TotalChkBx = parseInt(rowCount);

		//Get total no. of checked CheckBoxes in side the GridView.
		Counter = 0;
	}

	var itemIds = [];

	var oTable = $('#grdpurchasecert').dataTable({
		stateSave: true
	});

	var allPages = oTable.fnGetNodes();

	$('body').on('click', '#headerCheckbox', function () {
		var CheckBox = this.checked;
		if (CheckBox) {
			$('input.chktestClass[type="checkbox"]', allPages).prop('checked', true);
			var rowcollection = oTable.$("input.chktestClass:checked", { "page": "all" });
			var gethdn = $("#hdncheckboxids").val();

			rowcollection.each(function (index, elem) {
				var a = gethdn.indexOf($(elem).attr("data-item-id"));
				if (a == -1) {
					itemIds.push($(elem).attr("data-item-id"));
					$("#hdncheckboxids").val(itemIds);

				}
			});

		}
		else {
			$('input.chktestClass[type="checkbox"]', allPages).prop('checked', false);
			$("#hdncheckboxids").val("");
			itemIds = [];
		}
		$(this).toggleClass('chktestClass');
	});

	$('body').on('click', '.chktestClass', function () {
		var CheckBox = this.checked;
		var gethdn = $("#hdncheckboxids").val();
		var currentItemID = $(this).attr("data-item-id");
		var a = gethdn.indexOf(currentItemID);
		if (CheckBox) {
			if (a == -1) {
				if (typeof (currentItemID) != "undefined") {
					itemIds.push(currentItemID)
					$("#hdncheckboxids").val(itemIds);
				}
			}
		}
		else {
			itemIds.splice($.inArray(currentItemID, itemIds), 1);
			$("#hdncheckboxids").val(itemIds);
		}
	});

	//dropdownselection
	$("#ddlStatus").change(function () {
		var offerType = $("#hdnofferType").val();
		var selectedValue = $("#ddlStatus option:selected");
		var assignStatusValue = selectedValue.val();
		location.href = "/user/corporate/assignuser?offeringtype=" + offerType + "&AssignStatus=" + assignStatusValue;
	});

});


function showLoading(isLoad) {
	if (isLoad) {
		$("#pageloaddiv").css("display", "inherit");

	} else {
		$("#pageloaddiv").css("display", "none");
	}
}

function MakePostCall(url, data, injectHtml = true) {
	showLoading(true);

	$.ajax({
		type: 'POST',
		cache: false,
		async: true,
		contentType: 'application/json; charset=utf-8',
		url: url,
		data: JSON.stringify(data),
		dataType: 'html',
		beforeSend: function () {
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function (response) {
			if (injectHtml || injectHtml == "true" || injectHtml === "true" || injectHtml == "True" || injectHtml === "True") {
				$("#CartBody").html(response);
			}
			showLoading(false);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert('Error Occurred, Kindly Contact Customer Support');
			showLoading(false);
		},
		complete: function () {
			$('.ajax-loader').css("visibility", "hidden");
		}
	});
}


function RemoveAllItemsFromCart(orderId) {
	var test = confirm('Are you sure you want to delete All Items from the Cart?');
	if (test == true || test == 'true') {
		MakePostCall('/User/Corporate/RemoveAllIems', { 'orderId': orderId });
	}
}

function DownloadExcelReport(offeringType, assignstatus) {
	var hdn = $("#hdncheckboxids").val();
	var array = hdn.split(',');
	var selectedCheckboxValues = array;

	window.location = "/User/Corporateapi/DownloadAssignUserExcel?offeringType=" + offeringType + "&AssignStatus=" + assignstatus + "&assignOfferingId=" + selectedCheckboxValues;
}


function DownloadExcelReport1(offeringType, assignstatus) {
	var selectedCheckboxValues = $("#hdncheckboxids").val();
	var data = JSON.stringify({
		"offeringType": offeringType,
		"AssignStatus": assignstatus,
		"assignOfferingId": selectedCheckboxValues
	});
	$.ajax({
		type: "POST",
		url: "/User/CorporateApi/DownloadAssignUserExcel",
		data: data,
		contentType: "application/json; charset=utf-8",
		dataType: "text",
		success: function (data) {

			if (data.fileName != "") {
				window.location = "/User/Corporateapi/Download?file=" + data.fileName
				//use window.location.href for redirect to download action for download the file
			}

			//window.location.href = data
		},
		failure: function (response) {
			alert(response.d);
		},
		error: function (response) {
			alert(response.d);
		}
	});
}

function RemoveAssignedUsers() {
	//get all checkbox checked Ids and form an List of Ids to call
	//CorporateApi->NotifyAssignedUsers with parameter of Ids
	//var itemIds = [];
	//$("#tblRows").find("input.chktestClass:checked").each(function () {
	//	itemIds.push($(this).attr("data-item-id"));
	//})
	//var inputData = JSON.stringify({
	//	"request": {
	//		"Ids": itemIds
	//	}
	//});

	var itemIds = $("#hdncheckboxids").val();
	if (itemIds != "" && typeof (itemIds) != "undefined") {
		var temp = new Array();
		temp = itemIds.split(",");
		var inputData = JSON.stringify({
			"request": {
				"Ids": temp
			}
		});

		$.ajax({
			url: '/User/CorporateApi/RemoveAssignedUsers',
			type: "POST",
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data: inputData,
			beforeSend: function () {
				$('.ajax-loader').css("visibility", "visible");
			},
			success: function (result) {
				if (result != null && result.Status == 200) {
					Success("AssignedUser removed successfully");
				}
				else {
					Warning("Error while uploading file");
				}
			},
			error: function () {
				Warning("Error while uploading file");
			},
			complete: function () {
				$('.ajax-loader').css("visibility", "hidden");
			}
		});
	}
	else {
		alert("Please select a Course")
	}


}
function NotifyAssigmentToUsers() {
	//get all checkbox checked Ids and form an List of Ids to call
	//CorporateApi->NotifyAssignedUsers with parameter of Ids
	var itemIds = [];
	$("#tblRows").find("input.chktestClass:checked").each(function () {
		itemIds.push($(this).attr("data-item-id"));
	})
	var inputData = JSON.stringify({
		"request": {
			"Ids": itemIds
		}
	});
	$.ajax({
		url: '/User/CorporateApi/NotifyAssignedUsers',
		type: "POST",
		contentType: 'application/json; charset=utf-8',
		data: inputData,
		dataType: 'json',
		beforeSend: function () {
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function (result) {
			if (result != null && result.Status == 200) {
				Success("Intimation updated successfully");
			}
			else {
				Warning("Error while uploading file");
			}
		},
		error: function () {
			Warning("Error while uploading file");
		},
		complete: function () {
			$('.ajax-loader').css("visibility", "hidden");
		}
	});

}


function UpdateAssignmentByExcel(offeringType) {

	var method = "";
	if (offeringType == "Test") {
		method = "UpdateAssignmentByExcelForTest";
	}
	else if (offeringType == "TestCourse") {
		method = "UpdateAssignmentByExcelForTestCourse";
	}
	else if (offeringType == "VideoCourse") {
		method = "UpdateAssignmentByExcelForVideo";
	}
	else if (offeringType == "Course") {
		method = "UpdateAssignmentByExcelForCourse";
	}

	if (method == "") {
		alert('Not Valid');
		event.preventDefault();
	}
	else {
		var fileUpload = $("#fupUploadFile").get(0);
		var files = fileUpload.files;

		// Create  a FormData object
		var fileData = new FormData();

		// if there are multiple files , loop through each files
		for (var i = 0; i < files.length; i++) {
			fileData.append(files[i].name, files[i]);
		}

		$.ajax({
			url: '/User/CorporateApi/' + method,
			type: "POST",
			processData: false,
			contentType: false,
			data: fileData,
			beforeSend: function () {
				$('.ajax-loader').css("visibility", "visible");
			},
			success: function (result) {
				if (result != null && result.Status == 200) {
					Success("File uploaded successfully");
					$("#fupUploadFile").val(null);
					Window.location = "/User/Corporate/assignuser";
				}
				else {
					Warning("Error while uploading file");
					$("#fupUploadFile").val(null);
				}
			},
			error: function () {
				Warning("Error while uploading file");
				$("#fupUploadFile").val(null);
			},
			complete: function () {
				$('.ajax-loader').css("visibility", "hidden");

			}
		});
	}
}




$(function () {
	var TotalChkBx = 0;
	var Counter = 0;
});


function HeaderClick(CheckBox) {

	//Get all the control of the type INPUT in the base control.
	var Inputs = $("#tblRows").find("input.chktestClass");

	//Checked/Unchecked all the checkBoxes in side the GridView.
	for (var n = 0; n < Inputs.length; ++n)
		Inputs[n].checked = CheckBox.checked;


	//Reset Counter
	Counter = CheckBox.checked ? TotalChkBx : 0;
}



//$("#ddlStatus").change(function () {
//	var selectedValue = $("#ddlStatus option:selected");
//	var assignStatusValue = selectedValue.val();
//	alert(offerId);
//	var input = {
//		"assignStatus": assignStatusValue
//	};

//	$.ajax({
//		url: "/helpdesk/InsertUpdateTicket",
//		type: "POST",
//		data: input,
//		success: function (data) {

//			if (data.Status === 200) {
//				alert("Ticket updated sucessfully");
//				location.href = "/helpdesk";
//			}
//			else {
//				alert("Error occured");
//			}
//		},
//		error: function () {
//			$('#btnAddTicket').attr("disabled", false);
//		},
//		complete: function () {
//			$('.ajaxloader,.ajax-loader').css("display", "none");
//		}
//	});

//});