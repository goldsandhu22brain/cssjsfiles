$(document).ready(function () {
    $('#btnSubmit').click(function () {

        if (ValidateInput()) {

            var EnquiryDetails = {
                Name: $("#txtName").val().trim(),
                Message: $("#txtMessage").val().trim(),
                Email: $("#txtEmail").val().trim()
            };


            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'OurStory.aspx/SaveContactUsDetail',
                data: JSON.stringify({ 'details': EnquiryDetails }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('Contact saved successfully.');
                        $("#txtName").val('');
                        $("#txtEmail").val('');
                        $("#txtMessage").val('');
                    }
                    else {
                        Warning('Contact not saved successfully.');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });

        }
        return false;
    });

    $("#btnSubmitRegister").click(function () {
        if (ValidateInputRegister()) {
            var chkUserType=$("#userType").val();
            var RegistrationDetails = {
                UserType: $("#userType").val(),
                Username: $("#txtUname").val().trim(),
                Password: $("#txtPSW").val().trim(),
                Email: $("#txtRegisterEmail").val().trim()
            };


            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'OurStory.aspx/SaveQuickRegistration',
                data: JSON.stringify({ 'details': RegistrationDetails }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;
                    if (result.Status == "1") {
                        Success(result.ResponseData);
                        $("#userType").val('Individual');
                        $("#txtUname").val('');
                        $("#txtPSW").val(''),
                        $("#txtRegisterEmail").val('');
                        if (chkUserType == 'Individual')
                            document.location.href = '/Individual/Index.aspx';
                        else if (chkUserType == 'Corporate')
                            document.location.href = '/Corporate/Index.aspx';
                        else
                            document.location.href = '/Affiliate/Index.aspx';
                    }
                    else {
                        Warning(result.ResponseData);
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });
        }

        return false;
    });
});

function ValidateInput() {
    var validate = '<ul>';
    var isValid = true;
    if ($("#txtName").val() == '') {

        validate += "<li>Name Cannot be empty.</li>";
        isValid = false;
    }
    if ($("#txtEmail").val() == '') {
        validate += "<li>Email Cannot be empty.</li>";
        isValid = false;
    }
    if ($("#txtEmail").val() != '') {
        if (!ValidateEmail($("#txtEmail").val())) {
            validate += "<li>Please enter valid email address.</li>";
            isValid = false;
        }
    }
    if ($("#txtMessage").val() == '') {
        validate += "<li>Message Cannot be empty.</li>";
        isValid = false;
    }

    validate += "</ul>";
    if (!isValid) {
        Warning(validate);
    }
    return isValid;
}

function ValidateInputRegister() {
    var validate = '<ul>';
    var isValid = true;
    if ($("#txtRegisterEmail").val() == '') {
        validate += "<li>Email Cannot be empty.</li>";
        isValid = false;
    }

    if ($("#txtEmail").val() != '') {
        if (!ValidateEmail($("#txtEmail").val())) {
            validate += "<li>Please enter valid email address.</li>";
            isValid = false;
        }
    }
    if ($("#txtUname").val() == '') {
        validate += "<li>Username Cannot be empty.</li>";
        isValid = false;
    }
    if ($("#txtPSW").val() == '') {
        validate += "<li>Password Cannot be empty.</li>";
        isValid = false;
    }

    validate += "</ul>";
    if (!isValid) {
        Warning(validate);
    }
    return isValid;
}