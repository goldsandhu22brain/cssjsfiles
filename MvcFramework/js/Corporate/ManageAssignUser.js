function btnSubmitNonTest() {
	if (ValidateInput()) {

		var fdata = $("#frm-edittest").serializeArray();

		if (fdata.length > 0) {
			ButtonDisableEnable("Submitting", true, "btnSubmit");

			var jsonData = JSON.stringify({
				FirstName: fdata[0].value,
				LastName: fdata[1].value,
				EmailAddress: fdata[2].value,
				EnrolledDate: fdata[3].value,
				Id: fdata[4].value,
				ExpiredDate: fdata[5].value,
				OfferingType: fdata[6].value,
				CompanyId: fdata[7].value,
				TestType: fdata[8].value,
				AssignStatus: fdata[9].value,
				expire: fdata[10].value
			});

			$.ajax({
				type: 'POST',
				cache: false,
				async: true,
				contentType: 'application/json; charset=utf-8',
				url: '/User/CorporateApi/UpdateAssignUserOnOffering',
				data: jsonData,
				dataType: 'json',
				beforeSend: function () {
					$('.ajax-loader').css("visibility", "visible");
				},
				success: function (response) {
					if (response != null && response.Status == 200) {
						Success(response.Message);
						//redirection
						window.location = location.origin + location.pathname;
					}
					else {
						Warning(response.Message);
					}

				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest);
				},
				complete: function () {
					ButtonDisableEnable("Submit", false, "btnSubmit");
					$('.ajax-loader').css("visibility", "hidden");
				}
			});
		}
	}

}
function btnSubmitAssignTest() {
	if (ValidateInput()) {

		var fdata = $("#frm-edittest").serializeArray();

		if (fdata.length > 0) {
			ButtonDisableEnable("Submitting", true, "btnSubmit");

			var jsonData = JSON.stringify({
				FirstName: fdata[0].value,
				LastName: fdata[1].value,
				EmailAddress: fdata[2].value,
				EnrolledDate: fdata[3].value,
				Id: fdata[5].value,
				ExpiredDate: fdata[6].value,
				CompanyId: fdata[7].value,
				expire: fdata[4].value,
				TestType: fdata[8].value,
				AssignStatus: fdata[9].value
			});

			$.ajax({
				type: 'POST',
				cache: false,
				async: true,
				contentType: 'application/json; charset=utf-8',
				url: '/User/CorporateApi/UpdateAssignUserOnOffering',
				data: jsonData,
				dataType: 'json',
				beforeSend: function () {
					$('.ajax-loader').css("visibility", "visible");
				},
				success: function (response) {
					if (response != null && response.Status == 200) {
						Success(response.Message);
						//redirection
						window.location = location.origin + location.pathname;
					}
					else {
						Warning(response.Message);
					}

				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest);
				},
				complete: function () {
					ButtonDisableEnable("Submit", false, "btnSubmit");
					$('.ajax-loader').css("visibility", "hidden");
				}
			});
		}
	}
}
function btnSubmit() {
	if (ValidateInput()) {

		var fdata = $("#frm-edittest").serializeArray();

		if (fdata.length > 0) {
			ButtonDisableEnable("Submitting", true, "btnSubmit");

			var jsonData = JSON.stringify({
				FirstName: fdata[0].value,
				LastName: fdata[1].value,
				EmailAddress: fdata[2].value,
				EnrolledDate: fdata[3].value,
				Id: fdata[5].value,
				ExpiredDate: fdata[6].value,
				CompanyId: fdata[7].value,
				expire: fdata[4].value,
				TestType: fdata[8].value,
				AssignStatus: fdata[9].value
			});

			$.ajax({
				type: 'POST',
				cache: false,
				async: true,
				contentType: 'application/json; charset=utf-8',
				url: '/User/CorporateApi/UpdateAssignUserOnOffering',
				data: jsonData,
				dataType: 'json',
				beforeSend: function () {
					$('.ajax-loader').css("visibility", "visible");
				},
				success: function (response) {
					if (response != null && response.Status == 200) {
						Success(response.Message);
						//redirection
						window.location = location.origin + location.pathname;
					}
					else {
						Warning(response.Message);
					}

				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest);
				},
				complete: function () {
					ButtonDisableEnable("Submit", false, "btnSubmit");
					$('.ajax-loader').css("visibility", "hidden");
				}
			});
		}
	}
}
function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

function ValidateInput(loader = 0) {
	var validateMsg = "<ul>";
	var isValid = true;
	if ($("#firstname").val().trim() == '') {
		validateMsg += "<li>First Name cannot be empty.</li>";
		isValid = false;
	}
	if ($("#lastname").val().trim() == '') {
		validateMsg += "<li>Last Name cannot be empty.</li>";
		isValid = false;
	}
	if ($("#emailid").val().trim() == '') {
		validateMsg += "<li>Email Address cannot be empty.</li>";
		isValid = false;
	}
	if ($("#emailid").val().trim() != '') {
		if (!ValidateEmail($("#emailid").val().trim())) {
			validateMsg += "<li>Entered Email Address is not valid.</li>";
			isValid = false;
		}
	}
	//Differnt Type of check's based on page Loaded
	if (loader == 1) {

	}
	//if ($("#bookDate").val().trim() == '') {
	//	validateMsg += "<li>Test Book Date is not selected.</li>";
	//	isValid = false;
	//}
	//if ($("#expire").val().trim() == '') {
	//	validateMsg += "<li>Expiry Days cannot be empty.</li>";
	//	isValid = false;
	//}

	if (!isValid) {
		validateMsg += "</ul>";
		Warning(validateMsg);
	}
	return isValid;
}

function ValidateDateInput() {
	var validateMsg = "<ul>";
	var isValid = true;

	if ($("#bookDate").val().trim() == '') {
		validateMsg += "<li>Test Book Date is not selected.</li>";
		isValid = false;
	}

	if (!isValid) {
		validateMsg += "</ul>";
		Warning(validateMsg);
	}
	return isValid;
}
function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

function formatDate(date) {
	return [
		date.getFullYear(),
		padTo2Digits(date.getMonth() + 1),
		padTo2Digits(date.getDate())
	].join('-');
}
$(document).ready(function () {
	$("#bookDate").attr("min", formatDate(new Date()));
	$("#bookDate").on("change", function () {
		this.setAttribute(
			"data-date",
			moment(this.value, "YYYY-MM-DD")
				.format(this.getAttribute("data-date-format"))
		)
	}).trigger("change")
});