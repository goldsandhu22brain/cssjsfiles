$(document).ready(function () {

	function showLoading(isLoad) {
		if (isLoad) {
			$("#pageloaddiv").css("display", "inherit");

		} else {
			$("#pageloaddiv").css("display", "none");
		}
	}

	function PerformSearch(offeringTypeVal, callBackFn = null, pageNo = "1", filterBy = 0, recordsPerPage = 40) {
		if (offeringTypeVal == 250)
			return;
		var sortOrder = $('#SortOrder option:selected').val();
		//Just to OverRide Value
		if ($('#cmbFiltersByPrice option:selected').length > 0) {
			filterBy = $('#cmbFiltersByPrice option:selected').val();
		}
		var displayTitle = '';
		var categoryId = '';
		if ($('#categorySectionId') != null && $('#categorySectionId').attr('CategoryId') != null) {
			var catId = $('#categorySectionId').attr('CategoryId');
			if (catId != '0') {
				categoryId = $('#categorySectionId').attr('CategoryId');
				TitleToDisplay = $('#categorySectionId').attr('attr-name');
			}
		}
		var replaceId = pageNo == "1" ? 'boxBody' : "box-body";
		var jsonData = {
			'Filter': filterBy, 'SortBy': sortOrder, 'OfferingType': offeringTypeVal, 'CategoriesId': categoryId, 'RecordsPerPage': recordsPerPage, 'TitleToDisplay': TitleToDisplay, 'PageIndex': pageNo
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

				callBackFn && callBackFn();
				document.getElementById(replaceId).parentElement.parentElement.scrollIntoView();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				$("#ulPaging").hide();
			}
		});
		showLoading(false);
	}



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
						alert("No Match");
					}
				});
			}
			,

			select: function (event, ui) {
				var label = ui.item.label;
				var value = ui.item.val;
				if (value) {
					window.location.href = value;
				}
				else {
					PerformSearch($("#txtSrch").attr("offeringtype"));
				}
			}

		});
	}

	$("#categorySectionId a").click(function () {
		$('#categorySectionId').attr('CategoryId', $(this).attr('id'));
		$('#categorySectionId').attr('attr-name', $(this).attr('attr-name'));
		PerformSearch($("#categorySectionId").attr('offeringtype'), null, 1, 0, 40);
	});


	$('.PaginationClick').click(function () {
		var pageNo = ($(this).attr('attr-pageNo'));
		PerformSearch($("#categorySectionId").attr('offeringtype'), null, pageNo, 0, 40);
	});

	PaginationClick=function(pageNo) {
		//var pageNo = ($(this).attr('attr-pageNo'));
		PerformSearch($("#categorySectionId").attr('offeringtype'), null, pageNo, 0, 40);
	}
	PerformSearch($("#txtSrch").attr("offeringtype"));//trigger initial load
});