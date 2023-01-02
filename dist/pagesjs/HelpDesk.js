$(document).ready(function () {
    $(document).on('click', '#btnSubmitEnq', function () {
        if (validateInputEnquiry()) {
            ButtonDisableEnable('Saving', true, 'btnSubmitEnq');
            var EnquiryDetails = {
                Name: $("#txtFirstNameEnq").val().trim(),
                LastName: $("#txtLastNameEnq").val().trim(),
                Message: $("#txtQueEnq").val().trim(),
                Email: $("#txtEmailEnq").val().trim(),
                ContactNo: $("#txtContactEnq").val().trim()
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
                        Success('Question saved successfully.');
                        $("#txtFirstNameEnq").val('');
                        $("#txtLastNameEnq").val('');
                        $("#txtQueEnq").val('');
                        $("#txtEmailEnq").val('');
                        $("#txtContactEnq").val('');
                    }
                    else {
                        Warning('Question not saved successfully.');
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

    $(document).on('click', '#btnSubmitFdBk', function () {
        if (validateInputFeedBack()) {
            ButtonDisableEnable('Saving', true, 'btnSubmitFdBk');
            var FdBkDetails = {
                FirstName: $("#txtFirstNameFdBk").val().trim(),
                LastName: $("#txtLastNameFdBk").val().trim(),
                Message: $("#txtFeedBackMessage").val().trim(),
                Email: $("#txtEmailFdBk").val().trim(),
                Contact: $("#txtContactNumFdBk").val().trim()
            };


            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'feedback.aspx/SaveFeedbackDetail',
                data: JSON.stringify({ 'details': FdBkDetails }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('FeedBack saved successfully.');
                        $("#txtFirstNameFdBk").val('');
                        $("#txtLastNameFdBk").val('');
                        $("#txtFeedBackMessage").val('');
                        $("#txtEmailFdBk").val('');
                        $("#txtContactNumFdBk").val('');
                    }
                    else {
                        Warning('FeedBack not saved successfully.');
                    }
                    ButtonDisableEnable('Submit', false, 'btnSubmitFdBk');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });
        }
        return false;
    });

    $(document).on('click', '#btnSubmitIssue', function () {
        if (validateInputIssue()) {
            ButtonDisableEnable('Saving', true, 'btnSubmitIssue');
            var IssueDetails = {
                FirstName: $("#txtFirstNameIssue").val().trim(),
                LastName: $("#txtLastNameIssue").val().trim(),
                Email: $("#txtEmailIssue").val().trim(),
                Contact: $("#txtContactNumIssue").val().trim(),
                FissueMessage: $("#txtIssue").val().trim()
            };


            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'reportanissue.aspx/SaveIssueDetail',
                data: JSON.stringify({ 'details': IssueDetails }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('Issue saved successfully.');
                        $("#txtFirstNameIssue").val('');
                        $("#txtLastNameIssue").val('');
                        $("#txtEmailIssue").val('');
                        $("#txtContactNumIssue").val('');
                        $("#txtIssue").val('');
                    }
                    else {
                        Warning('Issue not saved successfully.');
                    }
                    ButtonDisableEnable('Submit', false, 'btnSubmitIssue');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });
        }
        return false;
    });

    //$(document).on('click', '#btnSearchFaqCat', function () {
    //    alert('1');
    //    if (validateInputIssueSearch()) {
    //        return true;
    //    }
    //    else
    //        return false;
    //});
});

function validateInputEnquiry() {
    var validateMessage = '<ul>';
    var isValid = true;
    if ($("#txtFirstNameEnq").val().trim() == '') {
        validateMessage += '<li>First Name cannot be empty.</li>';
        isValid = false;
    }
    if ($("#txtLastNameEnq").val().trim() == '') {
        validateMessage += '<li>Last Name cannot be empty.</li>';
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
    if ($("#txtLastNameEnq").val().trim().length > 20) {
        validateMsg = "<li>LastName length Cannot exceed 20 characters.</li>";
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