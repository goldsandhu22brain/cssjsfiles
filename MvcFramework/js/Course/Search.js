$(document).ready(function () {

	function showLoading(isLoad) {
		if (isLoad) {
			$("#pageloaddiv").css("display", "inherit");

		} else {
			$("#pageloaddiv").css("display", "none");
		}
	}

	function PerformSearch(offeringTypeVal, callBackFn = null, pageNo = "1", filterBy = 0, recordsPerPage = 9999) {
		if (offeringTypeVal == 250)
			return;
		var sortOrder = $('#SortOrder option:selected').val();
		//Just to OverRide Value
		if ($('#cmbFiltersByPrice option:selected').length > 0) {
			filterBy = $('#cmbFiltersByPrice option:selected').val();
		}
		var categoryId = '';
		if ($('#ulCourseGrp') != null && $('#ulCourseGrp').attr('CategoryId') != null) {
			categoryId = $('#ulCourseGrp').attr('CategoryId');
		}
		var replaceId = pageNo == "1" ? 'boxBody' : "box-body";
		var jsonData = {
			'Filter': filterBy, 'SortBy': sortOrder, 'OfferingType': offeringTypeVal, 'CategoriesId': categoryId, 'RecordsPerPage': recordsPerPage
		};
		if ($("#txtSrch").length>0 && $("#txtSrch").val() != "" && $("#txtSrch").val() != null) {
			jsonData["SearchText"] = $("#txtSrch").val();
		}

		$.ajax({
			type: 'POST',
			cache: false,
			async: true,
			contentType: 'application/json; charset=utf-8',
			url: '/Search',
			data: JSON.stringify(jsonData),
			dataType: 'html',
			success: function (response) {
				$("#"+replaceId).html(response);
				showLoading(false);				
				callBackFn && callBackFn();
				document.getElementById(replaceId).parentElement.parentElement.scrollIntoView();
				
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				$("#ulPaging").hide();
				showLoading(false);
			}
		});

	}

	$("#SortOrder").change(function () {
		PerformSearch($(this).attr('offeringtype'));
	});

	$("#cmbFiltersByPrice").change(function () {
		PerformSearch($(this).attr('offeringtype'));
	});
	$("#ulCourseGrp li").click(function () {
		$('#ulCourseGrp').attr('CategoryId', $(this).attr('id'));
		var _this = this;
		var callBackFn = function () {
			var title = $(_this).find(".cat_name").text();
			$("h3.box-title").html(title);
		}
		PerformSearch($("#ulCourseGrp").attr('offeringtype'), callBackFn);
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
					PerformSearch($("#txtSrch").attr("offeringtype"));
				}
			}

		});
		PerformSearch($("#txtSrch").attr("offeringtype"));//trigger initial load
	}


	if ($("#FreeCourse") != null && $("#FreeCourse") !== undefined && $("#FreeCourse").length > 0) {
		PerformSearch($("#FreeCourse").attr("offeringtype"), null, 1, 10, 9999);//trigger initial load
	}


	$("#ulVideoGrp a").click(function () {
		$('#ulVideoGrp').attr('CategoryId', $(this).attr('id'));
		PerformSearch($("#ulVideoGrp").attr('offeringtype'));
	});

});