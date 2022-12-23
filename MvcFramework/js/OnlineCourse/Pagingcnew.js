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
		 if(page !=1)
		 {
		sessionStorage.setItem("cpage", page);
		 }
        var html = '';
        $("#boxBody").text("");
        $(this.pagingContainerPath).text("");
        var myindex = 1;
        this.records.slice((page - 1) * this.recordsPerPage, ((page - 1) * this.recordsPerPage) + this.recordsPerPage).each(function () {
            var $starHtml = '';
            var dataplacement = myindex % 3 == 0 ? "left" : "right";
            var crsDesc = '';
            for (var i = 0; i < 5; i++) {
                if (i <= parseInt(this.Rating) - 1) {
                    $starHtml += '<i class="fa fa-star"></i>';
                }
                else {
                    $starHtml += '<i class="fa fa-star-empty"></i>';
                }
            }
            var cart = '';
            if (this.cartItemId != "" && this.cartItemId != undefined) {
                cart = '<i class="fa fa-shopping-cart active"></i>';
            }
            else {
                cart = '<i class="fa fa-shopping-cart"></i>'
            }
            var wishList = '';
            if (this.wishListItemId != "" && this.wishListItemId != undefined) {
                wishList = '<i class="fa fa-heart active"></i>';
            }
            else {
                wishList = '<i class="fa fa-heart"></i>'
            }
            if (parseInt(this.CrsDescription) > 980) {
                crsDesc = this.CrsDescription;
            }
            else {
                crsDesc = this.CrsDescription;
            }

            if (crsDesc != undefined) {
                if (crsDesc.indexOf(".html") >= 0 | crsDesc.indexOf("index.aspx") >= 0) {
                    //alert(this.records[k].CrsDescription + " First");
                    crsDesc = "courses/" + crsDesc;
                }
            }

            html += '<div class="col-md-4 col-sm-6">'
                + '<a href="' + crsDesc + '" target="_blank" data-toggle="popover" title="' + this.CrsName + '" data-placement="' + dataplacement + '" ' + 'data-bs-content="<div class=vidduration> <span class=enroled> <i class=&quot;fa fa-user&quot;></i>Tolal Enrolled:' + (7179 + (this.CourseID % 29) * 43 + 9 + 3 * this.Value) + ' </span></div><br/><div class=bodytext>' + htmlEntities(this.AboutCourse) + '</div><br/><div class=popover-footer><a class=&quot;btn btn-success pull-left&quot; href=&quot;/Individual/MyCart.aspx?uType=ind&amp;cid=' + this.CourseID + ' &quot; rel=&quot;noindex,nofollow&quot;>Add to cart </a><a rel=&quot;noindex,nofollow&quot; class=popover-wishlist href=&quot;/Individual/wishlist.aspx?uType=ind%26cid=' + this.CourseID + '&quot; ><i class=&quot;fa fa-heart&quot;></i> </a>">'
                                        + '<div class="col-md-12 cbox">'
                                            + '<img src="images/Course/Banner/' + (this.CourseID % 9 + 1) + '.webp" alt="' + this.CrsName + '">'
                                            + '<p class="Cenroll"><i class="fa fa-user"></i>' + (7179 + (this.CourseID % 29) * 43 + 9 + 3 * this.Value) + ' Enrolled</p>'
                                            + '<h1>' + this.CrsName + '</h1>'
                                            + '<div class="cboxfoot">'
                                            + '<a href="../login.aspx?ReturnUrl=/Individual/MyCart.aspx?cid=' + this.CourseID + '%26uType=ind" class="enroll">Enroll Now</a>'
                                            + '<p>' + (this.Country == 'IN' ? '₹' : '$') + this.Rate + '</p>'
                                         + '   </div>'
                                       + ' </div>'
                                    + '</a>'
                               + ' </div>';

            
           

            myindex++;
        });

        $(this.pagingContainerPath).append(html);

        renderControls(this.pagingControlsContainer, this.currentPage, this.numPages());

        $('[data-toggle="popover"]').popover({ trigger: "manual", html: true, animation: false })
            .on("mouseenter", function () {
                var _this = this;
                $(this).popover("show");
                $(".popover").on("mouseleave", function () {
                    $(_this).popover('hide');
                });
            }).on("mouseleave", function () {
                var _this = this;
                setTimeout(function () {
                    if (!$(".popover:hover").length) {
                        $(_this).popover("hide");
                    }
                }, 300);
            });

        myindex++;
       
    }

    var renderControls = function (container, currentPage, numPages) {
         if(showAllRecord)
		 {
		var j=0;
        if (currentPage == 1) {
            var pagingControls = "<li class='page-item'><a class='page-link' href='#'>«</a></li>";
        }
        else {
            var pagingControls = "<li class='page-item'><a  class='page-link' href='#' onClick='pager.showPage(" + (parseInt(currentPage) - 1) + ");return false'>«</a></li>";
        }
        for (var i = 1; i <= numPages; i++) {
            if (i != currentPage) {
				 if(i<=6)
				 {
                     pagingControls += '<li class="page-item"><a  class="page-link" href="#" onClick="pager.showPage(' + i + ');return false">' + i + '</a></li>';
				 }
				 else{
					  if(j==0)
					  {
                          pagingControls +='<li class="page-item"><a  class="page-link" href="#">....</a></li>'
					  }
					  j++;
				 }
				 
				 
            } else {
                pagingControls += '<li class="active page-item"><a  class="page-link" href="#">' + i + '</a></li>';
            }
        }
        if (currentPage == numPages) {
            pagingControls += '<li class="page-item"><a  class="page-link" href="#">»</a></li>';
        }
		
        else {
            pagingControls += '<li class="page-item"><a  class="page-link" href="#" onClick="pager.showPage(' + parseInt(i-1) + ');return false">' + parseInt(i-1)+ '</a></li>';
            pagingControls += '<li class="page-item"><a  class="page-link" href="#" onClick="pager.showPage(' + (parseInt(currentPage) + 1) + ');return false">»</a></li>';
        }
        $(container).html(pagingControls);
		 }
		 
		 else
		 {
			  if (currentPage == 1) {
                  var pagingControls = "<li class='page-item'><a class='page-link' href='#'>«</a></li>";
        }
        else {
                  var pagingControls = "<li class='page-item'><a class='page-link' href='#' onClick='pager.showPage(" + (parseInt(currentPage) - 1) + ");return false'>«</a></li>";
        }
        for (var i = 1; i <= numPages; i++) {
            if (i != currentPage) {
                pagingControls += '<li class="page-item"><a class="page-link" href="#" onClick="pager.showPage(' + i + ');return false">' + i + '</a></li>';
            } else {
                pagingControls += '<li class="page-item active" ><a class="page-link" href="#">' + i + '</a></li>';
            }
        }
        if (currentPage == numPages) {
            pagingControls += '<li class="page-item"><a class="page-link" href="#">»</a></li>';
        }
        else {
            pagingControls += '<li class="page-item"><a class="page-link" href="#" onClick="pager.showPage(' + (parseInt(currentPage) + 1) + ');return false">»</a></li>';
        }
        $(container).html(pagingControls);
			 
			 
		 }
    }
}
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}