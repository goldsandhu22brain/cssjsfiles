var PaginationCall = function () { }
$(document).ready(function () {
	function PerformSearch(pageNo = "1",recordsPerPage = 30) {

		var SearchText = '';
		var offeringTypeVal = '';
		var filterBy = 0;
		var grpId = $("#ulOfferingGrp");
		if (grpId != null && grpId != undefined && grpId.length > 0) {
			SearchText = grpId.attr('searchText');
			offeringTypeVal = grpId.attr('offeringtype');
			var isCorporate = grpId.attr('iscorporate');
			if (isCorporate != null && (isCorporate == 'true' || isCorporate == 'True')) {
				filterBy = 20;// Paid Only for Corporate
			}
		}



		var replaceId = pageNo == "1" ? 'boxBody' : "boxBody";
		var jsonData = {
			'Filter': filterBy, 'OfferingType': offeringTypeVal, 'RecordsPerPage': recordsPerPage,
			'ViewName': "Search/_LegacyLoggedInTileCard", 'PageIndex': pageNo, 'SearchText': SearchText
		};


		showLoading(true);
		$.ajax({
			type: 'POST',
			cache: false,
			async: true,
			contentType: 'application/json; charset=utf-8',
			url: '/Search',
			data: JSON.stringify(jsonData),
			dataType: 'html',
			success: function (response) {
				$("#" + replaceId).html(response);
				showLoading(false);
				document.getElementById('ulOfferingGrp').parentElement.parentElement.scrollIntoView();


			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				$("#ulPaging").hide();


				showLoading(false);
			}
		});

	}

	//Left Side Category Click
	$("#ulOfferingGrp li").click(function () {
		$(".searchTestCourses.active").removeClass("active");
		$(this).addClass("active");
		$('#ulOfferingGrp').attr('offeringType', $(this).attr('attr-id'));
		var _this = this;

		PerformSearch();
	});
	PaginationCall = PerformSearch;
	PerformSearch();//trigger initial load
});