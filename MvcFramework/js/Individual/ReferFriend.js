$(document).ready(function () {
    $('input[type="text"], input[type="email"], textarea').val('');
    $("#btnReferFriend").click(function (e) {
        let isValid = true;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let namePattern = /^[A-Za-z]+$/;

        for (let i = 0; i <= 10; i++) {
            let firstName = $(`#ReferrerList_${i}__Name`).val();
            let lastName = $(`#ReferrerList_${i}__LastName`).val();
            let email = $(`#ReferrerList_${i}__Email`).val();

            if (firstName && !namePattern.test(firstName)) {
                alert(`First Name ${i} is invalid. Only alphabetic characters are allowed.`);
                isValid = false;
                break;
            }

            if (lastName && !namePattern.test(lastName)) {
                alert(`Last Name ${i} is invalid. Only alphabetic characters are allowed.`);
                isValid = false;
                break;
            }

            if (email && !emailPattern.test(email)) {
                alert(`Email ${i} is invalid. Please enter a valid email address.`);
                isValid = false;
                break;
            }

            if ((firstName && !lastName) || (!firstName && lastName)) {
                alert(`Both First and Last Name are required for Friend ${i}.`);
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            e.preventDefault();
            return false;
        }

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