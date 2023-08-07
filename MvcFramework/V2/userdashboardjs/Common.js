var $ = jQuery.noConflict();
$(document).ready(function () {

    setTimeout(function () {
        $('body').addClass('loaded');
    }, 2000);

    var _URL = window.URL || window.webkitURL;

    //Upload profile image
    $("#f_UploadImage").on('change', function (e) {
        e.stopImmediatePropagation();
        var file, img;
        var usertype = $(this).attr('data-attr-type');
        
        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function () {
                UploadImage(file, usertype);
            };
            img.onerror = function () {
                alert("Not a valid file:" + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
    });



    //Upload Snapshot

    $("#f_UploadImage_snapshot").on('change', function (e) {
        e.stopImmediatePropagation();
        var file, img;
        var usertype = $(this).attr('data-attr-type');

        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function () {
                UploadSanpShot(file, usertype);
            };
            img.onerror = function () {
                alert("Not a valid file:" + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
    });



});

function UploadSanpShot(file, usertype) {
    var IsSnap = true;
    ButtonDisableEnable("Uploading...", false, "btnChangeSnap");
    var maxFileSize = 4096000 // 4MB -> 4000 * 1024
    var formData = new FormData();
    formData.append('file', $('#f_UploadImage_snapshot')[0].files[0]);
    var fileExtention = $('#f_UploadImage_snapshot')[0].files[0].name.split(".")[1];
    if ($('#f_UploadImage_snapshot')[0].files[0].size < maxFileSize) {
        if (fileExtention.toLowerCase() == "jpg" || fileExtention.toLowerCase() == "jpeg"
            || fileExtention.toLowerCase() == "png" || fileExtention.toLowerCase() == "gif" || fileExtention.toLowerCase() == "bmp") {
            $.ajax({
                type: 'post',
                url: '/user/Profile/UploadPicture?UserType=' + usertype + "&IsSnapshot="+IsSnap+"",
                data: formData,
                success: function (response) {
                    if (response != null && response.Status == 200) {

                        var imageURL = "/UserImages/" + response.userType + "/SnapShot/" + response.imageUrl;
                        $("#imgSnapshot").attr("src", imageURL + '?' + Math.random());
                        Success("Snapshot Uploaded Successfully.");
                    }
                    else {
                        Warning("Something went wrong!");
                    }
                    ButtonDisableEnable("CHANGE SNAPSHOT", false, "btnChangeSnap");
                },
                processData: false,
                contentType: false,
                error: function () {
                    Warning("Whoops something went wrong!");
                    ButtonDisableEnable("CHANGE SNAPSHOT", false, "btnChangeSnap");
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

function UploadImage(file, usertype) {    
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
                url: '/user/Profile/UploadPicture?UserType='+usertype,
                data: formData,
                success: function (response) {
                    if (response != null && response.Status == 200) {

                        var imageURL = "/UserImages/" + response.userType + "/Images/" + response.imageUrl;                       
                        $("#myUploadedImg").attr("src", imageURL + '?' + Math.random());                        
                        Success("Image Uploaded Successfully.");
                    }
                    else {
                        Warning("Something went wrong!");
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

function ButtonDisableEnable(btntxt, isEnable, btnId) {
    if (isEnable) {
        $("#" + btnId).text(btntxt);
        if ($("#" + btnId).is("input:submit")) {
            $("#" + btnId).attr("value", btntxt);
        }
        $("#" + btnId).attr("disabled", true);
        $("#" + btnId).css("opacity", "0.5");
    }
    else {
        $("#" + btnId).text(btntxt);
        if ($("#" + btnId).is("input:submit")) {
            $("#" + btnId).attr("value", btntxt);
        }
        $("#" + btnId).attr("disabled", false);
        $("#" + btnId).css("opacity", "1");
    }
}