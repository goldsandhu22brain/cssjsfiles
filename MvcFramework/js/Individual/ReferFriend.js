$(document).ready(function () {
    $("#btnReferFriend").click(function () {

        const count = $(".myinput").filter(function () {
            return $(this).val() != "";
        }).length;
        if (count == 0) {
            alert("Please enter altleast one Friend");
            return false;
        }

        if ($('input[name="checkBoxName"]').is(':checked')) {
            return true
        } else {
            alert("You have to accept terms and conditions to participate.");
            return false;
        }
    });
});