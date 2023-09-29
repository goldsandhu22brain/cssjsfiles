var pager = new Pager.Paging();//create object of Paging class
var records = null;
$(document).ready(function () {
    $("#ulTestGrp li").click(function (e) {
        var id = $(this).attr("id");
        $("#ulTestGrp li").removeClass("active");
        $(this).addClass("active");
        $("#txtGrpName").text("");
        $("#txtGrpName").text($(this).find("a").text());
        GetTests(id, "");
        e.preventDefault();
    });
    $("#ulTestGrp li").eq(0).click();
    $("#btnSrch").click(function (e) {
        $("#txtGrpName").text("Search");
        //$("#ulTestGrp li").removeClass("active");        
        //GetTests("", $("#txtSrch").val(), "");       
        GetTests($("#ulTestGrp li.active").attr("id"), $("#txtSrch").val());
        e.preventDefault();
    });

    $("#txtSrch").keypress(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            $("#btnSrch").click();
        }
    });

    $(document).on('click', '.TestRedirectLnk', function () {

        var id = $(this).attr("id");
        var testDesc = $(this).attr("href");
        $.ajax({
            type: 'POST',
            cache: false,
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: '/User/IndividualApi/SaveRecentlyViewedTestNSyllabus',
            data: JSON.stringify({ 'testID': id }),
            dataType: 'json',
            success: function (response) {
                //if (response.d)
                //    document.location.href = testDesc;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
            }
        });

    });

    $("#btnAddToCart").click(function (e) {

        var testId = $("#hdnTestId").val();
        var qty = $('#ddlQty :selected').text()

        $.ajax({
            type: 'POST',
            cache: false,
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: '/User/IndividualApi/SaveDemoTest',
            data: JSON.stringify({ 'testID': testId, 'qty': qty }),
            dataType: 'json',
            success: function (result) {
                var response = result;
                if (response.Status == "1") {
                    Success(response.ResponseData);
                }
                else {
                    Warning(response.ResponseData);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
            }
        });
    });

    //For Corporate Test Click.
    $(document).on('click', '.TestRedirectLnkCorporate', function () {
        $("#dvPopUpSyllabusContent").css("display", "none");
        showLoading(true);

        var id = $(this).attr("data-id");
        $.ajax({
            type: 'POST',
            cache: false,
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: '/User/IndividualApi/DemotestDetail',
            data: JSON.stringify({ 'testID': id, 'type': 'demo' }),
            dataType: 'json',
            success: function (response) {
                if (response != null) {
                    var resultSyllabus = response;
                    var listTestSyllabus = '';
                    $("#dvPopUpSyllabusContent").css("display", "block");
                    $('#lblTestName').text(resultSyllabus.TestName);
                    $('#hdnTestId').val(id);
                    $('#lblPoints').text('1');
                    showLoading(false);
                }
                else {
                    Warning('<ul><li>There is some issue in showing test. Please try again later.</li></ul>');
                    showLoading(false);
                }
                //    document.location.href = testDesc;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
            }
        });
    });
});

function showLoading(isLoad) {
    if (isLoad) {
        $("#pageloaddiv").css("display", "inherit");

    } else {
        $("#pageloaddiv").css("display", "none");
        $("#loader-wrapper").addClass("hide");
    }
}

function paging() {
    pager.recordsPerPage = 15; // set amount elements per page
    pager.pagingContainer = '#ulPaging'; // set of main container
    pager.records = $(records.Tests, pager.pagingContainer); // set of required containers
    pager.usertype = records.UserType;
    pager.pagingContainerPath = '#boxBody';//set paging container path    
    pager.showPage(1);
}

function GetTests(groupId, srch) {
    showLoading(true);
    $.ajax({
        type: 'POST',
        cache: false,
        async: true,
        contentType: 'application/json; charset=utf-8',
        url: '/User/IndividualApi/GetTests',
        data: JSON.stringify({ 'groupId': groupId, 'srch': srch }),
        dataType: 'json',
        success: function (response) {

            if (response.Tests != "" && response.Tests != undefined && response.Tests.length > 0) {

                records = response;
                $("#boxBody").show();
                $("#ulPaging").show();
                $("#emptysrchCourses").css("display", "none");
                paging();
            }
            else {
                $("#boxBody").html('');
                $("#boxBody").hide();
                $("#ulPaging").hide();
                $("#emptysrchCourses").css("display", "inherit");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
        }
    });
    showLoading(false);
}

$(function () {
    SearchText();
})

function SearchText() {
    $("[id$='txtSrch']").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/User/IndividualApi/GetSearchTest",
                data: "{'term':'" + $("[id$='txtSrch']").val() + "'}",
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.Key,
                            val: item.Key
                        }
                    }))
                },
                error: function (result) {
                    alert("No Match");
                }
            });
        },
        select: function (event, ui) {
            var label = ui.item.label;
            var value = ui.item.value;
            //store in session
            // alert(value);
            $("#txtGrpName").text("Search");
            $("#ulTestGrp li").removeClass("active");
            GetTests("", label, "");
        }
    });
}