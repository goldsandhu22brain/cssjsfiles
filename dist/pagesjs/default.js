/// <reference path="default.js" />
$(document).ready(function () {
    $("#cancelReqCallback").click(function () {
        $("#txtContactPerson").val('');

        $("#txtMessage").val('');
        $("#txtContactNum").val('');
    });
    $("#btnSendReq").click(function () {
        if (validateInputCallback()) {
            ButtonDisableEnable('Sending', true, 'btnSendReq');
            var EnquiryDetails = {
                Name: $("#txtContactPerson").val().trim(),
                Message: $("#txtMessage").val().trim(),
                //  Email: $("#txtEmail").val().trim(),
                ContactNo: $("#txtContactNum").val().trim()
            };


            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'Default.aspx/SaveCallbackRequest',
                data: JSON.stringify({ 'details': EnquiryDetails }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('Callback Request sent successfully.');
                        $("#txtContactPerson").val('');

                        $("#txtMessage").val('');
                        $("#txtContactNum").val('');
                    }
                    else {
                        Warning('Callback Request not sent successfully.');
                    }
                    ButtonDisableEnable('Send Request', false, 'btnSendReq');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });
        }
    });
});

function validateInputCallback() {
    var validateMessage = '<ul>';
    var isValid = true;
    if ($("#txtContactPerson").val().trim() == '') {
        validateMessage += "<li>Please enter Contact Person Name.</li>";
        isValid = false;
    }
    if ($("#txtContactNum").val().trim() == '') {
        validateMessage += "<li>Please enter Contact Number.</li>";
        isValid = false;
    }
    if ($("#txtContactNum").val().trim() != '') {
        if (!ValidatePhone($("#txtContactNum").val().trim())) {
            validateMessage += "<li>Enter a valid Contact Number.</li>";
            isValid = false;

        }
    }
    if ($("#txtMessage").val().trim() == '') {
        validateMessage += "<li>Please enter Message.</li>";
        isValid = false;
    }

    if (isValid == true) {
        var islengthValid = validateLength();
        if (islengthValid != "") {
            validateMessage += islengthValid;
            isValid = false;
        }
    }

    validateMessage += "</ul>";
    if (!isValid) {
        Warning(validateMessage);
    }
    return isValid;
}

function validateLength() {
    var validateMessage = '';
    if ($("#txtContactPerson").val().trim().length > 50) {
        validateMessage += "<li>Contact Person Name length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtContactNum").val().trim().length > 20) {
        validateMessage += "<li>Contact Number length Cannot exceed 20 characters.</li>";
    }
    if ($("#txtMessage").val().trim().length > 200) {
        validateMessage += "<li>Message length Cannot exceed 200 characters.</li>";
    }

    return validateMessage;
}