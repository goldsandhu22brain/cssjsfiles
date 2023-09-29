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
        
    let video = document.querySelector(".snapshot-camera-video");    
    let canvas = document.querySelector(".snapshot-camera-canvas");    
    $("#start-camera").off('click');
    $("#start-camera").on('click', async function () {
    let stream = null;
    try {
    	stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }
    catch(error) {
    	alert(error.message);
    	return;
    }
        video.srcObject = stream;
        if (!$(".camera-image").hasClass("hide")) {
            $(".camera-image").addClass("hide");
        }
        if ($(".camera-video").hasClass("hide")) {
            $(".camera-video").removeClass("hide");
        }
        if (!$(".camera-canvas").hasClass("hide")) {
            $(".camera-canvas").addClass("hide");
        }
        if ($("#click-photo").hasClass("hide")) {
            $("#click-photo").removeClass("hide");
        }
        if (!$("#start-camera").hasClass("hide")) {
            $("#start-camera").addClass("hide");
        }
    });
    $("#click-photo").off('click');
    $("#click-photo").on('click', function () {
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL('image/jpeg');

        if ($(".camera-canvas").hasClass("hide")) {
            $(".camera-canvas").removeClass("hide");
        }
        if (!$(".camera-video").hasClass("hide")) {
            $(".camera-video").addClass("hide");
        }
        if ($("#btnChangeSnap").hasClass("hide")) {
            $("#btnChangeSnap").removeClass("hide");
        }
        if (!$("#click-photo").hasClass("hide")) {
            $("#click-photo").addClass("hide");
        }
        // data url of the image
        console.log(image_data_url);
    });
    $("#btnChangeSnap").off('click');
    $("#btnChangeSnap").on('click', function () {
        if (!$(".camera-video").hasClass("hide")) {
            $(".camera-video").addClass("hide");
        }
        if (!$(".camera-canvas").hasClass("hide")) {
            $(".camera-canvas").addClass("hide");
        }
        var usertype = $(this).attr('data-attr-type');
        const canvas = document.querySelector(".snapshot-camera-canvas");
        const img = canvas.toDataURL('image/png');
        if ($(".camera-image").hasClass("hide")) {
            $(".camera-image").removeClass("hide");
        }
        $("#imgSnapshot").attr("src", img + '?' + Math.random());
        //document.getElementById('imgSnapshot').src = img;
        var file = dataURItoFile(img);
        UploadSnapShot(file, usertype);
    });

});
function dataURItoFile(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    //return ia;
    return new File([ia], "upload.png", { type: mimeString });
}
function UploadSnapShot(file, usertype) {  
    var IsSnap = true;
    ButtonDisableEnable("Uploading...", false, "btnChangeSnap");       
    var maxFileSize = 4096000; // 4MB -> 4000 * 1024
    var formData = new FormData();
    formData.append('file', file);
    var fileExtention = file.name.split(".")[1];
    if (file.size < maxFileSize) {
        if (fileExtention.toLowerCase() == "jpg" || fileExtention.toLowerCase() == "jpeg"
            || fileExtention.toLowerCase() == "png" || fileExtention.toLowerCase() == "gif" || fileExtention.toLowerCase() == "bmp") {
            $.ajax({
                type: 'post',
                url: '/user/Profile/UploadPicture?UserType=' + usertype + "&IsSnapshot=" + IsSnap + "",
                data: formData,
                success: function (response) {
                    if (response != null && response.Status == 200) {

                        var imageURL = "/UserImages/" + response.userType + "/SnapShot/" + response.imageUrl;
                        $("#imgSnapshot").attr("src", imageURL + '?' + Math.random());
                      
                        if (!$("#btnChangeSnap").hasClass("hide")) {
                            $("#btnChangeSnap").addClass("hide");
                        }
                        if (!$(".camera-canvas").hasClass("hide")) {
                            $(".camera-canvas").addClass("hide");
                        }
                        if (!$(".camera-video").hasClass("hide")) {
                            $(".camera-video").addClass("hide");
                        }
                        if ($(".camera-image").hasClass("hide")) {
                            $(".camera-image").removeClass("hide");
                        }
                        if ($("#start-camera").hasClass("hide")) {
                            $("#start-camera").removeClass("hide");
                        }
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