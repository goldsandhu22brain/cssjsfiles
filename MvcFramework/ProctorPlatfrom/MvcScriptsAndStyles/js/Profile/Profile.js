

function UpdateSecretQuestion() {
  
    if (ValidateSecurityQuestionInputs()) {
        var SecurityQueAnsDetail = [];
        $("#dvInputControls .spnInputControls").each(function () {
            var collectInputDetail = {};
            collectInputDetail.QuestionId = $($(this).find('.qns')[0]).attr("data-qid");
            collectInputDetail.UserAnswer = $(this).find('input.txtanswer').val();
            SecurityQueAnsDetail.push(collectInputDetail);
        });
        $('#submit-sec-qns').val($('#submit-sec-qns').data("loading-text")); 
        $.ajax({
            url: "/Test/UpdateSecurityQuestion",
            type: "POST",
            data: { 'questionInput': SecurityQueAnsDetail },
            success: function (result) {
                   window.SecQnsCallBack && window.SecQnsCallBack(result);
             
            }
        });
        return false;
    }
    return false;
}

function ValidateSecurityQuestionInputs() {
    var validateMessage = '<ul>';
    var isValid = true;
   // var isQuestionSelect = true;
    var isAnsEnter = true;


    $('#dvInputControls .spnInputControls').each(function (i, selected) {
     
        if ($(this).find('input.txtanswer').val() == '') {
            isAnsEnter = false;

        }

    });   

    if (!isAnsEnter) {
        validateMessage += 'Please enter answers for all security questions.';
        isValid = false;
    }

    if (!isValid) {
        validateMessage += '';
        window.ToastMessage(validateMessage, true);
    }
    return isValid;
}

