/* ========================================== 
MENU RESPONSIVE
========================================== */
$(function () {
    const header = $('header').outerHeight();
    console.log(header);
    const burgerMenu = document.getElementById("burger");
    const navbarMenu = document.getElementById("menu-nav");

    // Show and Hide Navbar Menu
    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("is-active");
        navbarMenu.classList.toggle("is-active");

        if (navbarMenu.classList.contains("is-active")) {
            //   navbarMenu.style.height = 400+ "px";
            $("#menu").css("height", "calc(100vh - " + header + "px)")
            //  navbarMenu.style.maxHeight = navbarMenu.scrollHeight + "px";

        } else {
            navbarMenu.removeAttribute("style");
        }
    });
});

$(window).scroll(function () {
    var nav = $('.d-nav');
    var top = 50;
    if ($(window).scrollTop() >= top) {

        nav.addClass('nav-bg-purple');

    } else {
        nav.removeClass('nav-bg-purple');
    }
});


// below function to add purple bg in header whenever user scroll down for better visibility
$(window).scroll(function () {
    var nav = $('.d-nav');
    var top = 50;
    if ($(window).scrollTop() >= top) {

        nav.addClass('nav-bg-purple');

    } else {
        nav.removeClass('nav-bg-purple');
    }
});

// text transcript 
function ValidateTranscript() {

    var message = '';
    var isValid = true;
    if ($('#txtTranscriptNoNew').val().trim() == '') {

        isValid = false;
        message += 'Please enter transcript no.';

    }
    if ($('#txtTranscriptNoNew').val().trim() != '') {
       if ($('#txtTranscriptNoNew').val().length > 20) {
            isValid = false;
            message += 'Length of transcript no. cannot exceed 20 characters.';
            // window.location.href = "/Report/Transcript?transcriptId=" + $('#txtTranscriptNoNew').val();
        }
    }

    if (!isValid) {
        //message += '</ul>';
        alert(message);
        return false;

    }
    else {
        window.location.href = "/Report/Transcript?transcriptId=" + $('#txtTranscriptNoNew').val();
    }
}