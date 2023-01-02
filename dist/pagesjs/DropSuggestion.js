$(document).ready(function () {
    $(document).on('click', '#btnSubmitSugg', function () {
        if (ValidateInputSugg()) {
            ButtonDisableEnable('Saving', true, 'btnSubmitSugg');
            var SuggestionDetails = {
                FirstName: $("#txtFullNameSugg").val().trim(),
                Email: $("#txtEmailSugg").val().trim(),
                Message: $("#txtTestCertificationSugg").val().trim(),
                Comment: $("#txtCommentBoxSugg").val().trim(),

            };


            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'drop_us_a_request.aspx/SendSuggestionDetail',
                data: JSON.stringify({ 'details': SuggestionDetails }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('<ul><li>Thanks for your suggestions, we will inform you soon what action has been taken on your request. </li></ul>');
                        $("#txtFullNameSugg").val('');
                        $("#txtEmailSugg").val('');
                        $("#txtTestCertificationSugg").val('');
                        $("#txtCommentBoxSugg").val('');
                    }
                    else {
                        Warning('Mail not sent successfully.');
                    }
                    ButtonDisableEnable('Submit', false, 'btnSubmitSugg');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });
        }
    });
});

function ValidateInputSugg() {
    var validateMessage = '<ul>';
    var isValid = true;
    if ($("#txtFullNameSugg").val().trim() == '') {
        validateMessage += '<li>Name cannot be empty.</li>';
        isValid = false;
    }

    if ($("#txtEmailSugg").val().trim() == '') {
        validateMessage += '<li>Email cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtEmailSugg").val().trim() != '') {
        if (!ValidateEmail($("#txtEmailSugg").val().trim())) {
            validateMessage += "<li>Enter a valid email.</li>";
            isValid = false;
        }
    }

    if ($("#txtTestCertificationSugg").val().trim() == '') {
        validateMessage += '<li>Test/Certification cannot be empty.</li>';
        isValid = false;
    }

    if (isValid == true) {
        var islengthValid = validateLengthSugg();
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

function validateLengthSugg() {
    var validateMsg = "";
    if ($("#txtFullNameSugg").val().trim().length > 25) {
        validateMsg = "<li>Name length Cannot exceed 25 characters.</li>";
    }

    if ($("#txtEmailSugg").val().trim().length > 50) {
        validateMsg += "<li>Email length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtTestCertificationSugg").val().trim().length > 100) {
        validateMsg += "<li>Test/Certification length Cannot exceed 100 characters.</li>";
    }
    if ($("#txtCommentBoxSugg").val().trim() != '' && $("#txtCommentBoxSugg").val().trim().length > 250) {
        validateMsg += "<li>Comment length Cannot exceed 250 characters.</li>";
    }

    return validateMsg;
}