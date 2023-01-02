$(document).ready(function () {
    $(document).on('click', '#btnSubmit', function () {
        if (ValidateInput()) {
            ButtonDisableEnable('Saving', true, 'btnSubmit');
            var EnquiryDetails = {
                Name: $("#txtName").val().trim(),
                Message: $("#txtMessageContact").val().trim(),
                Email: $("#txtEmail").val().trim(),
                ContactNo: $("#txtContactNo").val().trim()
            };


            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'ContactUs.aspx/SaveContactUsDetail',
                data: JSON.stringify({ 'details': EnquiryDetails }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('Contact saved successfully.');
                        $("#txtName").val('');
                        $("#txtEmail").val('');
                        $("#txtMessageContact").val('');
                        $("#txtContactNo").val('');
                    }
                    else {
                        Warning('Contact not saved successfully.');
                    }
                    ButtonDisableEnable('Submit', false, 'btnSubmit');
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
    if ($("#txtName").val().trim() == '') {
        validateMessage += '<li>Name cannot be empty.</li>';
        isValid = false;
    }
    if ($("#txtEmail").val().trim() == '') {
        validateMessage += '<li>Email cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtEmail").val().trim() != '') {
        if (!ValidateEmail($("#txtEmail").val().trim())) {
            validateMessage += "<li>Enter a valid email.</li>";
            isValid = false;
        }
    }
    if ($("#txtContactNo").val().trim() == '') {
        validateMessage += '<li>Contact No. cannot be empty.</li>';
        isValid = false;
    }
    else if ($("#txtContactNo").val().trim() != '') {
        if (!ValidatePhone($("#txtContactNo").val().trim())) {
            validateMessage += "<li>Enter a valid Contact No.</li>";
            isValid = false;

        }
    }
    if ($("#txtMessageContact").val().trim() == '') {
        validateMessage += '<li>Message cannot be empty.</li>';
        isValid = false;
    }

    if (!isValid) {
        validateMessage += '</ul>';
        Warning(validateMessage);
    }
    return isValid;
}