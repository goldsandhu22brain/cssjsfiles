function DeleteDocument(id, documentType) {
	let confirmAction = confirm("Are you sure To Delete?");
	if (confirmAction) {
		$.ajax({
			url: "/profile/ManageDocumentDelete?idType=" + id,
			type: "GET",
			success: function (data) {
				if (data.Status === 200) {
					Success('File Deleted Successfully');
					location.reload();
				}
				else if (data.Status = 201) {
					location.href = "/login";
				}
			},
			error: function (err) {
				Warning(err.statusText);
			}
		});
	}
}

function DeleteUserAccount() {

	$.ajax({
		url: "/profile/DeleteUserAccount",
		type: "POST",
		success: function (data) {
			if (data.Status === 200) {
				InfoGritter('<ul><li>Your account deleted successfully.</li></ul>');
				location.href = '/Login.aspx';
			}
			else {
				InfoGritter('<ul><li>Please contact administrator to delete your account.</li></ul>');
			}
		},
		error: function (err) {
			Warning(err.statusText);
		}
	});

}

function OnUpload(fileType, divId) {
	if (window.FormData !== undefined) {
		$('body').addClass('loader');
		$('body').removeClass('loaded');


		var formData = new FormData()
		var isValid = false;

		var fileUpload = $('#proofUpload_' + divId).get(0);
		if (fileUpload != undefined) {
			var files = fileUpload.files;
			if (files != undefined && files != null) {
				formData.append("file", files[0]);
				isValid = true;
			}
		}

		if (isValid) {
			formData.append('DocumentType', fileType);


			$.ajax({
				url: "/profile/UploadDocument",
				type: "POST",
				data: formData,
				contentType: false,
				processData: false,
				success: function (data) {
					if (data.Status === 200) {
						$('#btnDocUpload').hide();
						$('#btnContinue').show();
						$('body').removeClass('loader');
						$('body').addClass('loaded');
						Success('File(s) uploaded successfully.');
						location.reload();
					}
					else {
						$('body').removeClass('loader');
						$('body').addClass('loaded');
						Warning(data.Message);
					}
				},
				error: function (err) {
					$('body').removeClass('loader');
					$('body').addClass('loaded');
					Warning(err.statusText);
				}
			});
		}
		else {
			$('body').removeClass('loader');
			$('body').addClass('loaded');
		}
	} else {
		Warning("FormData is not supported.");
	}

}

function ChangePassword() {
	if (ValidateInput()) {

		$.ajax({
			url: "/profile/UpdatePassword",
			type: "POST",
			data: { 'currentPassword': $('#txtCurrentPswd').val().trim(), 'newPassword': $('#txtNewPswd').val().trim() },
			success: function (result) {
				if (result.Status == 200) {
					$("#txtCurrentPswd").val('');
					$("#txtNewPswd").val('');
					$("#txtConfirmPswd").val('');
					Success("Password Changed Successfully");
				}
				else {
					Warning("Password Changed Failed");
				}
			}
		});
		return false;
	}

	return false;
}

function UpdateSecretQuestion() {

	if (ValidateSecurityQuestionInputs()) {
		var SecurityQueAnsDetail = [];
		$("#dvInputControls .spnInputControls").each(function () {
			var collectInputDetail = {};
			collectInputDetail.QuestionId = $(this).find('.questionDDL').val();
			collectInputDetail.UserAnswer = $(this).find('input.txtanswer').val();
			SecurityQueAnsDetail.push(collectInputDetail);
		});


		$.ajax({
			url: "/profile/UpdateSecurityQuestion",
			type: "POST",
			data: { 'questionInput': SecurityQueAnsDetail },
			success: function (result) {
				if (result.Status == 200) {
					window.location.href = "/profile";
				}
				else {
					if (resu.Message != '') {
						Warning(resu.Message);
					}
					else {
						Warning("Questions not saved successfully.");
					}
				}

			}
		});
		return false;
	}
	return false;
}

function ValidateEmails(Emails) {
	var glbEmail = [];
	var EmailArr = Emails.split(/,|;/);
	for (var i = 0; i < EmailArr.length; i++) {
		var emailReg = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
		if (!emailReg.test(EmailArr[i].trim())) {
			glbEmail.push(EmailArr[i]);
		}
	}
	return glbEmail;
}


function ValidateInput() {
	var validate = '<ul>';
	var isValid = true;
	if ($("#txtCurrentPswd").val().trim() == '') {
		validate += "<li>Current Password Cannot be empty.</li>";
		isValid = false;
	}
	if ($("#txtNewPswd").val().trim() == '') {
		validate += "<li>New Password Cannot be empty.</li>";
		isValid = false;

	}
	else {
		if ($("#txtNewPswd").val().trim().length < 6) {
			validate += "<li>Password must be greater then 5 characters.</li>";
			isValid = false;
		}
	}

	if ($("#txtConfirmPswd").val().trim() == '') {
		validate += "<li>Confirm Password Cannot be empty.</li>";
		isValid = false;
	}
	else {
		if ($("#txtConfirmPswd").val().trim().length < 6) {
			validate += "<li>Confirm Password must be greater then 5 characters.</li>";
			isValid = false;
		}
	}

	if ($("#txtCurrentPswd").val() != '' && $("#txtNewPswd").val() != '') {
		if ($("#txtCurrentPswd").val().trim() == $("#txtNewPswd").val().trim()) {
			validate += "<li>New Password Must be different.</li>";
			isValid = false;

		}
	}
	if ($("#txtNewPswd").val() != '' && $("#txtConfirmPswd").val() != '') {
		if ($("#txtNewPswd").val().trim() != $("#txtConfirmPswd").val().trim()) {
			validate += "<li>New Password does not match with Confirm Password.</li>";
			isValid = false;
		}
	}
	validate += "</ul>";
	if (!isValid) {
		Warning(validate);
	}
	return isValid;

}

function ValidateSecurityQuestionInputs() {
	var validateMessage = '<ul>';
	var isValid = true;
	var isQuestionSelect = true;
	var isAnsEnter = true;


	$('#dvInputControls .spnInputControls').each(function (i, selected) {
		if ($(this).find('.questionDDL').val() == 0) {
			isQuestionSelect = false;
		}

		if ($(this).find('input.txtanswer').val() == '') {
			isAnsEnter = false;

		}

	});
	if (!isQuestionSelect) {
		validateMessage += '<li>Please select all three security questions along with enter answers respectively.</li>';
		isValid = false;
	}

	if (!isAnsEnter) {
		validateMessage += '<li>Please enter answers for all three security questions.</li>';
		isValid = false;
	}
	if (!isValid) {
		validateMessage += '</ul>';
		Warning(validateMessage);
	}

	return isValid;
}

function getParameterByName(name, url) {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function Download(url, name) {
	var link = document.createElement("a");
	var uri = url.replace("https://brainmeasures.com", "");
	link.setAttribute('download', name);
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	link.remove();
};

$(document).ready(function () {

	$(".btnViewDiv a").css("color", "#fff");
	$(".btnViewDiv").click(function (e) {
		var ext = $(this).find("a").attr("data-imagePath").split(".").pop();
		if (ext == "png" || ext == "jpeg" || ext == "jpg") {
			$("#imageView").attr("src", $(this).find("a").attr("data-imagePath"));
			$("#imageView").width(500);
			$("#imageView").height(700);
		}
		else if (ext == "pdf") {
			window.open($(this).find("a").attr("data-imagePath"));
			return false;
		}

	});

	$(document).on("click", "#btnFaceVideo", function (e) {
		e.pre
		var url = $("#VfaceVideo").attr("src");
		Download(url, "face");
		e.preventDefault();
	})

	$(document).on("click", "#btnScreenVideo", function () {
		var url = $("#VscreenRecorded").attr("src");
		Download(url, "screen");
		e.preventDefault();
	})

	$('#IdProff1').bind('change', function () {
		var f = this.files[0].size;

		if (f > 2000000) {
			//show an alert to the user
			alert("File size must be less then (Max. 2 MB)")
			this.value = null;
			return
		} else {
			var filename = this.value.replace(/^.*[\\\/]/, '')
			$('#Label4').text(filename);
		}
	});
	$('#IdProff2').bind('change', function () {
		var f = this.files[0].size;

		if (f > 2000000) {
			//show an alert to the user
			alert("File size must be less then (Max. 2 MB)")
			this.value = null;
			return
		} else {
			var filename = this.value.replace(/^.*[\\\/]/, '')
			$('#Label3').text(filename);
		}
	});
	$('#QualificationProff1').bind('change', function () {
		var f = this.files[0].size;

		if (f > 2000000) {
			//show an alert to the user
			alert("File size must be less then (Max. 2 MB)")
			this.value = null;
			return
		}
		else {
			var filename = this.value.replace(/^.*[\\\/]/, '')
			$('#Label2').text(filename);
		}
	});
	$('#QualificationProff2').bind('change', function () {
		var f = this.files[0].size;

		if (f > 2000000) {
			//show an alert to the user
			alert("File size must be less then (Max. 2 MB)")
			this.value = null;
			return
		}
		else {
			var filename = this.value.replace(/^.*[\\\/]/, '')
			$('#Label1').text(filename);
		}
	});

	$("#btnContinue").click(function () {
		location.href = "/profile/ManageDocument";
	});


});
