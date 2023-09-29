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
        $("#courseGrpNameHeader").text("Category");
        $("#courseGrpName").text("");
        $("#courseGrpName").text($(this).find("a").text());
        GetCoursesById(id, "", false);

        $('#txtSrch').val('');
        $('#cmbFiltersByPrice').find('option:eq(0)').prop('selected', true);
        $('#cmbFilters').find('option:eq(0)').prop('selected', true);

        var filter = { vdoCatId: id, srch: '', isSearch: false };
        var objFilter = JSON.stringify(filter);
        sessionStorage.setItem("filter", objFilter);
        if (e.originalEvent) {
            sessionStorage.setItem("page", 1);
        }

        e.preventDefault();
    });

    $("#ulPaging li").click(function (e) {
        var number = $(this).text();
        e.preventDefault();
    });



    if (sessionStorage.getItem("filter") != null) {
        var filter = JSON.parse(sessionStorage.getItem("filter"));
        console.log(filter);

        if (filter.isSearch == true) {
            var value = filter.srch;
            $("#txtSrch").val(value);
            setTimeout(function () { $("#btnSrch").click() }, 1000);


        }
        else if (filter.vdoCatId > 0) {

            $("#ulCourseGrp li").eq(filter.vdoCatId).click();
        }
        else {
            $("#ulCourseGrp li").eq(0).click();
        }


        if (sessionStorage.getItem("page") != null) {
            var page = sessionStorage.getItem("page");
            //Pager.showPage(page);

            setTimeout(function () { pager.showPage(page); }, 8000);
        }
    }
    else {
        $("#ulCourseGrp li").eq(0).click();
    }



    $("#btnSrch").click(function (e) {
        $("#ulCourseGrp li").removeClass("active");
        $("#ulCourseGrp li").eq(0).addClass("active");
        $("#courseGrpName").text($("#txtSrch").val());
        $("#courseGrpNameHeader").text("Search");
        GetCoursesById($("#ulCourseGrp li.active").attr("id"), $("#txtSrch").val(), true);

        var filter = { vdoCatId: 0, srch: $("#txtSrch").val(), isSearch: true };
        var objFilter = JSON.stringify(filter);
        sessionStorage.setItem("filter", objFilter);
        if (e.originalEvent) {
            sessionStorage.setItem("page", 1);
        }
        e.preventDefault();
    });
    $("#txtSrch").keypress(function (e) {
        if (e.which == 13) {
            $("#btnSrch").click();
            e.preventDefault();
        }
    });
    $("#cmbFilters").change(function () {
        $("#courseGrpNameHeader").text("Category");
        $("#courseGrpName").text($("#cmbFilters option:selected").attr('crstxt'));
        $("#ulCourseGrp li").removeClass("active");
        $("#ulCourseGrp li").eq(0).addClass("active");
        GetCoursesById($("#ulCourseGrp li.active").attr("id"), $("#txtSrch").val(), true);
    });
    $("#cmbFiltersByPrice").change(function () {
        $("#courseGrpNameHeader").text("Category");
        $("#courseGrpName").text($("#cmbFiltersByPrice option:selected").attr('crstxt'));
        $("#ulCourseGrp li").removeClass("active");
        $("#ulCourseGrp li").eq(0).addClass("active");
        GetCoursesById($("#ulCourseGrp li.active").attr("id"), $("#txtSrch").val(), true);
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


function GetCoursesById(groupId, srch, isSearchTrue) {
    showLoading(true);
    $.ajax({
        type: 'POST',
        cache: false,
        async: true,
        contentType: 'application/json; charset=utf-8',
        url: '/User/IndividualApi/GetCoursesById',
        data: JSON.stringify({ 'vdoCatId': groupId, 'srch': srch, 'isSearch': isSearchTrue }),
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
}

$(function () {
    SearchText();

    $(document).on('click', '.cart', function (event) {
        event.preventDefault();

        var cid = $(this).attr("data-val");
        $.ajax({
            type: "POST",
            cache: false,
            async: false,
            contentType: "application/json; charset=utf-8",
            url: "/User/IndividualApi/AddToCartVideoCourse",
            data: "{'Cid':'" + cid + "'}",
            dataType: "json",
            success: function (data) {

                if (data > 0) {
                    Success("Video Course added to cart successfully");
                    $("#lblCartCountTopHeader").text(data);
                    // location.reload();
                }
                else if (data == -2) {
                    Warning("Video Course already added to cart");
                }
                else {
                    Warning("something went wrong.Please try again");
                }
            },
            error: function (result) {

            }
        });
    })


    $(document).on('click', '.wish', function (event) {
        event.preventDefault();

        var cid = $(this).attr("data-val");
        $.ajax({
            type: "POST",
            cache: false,
            async: false,
            contentType: "application/json; charset=utf-8",
            url: "/User/IndividualApi/AddToWishListVideoCourse",
            data: "{'Cid':'" + cid + "'}",
            dataType: "json",
            success: function (data) {
                var status = data.Status;
                if (status == 0) {
                    var tcount = data.Count;
                    if (tcount == 1) {
                        var temp = '<ul id="ulShowWishlistItems" class="dropdown-menu"> <li class="header">You have <span id="lblShowWishlistCountTopLi"></span> Items in Your Wishlist</li> <li>';
                        temp += ' <ul class="menu" id="menuWlist"> </ul>';
                        temp += ' <li class="footer"> <a href="Wishlist.aspx">View All</a>  </li>';
                        $("#wfor").after(temp);
                    }
                    $("#lblShowWishlistCountTopLi").text(tcount);
                    $("#lblShowWishlistCountTop").html(tcount);
                    Success(" Course added to Wish List successfully");
                    if (tcount < 5) {
                        var texLine = data.LineText;
                        var url = '<a href="MyCart.aspx?uType=ind&cid=' + cid + '"&wId="><h3> <span class="pull-right btn btn-xs btn-info">Add to cart</span></h3> </a>';
                        $("#menuWlist").append("<li>" + texLine + "</li>");
                    }
                    //location.reload();
                }
                else if (status == -2) {
                    Warning(" Video Course already added to Wish List");
                }
                else {
                    Warning("something went wrong.Please try again");
                }
            },
            error: function (result) {

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
                url: "/User/IndividualApi/GetSearchVideoCourse",
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

                }
            });
        },
        select: function (event, ui) {
            var label = ui.item.label;
            var value = ui.item.value;
            //store in session
            // alert(value);
            GetCoursesById('0', value, true)
            $("#courseGrpName").html(value);
        }
    });
}