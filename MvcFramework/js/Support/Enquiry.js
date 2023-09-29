/* Sticky Header */
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('header').addClass("sticky");
    }
    else {
        $('header').removeClass("sticky");
    }
});
function ShowMessageinModel(message) {
    $("div#StatusMessage").text(message);
}
$("#btnSubmitFaq").click((e) => {
    var enqType = $("#txtEnquiryTypeFaq").val();
    var enqFN = $("#txtFirsNameFaq").val();
    var enqLN = $("#txtLastNameFaq").val();
    var enqEmail = $("#txtEmailFaq").val();
    var enqContact = $("#txtContactFaq").val();
    var enqMsg = $("#txtMessageFaq").val();

    var enqCompName = $("#txtCompName").length != 0 ? $("#txtCompName").val() : "";
    var enqWebsite = $("#txtWebSite").length != 0 ? $("#txtWebSite").val() : "";
    var enqWebsite = $("#txtWebSite").length != 0 ? $("#txtWebSite").val() : "";
    var enqCity = $("#txtCity").length != 0 ? $("#txtCity").val() : "";
    var enqCountry = $("#txtCountry").length != 0 ? $("#txtCountry").val() : "";
    var corpEnquiry = $("#hdnCorp").val();

    if (enqFN == "") {
        alert("First Name is required");
        return;
    }

    if (enqLN == "") {
        alert("Last Name is required");
        return;
    }

    if (enqEmail == "") {
        alert("Email is required");
        return;
    }
    if (!CheckValidEmail(enqEmail)) {
        alert("Kindly enter valid Email");
        return;
    }
    if (corpEnquiry) {

        if (enqCompName == "") {
            alert("Company Name is required");
            return;
        }
    }

    //Website
    $('.ajax-loader').css("visibility", "visible");

    $.ajax({
        type: 'POST',
        cache: false,
        async: true,
        url: '/Enquiry/Submit',
        data: {
            'FName': enqFN, 'LName': enqLN, 'EmailAddress': enqEmail, 'ContactNo': enqContact, 'Question': enqMsg,
            'EnquiryType': enqType, 'Status': 5, Website: enqWebsite, CompanyName: enqCompName, City: enqCity, Country: enqCountry
        },
        dataType: 'json',
        success: function (response) {
            if (response != null) {
                if (response.Status == 200) {
                    ShowMessageinModel('Request Submitted');
                    $("#contactSubmitPopup .modal-body").html("Your query submited successfully");
                    $("#contactForm")[0].reset();
                } else {
                    ShowMessageinModel(response.Message);
                    $("#contactSubmitPopup .modal-body").html(response.Message);
                }
            } else {
                ShowMessageinModel('Contact Admin Team. Response is Null');
                $("#contactSubmitPopup .modal-body").html("Contact Admin Team. Response is Null");
            }
            $("#contactSubmitPopup").modal("show");
            $('.ajax-loader').css("visibility", "hidden");
            return true;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            ShowMessageinModel('Contact Admin Team. Response is Error');
            $("#contactSubmitPopup .modal-body").html("Contact Admin Team. Response is Error");
            $("#contactSubmitPopup").modal("show");
            $('.ajax-loader').css("visibility", "hidden");
            return true;
        },
        always: function () {
            $("#pageloaddiv").css("display", "none");
            return true;
        }
    });
});
$("#btnSubmitComment").click((e) => {
    var faqId = $("#txtEnquiryId").val();
    var faqComments = $("#txtComments").val();
    var faqRate = $("#RateScore").val();

    $.ajax({
        type: 'POST',
        cache: false,
        async: true,
        url: '/issue/NewComments',
        data: {
            'FaqId': faqId, 'Comments': faqComments, 'RatingScore': faqRate
        },
        dataType: 'json',
        success: function (response) {
            if (response != null) {
                if (response.Status == 200) {
                    ShowMessageinModel('Comments added Successfully');
                    window.location.reload();
                }
                else {
                    ShowMessageinModel(response.Message);
                }
            }
            else {
                ShowMessageinModel('Contact Admin Team. Response is Null');
            }
            return true;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            ShowMessageinModel('Contact Admin Team. Response is Error');
            return true;
        },
        always: function () {
            $("#pageloaddiv").css("display", "none");
            return true;
        }
    });
});


function ReLoadImages() {
    setTimeout(() => {

        $('img[data-src]').each(function () {
            $(this).attr('src', $(this).attr('data-src'));

            //$(this).attr('onError', "this.onerror=null;this.src='/images/logo.jpg'");
            $(this).removeAttr('data-src');
        })
    }, 40);

}
CheckValidEmail = (input) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex))
        return true;
    else
        return false;
};
ReLoadImages();