$(document).ready(function () {
    $(document).on('click', '#btnSubmitEnq', function () {
        if (validateInputEnquiry()) {
            ButtonDisableEnable('Saving', true, 'btnSubmitEnq');
            var EnquiryDetails = {
                Name: $("#txtFirstNameEnq").val().trim(),
                LastName: "",
                Message: $("#txtQueEnq").val().trim(),
                Email: $("#txtEmailEnq").val().trim(),
                ContactNo: $("#txtContactEnq").val().trim(),
                Website: $("#txtWebSite").val().trim(),
                Designation: $("#txtDesignation").val().trim(),
                CompanyName: $("#txtCompName").val().trim(),
                City: $("#txtCity").val().trim(),
                Country: $("#txtCountry").val().trim()
            };

            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'enquiry.aspx/SaveQuestionDetail',
                data: JSON.stringify({ 'details': EnquiryDetails }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('Enquiry saved successfully.');
                        $("#txtFirstNameEnq").val('');
                        $("#txtLastNameEnq").val('');
                        $("#txtQueEnq").val('');
                        $("#txtEmailEnq").val('');
                        $("#txtContactEnq").val('');
                        $("#txtCompName").val('');
                        $("#txtDesignation").val('');
                        $("#txtWebSite").val('');
                        $("#txtCity").val('');
                        $("#txtCountry").val('');
                    }
                    else {
                        Warning('Enquiry not saved successfully.');
                    }
                    ButtonDisableEnable('Submit', false, 'btnSubmitEnq');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });
        }
        return false;
    });
});

function validateInputEnquiry() {
    var validateMessage = '<ul>';
    var isValid = true;
    if ($("#txtFirstNameEnq").val().trim() == '') {
        validateMessage += '<li>Name cannot be empty.</li>';
        isValid = false;
    }

    if ($("#txtCompName").val().trim() == '') {
        validateMessage += '<li>Company cannot be empty.</li>';
        isValid = false;
    }

    if ($("#txtDesignation").val().trim() == '') {
        validateMessage += '<li>Designation cannot be empty.</li>';
        isValid = false;
    }

    if ($("#txtEmailEnq").val().trim() == '') {
        validateMessage += '<li>Email cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtEmailEnq").val().trim() != '') {
        if (!ValidateEmail($("#txtEmailEnq").val().trim())) {
            validateMessage += "<li>Enter a valid email.</li>";
            isValid = false;
        }
    }
    if ($("#txtContactEnq").val().trim() == '') {
        validateMessage += '<li>Contact No. cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtContactEnq").val().trim() != '') {
        if (!ValidatePhone($("#txtContactEnq").val().trim())) {
            validateMessage += "<li>Enter a valid Contact No.</li>";
            isValid = false;
        }
    }
    if ($("#txtWebSite").val().trim() == '') {
        validateMessage += '<li>Offical website cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtWebSite").val().trim() != '')
    {
		if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($("#txtWebSite").val().trim())){
    
		} else {
			   validateMessage += '<li>Enter valid website.</li>';
				isValid = false;
		}

        //var result = /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test($("#txtWebSite").val().trim());

       // if (result == false | result == 'false') {
        //    validateMessage += '<li>Enter valid website.</li>';
        //    isValid = false;
       // }
    }

    if ($("#txtCity").val().trim() == '') {
        validateMessage += '<li>City cannot be empty.</li>';
        isValid = false;
    }
    if ($("#txtCountry").val().trim() == '') {
        validateMessage += '<li>Country website cannot be empty.</li>';
        isValid = false;
    }
   
    if ($("#txtQueEnq").val().trim() == '') {
        validateMessage += '<li>Message cannot be empty.</li>';
        isValid = false;
    }

    if (isValid == true) {
        var islengthValid = validateLengthEnq();
        if (islengthValid != "") {
            validate += islengthValid;
            isValid = false;
        }
    }

    if (!isValid) {
        validateMessage += '</ul>';
        Warning(validateMessage);
    }
    return isValid;
}

function validateLengthEnq() {
    var validateMsg = "";
    if ($("#txtFirstNameEnq").val().trim().length > 20) {
        validateMsg = "<li>Firstname length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtEmailEnq").val().trim().length > 50) {
        validateMsg += "<li>Email length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtContactEnq").val().trim().length > 20) {
        validateMsg += "<li>Contact Number length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtQueEnq").val().trim().length > 250) {
        validateMsg += "<li>Question length Cannot exceed 250 characters.</li>";
    }

    return validateMsg;
}

function validateInputFeedBack() {
    var validateMessage = '<ul>';
    var isValid = true;
    if ($("#txtFirstNameFdBk").val().trim() == '') {
        validateMessage += '<li>First Name cannot be empty.</li>';
        isValid = false;
    }
    if ($("#txtLastNameFdBk").val().trim() == '') {
        validateMessage += '<li>Last Name cannot be empty.</li>';
        isValid = false;
    }

    if ($("#txtEmailFdBk").val().trim() == '') {
        validateMessage += '<li>Email cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtEmailFdBk").val().trim() != '') {
        if (!ValidateEmail($("#txtEmailFdBk").val().trim())) {
            validateMessage += "<li>Enter a valid email.</li>";
            isValid = false;
        }
    }
    if ($("#txtContactNumFdBk").val().trim() == '') {
        validateMessage += '<li>Contact No. cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtContactNumFdBk").val().trim() != '') {
        if (!ValidatePhone($("#txtContactNumFdBk").val().trim())) {
            validateMessage += "<li>Enter a valid Contact No.</li>";
            isValid = false;

        }
    }
    if ($("#txtFeedBackMessage").val().trim() == '') {
        validateMessage += '<li>Feedback message cannot be empty.</li>';
        isValid = false;
    }

    if (isValid == true) {
        var islengthValid = validateLengthFeedBack();
        if (islengthValid != "") {
            validate += islengthValid;
            isValid = false;
        }
    }

    if (!isValid) {
        validateMessage += '</ul>';
        Warning(validateMessage);
    }
    return isValid;
}

function validateLengthFeedBack() {
    var validateMsg = "";
    if ($("#txtFirstNameFdBk").val().trim().length > 20) {
        validateMsg = "<li>Firstname length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtLastNameFdBk").val().trim().length > 20) {
        validateMsg = "<li>LastName length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtEmailFdBk").val().trim().length > 50) {
        validateMsg += "<li>Email length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtContactNumFdBk").val().trim().length > 20) {
        validateMsg += "<li>Contact Number length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtFeedBackMessage").val().trim().length > 250) {
        validateMsg += "<li>Feedback message length Cannot exceed 250 characters.</li>";
    }

    return validateMsg;

}

function validateInputIssue() {
    var validateMessage = '<ul>';
    var isValid = true;
    if ($("#txtFirstNameIssue").val().trim() == '') {
        validateMessage += '<li>First Name cannot be empty.</li>';
        isValid = false;
    }
    if ($("#txtLastNameIssue").val().trim() == '') {
        validateMessage += '<li>Last Name cannot be empty.</li>';
        isValid = false;
    }

    if ($("#txtEmailIssue").val().trim() == '') {
        validateMessage += '<li>Email cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtEmailIssue").val().trim() != '') {
        if (!ValidateEmail($("#txtEmailIssue").val().trim())) {
            validateMessage += "<li>Enter a valid email.</li>";
            isValid = false;
        }
    }
    if ($("#txtContactNumIssue").val().trim() == '') {
        validateMessage += '<li>Contact No. cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtContactNumIssue").val().trim() != '') {
        if (!ValidatePhone($("#txtContactNumIssue").val().trim())) {
            validateMessage += "<li>Enter a valid Contact No.</li>";
            isValid = false;

        }
    }
    if ($("#txtIssue").val().trim() == '') {
        validateMessage += '<li>Issue detail cannot be empty.</li>';
        isValid = false;
    }

    if (isValid == true) {
        var islengthValid = validateLengthIssue();
        if (islengthValid != "") {
            validate += islengthValid;
            isValid = false;
        }
    }

    if (!isValid) {
        validateMessage += '</ul>';
        Warning(validateMessage);
    }
    return isValid;
}

function validateLengthIssue() {
    var validateMsg = "";
    if ($("#txtFirstNameIssue").val().trim().length > 30) {
        validateMsg = "<li>Firstname length Cannot exceed 30 characters.</li>";
    }
    if ($("#txtLastNameIssue").val().trim().length > 30) {
        validateMsg = "<li>LastName length Cannot exceed 30 characters.</li>";
    }
    if ($("#txtEmailIssue").val().trim().length > 50) {
        validateMsg += "<li>Email length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtContactNumIssue").val().trim().length > 20) {
        validateMsg += "<li>Contact Number length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtIssue").val().trim().length > 250) {
        validateMsg += "<li>Issue length Cannot exceed 250 characters.</li>";
    }

    return validateMsg;

}

function validateInputIssueSearch() {
    var validate = '<ul>';
    var isValid = true;
    if ($("#ddlFAQCategories").val() == '0') {
        validate += "<li>Category is not selected.</li>";
        isValid = false;
    }
    if ($("#txtSearchFaqCat").val().trim() == '') {
        validate += "<li>Search box cannot be Empty.</li>";
        isValid = false;

    }
    if ($("#txtSearchFaqCat").val().trim() != '') {
        if ($("#txtSearchFaqCat").val().trim().length > 100) {
            validateMsg = "<li>Search box length Cannot exceed 100 characters.</li>";
        }
    }

    if (!isValid) {
        validate += '</ul>';
        Warning(validate);
    }
    return isValid;
}