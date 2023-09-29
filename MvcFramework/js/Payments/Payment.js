$(function () {
	$("#btnPayPal").click(function (e) {
		if ($("#cntCartMaster_lblTotalAmt").text().split("$")[1] != 0) {
			//UpdateCartStatus();
			$('#paypalfrm').submit();
		}
		else {
			alert("Total Amount cannot be less then zero.");
		}
		e.preventDefault();
	});


	$("#2checkout").click(function (e) {
		if ($("#cntCartMaster_lblTotalAmt").text().split("$")[1] != 0) {
			
			$('#2checkoutfrm').submit();
		}
		else {
			alert("Total Amount cannot be less then zero.");
		}
		e.preventDefault();
	});
	

	$("[id$='ddlCurrencyStripe']").on("change", function () {
		var currency = $("[id$='txtStripeAmount']")[0].attributes["data-ordercurrency"]?.value;
		var cur_price = parseFloat($("[id$='txtStripeAmount']")[0].attributes['data-value'].value);
		var ddValue = $(this).val().toUpperCase();
		var newVal = $(this)[0].selectedOptions[0].attributes['data-amt'].value;
		var symbol = "";
		var canShowPayPal = true;
		if (ddValue == "INR") {
			symbol = "₹";
			canShowPayPal = false;// PayPalDont Support INR
		}
		else {//USD
			symbol = "$";
		}

		if (canShowPayPal) {
			$("#divpayPayPal").show();
		}
		else {
			$("#divpayPayPal").hide();
		}

		$("[id$='txtStripeAmount']").val(symbol + newVal);
	})

	$("#stess").on("click", function () {
		$("[id$='divpaystripe']").show();

	});
});

function CallPayPal() {
	var orderId = $("#hdnOrderId").val();
	var currency = $("#hdnCurrencyCode").val();// when currency dropdown changed, update this hidden field with currency
	var currencyValue = document.getElementById("ddlCurrencyStripe").value;
	$.ajax({
		type: 'POST',
		cache: false,
		async: true,
		beforeSend: function () {
			$('.ajax-loader').css("visibility", "visible");
		},
		contentType: 'application/json; charset=utf-8',
		url: '/User/Payments/DoPaypalPayment',
		data: JSON.stringify({ 'orderId': orderId, 'currency': currencyValue }), //Pass Order Id, in Controller get the Order details and once matched then return the token and stipe key
		dataType: 'json',
		success: function (response) {
			if (response != null) {
				if (response.Status == 200) {
					window.location = response.RedirectUrl;
				}
				else if (response.Status == 800) {
					window.location = '/login';
				}
			}
		},
		complete: function () {
			$('.ajax-loader').css("visibility", "hidden");
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
		}
	});
}
function CallStripe() {
	var orderId = $("#hdnOrderId").val();
	var currency = $("#hdnCurrencyCode").val();// when currency dropdown changed, update this hidden field with currency
	var currencyValue = document.getElementById("ddlCurrencyStripe").value;
	$.ajax({
		type: 'POST',
		cache: false,
		async: true,
		beforeSend: function () {
			$('.ajax-loader').css("visibility", "visible");
		},
		contentType: 'application/json; charset=utf-8',
		url: '/User/Payments/DoStripePayment',
		data: JSON.stringify({ 'orderId': orderId, 'currency': currencyValue }), //Pass Order Id, in Controller get the Order details and once matched then return the token and stipe key
		dataType: 'json',
		success: function (response) {			
			if (response != null) {
				if (response.Status == 200) {
					var stripe = Stripe(response.StripeKey);//test
					stripe.redirectToCheckout({
						sessionId: response.StripeTokenId
					})
				}
				else if (response.Status == 800) {
					window.location = '/login';
				}
			}
		},
		complete: function () {
			$('.ajax-loader').css("visibility", "hidden");
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
		}
	});
}
