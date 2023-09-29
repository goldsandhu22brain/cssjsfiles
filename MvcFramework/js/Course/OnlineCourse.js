$(document).ready(function () {

	function showLoading(isLoad) {
		if (isLoad) {
			$("#pageloaddiv").css("display", "inherit");

		} else {
			$("#pageloaddiv").css("display", "none");
		}
	}

	function PerformSearch(callBackFn = null, pageNo = "1",  recordsPerPage = 40) {
		var offeringTypeVal = $("#txtSrch").attr("offeringtype");

		if (offeringTypeVal == 250)
			return;
		var sortOrder = '';
		if ($('#SortOrder option:selected') != null && $('#SortOrder option:selected') != undefined && $('#SortOrder option:selected').val() != null) {
			sortOrder = $('#SortOrder option:selected').val();
		}

		var filterBy = 0;

		if ($('#cmbFiltersByPrice option:selected').length > 0) {
			filterBy = $('#cmbFiltersByPrice option:selected').val();
		}
		var categoryId = '';
		var displayTitle = '';

		if ($('#categorySectionId') != null && $('#categorySectionId').attr('CategoryId') != null) {
			var catId = $('#categorySectionId').attr('CategoryId');
			if (catId != '0') {
				categoryId = $('#categorySectionId').attr('CategoryId');
				TitleToDisplay = $('#categorySectionId').attr('attr-name');
			}
		}

		var SearchText = '';

		if ($("#txtSrch").length > 0 && $("#txtSrch").val() != "" && $("#txtSrch").val() != null) {
			SearchText = $("#txtSrch").val();
		}

		var replaceId = pageNo == "1" ? 'boxBody' : "box-body";
		var jsonData = {
			'Filter': filterBy, 'SortBy': sortOrder, 'OfferingType': offeringTypeVal, 'CategoriesId': categoryId, 'RecordsPerPage': recordsPerPage, 'TitleToDisplay': TitleToDisplay, 'PageIndex': pageNo, 'SearchText': SearchText
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
			
				callBackFn && callBackFn();
				document.getElementById(replaceId).parentElement.parentElement.scrollIntoView();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				$("#ulPaging").hide();				
			}
		});
		showLoading(false);
	}

	$("#SortOrder").change(function () {
		PerformSearch();
	});

	$("#cmbFiltersByPrice").change(function () {
		PerformSearch();
	});

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
					PerformSearch();
				}
			}

		});
		PerformSearch();//trigger initial load
	}

	
	$("#categorySectionId a").click(function () {
		$('#categorySectionId').attr('CategoryId', $(this).attr('id'));
		$('#categorySectionId').attr('attr-name', $(this).attr('attr-name'));
		PerformSearch();
	});

	function ReLoadImages() {
		setTimeout(() => {

			$('img[data-src]').each(function () {
				$(this).attr('src', $(this).attr('data-src'));
				$(this).removeAttr('data-src');
			})
		}, 40);
	}


	ReLoadImages();

	$('.PaginationClick').live('click', function () {
		console.log('pagination');
		PerformSearch(null, $(this).attr('attr-pageNo'));
	});

	PerformSearch();//trigger initial load
});