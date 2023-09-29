function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

function formatDate(date) {
	return [
		date.getFullYear(),
		padTo2Digits(date.getMonth() + 1),
		padTo2Digits(date.getDate())
	].join('-');
}

function SearchButtonClick() {
	var Name = $("#Name").val();
	var TestResult = $("#TestResult").val();
	var TestName = $("#TestName").val();
	var ArrangedBy = $("#ArrangedBy").val();
	var SortBy = $("#SortBy").val();
	var DateRange = $("#DateRange").val();
	var inputData = JSON.stringify({
		"obj": {
			"Name": Name,
			"TestResult": TestResult,
			"TestName": TestName,
			"ArrangedBy": ArrangedBy,
			"SortBy": SortBy,
			"DateRange": DateRange
		}
	});
	$.ajax({
		url: '/User/CorporateApi/ViewResultTable',
		type: "POST",
		async: true,
		contentType: 'application/json; charset=utf-8',
		data: inputData,
		dataType: 'json',
		beforeSend: function () {
			$('.ajax-loader').css("visibility", "visible");
			$("#ResultTable").empty();
		},
		success: function (result) {
			$('.ajax-loader').css("visibility", "hidden");
			$("#ResultTable").html(result);

		},
		error: function (result) {
			$('.ajax-loader').css("visibility", "hidden");
			$("#ResultTable").html(result.responseText);

		},
		complete: function () {
			$('.ajax-loader').css("visibility", "hidden");
		}
	});
}

function DownloadButtonClick() {
	var Name = $("#Name").val();
	var TestResult = $("#TestResult").val();
	var TestName = $("#TestName").val();
	var ArrangedBy = $("#ArrangedBy").val();
	var SortBy = $("#SortBy").val();
	var DateRange = $("#DateRange").val();
	var inputData = JSON.stringify({
		"obj": {
			"Name": Name,
			"TestResult": TestResult,
			"TestName": TestName,
			"ArrangedBy": ArrangedBy,
			"SortBy": SortBy,
			"DateRange": DateRange
		}
	});
	$('.ajax-loader').css("visibility", "visible");
	$.ajax({
		url: '/User/CorporateApi/DownloadAttendedTestList',
		type: "post",
		data: inputData,
		xhrFields: {
			responseType: 'blob'
		},
		beforeSend: function (xhr) {
			//xhr.setRequestHeader("RequestVerificationToken",
			//	$('input:hidden[name="__RequestVerificationToken"]').val());

		},
		success: function (data, textStatus, xhr) {
			// check for a filename
			var filename = "";
			var disposition = xhr.getResponseHeader('Content-Disposition');
			if (disposition && disposition.indexOf('attachment') !== -1) {
				var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
				var matches = filenameRegex.exec(disposition);
				if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
				var a = document.createElement('a');
				var url = window.URL.createObjectURL(data);
				a.href = url;
				a.download = filename;
				document.body.append(a);
				a.click();
				a.remove();
				window.URL.revokeObjectURL(url);
			}
			else {
				alert("No REcords Found Error Occurred, Please Contact Admin Team");
			}			
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		},
		complete: function () {
			$('.ajax-loader').css("visibility", "hidden");
		}
	});

	//$.ajax({
	//	url: '/User/CorporateApi/DownloadAttendedTestList',
	//	type: "POST",
	//	async: true,
	//	contentType: 'application/json; charset=utf-8',
	//	data: inputData,
	//	dataType: 'json',
	//	beforeSend: function () {
	//		$('.ajax-loader').css("visibility", "visible");
	//		$("#ResultTable").empty();
	//	},
	//	success: function (result) {
	//		$('.ajax-loader').css("visibility", "hidden");
	//		$("#ResultTable").html(result);

	//	},
	//	error: function (result) {
	//		$('.ajax-loader').css("visibility", "hidden");
	//		$("#ResultTable").html(result.responseText);

	//	},
	//	complete: function () {
	//		$('.ajax-loader').css("visibility", "hidden");
	//	}
	//});
}
$(document).ready(function () {

	var date = new Date();

	$("input[name='DateRange']").daterangepicker({
		"autoApply": true,
		"showDropdowns": true,
		ranges: {
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		},
		"startDate": moment().startOf('month'),
		"endDate": moment(),
		"maxDate": moment()
	}, function (start, end, label) {
		console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
	});
});

