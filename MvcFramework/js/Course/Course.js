var pager = new Pager.Paging();//create object of Paging class
var records = null;
var showAllRecord = false;
$(document).ready(function () {
    $("#ulCourseGrp li").click(function (e) {

        var id = $(this).attr("id");
        if (id != "allCourses") {
            $("#ulCourseGrp li").removeClass("active");
            $(this).addClass("active");
            $("#courseGrpName").text("");
            $("#courseGrpName").text($(this).find("a").text());
            GetCoursesByGroup(id, "", "", "", false);
            $('#txtSrch').val('');
            $('#cmbFiltersByPrice').find('option:eq(0)').prop('selected', true);
            $('#cmbFilters').find('option:eq(0)').prop('selected', true);


        } else {
            $("#ulCourseGrp li").removeClass("active");
            $(this).addClass("active");
            $("#courseGrpName").text("");
            $("#courseGrpName").text($(this).find("a").text());
            GetCoursesByGroup(21, "", "", "", true);
            // $('#txtSrch').val('');
            $('#cmbFiltersByPrice').find('option:eq(0)').prop('selected', true);
            $('#cmbFilters').find('option:eq(0)').prop('selected', true);
        }


        e.preventDefault();
    });

    $("#ulPaging li").click(function (e) {
        var number = $(this).text();
        e.preventDefault();
    });
    $("#ulCourseGrp li").eq(0).click();

    $("#btnSrch").click(function (e) {
        $("#courseGrpName").text("Search");
        var filterId = $("#cmbFilters option:selected").attr("id");
        var isPaid = $("#cmbFiltersByPrice option:selected").attr("id");
        var cgid = $("#ulCourseGrp li.active").attr("id") == "allCourses" ? 21 : $("#ulCourseGrp li.active").attr("id");
        GetCoursesByGroup(cgid, $("#txtSrch").val(), filterId, isPaid, true);
        e.preventDefault();
    });
    $("#txtSrch").keypress(function (e) {
        if (e.which == 13) {
            $("#btnSrch").click();
            e.preventDefault();
        }
    });
    $("#cmbFilters").change(function () {
        var filterId = $("#cmbFilters option:selected").attr("id");
        var isPaid = $("#cmbFiltersByPrice option:selected").attr("id");
        $("#courseGrpName").text($("#cmbFilters option:selected").attr('crstxt'));
        $("#ulCourseGrp li").removeClass("active");
        $("#ulCourseGrp li").eq(0).addClass("active");
        var cgid = $("#ulCourseGrp li.active").attr("id") == "allCourses" ? 21 : $("#ulCourseGrp li.active").attr("id");
        GetCoursesByGroup(cgid, $("#txtSrch").val(), filterId, isPaid, true);
    });
    $("#cmbFiltersByPrice").change(function () {
        var filterId = $("#cmbFilters option:selected").attr("id");
        var isPaid = $("#cmbFiltersByPrice option:selected").attr("id");
        $("#courseGrpName").text($("#cmbFiltersByPrice option:selected").attr('crstxt'));
        $("#ulCourseGrp li").removeClass("active");
        $("#ulCourseGrp li").eq(0).addClass("active");
        var cgid = $("#ulCourseGrp li.active").attr("id") == "allCourses" ? 21 : $("#ulCourseGrp li.active").attr("id");
        GetCoursesByGroup(cgid, $("#txtSrch").val(), filterId, isPaid, true);
    });

    //$(document).on('click', '.CourseRedirectLnk', function () {

    //    var id = $(this).attr("id");
    //    var courseDesc = $(this).attr("href");
    //    $.ajax({
    //        type: 'POST',
    //        cache: false,
    //        async: true,
    //        contentType: 'application/json; charset=utf-8',
    //        url: 'Courses.aspx/SaveRecentlyViewedCourse',
    //        data: JSON.stringify({ 'courseID': id }),
    //        dataType: 'json',
    //        success: function (response) {
    //            //if (response.d)
    //            //    document.location.href = courseDesc;
    //        },
    //        error: function (XMLHttpRequest, textStatus, errorThrown) {
    //            console.log(XMLHttpRequest);
    //        }
    //    });

    //});
});

function paging() {
    pager.recordsPerPage = 15; // set amount elements per page
    pager.pagingContainer = '#ulPaging'; // set of main container
    pager.records = $(records, pager.pagingContainer); // set of required containers
    pager.pagingContainerPath = '#boxBody';//set paging container path    
    pager.showPage(1);
}

function showLoading(isLoad) {
    if (isLoad) {
        $("#pageloaddiv").css("display", "inherit");

    } else {
        $("#pageloaddiv").css("display", "none");
    }
}

function GetCoursesByGroup(groupId, srch, filterId, isPaid, isSearchTrue) {
    //showLoading(true);
    //$.ajax({
    //    type: 'POST',
    //    cache: false,
    //    async: true,
    //    contentType: 'application/json; charset=utf-8',
    //    url: 'Courses.aspx/GetCoursesByGroup',
    //    data: JSON.stringify({ 'groupId': groupId, 'srch': srch, 'filterId': filterId, 'isPaid': isPaid, 'isSearch': isSearchTrue }),
    //    dataType: 'json',
    //    success: function (response) {
    //        if (response.d != "" && response.d != undefined && response.d.length > 0) {
    //            $("#boxBody").show();
    //            $("#ulPaging").show();
    //            $("#cmbFilters").prop('disabled', false);
    //            $("#emptysrchCourses").css("display", "none");
    //            records = response.d;
    //            if (groupId == "21" && srch == "" && isSearchTrue == true) {
    //                showAllRecord = true;
    //                records = records.concat(records)
    //                records = records.concat(records)
    //                records = records.concat(records)
    //            }
    //            else {
    //                showAllRecord = false;

    //            }
    //            paging();
    //        }
    //        else {
    //            //Warning("No result found");
    //            $("#cmbFilters").prop('disabled', 'disabled');
    //            $("#boxBody").html('');
    //            $("#boxBody").hide();
    //            $("#ulPaging").hide();
    //            $("#emptysrchCourses").css("display", "inherit");
    //        }
    //        showLoading(false);
    //    },
    //    error: function (XMLHttpRequest, textStatus, errorThrown) {
    //        console.log(XMLHttpRequest);
    //    }
    //});
}