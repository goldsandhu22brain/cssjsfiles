var Pager = {};


Pager.Paging = function () {
    this.recordsPerPage = 3;
    this.currentPage = 1;
    this.pagingControlsContainer = '#ulPaging';
    this.pagingContainerPath = '#boxBody';

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
        $(this.pagingContainerPath).text("");
        this.records.slice((page - 1) * this.recordsPerPage,
            ((page - 1) * this.recordsPerPage) + this.recordsPerPage).each(function () {
                var $starHtml = '';
                var crsDesc = '';
                for (var i = 0; i < 5; i++) {
                    if (i <= parseInt(this.Rating) - 1) {
                        $starHtml += '<i class="glyphicon glyphicon-star"></i>';
                    }
                    else {
                        $starHtml += '<i class="glyphicon glyphicon-star-empty"></i>';
                    }
                }
                var cart = '';
                if (this.cartItemId != "" && this.cartItemId != undefined) {
                    cart = '<i class="glyphicon glyphicon-shopping-cart active"></i>';
                }
                else {
                    cart = '<i class="glyphicon glyphicon-shopping-cart"></i>'
                }
                var wishList = '';
                if (this.wishListItemId != "" && this.wishListItemId != undefined) {
                    wishList = '<i class="glyphicon glyphicon-heart active"></i>';
                }
                else {
                    wishList = '<i class="glyphicon glyphicon-heart"></i>'
                }
                if (parseInt(this.CrsDescription) > 980) {
                    crsDesc = this.CrsDescription;
                }
                else {
                    crsDesc = this.CrsDescription;
                }

                if (crsDesc.indexOf(".html") >= 0 | crsDesc.indexOf("index.aspx") >= 0) {
                    //alert(this.records[k].CrsDescription + " First");
                    crsDesc = "courses/" + crsDesc;
                }

                html += '<div class="col-md-4">'
                    + '<div class="box box-widget widget-user C_mainBox">'
                    + '   <div class="widget-user-header C_box">'
                    + '      <a target="_blank" class="CourseRedirectLnk" id="' + this.Id + '"  href="../' + crsDesc + '">'
                    + '       <h3 class="widget-user-username">' + this.CrsName + '</h3>'
                    + '<p class="Cenroll" style="color:#FFF;"> <i class="glyphicon glyphicon-king"></i>' + (7179 + (this.Id % 29) * 43 + 9 + 3 * this.Value) + ' Enrolled</p>'
                    + '</a>'
                    + ' <a href="#">'
                    + ' <h5 class="C_rating">'
                    + $starHtml + '<span>' + (290 + this.Reviews) + '</span></h5>'
                    + ' </a>'
                    + ' </div>'
                    + ' <div class="box-footer">'
                    + '   <div class="row">'
                    + '   <div class="col-sm-4 border-right">'
                    + '      <div class="description-block">'
                    + '         <h5 class="description-header">' + (this.Country == 'IN' ? '₹' : '$') + " " + this.Rate + '</h5>'
                    + '     </div>'
                    + '  </div>'
                    + ' <div class="col-sm-4 border-right">'
                    //+ '    <a href="MyCart.aspx" data-toggle="modal" data-target="#myModal">'
                    + '<a class="cart" data-val=' + this.Id + '>'
                    + '       <div class="description-block">'
                    + '          <h5 class="description-header C_cart_icon" id=' + this.Id + '>' + cart + '</h5>'
                    + '     </div>'
                    + ' </a>'
                    + '</div>'
                    + ' <div class="col-sm-4">'
                    //+ '    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Wish List">'
                    + '<a class="wish" data-val=' + this.Id + ' data-toggle="tooltip" data-placement="bottom" title="Add to Wish List">'
                    + '      <div class="description-block">'
                    + '    <h5 class="description-header C_wish_icon " id=' + this.Id + '>' + wishList + '</h5>'
                    + '  </div>'
                    + '   </a>'
                    + '    </div>'
                    + '   </div>'
                    + '   </div>'
                    + ' </div>'
                    + ' </div>'
            });

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