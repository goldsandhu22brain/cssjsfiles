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
    if ($("#txtUserName").val().trim() == '') {
        validate += "<li>Username Cannot be empty.</li>";
        isValid = false;
    }
    if ($("#txtEmail").val().trim() == '') {
        validate += "<li>Email Cannot be empty.</li>";
        isValid = false;
    }
    validate += "</ul>";
    if (!isValid) {
        Warning(validate);
    }
    return isValid;
}