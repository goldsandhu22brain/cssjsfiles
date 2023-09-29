document.addEventListener('load', () => {
	// handle load event
	var test = $("#Points").val();
	console.log(test);
});
$(document).ready(function () {
	if ($("#Points").val() != '') {
		CheckCalcualtionOnPurchasePoint();
	}
	function OnTextChange() {
		var pointsReg = new RegExp(/^[0-9.]*$/);

		if ($("#Points").val() == '') {
			Warning('<ul><li>No. of points cannot be empty.</li></ul>');
			$("#Points").focus().val('');
			showLoading(false);
			return false;
		}
		if ($("#Points").val() == '0') {
			Warning('<ul><li>No. of points cannot be Zero.</li></ul>');
			$("#Points").focus().val('');
			showLoading(false);
			return false;
		}
		if ($("#Points").val() != '') {
			if (!pointsReg.test($("#Points").val())) {
				Warning('<ul><li>Please enter valid number.</li></ul>');
				showLoading(false);
				return false;
			}
			else {
				CheckCalcualtionOnPurchasePoint();
			}
		}
	}
	$(document).on('change', '#Points', function () {
		OnTextChange();
		return false;
	});

	$(document).on('click', '#btnProceedToPayment', function () {
		if ($("#Points").val() == '') {
			Warning('<ul><li>You must enter purchase point to proceed.</li></ul>');
			showLoading(false);
			return false;

		}
		else if ($("#Points").val() != '') {
			if ($('#lblEnteredPoints').html() == 0) {

				CheckCalcualtionOnPurchasePoint();

			}
			$('#paypalfrm').submit();
		}


	});

});

function CheckCalcualtionOnPurchasePoint() {
	var PurchasePoint = $("#Points").val();
	var pointsReg = new RegExp(/^[0-9.]*$/);
	var hdnTotalAmount;
	var hdnDiscount = 0;
	if (!pointsReg.test($("#Points").val())) {
		Warning('<ul><li>Please enter valid number.</li></ul>');
		showLoading(false);
		return false;
	}
	else {
		$("#lblEnteredPoints").html(parseFloat(PurchasePoint).toFixed(2));

		var data = JSON.parse(discountCodes);
	
		for (let i = 0; i < data.length; i++) {
			console.log(data[i].MaxPoints); // here i is index
			var minPoints = parseFloat(data[i].MinPoints);
			var MaxPoints = parseFloat(data[i].MaxPoints);
			if (minPoints <= PurchasePoint && PurchasePoint <= MaxPoints) {
				hdnDiscount = parseFloat(data[i].DiscountPercentage);
				break;
			}
		}

		$("#hdnEnteredPoint").val(parseFloat(PurchasePoint).toFixed(2));
		if (hdnDiscount > 0) {
			$("#lblDiscountAvailed").text(hdnDiscount + '%');
			hdnTotalAmount = parseFloat(PurchasePoint - (PurchasePoint * hdnDiscount / 100)).toFixed(2);
			$("#lblPrice").text('$' + hdnTotalAmount);
		}
		else {
			$("#lblDiscountAvailed").text('-');
			$("#lblPrice").text('$' + parseFloat(PurchasePoint));
			hdnTotalAmount = parseFloat(PurchasePoint).toFixed(2);
		}

		$("#hdnPrice").val(hdnTotalAmount);
		$("#hdnAvailDiscount").val(hdnDiscount);
	}
}