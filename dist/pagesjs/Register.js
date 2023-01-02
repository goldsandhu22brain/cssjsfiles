/// <reference path="Register.js" />
$(document).ready(function () {

    $(document).on('click', "#submit", function () {
        if (!ValidateInputs())
            return false;
        else
            return true;
    });

    //$("#txtUname").bind('keypress', function (event) {
    //    var regex = new RegExp("^[a-zA-Z0-9]+$");
    //    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    //    if (!regex.test(key)) {
    //        event.preventDefault();
    //        return false;
    //    }
    //});
});

function CheckEmailExist(val) {
    var selector = document.getElementById('userType');
    var value = selector[selector.selectedIndex].value;

    if ($("#txtEmail").val().trim() != '') {
        $.ajax({
            type: 'POST',
            cache: false,
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: 'Register.aspx/CheckEmailExist',
            data: JSON.stringify({ 'emailId': val, 'userType': value }),
            dataType: 'json',
            success: function (result) {
                var response = result.d;
                if (response == "1") {
                    Warning("Email address already exists,Please try another! ");
                    $("#txtEmail").val('');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
            }
        });
    }
}
function CheckUserName(val) {
    var selector = document.getElementById('userType');
    var value = selector[selector.selectedIndex].value;

    if ($("#txtUname").val().trim() != '') {
        $.ajax({
            type: 'POST',
            cache: false,
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: 'Register.aspx/CheckUserNameExist',
            data: JSON.stringify({ 'userName': val, 'userType': value }),
            dataType: 'json',
            success: function (result) {
                var response = result.d;
                if (response == "1") {
                    Warning("Username already exists,Please try another! ");
                    $("#txtUname").val('');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
            }
        });
    }
}

function ValidateInputs() {

    var validate = '<ul>';
    var isValid = true;
    
    if ($("#txtFirstName").val().trim() == '') {
        validate += "<li>First Name Cannot be empty.</li>";
        isValid = false;
    }
    if ($("#txtLastName").val().trim() == '') {
        validate += "<li>Last Name Cannot be empty.</li>";
        isValid = false;
    }
    if ($("#txtEmail").val().trim() == '') {
        validate += "<li>Email Cannot be empty.</li>";
        isValid = false;
    }
    if ($("#txtUname").val().trim() == '') {
        validate += "<li>Username Cannot be empty.</li>";
        isValid = false;
    }
    else {
        if ($("#txtUname").val().trim().length < 6) {
            validate += "<li>UserName must be greater than 6 Char.</li>";
            isValid = false;
        }
    }

    if ($("#txtPSW").val().trim() == '') {
        validate += "<li>Password Cannot be empty.</li>";
        isValid = false;
    }
    else {
        if ($("#txtPSW").val().trim().length < 6) {
            validate += "<li>Password must be greater then 6 Char.</li>";
            isValid = false;
        }
    }
    if ($("#txtConfirmPSW").val().trim() == '') {
        validate += "<li>Confirm Password Cannot be empty.</li>";
        isValid = false;
    }
    if ($("#txtCaptcha").val().trim() == '') {
        validate += "<li>Captcha Cannot be empty.</li>";
        isValid = false;
    }
    if ($("#txtEmail").val().trim() != '') {
        if (!ValidateEmail($("#txtEmail").val().trim())) {
            validate += "<li>Please enter valid email address.</li>";
            isValid = false;
        }
    }
    if ($("#txtPSW").val().trim() != '' && $("#txtConfirmPSW").val().trim() != '') {
        if ($("#txtPSW").val().trim() != $("#txtConfirmPSW").val().trim()) {
            validate += "<li>Password doesnot match with Confirm Password.</li>";
            isValid = false;
        }
    }
    validate += "</ul>";
    if (!isValid) {
        Warning(validate);
    }
    return isValid;
}