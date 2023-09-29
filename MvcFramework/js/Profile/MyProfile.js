var cameraStream = null;
var capture = document.getElementById("capture");
var snapshot = document.getElementById("snapshot");

$(document).ready(function () {

    $("#buttonframe").on('click', function () {
        startStreaming();
        $("#faq").modal('show');
    });

    $("#btnCloseTrack").on('click', function () {
        location.reload();
    });




    $("#btnCaptureImage").click(function () {
        location.href = "CaptureImage.aspx"
    });

    $("#btnSubmit").click(function () {

        if (ValidateInput()) {
            ButtonDisableEnable("Saving...", true, "btnSubmit");
            var UpdatedIndUser = {
                AddressLine1: $("#txtAddress1").val().trim(),
                AddressLine2: $("#txtAddress2").val().trim(),
                City: $("#txtCity").val().trim(),
                Zip: $("#txtZip").val().trim(),
                Country: $("#ddlCountry :selected").text(),
                State: $("#txtState").val().trim(),
                FirstName: $("#txtFirstName").val().trim(),
                LastName: $("#txtLastName").val().trim(),
                Phone: $("#txtPhone").val().trim(),
                Email: $("#txtEmail").val().trim(),
                GmailAddress: $("#txtGmailAccount").val().trim()
            };


            $.ajax({
                type: 'POST',
                cache: false,
                async: true,
                contentType: 'application/json; charset=utf-8',
                url: 'EditProfile.aspx/EditIndividualUser',
                data: JSON.stringify({ 'indUserUpdate': UpdatedIndUser }),
                dataType: 'json',
                success: function (response) {
                    var result = response.d;

                    if (result) {
                        alert('Profile saved successfully');
                        $('#lblUserName').text($("#txtFirstName").val().trim() + ' ' + $("#txtLastName").val().trim());
                        $('#lblUserNameTitle').text($("#txtFirstName").val().trim() + ' ' + $("#txtLastName").val().trim());
                        $('#lblCityCountry').text($("#txtCity").val().trim() + ', ' + $("#ddlCountry :selected").text());
                        $("#btnSubmit").hide();
                        var hdnId = getParameterByName('isSocial', '')
                        if (hdnId == 'true')
                            location.href = "MyCart.aspx";
                        else
                            $("#btnContinue").show();
                    }
                    else {
                        alert('Profile not saved successfully');

                    }
                    ButtonDisableEnable("Save", false, "btnSubmit");
                }
                ,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    ButtonDisableEnable("Save", false, "btnSubmit");
                    console.log(XMLHttpRequest);
                }
            });
        }
        return false;
    });

    $("#btnContinue").click(function () {
        location.href = "ManageDocument.aspx";
    });
    var _URL = window.URL || window.webkitURL;
    $("#f_UploadImage").on('change', function () {
        var file, img;
        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function () {
                sendFile(file);
            };
            img.onerror = function () {
                alert("Not a valid file:" + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
    });

});


function setUploadButtonState() {
    var maxFileSize = 4194304; // 4MB -> 4 * 1024 * 1024
    var fileUpload = $('[id$=fuUploadPic]');

    if (fileUpload.val() == '') {
        return false;
    }
    else {
        var fileExtention = fileUpload[0].files[0].name.split(".")[1];
        if (fileExtention.toLowerCase() == "jpg" || fileExtention.toLowerCase() == "jpeg"
            || fileExtention.toLowerCase() == "png") {
            if (fileUpload[0].files[0].size < maxFileSize) {
                return true;
            } else {
                Warning("Whoops! File size is too large.Please Select a file less than 4MB.");
                return false;
            }
        }
        else {
            Warning("This file format cannot be uploaded.");
            return false;
        }
    }
}
function ClosePop() {
    $('.close').click();
    location.reload();
}

function startStreaming() {
    var mediaSupport = 'mediaDevices' in navigator;

    if (mediaSupport && null == cameraStream) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (mediaStream) {
                cameraStream = mediaStream;
                stream.srcObject = mediaStream;
                stream.play();
            })
            .catch(function (err) {
                console.log("Unable to access camera: " + err);
            });
    }
    else {
        alert('Your browser does not support media devices.');
        return;
    }
}

function captureSnapshot() {

    if (null != cameraStream) {
        var ctx = capture.getContext('2d');
        var img = new Image();
        ctx.drawImage(stream, 0, 0, capture.width, capture.height);
        img.src = capture.toDataURL("image/png");
        img.width = 280;
        img.height = 230;
        snapshot.innerHTML = '';
        snapshot.appendChild(img);
    }
}
function UploadPic() {

    $('body').addClass('loader');
    $('body').removeClass('loaded');
    // generate the image data
    var canvas = document.getElementById("capture");
    var dataURL = canvas.toDataURL("image/png");

    // Sending the image data to Server
    $.ajax({
        type: 'POST',
        url: "EditProfile.aspx?type=cam",
        data: { imgBase64: dataURL },
        async: false,
        success: function () {
            $('body').removeClass('loader');
            $('body').addClass('loaded');
            location.reload();
            return false;
        }
    });
}

function sendFile(file) {
    ButtonDisableEnable("Uploading...", false, "btnChangePic");
    var maxFileSize = 4096000 // 4MB -> 4000 * 1024
    var formData = new FormData();
    formData.append('file', $('#f_UploadImage')[0].files[0]);
    var fileExtention = $('#f_UploadImage')[0].files[0].name.split(".")[1];
    if ($('#f_UploadImage')[0].files[0].size < maxFileSize) {
        if (fileExtention.toLowerCase() == "jpg" || fileExtention.toLowerCase() == "jpeg"
            || fileExtention.toLowerCase() == "png" || fileExtention.toLowerCase() == "gif" || fileExtention.toLowerCase() == "bmp") {
            $.ajax({
                type: 'post',
                url: '/Handler/FileUploader.ashx',
                data: formData,
                success: function (status) {
                    if (status != 'error') {
                        $("#myUploadedImg").attr("src", status);
                        Success("Image Uploaded Successfully.");
                    }
                    ButtonDisableEnable("CHANGE PHOTO", false, "btnChangePic");
                },
                processData: false,
                contentType: false,
                error: function () {
                    Warning("Whoops something went wrong!");
                    ButtonDisableEnable("CHANGE PHOTO", false, "btnChangePic");
                }
            });
        }
        else {
            Warning("This file format cannot be uploaded.");
        }
    }
    else {
        Warning("Whoops! File size is too large.Please Select a file less than 4MB.");
    }
}

function ValidateInput() {
    var validate = '<ul>';
    var isValid = true;

    if ($("#txtFirstName").val().trim() == '') {
        validate += "<li>First Name cannot be empty.</li>";
        isValid = false;

    }
    if ($("#txtLastName").val().trim() == '') {
        validate += "<li>Last Name cannot be Empty.</li>";
        isValid = false;

    }
    if ($("#txtAddress1").val().trim() == '') {
        validate += "<li>Address Line 1 cannot be empty.</li>";
        isValid = false;
    }
    if ($("#txtCity").val().trim() == '') {
        validate += "<li>City cannot be Empty.</li>";
        isValid = false;

    }
    if ($("#txtZip").val().trim() == '') {
        validate += "<li>Zip/Postal Code cannot be empty.</li>";
        isValid = false;
    }

    if ($("#ddlCountry").val() == '') {
        validate += "<li>Country is not selected.</li>";
        isValid = false;
    }
    if ($("#txtState").val().trim() == '') {
        validate += "<li>State/Province cannot be empty.</li>";
        isValid = false;
    }

    if ($("#txtPhone").val().trim() == '') {
        validate += "<li>Contact Number cannot be empty.</li>";
        isValid = false;

    }

    if ($("#txtEmail").val().trim() == '') {
        validate += "<li>Email cannot be Empty.</li>";
        isValid = false;

    }

    //if ($("#txtGmailAccount").val().trim() == '') {
    //    validate += "<li>Gmail cannot be Empty.</li>";
    //    isValid = false;
    //}

    if ($("#hdnSnapImage").val().trim() == '') {
        validate += "<li>SnapShot is required.</li>";
        isValid = false;
    }

    if ($("#txtEmail").val().trim() != '' || $("#txtPhone").val().trim() != '' || $("#txtZip").val().trim() != '' || $("#txtGmailAccount").val().trim() != '') {

        if (!ValidateEmail($("#txtEmail").val().trim())) {
            validate += "<li>Enter a valid email.</li>";
            isValid = false;
        }

        if (/@gmail\.com$/.test($("#txtGmailAccount").val().trim())) {

        }
        else {
            validate += "<li>Enter a valid Gmail Account.</li>";
            isValid = false;
        }

        if (!ValidatePhone($("#txtPhone").val().trim())) {
            validate += "<li>Enter a valid Contact Number.</li>";
            isValid = false;

        }
        if (!ValidateZipPostal($("#txtZip").val().trim())) {
            validate += "<li>Enter a valid Zip/Postal Code.</li>";
            isValid = false;
        }
    }

    if (isValid == true) {
        var islengthValid = validateLength();
        if (islengthValid != "") {
            validate += islengthValid;
            isValid = false;
        }
    }
    validate += "</ul>";
    if (!isValid) {
        Swal.fire('Any fool can use a computer')
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: validate

        })

        // Warning(validate);
    }
    ButtonDisableEnable("Save", false, "btnSubmit");
    return isValid;

}

function validateLength() {
    var validateMsg = "";
    if ($("#txtFirstName").val().trim().length > 50) {
        validateMsg = "<li>Firstname length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtLastName").val().trim().length > 50) {
        validateMsg = "<li>LastName length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtAddress1").val().trim().length > 50) {
        validateMsg += "<li>Address Line 1 length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtAddress2").val().trim().length > 50) {
        validateMsg += "<li>Address Line 2 length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtCity").val().trim().length > 50) {
        validateMsg += "<li>City length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtState").val().trim().length > 50) {
        validateMsg += "<li>State length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtEmail").val().trim().length > 50) {
        validateMsg += "<li>Email length Cannot exceed 50 characters.</li>";
    }
    if ($("#txtGmailAccount").val().trim().length > 50) {
        validateMsg += "<li>Gmail length Cannot exceed 50 characters.</li>";
    }

    if ($("#txtZip").val().trim().length < 2) {
        validateMsg += "<li>ZipCode length must be greater then 2 characters.</li>";
    }
    if ($("#txtPhone").val().trim().length < 8) {
        validateMsg += "<li>Phone number length must be greater then 8 characters.</li>";
    }

    return validateMsg;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

