var Pager = {};
Pager.Paging = function () {
    this.recordsPerPage = 3;
    this.currentPage = 1;
    this.pagingControlsContainer = '#ulPaging';
    this.pagingContainerPath = '#boxBody';
    this.usertype = '';

    this.numPages = function () {

        var numPages = 0;
        if (this.records != null && this.recordsPerPage != null) {
            numPages = Math.ceil(this.records.length / this.recordsPerPage);
        }

        return numPages;
    };

    this.showPage = function (page) {
        $("body").animate({
            scrollTop: 0
        }, 500);
        this.currentPage = page;
        var html = '';
        $("#boxBody").text("");
        //var self = this.usertype;
        var startRecord = (page - 1) * this.recordsPerPage;
        var endRecord = ((page - 1) * this.recordsPerPage) + this.recordsPerPage;
        if (this.records.length < endRecord) {
            endRecord = this.records.length;
        }

        for (var k = startRecord; k < endRecord; k++) {
            var $starHtml = '';
            var crsDesc = '';
            var anchorLinkTest = '';

            for (var i = 0; i < 5; i++) {
                if (i <= parseInt(this.records[k].Rating) - 1) {
                    $starHtml += '<i class="glyphicon glyphicon-star"></i>';
                }
                else {
                    $starHtml += '<i class="glyphicon glyphicon-star-empty"></i>';
                }
            }
            var cart = '';
            if (this.records[k].cartItemId != "" && this.records[k].cartItemId != undefined) {
                cart = '<i class="glyphicon glyphicon-shopping-cart active"></i>';
            }
            else {
                cart = '<i class="glyphicon glyphicon-shopping-cart"></i>'
            }
            var wishList = '';
            if (this.records[k].wishListItemId != "" && this.records[k].wishListItemId != undefined) {
                wishList = '<i class="glyphicon glyphicon-heart active"></i>';
            }
            else {
                wishList = '<i class="glyphicon glyphicon-heart"></i>'
            }
            var cartHref = '';
            var wishlistHref = '';
            if (this.usertype == "indv") {
                cartHref = '<a href="MyCart.aspx?uType=ind&tId=' + this.records[k].Id + '">';
                wishlistHref = '<a href="Wishlist.aspx?uType=ind&tId=' + this.records[k].Id + '"data-toggle="tooltip" data-placement="bottom" title="Add to Wish List">';
            }
            else {
                if (this.records[k].CategoryId == "56") {
                    cartHref = '<a href="#" data-toggle="modal" data-id="' + this.records[k].Id + '" data-target=".bs-example-modal-lg" class="TestRedirectLnkCorporate">'

                    wishlistHref = '';
                } else {
                    cartHref = '<a href="MyCart.aspx?uType=corp&tId=' + this.records[k].Id + '">';
                    wishlistHref = '<a href="Wishlist.aspx?uType=corp&tId=' + this.records[k].Id + '"data-toggle="tooltip" data-placement="bottom" title="Add to Wish List">';
                }
            }

            if (this.usertype != "corp") {
                if (this.records[k].CrsDescription != null) {
                    if (this.records[k].CrsDescription.indexOf(".html") >= 0 | this.records[k].CrsDescription.indexOf("index.aspx") >= 0) {
                        //alert(this.records[k].CrsDescription + " First");
                        crsDesc = "../courses/" + this.records[k].CrsDescription;
                    }
                    else {
                        crsDesc = "/" + this.records[k].CrsDescription;
                    }
                }
                else {
                    crsDesc = "../online/tests/" + this.records[k].Id + "/" + GenerateSEOFriendlyURL(this.records[k].TestName);
                }
                anchorLinkTest = '<a target="_blank" class="TestRedirectLnk" id="' + this.records[k].Id + '" href="' + crsDesc + '" >'
                    + '       <h3 class="widget-user-username">' + this.records[k].TestName + '</h3>'
                    + '</a>';
            }
            else {
                // class=TestRedirectLnkCorporate
                // data-toggle="modal" data-target=".bs-example-modal-lg"
                anchorLinkTest = ' <a style="cursor:pointer;" href="TestDetail.aspx?testid=' + this.records[k].Id + '" target="_blank" id="' + this.records[k].Id + '"  data-Duration="' + this.records[k].DurationMinutes + '" data-QuestionNums="' + this.records[k].NoOfQuestion + '"   >'
                    + '       <h3 class="widget-user-username">' + this.records[k].TestName + '</h3>'
                    + '</a>';

            }

            var Rate = '';
            if (this.usertype == "indv") {
                Rate = '$' + this.records[k].Rate;
            }
            else {

                if (this.records[k].Rate <= 0) {
                    if (this.records[k].CategoryId == "56") {
                        Rate = "1";
                    }
                    else {
                        Rate = "10";
                    }
                }
                else { Rate = 10 }
                //else { Rate = this.records[k].Rate }
            }
            html += '<div class="col-md-4">'
                + '<div class="box box-widget widget-user C_mainBox">'
                + '   <div class="widget-user-header C_box">'
                + anchorLinkTest
                + ' <a href="#">'
                + ' <h5 class="C_rating">'
                + $starHtml + '<span>' + this.records[k].Views + '</span></h5>'
                + ' </a>'
                + ' </div>'
                + ' <div class="box-footer">'
                + '   <div class="row">'
                + '   <div class="col-sm-4 border-right">'
                + '      <div class="description-block">'
                + '         <h5 class="description-header">' + Rate + '</h5>'
                + '     </div>'
                + '  </div>'
                + ' <div class="col-sm-4 border-right">'
                //+ '    <a href="MyCart.aspx" data-toggle="modal" data-target="#myModal">'
                + cartHref
                + '       <div class="description-block">'
                + '          <h5 class="description-header C_cart_icon" id=' + this.records[k].Id + '>' + cart + '</h5>'
                + '     </div>'
                + ' </a>'
                + '</div>'
                + ' <div class="col-sm-4">'
                //+ '    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Wish List">'
                + wishlistHref
                + '      <div class="description-block">'
                + '    <h5 class="description-header C_wish_icon " id=' + this.records[k].Id + '>' + wishList + '</h5>'
                + '  </div>'
                + '   </a>'
                + '    </div>'
                + '   </div>'
                + '   </div>'
                + ' </div>'
                + ' </div>'
        }
        //}
        //this.records.slice((page - 1) * this.recordsPerPage,
        //    ((page - 1) * this.recordsPerPage) + this.recordsPerPage).each(function (index,value) {
        //);

        $(this.pagingContainerPath).append(html);

        renderControls(this.pagingControlsContainer, this.currentPage, this.numPages());
    }

    var renderControls = function (container, currentPage, numPages) {
        if (currentPage == 1) {
            var pagingControls = "<li><a href='#'>«</a></li>";
        }
        else {
            var pagingControls = "<li><a href='#' onClick='pager.showPage(" + (parseInt(currentPage) - 1) + ");return false'>«</a></li>";
        }
        for (var i = 1; i <= numPages; i++) {
            if (i != currentPage) {
                pagingControls += '<li><a href="#" onClick="pager.showPage(' + i + ');return false">' + i + '</a></li>';
            } else {
                pagingControls += '<li class="active"><a href="#">' + i + '</a></li>';
            }
        }
        if (currentPage == numPages) {
            pagingControls += '<li><a href="#">»</a></li>';
        }
        else {
            pagingControls += '<li><a href="#" onClick="pager.showPage(' + (parseInt(currentPage) + 1) + ');return false">»</a></li>';
        }
        $(container).html(pagingControls);
    }
}