var PaginationCall = function () { }
$(document).ready(function () {
	if ($("#txtSrch") != null && $("#txtSrch") !== undefined && $("#txtSrch").length > 0) {

		$("#txtSrch").autocomplete({
			source: function (request, response) {
				$.ajax({
					type: "POST",
					contentType: "application/json; charset=utf-8",
					url: "/Search/Suggestion",
					data: "{'SearchText':'" + document.getElementById('txtSrch').value + "','OfferingType':'" + document.getElementById('txtSrch').getAttribute('offeringtype')
						+ "'}",
					dataType: "json",
					success: function (data) {
						response($.map(data, function (item) {
							return {
								label: item.DisplayName,
								val: item.SeoUrl
							}
						}))
					},
					error: function (result) {
						Warning("No Match");
					}
				});
			}
			,

			select: function (event, ui) {
				var label = ui.item.label;
				var value = ui.item.val;
				
				setTimeout(() => {
					PerformSearch();
					var currentPageNo = $(".currentpage")[0].id.split("pageno-")[1];
					$(".currentpage").removeClass("currentpage");
					$("#pageno-1").addClass("currentpage");
				}, 2);
			}

		});
		PaginationCall = PerformSearch;
		PerformSearch();//trigger initial load
	}

	function PerformSearch(pageNo = "1", filterBy = 20, recordsPerPage = 30) {

		var offeringTypeVal = $("#txtSrch").attr("offeringtype");
		var sortOrder = $('#SortOrder option:selected').val();
		//Just to OverRide Value
		if ($('#cmbFiltersByPrice option:selected').length > 0) {
			filterBy = $('#cmbFiltersByPrice option:selected').val();
		}
		if (paidFilter != undefined && paidFilter != null) {
			filterBy = paidFilter;
		}
		var categoryId = '';
		if ($('#ulOfferingGrp') != null && $('#ulOfferingGrp').attr('RefId') != null) {
				categoryId = $('#ulOfferingGrp').attr('RefId');
		}
		var replaceId = pageNo == "1" ? 'boxBody' : "boxBody";
		var jsonData = {
			'Filter': filterBy, 'SortBy': sortOrder, 'OfferingType': offeringTypeVal, 'CategoriesId': categoryId, 'RecordsPerPage': recordsPerPage,
			'ViewName': "Search/_LegacyLoggedInTileCard", 'PageIndex': pageNo
		};
		if ($("#txtSrch").length > 0 && $("#txtSrch").val() != "" && $("#txtSrch").val() != null) {
			jsonData["SearchText"] = $("#txtSrch").val();
		}
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
				document.getElementById(replaceId).parentElement.parentElement.scrollIntoView();

			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				$("#ulPaging").hide();
				

				showLoading(false);
			}
		});

	}

	//Left Side Category Click
	$("#ulOfferingGrp li").click(function () {
		$(".offering-cat.active").removeClass("active");
		$(this).addClass("active");
		$('#ulOfferingGrp').attr('RefId', $(this).attr('id'));
		var _this = this;

		PerformSearch();
		
		var title = $(_this).find(".cat_name").text();
		$(".result-section h3.box-title").html(title);
	});
});