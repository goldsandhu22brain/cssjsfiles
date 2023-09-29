var pager = new Pager.Paging();//create object of Paging class
var records = null;
$(document).ready(function () {
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 2000);
    $("#ulCourseGrp li").click(function (e) {
        var id = $(this).attr("id");
        $("#ulCourseGrp li").removeClass("active");
        $(this).addClass("active");
        $("#courseGrpName").text("");
        $("#courseGrpName").text($(this).find("a").text());
        GetCourses(id, "", "", false);
        e.preventDefault();
    });

    $("#ulPaging li").click(function (e) {
        var number = $(this).text();
        e.preventDefault();
    });
    $("#ulCourseGrp li").eq(0).click();

    $("#btnSrch").click(function (e) {
        $("#courseGrpName").text("Search");

        GetCourses($("#ulCourseGrp li.active").attr("id"), $("#txtSrch").val(), "", true);
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
        //$("#ulCourseGrp li").removeClass("active");
        //$("#ulCourseGrp li").eq(0).addClass("active");
        GetCourses($("#ulCourseGrp li.active").attr("id"), "", filterId, false);
    });

    $(document).on('click', '.CourseRedirectLnk', function () {

        var id = $(this).attr("id");
        var courseDesc = $(this).attr("href");
        $.ajax({
            type: 'POST',
            cache: false,
            async: true,
            contentType: 'application/json; charset=utf-8',
            url: '/User/IndividualApi/SaveRecentlyViewedCourse',
            data: JSON.stringify({ 'courseID': id }),
            dataType: 'json',
            success: function (response) {
                //if (response.d)
                //    document.location.href = courseDesc;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
            }
        });

    });
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
        $("#loader-wrapper").addClass("hide");
    }
}

function GetCourses(groupId, srch, filterId, isSearchTrue) {
    showLoading(true);
    $.ajax({
        type: 'POST',
        cache: false,
        async: true,
        contentType: 'application/json; charset=utf-8',
        url: '/User/IndividualApi/GetCourses',
        data: JSON.stringify({ 'groupId': groupId, 'srch': srch, 'filterId': filterId, 'isSearch': isSearchTrue }),
        dataType: 'json',
        success: function (response) {
            if (response != "" && response != undefined && response.length > 0) {
                $("#boxBody").show();
                $("#ulPaging").show();
                $("#cmbFilters").prop('disabled', false);
                $("#emptysrchCourses").css("display", "none");
                records = response;
                paging();
            }
            else {
                //Warning("No result found");
                $("#cmbFilters").prop('disabled', 'disabled');
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
};
$(function () {
    SearchText();

    $(document).on("click", ".C_rating", function () {

        window.open('https://local.brainmeasures.com/reviews.aspx', '_blank');
    });


    $(document).on('click', '.cart', function (event) {
        event.preventDefault();

        var cid = $(this).attr("data-val");
        var isFree = $(this).attr("data-isfree");
        var url = $(this).attr("data-testhost");
        if (isFree == "True" || isFree=="true")
            window.location.href = "/TestPlatform/Free?Id=" + cid;
        else
            window.location.href = "/User/Individual/MyCart?offeringId=" + cid+ "&Count=1";
    })


    $(document).on('click', '.wish', function (event) {
        event.preventDefault();

        var box = $(this);

        var cid = box.attr("data-val");
        $.ajax({
            type: "POST",
            cache: false,
            async: false,
            contentType: "application/json; charset=utf-8",
            url: "/User/IndividualApi/AddToWishListCourse",
            data: "{'Cid':'" + cid + "'}",
            dataType: "json",
            success: function (data) {

                var status = data.Status;

                if (status == 0) {

                    var tcount = data.Count;

                    box.removeClass('wish');
                    box.addClass('remove-wish');
                    
                    box[0].children[0].children[0].style.color = "#e34646";

                    Success("Added to Wish List successfully");


                    if (tcount < 5) {
                        var texLine = data.LineText;
                        var url = '<a href="MyCart.aspx?uType=ind&cid=' + cid + '"&wId="><h3> <span class="pull-right btn btn-xs btn-info">Add to cart</span></h3> </a>';
                        $("#menuWlist").append("<li>" + texLine + "</li>");

                    }
                    //location.reload();
                }
                else if (status == -2) {
                    Warning("Already added to Wish List");
                }
                else {
                    Warning("something went wrong. Please try again");
                }
            },
            error: function (result) {
                Warning("something went wrong. Please try again");
            }
        });

    })

    $(document).on('click', '.remove-wish', function (event) {
        event.preventDefault();

        var box = $(this);

        var cid = box.attr("data-val");
        $.ajax({
            type: "POST",
            cache: false,
            async: false,
            contentType: "application/json; charset=utf-8",
            url: "/User/IndividualApi/RemoveWishList",
            data: "{'Cid':'" + cid + "'}",
            dataType: "json",
            success: function (data) {

                var status = data.Status;

                if (status == 200) {

                    var tcount = data.Count;

                    box.removeClass('remove-wish');
                    box.addClass('wish');
                    box[0].children[0].children[0].style.color = "";
                                  
                    Success("Removed from Wish List successfully");

                }                
                else {
                    Warning(data.Message);
                }
            },
            error: function (result) {
                Warning("something went wrong. Please try again");
            }
        });

    })
})

function SearchText() {
    $("#txtSrch").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                cache: false,
                async: false,
                contentType: "application/json; charset=utf-8",
                url: "/User/IndividualApi/GetSearchCourse",
                data: "{'term':'" + document.getElementById('txtSrch').value + "'}",
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
        }
        ,

        select: function (event, ui) {
            var label = ui.item.label;
            var value = ui.item.value;
            //store in session
            // alert(value);
            $("#courseGrpName").text("Search");
            GetCourses($("#ulCourseGrp li.active").attr("id"), label, "", true);
            // GetCourses($("#ulCourseGrp li.active").attr("id"), value, filterId, isPaid, true);
        }

    });
}