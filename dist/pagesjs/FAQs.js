$(document).ready(function () {
    $(document).on('click', '#btnCloseFaq', function () {
        $("#txtFirsNameFaq").val('');
        $("#txtLastNameFaq").val('');
        $("#txtMessageFaq").val('');
        $("#txtEmailFaq").val('');
        $("#txtContactFaq").val('');
    });
    $(document).on('click', '#btnSubmitFaq', function () {
        if (ValidateInput()) {

            ButtonDisableEnable('Saving', true, 'btnSubmitFaq');
            var EnquiryDetails = {
                Name: $("#txtFirsNameFaq").val().trim(),
                LastName: $("#txtLastNameFaq").val().trim(),
                Message: $("#txtMessageFaq").val().trim(),
                Email: $("#txtEmailFaq").val().trim(),
                ContactNo: $("#txtContactFaq").val().trim()
            };


            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'Faqs.aspx/SaveFAQDetail',
                data: JSON.stringify({ 'details': EnquiryDetails }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('Question saved successfully.');
                        $("#txtFirsNameFaq").val('');
                        $("#txtLastNameFaq").val('');
                        $("#txtMessageFaq").val('');
                        $("#txtEmailFaq").val('');
                        $("#txtContactFaq").val('');
                    }
                    else {
                        Warning('Question not saved successfully.');
                    }
                    ButtonDisableEnable('Submit', false, 'btnSubmitFaq');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });
        }
    });

    // Corporate Faqs.

    $(document).on('click', '#btnCloseCorpFaq', function () {
        $("#txtFirstNameCorpFaq").val('');
        $("#txtLastNameCorpFaq").val('');
        $("#txtEmailCorpFaq").val('');
        $("#txtContactNCorpFaq").val('');
        $("#txtQuestionCorpFaq").val('');
    });

    $(document).on('click', '#btnSubmitCorpFaq', function () {
        if (ValidateInputCorpFaq()) {

            ButtonDisableEnable('Saving', true, 'btnSubmitCorpFaq');
            var EnquiryDetails = {
                Name: $("#txtFirstNameCorpFaq").val().trim(),
                LastName: $("#txtLastNameCorpFaq").val().trim(),
                Message: $("#txtQuestionCorpFaq").val().trim(),
                Email: $("#txtEmailCorpFaq").val().trim(),
                ContactNo: $("#txtContactNCorpFaq").val().trim()
            };


            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'corporate-faqs.aspx/SaveCorpFAQDetail',
                data: JSON.stringify({ 'details': EnquiryDetails }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('Question saved successfully.');
                        $("#txtFirstNameCorpFaq").val('');
                        $("#txtLastNameCorpFaq").val('');
                        $("#txtQuestionCorpFaq").val('');
                        $("#txtEmailCorpFaq").val('');
                        $("#txtContactNCorpFaq").val('');
                    }
                    else {
                        Warning('Question not saved successfully.');
                    }
                    ButtonDisableEnable('Submit Your Question', false, 'btnSubmitCorpFaq');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });
        }
    });
});

function ValidateInput() {
    var validateMessage = '<ul>';
    var isValid = true;
    if ($("#txtFirsNameFaq").val().trim() == '') {
        validateMessage += '<li>First Name cannot be empty.</li>';
        isValid = false;
    }
    if ($("#txtLastNameFaq").val().trim() == '') {
        validateMessage += '<li>Last Name cannot be empty.</li>';
        isValid = false;
    }

    if ($("#txtEmailFaq").val().trim() == '') {
        validateMessage += '<li>Email cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtEmailFaq").val().trim() != '') {
        if (!ValidateEmail($("#txtEmailFaq").val().trim())) {
            validateMessage += "<li>Enter a valid email.</li>";
            isValid = false;
        }
    }
    if ($("#txtContactFaq").val().trim() == '') {
        validateMessage += '<li>Contact No. cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtContactFaq").val().trim() != '') {
        if (!ValidatePhone($("#txtContactFaq").val().trim())) {
            validateMessage += "<li>Enter a valid Contact No.</li>";
            isValid = false;

        }
    }
    if ($("#txtMessageFaq").val().trim() == '') {
        validateMessage += '<li>Message cannot be empty.</li>';
        isValid = false;
    }

    if (isValid == true) {
        var islengthValid = validateLengthFaq();
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

function ValidateInputCorpFaq() {
    var validateMessage = '<ul>';
    var isValid = true;
    if ($("#txtFirstNameCorpFaq").val().trim() == '') {
        validateMessage += '<li>First Name cannot be empty.</li>';
        isValid = false;
    }
    if ($("#txtLastNameCorpFaq").val().trim() == '') {
        validateMessage += '<li>Last Name cannot be empty.</li>';
        isValid = false;
    }

    if ($("#txtEmailCorpFaq").val().trim() == '') {
        validateMessage += '<li>Email cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtEmailCorpFaq").val().trim() != '') {
        if (!ValidateEmail($("#txtEmailCorpFaq").val().trim())) {
            validateMessage += "<li>Enter a valid email.</li>";
            isValid = false;
        }
    }
    if ($("#txtContactNCorpFaq").val().trim() == '') {
        validateMessage += '<li>Contact No. cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtContactNCorpFaq").val().trim() != '') {
        if (!ValidatePhone($("#txtContactNCorpFaq").val().trim())) {
            validateMessage += "<li>Enter a valid Contact No.</li>";
            isValid = false;

        }
    }
    if ($("#txtQuestionCorpFaq").val().trim() == '') {
        validateMessage += '<li>Question cannot be empty.</li>';
        isValid = false;
    }

    if (isValid == true) {
        var islengthValid = validateLengthCorpFaq();
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
function validateLengthFaq() {
    var validateMsg = "";
    if ($("#txtFirsNameFaq").val().trim().length > 20) {
        validateMsg = "<li>Firstname length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtLastNameFaq").val().trim().length > 20) {
        validateMsg = "<li>LastName length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtEmailFaq").val().trim().length > 50) {
        validateMsg += "<li>Email length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtContactFaq").val().trim().length > 20) {
        validateMsg += "<li>Contact Number length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtMessageFaq").val().trim().length > 250) {
        validateMsg += "<li>Question length Cannot exceed 250 characters.</li>";
    }

    return validateMsg;
}

function validateLengthCorpFaq() {
    var validateMsg = "";
    if ($("#txtFirstNameCorpFaq").val().trim().length > 20) {
        validateMsg = "<li>Firstname length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtLastNameCorpFaq").val().trim().length > 20) {
        validateMsg = "<li>LastName length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtEmailCorpFaq").val().trim().length > 50) {
        validateMsg += "<li>Email length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtContactNCorpFaq").val().trim().length > 20) {
        validateMsg += "<li>Contact Number length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtQuestionCorpFaq").val().trim().length > 250) {
        validateMsg += "<li>Question length Cannot exceed 250 characters.</li>";
    }

    return validateMsg;
}