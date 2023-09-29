$(document).ready(function () {

	function showLoading(isLoad) {
		if (isLoad) {
			$("#pageloaddiv").css("display", "inherit");

		} else {
			$("#pageloaddiv").css("display", "none");
			$("#loader-wrapper").addClass("hide");
		}
	}
	showLoading(false);

	function Success(message) {
		$.gritter.add({
			title: 'Success',
			text: message,
			class_name: 'gritter-success'
		});
		$('.gritter-item').css({ 'font-weight': 'bold' });
	}

	function Warning(message) {

		$.gritter.add({
			title: 'Error',
			text: message,
			class_name: 'gritter-warning'
		});
		$('.gritter-item').css({ 'font-weight': 'bold' });
	}

	var message = '@response.Message';

	if (message != undefined && message.Length > 0) {
		var status = '@((int)response.Status)';
	}
	function processTxtBox(targetId, presentVal) {
		var txtBoxVal = $('#' + targetId).val();

		if (txtBoxVal > $('#' + targetId).attr('max')) {
			$('#' + targetId).val($('#' + targetId).attr('max'));
		} else if (txtBoxVal < 0) {
			$('#' + targetId).val(0);
		}
	}
	$(".checkbox").change(function () {
		if (this.checked) {
			var id = $(this).attr('attr-id');
			processTxtBox(id);
		}
	});

	function MakeAjaxCall(apiObj) {
		$.ajax({
			url: "/user/individual/CancelBooking",
			type: "POST",
			datatype: "html",
			data: apiObj,
			success: function (data) {
				if (data != null) {
					if (data.Status == 200) {
						Success('Cancellation Raised');
						setTimeout(function () {
							location.reload(true);						
						}, 2000);     
					}
					else {
						Warning(data.Message);
					}
				}
				else {
					Warning('Internal Error Contact Help Desk');
				}
			}
		});
	}

	$("#btnCancelFlow").click(function () {
		var canMakeCall = false;
		var array = [];
		$("input:checkbox[name=ChkBoxToDelete]:checked").each(function () {
			array.push($(this).attr('attr-id'));
		});
		if (array.length > 0) {
			var jsonData = [];
			$.each(array, function (index, value) {
				var txtBoxVal = $('#' + value).val();
				var eachObj = { "OrderItemId": value, "QuantityToRemove": txtBoxVal };
				jsonData.push(eachObj);
			});

			if (jsonData.length > 0) {
				var apiObj = { "CancelPurchaseList": jsonData };
				canMakeCall = true;
			}
		}
		if (canMakeCall) {
			MakeAjaxCall(apiObj);
		}
		else {
			Warning('No Valid Rows Selected');
		}
	});
});
