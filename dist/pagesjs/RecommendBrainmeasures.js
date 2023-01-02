$(document).ready(function () {

    $(document).on('click', '#btnSubmitRecommendation', function () {
        ButtonDisableEnable("Submitting", true, "btnSubmitRecommendation");
        var mulEmails = '';
        var fname = '';
        var lname = '';
        var frndDetail = [];
        var ValidateMessage = '<ul>';
        var isValid = true;
        var incrFirstNameChk = 0;
        var incrEmailChk = 0;

        if ($("#txtYourName").val().trim() == '') {
            ValidateMessage += '<li>Your Name cannot be empty.</li>';
            isValid = false;
        }
        if ($("#txtYourEmail").val().trim() == '') {
            ValidateMessage += '<li>Your Email cannot be empty.</li>';
            isValid = false;
        }
        else {
            if (!ValidateEmail($("#txtYourEmail").val().trim())) {
                ValidateMessage += "<li>Enter your valid email.</li>";
                isValid = false;
            }
        }


        $("#tblRecommendBrainmeasures tbody tr").each(function () {
            var collectFrndDetail = {};

            collectFrndDetail.FirstName = $(this).find('input.fname').val();

            collectFrndDetail.Email = $(this).find('input.email').val();
            mulEmails = $(this).find('input.email').val() != '' ? mulEmails.concat($(this).find('input.email').val(), ",") : mulEmails;
            if (collectFrndDetail.FirstName == '' && collectFrndDetail.Email != '') {
                if (incrFirstNameChk == 0) {
                    incrFirstNameChk = 1;
                    ValidateMessage += '<li>Please enter Name with the entered email.</li>';
                    isValid = false;
                }
            }
            if (collectFrndDetail.FirstName != '' && collectFrndDetail.Email == '') {
                if (incrEmailChk == 0) {
                    incrEmailChk = 1;
                    ValidateMessage += '<li>Please enter Email for the name you entered.</li>';
                    isValid = false;
                }
            }
            if (collectFrndDetail.FirstName != '' && collectFrndDetail.Email != '')
                frndDetail.push(collectFrndDetail);

        });

        if (mulEmails != '' || mulEmails != null || mulEmails != undefined) {
            var valMulEmail = ValidateMultiEmails(mulEmails);

            if (valMulEmail.length > 0 && valMulEmail != '') {
                ValidateMessage += '<li>Following are not valid emails: <br/>' + valMulEmail + '.</li>';
                isValid = false;
            }
        }

        if (frndDetail == null || mulEmails == '') {
            ValidateMessage += '<li>Please enter altleast one Friend' + "'" + 's Detail. </li>';
            isValid = false;
        }

        if (!isValid) {
            ValidateMessage += "</ul>";
            Warning(ValidateMessage);
            ButtonDisableEnable("Submit", false, "btnSubmitRecommendation");
        }

        if (isValid) {
            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'recommend_brainmeasures.aspx/RecommendFriendSendEmail',
                data: JSON.stringify({ 'recommendFriend': frndDetail, 'yourName': $("#txtYourName").val().trim(), 'yourEmail': $("#txtYourEmail").val().trim() }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;
                    if (result.Status == "1") {
                        Success(result.ResponseData);
                        $("#txtYourName").val('');
                        $("#txtYourEmail").val('');
                        $(".fname").val('');
                        $(".email").val('');
                    }
                    else {
                        Warning(result.ResponseData);

                    }
                    ButtonDisableEnable("Submit", false, "btnSubmitRecommendation");
                }
                            ,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                    ButtonDisableEnable("Submit", false, "btnSubmitRecommendation");
                }
            });
        }

        return false;

    });
});