$(document).ready(function () {
    var reviewUpDown = "";
    $('#btnReviewCancel').click(function () {
        window.location.href = "/Reviews";
    });

    $('#btnReviewSubmit').click(function () {
        var rating = $("input[name='rating']:checked").val()

        if (ValidateFeedInput(rating)) {
            var details = {
                Name: $("#txtReName").val().trim(),
                Message: $("#txtReMessage").val().trim(),
                Email: $("#txtReEmail").val().trim(),
                Title: $("#txtReTitle").val().trim(),
                Rating: rating,
            };

            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: '/Reviews/SaveFeedRating',
                data: JSON.stringify({ 'details': details }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('Review rating saved successfully.');
                        $("#txtReName").val('');
                        $("#txtReMessage").val('');
                        $("#txtReEmail").val('');
                        $("#txtReTitle").val('')
                    }
                    else {
                        Warning('Review rating not saved successfully.');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });

        }
        return false;
    });

    $('#btnfeedSubmit').click(function () {
        if (ValidateInput()) {
            var details = {
                FirstName: $("#txtFeedfirstName").val().trim(),
                LastName: $("#txtFeedlastName").val().trim(),
                Message: $("#txtfeedmessage").val().trim(),
                Email: $("#txtFeedemail").val().trim(),
                Contact: $("#txtfeedcontact").val().trim(),
                Status: reviewUpDown
            };

            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: '/Reviews/SaveFeedbackDetail',
                data: JSON.stringify({ 'details': details }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('Feedback saved successfully.');
                        $("#txtFeedfirstName").val('');
                        $("#txtFeedlastName").val('');
                        $("#txtfeedmessage").val('');
                        $("#txtfeedcontact").val('');
                        reviewUpDown = "";
                    }
                    else {
                        Warning('Feedback not saved successfully.');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });

        }
        return false;
    });

    $('#btnTestSubmit').click(function () {
        if (ValidateRateInput()) {
            var details = {
                FirstName: $("#txtName").val().trim(),
                LastName: $("#txtLName").val().trim(),
                Message: $("#txtMessage").val().trim(),
                Email: $("#txtEmail").val().trim(),
                Contact: $("#ddlFeed option:selected").text()
            };

            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: '/Reviews/SaveDesignRateDetail',
                data: JSON.stringify({ 'details': details }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        Success('Feedback saved successfully.');
                        $("#txtName").val('');
                        $("#txtLName").val('');
                        $("#txtMessage").val('');
                        $("#txtEmail").val('');
                    }
                    else {
                        Warning('Feedback not saved successfully.');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }
            });

        }
        return false;
    });

    //$("#btnSubmitRegister").click(function () {
    //    if (ValidateInputRegister()) {
    //        var chkUserType = $("#userType").val();
    //        var RegistrationDetails = {
    //            UserType: $("#userType").val(),
    //            Username: $("#txtUname").val().trim(),
    //            Password: $("#txtPSW").val().trim(),
    //            Email: $("#txtRegisterEmail").val().trim()
    //        };


    //        $.ajax({
    //            type: 'POST',
    //            cache: false,
    //            async: true,
    //            contentType: 'application/json; charset=utf-8',
    //            url: '/OurStory/SaveQuickRegistration',
    //            data: JSON.stringify({ 'details': RegistrationDetails }),
    //            dataType: 'json',
    //            success: function (response) {
    //                var result = response.d;
    //                if (result.Status == "1") {
    //                    Success(result.ResponseData);
    //                    $("#userType").val('Individual');
    //                    $("#txtUname").val('');
    //                    $("#txtPSW").val(''),
    //                    $("#txtRegisterEmail").val('');
    //                    if (chkUserType == 'Individual')
    //                        document.location.href = '/Individual/Index';
    //                    else if (chkUserType == 'Corporate')
    //                        document.location.href = '/Corporate/Index';
    //                    else
    //                        document.location.href = '/Affiliate/Index';
    //                }
    //                else {
    //                    Warning(result.ResponseData);
    //                }

    //            },
    //            error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                console.log(XMLHttpRequest);
    //            }
    //        });
    //    }

    //    return false;
    //});

    $("#hrefYes").click(function () {
        reviewUpDown = "true";
    });
    $("#hrefNo").click(function () {
        reviewUpDown = "false";
    });
});

function ValidateFeedInput(rating) {
    var validate = '<ul>';
    var isValid = true;
    if ($("#txtReName").val() == '') {

        validate += "<li>Name Cannot be empty.</li>";
        isValid = false;
    }
    // if ($("#txtReEmail").val() == '') {
    //     validate += "<li>Email Cannot be empty.</li>";
    //     isValid = false;
    // }
    if ($("#txtReEmail").val() != '') {
        if (!ValidateEmail($("#txtReEmail").val())) {
            validate += "<li>Please enter valid email address.</li>";
            isValid = false;
        }
    }
    if (rating == '' | typeof rating === "undefined") {
        validate += "<li>Rating cannot be empty.</li>";
        isValid = false;
    }

    validate += "</ul>";
    if (!isValid) {
        Warning(validate);
    }
    return isValid;
}

function ValidateRateInput() {
    var validate = '<ul>';
    var isValid = true;
    if ($("#txtName").val() == '') {
        validate += "<li>Name Cannot be empty.</li>";
        isValid = false;
    }
    // if ($("#txtEmail").val() == '') {
    //     validate += "<li>Email Cannot be empty.</li>";
    //     isValid = false;
    // }
    if ($("#txtEmail").val() != '') {
        if (!ValidateEmail($("#txtEmail").val())) {
            validate += "<li>Please enter valid email address.</li>";
            isValid = false;
        }
    }
    validate += "</ul>";
    if (!isValid) {
        Warning(validate);
    }
    return isValid;
}

function ValidateInput() {
    var validate = '<ul>';
    var isValid = true;
    if ($("#txtFeedfirstName").val() == '') {

        validate += "<li>Name Cannot be empty.</li>";
        isValid = false;
    }
    // if ($("#txtFeedemail").val() == '') {
    //     validate += "<li>Email Cannot be empty.</li>";
    //     isValid = false;
    // }
    if ($("#txtFeedemail").val() != '') {
        if (!ValidateEmail($("#txtFeedemail").val())) {
            validate += "<li>Please enter valid email address.</li>";
            isValid = false;
        }
    }
    if ($("#txtfeedcontact").val() == '') {
        validate += "<li>Contact Cannot be empty.</li>";
        isValid = false;
    }
    else if ($("#txtfeedcontact").val().trim() != '') {
        if (!ValidatePhone($("#txtfeedcontact").val().trim())) {
            validate += "<li>Enter a valid Contact No.</li>";
            isValid = false;
        }
    }

    validate += "</ul>";
    if (!isValid) {
        Warning(validate);
    }
    return isValid;
}

//function ValidateInputRegister() {
//    var validate = '<ul>';
//    var isValid = true;
//    if ($("#txtRegisterEmail").val() == '') {
//        validate += "<li>Email Cannot be empty.</li>";
//        isValid = false;
//    }

//    if ($("#txtEmail").val() != '') {
//        if (!ValidateEmail($("#txtEmail").val())) {
//            validate += "<li>Please enter valid email address.</li>";
//            isValid = false;
//        }
//    }
//    if ($("#txtUname").val() == '') {
//        validate += "<li>Username Cannot be empty.</li>";
//        isValid = false;
//    }
//    if ($("#txtPSW").val() == '') {
//        validate += "<li>Password Cannot be empty.</li>";
//        isValid = false;
//    }

//    validate += "</ul>";
//    if (!isValid) {
//        Warning(validate);
//    }

//    return isValid;
//}
