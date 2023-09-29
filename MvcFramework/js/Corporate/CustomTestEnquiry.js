$(document).ready(function () {
	$("#btnSubmit").click(function () {
		if (ValidateInputes()) {
			ButtonDisableEnable("Please Wait...", true, "btnSubmit");
			//showLoading(true);
			$.ajax({
				type: 'POST',
				cache: false,
				async: true,
				contentType: 'application/json; charset=utf-8',
				url: '/Enquiry/Submit',
				data: JSON.stringify({
					'FName': $('#FName').val(), 'LName': $('#LName').val(),
					'CompanyName': $("#CompanyName").val(),
					'EmailAddress': $("#EmailAddress").val(),
					'Question': $("#Question").val(), 'Status': '5'
				}),
				dataType: 'json',
				success: function (response) {
					if (response != null) {
						if (response.Status == 200) {
							Success("Your Enquiry is Send Sucessfully.");
							$("#Question").val("");
						}
						else {
							Warning(response.Message);
						}
					}
					else {
						Warning("Error Occurred, Contact Support Team");
					}
					ButtonDisableEnable("Submit", false, "btnSubmit");
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest);
					Warning("Error Occurred, Contact Support Team");
				}
			});
		}
	});
});

function ValidateInputes() {
	var validate = '<ul>';
	var isValid = true;
	if ($("#fName").val() == "") {
		validate += "<li>Firstname Cannot be empty.</li>";
		isValid = false;
	}
	if ($("#lName").val() == "") {
		validate += "<li>Lastname Cannot be empty.</li>";
		isValid = false;
	}
	if ($("#CompanyName").val() == "") {
		validate += "<li>Company Cannot be empty.</li>";
		isValid = false;
	}
	if ($("#EmailAddress").val() == "") {
		validate += "<li>Contact Email Cannot be empty.</li>";
		isValid = false;
	}
	else {
		if (!ValidateEmail($("#EmailAddress").val())) {
			validate += "<li>Please enter valid email address.</li>";
			isValid = false;
		}
	}
	if ($("#Question").val() == "") {
		validate += "<li>Requirement Cannot be empty.</li>";
		isValid = false;
	}
	if (!isValid) {
		Warning(validate);
	}
	return isValid;
}