$(document).ready(function () {

	$(document).on('click', '.clsNotifyDetail', function () {
		$("#dvPopUpNotificationContent").css("display", "none");

		var id = $(this).attr("attr-id");
		var notifyTo = $(this).attr("data-notifyTo");

		if (ReadNotificationDetail(id, notifyTo))
			$(this).parent().parent().css("background-color", '#FFF');

		return false;
	});

});

function ReadNotificationDetail(id, itemType) {
	showLoading(true);
	$.ajax({
		type: 'POST',
		cache: false,
		async: true,
		contentType: 'application/json; charset=utf-8',
		url: '/user/profile/notification',
		data: JSON.stringify({ 'Id': id }),
		dataType: 'json',
		success: function (response) {

			if (response != null && response.Status == 200 && response.ResponseModel != null) {
				$("#ltrNotifyDetail").text(response.ResponseModel.NotificationMessage);
				$("#lblItemType").text(itemType + ' Notify');
				$("#unread_" + id).addClass('hide');
				$("#read_" + id).removeClass('hide');
				showLoading(false);
				$("#dvPopUpNotificationContent").css("display", "block");


			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			showLoading(false);
		}
	});

	return true;
}