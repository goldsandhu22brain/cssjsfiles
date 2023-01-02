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
            url: 'Tests.aspx/SaveRecentlyViewedTest',
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
            url: 'Tests.aspx/SaveDemoTest',
            data: JSON.stringify({ 'testID': testId, 'qty': qty }),
            dataType: 'json',
            success: function (result) {
                var response = result.d;
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
            url: 'Tests.aspx/DemotestDetail',
            data: JSON.stringify({ 'testID': id, 'type': 'demo' }),
            dataType: 'json',
            success: function (response) {
                if (response.d != null) {

                    var resultSyllabus = response.d;
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
        url: 'Tests.aspx/GetTests',
        data: JSON.stringify({ 'groupId': groupId, 'srch': srch }),
        dataType: 'json',
        success: function (response) {

            if (response.d.Tests != "" && response.d.Tests != undefined && response.d.Tests.length > 0) {

                records = response.d;
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
            //$("body").animate({
            //    scrollTop: 0
            //}, 500);
            //var html = '';
            //for (var i = 0; i < records.length; i++) {
            //    var $starHtml = '';
            //    for (var j = 0; j < 5; j++) {
            //        if (j <= parseInt(records[i].Rating) - 1) {
            //            $starHtml += '<i class="glyphicon glyphicon-star"></i>';
            //        }
            //        else {
            //            $starHtml += '<i class="glyphicon glyphicon-star-empty"></i>';
            //        }
            //    }
            //   html +='<div class="col-md-4">'
            //                               + ' <div class="box box-widget widget-user C_mainBox">'
            //                               + '     <div class="widget-user-header C_box1">'
            //                                + '        <a href="#">'
            //                                + '            <h3 class="widget-user-username">'+records[i].TestName+'</h3>'
            //                                + '        </a>'
            //                                 + '       <a href="#">'
            //                                 + '           <h5 class="C_rating">' + $starHtml + '<span>' + records[i].Views + '</span></h5>'
            //                                 + '       </a>'
            //                                + '    </div>'
            //                                + '    <div class="box-footer">'
            //                                + '        <div class="row">'
            //                                + '            <div class="col-sm-4 border-right">'
            //                                 + '               <div class="description-block">'
            //                                + '                    <h5 class="description-header">$' + records[i].Rate + '</h5>'
            //                                 + '               </div>'
            //                                + '            </div>'
            //                                 + '           <div class="col-sm-4 border-right">'
            //                                 + '               <a href="MyCart.aspx?uType=ind&tId=' + records[i].Id + '">'
            //                                 + '                   <div class="description-block">'
            //                                 + '                       <h5 class="description-header C_cart_icon"><i class="glyphicon glyphicon-shopping-cart"></i></h5>'
            //                                 + '                   </div>'
            //                                 + '               </a>'
            //                                 + '           </div>'
            //                                + '            <div class="col-sm-4">'
            //                                 + '               <a href="MyCart.aspx?tId=' + records[i].Id + '" data-toggle="tooltip" data-placement="bottom" title="Add to Wish List">'
            //                                 + '                   <div class="description-block">'
            //                                 + '                       <h5 class="description-header C_wish_icon "><i class="glyphicon glyphicon-heart"></i></h5>'
            //                                 + '                   </div>'
            //                                 + '               </a>'
            //                                 + '           </div>'
            //                                + '        </div>'
            //                                + '    </div>'
            //                             + '   </div>'
            //                           + ' </div>';
            //}
            //$("#testDisplayBody").html(html);
            showLoading(false);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
        }
    });
}