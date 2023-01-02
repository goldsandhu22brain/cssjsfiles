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
                url: 'Proctor.aspx/SaveEnquiry',
                data: JSON.stringify({ 'details': EnquiryDetails }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('Enquiry saved successfully.');
                        $("#txtName").val('');
                        $("#txtEmail").val('');
                        $("#txtMessage").val('');
                    }
                    else {
                        Warning('Enquiry not saved successfully.');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });

        }
        return false;
    });

    $('#btnReset').click(function () {
        $("#txtName").val('');
        $("#txtEmail").val('');
        $("#txtMessage").val('');

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