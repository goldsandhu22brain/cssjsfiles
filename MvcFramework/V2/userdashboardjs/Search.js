

function ValidateTranscript() {
    var message = '<ul>';
    var isValid = true;
    if ($('#txtTranscriptNo').val().trim() == '') {

        isValid = false;
        message += '<li>Please enter transcript no.</li>';

    }
    if ($('#txtTranscriptNo').val().trim() != '') {
        if (!ValidateNumberText($('#txtTranscriptNo').val())) {
            isValid = false;
            message += '<li>Please enter transcript no. in numeric format.</li>';

        }
        else if ($('#txtTranscriptNo').val().length > 20) {
            isValid = false;
            message += '<li>Length of transcript no. cannot exceed 20 characters.</li>';
        }
    }

    if (!isValid) {
        message += '</ul>';
        Warning(message);
    }
    else {
        $.ajax({
            type: 'POST',
            url: '/dashboard/SearchTranscript',
            data: { 'txtTranscriptNo': $('#txtTranscriptNo').val() },
            dataType: 'json',
            success: function (result) {
                if (result.Status == 200) {
                    location.href = result.RedirectUrl;
                }
                else {
                    Warning(result.Message);
                }
            }
        });
    }
    return isValid;
}

$("#btnAnchorSearch").on("click", function () {
    var sechtxt = document.getElementById('txtSearch').value;
    GetCoursesById(0, sechtxt, true);
    searchCourses(sechtxt);

    $("#modal-fullscreen-xs-down").modal('show');
})

function GetCoursesById(groupId, srch, isSearchTrue) {
    $.ajax({
        type: 'POST',
        url: '/dashboard/GetCoursesById',
        data: { 'vdoCatId': groupId, 'srch': srch, 'isSearch': isSearchTrue },
        dataType: 'json',
        success: function (response) {
            if (response != "" && response != undefined && response.length > 0) {
                $("#emptysrchCourses").css("display", "none");
                var records = response;
                pagingVc(records);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
        }
    });
}

function searchCourses(sechtxt) {
    $.ajax({
        type: 'POST',
        url: '/dashboard/SrchCrs',
        data: JSON.stringify({ 'srchTxtCourses': sechtxt }),
        dataType: 'json',
        success: function (response) {
            if (response != "-1" && response.length > 0) {
                records = response;
                paging(records);
            }
            else {
                $("#emptysrchCourses").css("display", "inherit");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
        }
    });
}

function paging(records) {
    var pager = new Pager.Paging();
    pager.recordsPerPage = 15;
    pager.pagingControlsContainer = '#ulPagingCourses';
    pager.records = $(records, pager.pagingContainer);
    pager.pagingContainerPath = '#boxBodyCourses';
    pager.showPage(1);
}


function pagingVc(records) {
    var pagerVideo = new PagerVideo.Paging()
    pagerVideo.recordsPerPage = 15;
    pagerVideo.pagingControlsContainer = '#ulPagingCoursesvc';
    pagerVideo.records = $(records, pagerVideo.pagingContainer);
    pagerVideo.pagingContainerPath = '#boxBodyvc';
    pagerVideo.showPage(1);
}