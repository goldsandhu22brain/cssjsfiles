/// <reference path="Register.js" />
$(document).ready(function () {

    $(document).on('click', "#btnSubmit", function () {
        if (!ValidateInputs())
            return false;
        else
            return true;
    });
});

function ValidateInputs() {

    var validate = '<ul>';
    var isValid = true;
   
    if ($("#txtYourName").val().trim() == '') {
        validate += "<li>Your Name Cannot be empty.</li>";
        isValid = false;
    }

    if ($("#txtFirstName").val().trim() == '') {
        validate += "<li>First Name Cannot be empty.</li>";
        isValid = false;

    }
    if ($("#txtLastName").val().trim() == '') {
        validate += "<li>Last Name Cannot be empty.</li>";
        isValid = false;

    }
    if ($("#txtaddress1").val().trim() == '') {
        validate += "<li>Address1 Cannot be empty.</li>";
        isValid = false;

    }
    if ($("#txtCity").val().trim() == '') {
        validate += "<li>City Cannot be empty.</li>";
        isValid = false;

    }
    if ($("#txtZip").val().trim() == '') {
        validate += "<li>Zip Name Cannot be empty.</li>";
        isValid = false;

    }

    if ($("#txtEmail").val().trim() == '') {
        validate += "<li>Email Cannot be empty.</li>";
        isValid = false;
    }
    if ($("#txtUserName").val().trim() == '') {
        validate += "<li>User Name Cannot be empty.</li>";
        isValid = false;
    }
    else {
        if ($("#txtUserName").val().trim().length < 6) {
            validate += "<li>UserName must be greater than 6 Char.</li>";
            isValid = false;
        }
    }

    if ($("#txtPassword").val().trim() == '') {
        validate += "<li>Password Cannot be empty.</li>";
        isValid = false;
    }
    else {
        if ($("#txtPassword").val().trim().length < 6) {
            validate += "<li>Password must be greater then 6 Char.</li>";
            isValid = false;
        }
    }
    if ($("#txtConfirmPwd").val().trim() == '') {
        validate += "<li>Confirm Password Cannot be empty.</li>";
        isValid = false;
    }
   
    if ($("#txtEmail").val().trim() != '') {
        if (!ValidateEmail($("#txtEmail").val().trim())) {
            validate += "<li>Please enter valid email address.</li>";
            isValid = false;
        }
    }
    if ($("#txtPassword").val().trim() != '' && $("#txtConfirmPwd").val().trim() != '') {
        if ($("#txtPassword").val().trim() != $("#txtConfirmPwd").val().trim()) {
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