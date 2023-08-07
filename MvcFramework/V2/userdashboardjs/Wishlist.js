$(function () {

    $(document).on('click', '.wish', function (event) {
        event.preventDefault();

        var box = $(this);

        var cid = box.attr("data-val");
        $.ajax({
            type: "POST",
            cache: false,
            async: false,
            contentType: "application/json; charset=utf-8",
            url: "/User/Profile/AddToWishListCourse",
            data: "{'Cid':'" + cid + "'}",
            dataType: "json",
            success: function (data) {

                var status = data.Status;

                if (status == 200) {

                   // var tcount = data.Count;

                    box.removeClass('wish');
                    box.addClass('remove-wish');

                    box[0].children[0].children[0].style.color = "#e34646";

                    Success("Added to Wish List successfully");


                    //if (tcount < 5) {
                    //    var texLine = data.LineText;
                    //    var url = '<a href="MyCart.aspx?uType=ind&cid=' + cid + '"&wId="><h3> <span class="pull-right btn btn-xs btn-info">Add to cart</span></h3> </a>';
                    //    $("#menuWlist").append("<li>" + texLine + "</li>");

                    //}              
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
            url: "/User/Profile/RemoveWishList",
            data: "{'Cid':'" + cid + "'}",
            dataType: "json",
            success: function (data) {

                var status = data.Status;

                if (status == 200) {
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