

function SubmitTicketComments() {
    var userComment = $('#txtcomment').val().trim();

    if (userComment != undefined && userComment != null && userComment != "") {
        var data = { 'Comment': userComment }
        $.ajax({
            url: "/ticket/AddComment",
            type: "POST",
            data: { 'userComment': data },
            success: function (result) {
                if (result.Status == 200) {
                    location.href = "/ticket/viewticket?id=" + getParameterByName('id');
                }
                else {
                    Warning("Please try again later!");
                }
            }
        });
    }
    else {
        Warning("Please provide comments");
    }
}

function CreateNewTicket() {
    if (ValidateTicketInput()) {       
            $.ajax({
                url: "/Ticket/CreateNewTicket",
                type: "POST",
                data: {
                    'IssueType': $("#issueTypeDL").val(),
                    'Subject': $("#subject").val().trim(),
                    'Message': $("#detail").val().trim()
                },
                success: function (result) {
                    if (result.Status == 200) {
                        Success('<ul><li>Ticket saved successfully.</li></ul>');
                        setTimeout(function () {
                            location.href = "/ticket";
                        }, 4000);
                    }
                    else {
                        Warning('<ul><li>Ticket not saved successfully.</li></ul>');
                    }
                }
            });
    }
}


function ValidateTicketInput() {
    var validate = '<ul>';
    var isValid = true;
    if ($("#issueTypeDL").val() == '') {
        validate += '<li>Issue Type is not selected.</li>';
        isValid = false;
    }
    if ($("#subject").val().trim() == '') {
        validate += '<li>Subject cannot be empty.</li>';
        isValid = false;

    }
    if ($("#subject").val().trim() != '') {
        if ($("#subject").val().trim().length > 200) {
            validate += '<li>Subject cannot exceed more than 200 characters.</li>';
            isValid = false;
        }
    }
    if ($("#detail").val().trim() == '') {
        validate += '<li>Ticket Detail cannot be empty.</li>';
        isValid = false;

    }
    if ($("#detail").val().trim() != '') {
        if ($("#detail").val().trim().length > 250) {
            validate += '<li>Ticket Detail cannot exceed more than 250 characters.</li>';
            isValid = false;
        }
    }
    if (!isValid) {
        validate += '</ul>';
        Warning(validate);
    }
    return isValid;
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
