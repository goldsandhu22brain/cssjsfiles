
function UpdateCorpSettings() {

    ButtonDisableEnable("Saving...", true, "btnSaveAll");
    var chkNegativeMarking = false;
    var chkCandidatesViewResult = false;
    var chkMovePreviousQuestion = false;
    var chkForwardResultMail = false;
    if ($("#chkNegativeMarking").is(':checked'))
        chkNegativeMarking = true;
    if ($("#chkCandidatesViewResult").is(':checked'))
        chkCandidatesViewResult = true;
    if ($("#chkMovePreviousQuestion").is(':checked'))
        chkMovePreviousQuestion = true;
    if ($("#chkForwardResultToMails").is(':checked'))
        chkForwardResultMail = true;

    var Emails = $("#txtAreaMultiEmails").val().trim();

    var chkForCall = false;
    if ($("#chkForwardResultToMails").is(':checked')) {
        if (Emails != '') {
            var glbEmail = ValidateEmails(Emails);
            if (glbEmail.length > 0) {
                $.gritter.add({
                    title: 'Error',
                    text: 'Following are not valid emails: <br/>' + glbEmail,
                    class_name: 'gritter-warning'
                });
                $('.gritter-item').css({ 'font-weight': 'bold' });

                chkForCall = false;
                glbEmail = [];
                ButtonDisableEnable("Save All", false, "btnSaveAll");
            }
            else
                chkForCall = true;
        }
        else {
            Warning('<ul><li>Please enter Email(s) with comma or semicolon separated values.</li></ul>');
            chkForCall = false;
            ButtonDisableEnable("Save All", false, "btnSaveAll");
        }
    }
    else
        chkForCall = true;

    if (chkForCall) {

        var UpdatedSettingsCorpUser = {
            AllowMoveBack: chkMovePreviousQuestion,
            AllowViewResult: chkCandidatesViewResult,
            NegativeMarking: chkNegativeMarking,
            AllowResultForward: chkForwardResultMail,
            ResultEmailToId: Emails
        };


        $.ajax({
            url: "/user/corporate/UpdateCorporateSetting",
            type: "POST",
            data: UpdatedSettingsCorpUser,
            success: function (result) {
                if (result.Status == 200) {
                    $.gritter.add({
                        title: 'Success',
                        text: 'Settings saved successfully',
                        class_name: 'gritter-success'
                    });
                    $('.gritter-item').css({ 'font-weight': 'bold' });
                    $("#btnSaveAll").hide();
                    $("#btnContinue").show();
                }
                else {
                    $.gritter.add({
                        title: 'Error',
                        text: 'Settings not saved successfully',
                        class_name: 'gritter-warning'
                    });
                    $('.gritter-item').css({ 'font-weight': 'bold' });
                }
                ButtonDisableEnable("Save All", false, "btnSaveAll");
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    }
}

function UpdateCorpSettingsContinue() {
    location.href = "/profile/AccountMeter";
}


function GetTestProctorVideos() {
    $('body').addClass('loader');
    $('body').removeClass('loaded');

    var selectedVideo = $("#ddlTest option:selected").val();

    if (selectedVideo != "0") {
        $.ajax({
            url: "/user/corporate/GetProctorVideo",
            type: "POST",
            data: {
                'videoId': $("#ddlTest option:selected").val()
            },
            success: function (result) {
                $("#proctorvideosection").html(result);
                $('body').removeClass('loader');
                $('body').addClass('loaded');
            }
        });
    }
    else {
        Warning('<ul><li>Please select Valid Video.</li></ul>');
    }

}