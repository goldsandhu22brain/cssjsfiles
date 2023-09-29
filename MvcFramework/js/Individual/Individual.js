$(document).ready(function () {
	$("#btnSavePayPalID").click(function () {
		var isValid = true;

		if ($("#txtPayPalID").val() == '') {
			Warning('<ul><li>Please enter Paypal Id.</li></ul>');
			isValid = false;
		}

		if (isValid) {

			$.ajax({
				url: "/individual/SavePayPalID",
				type: "POST",
				data: { 'payPalID': $("#txtPayPalID").val() },
				success: function (data) {
					if (data.Status === 200) {
						$('#lblRegisteredPayPalID').text($("#txtPayPalID").val());
						Success(data.ResponseData);
					}
					else {
						Warning(data.ResponseData);
					}
				},
				error: function (err) {
					Warning(err.statusText);
				}
			});

		}
	});

});