$(document).ready(function () {

    $(document).on('click', "#btnLogin", function () {
        if (!ValidateInputs())
            return false;
        else
            return true;
    });
});

function ValidateInputs() {

    var validate = '<ul>';
    var isValid = true;
    if ($("#userName").val().trim() == '') {
        validate += "<li>Username Cannot be empty.</li>";
        isValid = false;
    }
    if ($("#password").val().trim() == '') {
        validate += "<li>Password Cannot be empty.</li>";
        isValid = false;
    }
    validate += "</ul>";
    if (!isValid) {
        Warning(validate);
    }
    return isValid;
}