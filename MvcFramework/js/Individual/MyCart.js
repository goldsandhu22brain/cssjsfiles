function showLoading(isLoad) {
	if (isLoad) {
		$("body").removeClass("loaded");

	} else {
		$("body").addClass("loaded");
	}
}

function MakePostCall(url, data) {
	showLoading(true);

	$.ajax({
		type: 'POST',
		cache: false,
		async: true,
		contentType: 'application/json; charset=utf-8',
		url: url,
		data: JSON.stringify(data),
		dataType: 'html',
		success: function (response) {
			$("#CartBody").html(response);
			showLoading(false);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert('Error Occurred, Kindly Contact Customer Support');
			showLoading(false);
		}
	});
}


function ApplyRemoveProctor(offeringId, isChecked, isProctorLive) {

	showLoading(true);
	var id = 0;
	if (isChecked) {
		if (isProctorLive) {
			id = 20;
		} else {
			id = 10;
		}
	}
	$.ajax({
		type: 'GET',
		cache: false,
		async: true,
		contentType: 'application/json; charset=utf-8',
		url: '/user/individual/UpdateAddOns?offeringId=' + offeringId + '&isChecked=' + isChecked + '&proctorMode=' + id,
		dataType: 'html',
		beforeSend: function () {
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function (response) {
			$("#CartBody").html(response);
			showLoading(false);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert('Error Occurred, Kindly Contact Customer Support');
			showLoading(false);
		},
		complete: function () {
			$('.ajax-loader').css("visibility", "hidden");
		}
	});
}


function RemoveItemFromCart(orderId, offeringId) {
	var test = confirm('Are you sure you want to delete from the Cart?');
	if (test == true || test == 'true') {
		MakePostCall('/User/Individual/UpdateQuantity', { 'orderId': orderId, 'offeringId': offeringId, 'Count': 1, 'isAddition': false });
	}
}
function RemoveAllItemsFromCart(orderId) {
	var test = confirm('Are you sure you want to delete All Items from the Cart?');
	if (test == true || test == 'true') {
		MakePostCall('/User/Individual/RemoveAllIems', { 'orderId': orderId });
	}
}

function ApplyCoupon(Id, couponCode) {
	if (couponCode == null || couponCode == '' || couponCode.len <= 0) {
		alert('Please provide Proper Coupon Code To Apply');
	}
	else {
		MakePostCall('/User/Individual/ManageDiscount', { 'Id': Id, 'CouponName': couponCode });
	}
}

function RemoveCoupon(orderId) {
	MakePostCall('/User/Individual/ManageDiscount', { 'Id': orderId });
}
