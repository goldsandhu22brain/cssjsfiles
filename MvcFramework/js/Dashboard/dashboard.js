async function LoadComponent(url, divId) {
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'html',
		async: false,
		cache: true,
		timeout: 5000,
		success: function (data) {
			if (data != null && data != '') {
				$(divId).html(data);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$(divId).html('');
		}
	});
}

async function LoadCenterTab(divToMakeActive, uri) {
	$('body').addClass('loader');
	$('body').removeClass('loaded');
	$('.nav-tabs li.active').removeClass('active');
	$(divToMakeActive).addClass('active');

	var data = await getDataFromAPI(uri);
	$("#tab-content").html(data);
	$('body').removeClass('loader');
	$('body').addClass('loaded');
}
async function LoadVideoCourse() {
	LoadCenterTab('#videolink', "/dashboard/VideoCourseSection");
}

async function LoadTest() {
	LoadCenterTab('#testlink', "/dashboard/TestSection");
}

async function LoadRegisteredCourses() {
	LoadCenterTab('#registeredlink', "/dashboard/RegisteredCoursesSection");
}

async function LoadCart() {
	LoadCenterTab('#cartlink', "/dashboard/CartSection");
}

async function LoadDemoPointsWidget() {
	LoadCenterTab('#ebooklink', "/dashboard/DemoPointsWidget");
}

async function LoadCorporateCourse(category) {
	$('body').addClass('loader');
	$('body').removeClass('loaded');
	$('.nav-tabs li.active').removeClass('active');
	$('#ebooklink').addClass('active');

	var apiURL = "/dashboard/CorporateCourseWidget";
	if (category != undefined) {
		apiURL = apiURL + "?status=" + category;
	}

	var data = await getDataFromAPI(apiURL);
	$("#tab-content").html(data);

	if (category != undefined) {
		document.getElementById("ddlVideoCourse").value = category;
	}
	EnableCheckbox();

	$('body').removeClass('loader');
	$('body').addClass('loaded');

}

function ApplyCoupon(id) {
	$.ajax({
		url: "/dashboard/applycoupon",
		type: "POST",
		data: { "coupon": $('#txtCoupon').val(), "cartCodeValue": id },
		success: function (data) {
			if (data.Status = 200) {
				$("#couponMessage").innerHtml = "The coupon code was applied <br/> Entered coupon code - " + $('#txtCoupon').val();
				location.reload();
			}
			else {
				$("#couponMessage").innerHtml = "The coupon code you entered couldn't be applied to your order";
				$("#lkRemoveCoupon").hide();
			}
		}
	});
}

function RemoveCoupon(id) {
	$.ajax({
		url: "/dashboard/removecoupon",
		type: "POST",
		data: { "coupon": id },
		success: function (data) {
			if (data.Status = 200) {
				Success('<ul><li>Coupon code removed successfully</li></ul>');
				location.reload();
			}
			else {
				Warning('<ul><li>Something went wrong,Please try again</li></ul>');
			}
		}
	});
}

function UserStartTest(usertestid) {
	$.ajax({
		type: 'POST',
		url: '/dashboard/CheckStartTestDate',
		data: { 'usertestid': usertestid },
		dataType: 'json',
		success: function (result) {
			if (result.Status == "1") {
				location.href = result.ResponseData;
			}
			else {
				Warning(result.ResponseData);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function UserScheduleTest(testId, usertestid) {
	$.ajax({
		type: 'POST',
		url: '/dashboard/CheckPurchasedDate',
		data: { 'usertestid': usertestid },
		dataType: 'json',
		success: function (result) {
			if (result.Status == "1") {
				var responsedt = result.ResponseData;
				if (responsedt == "5") {
					window.location.href = "Schedule.aspx?Id=" + usertestid + "&tid=" + testId;
				}
				else {
					Warning("Schedule after 5 day of purchased");
				}
			}
			else {
				Warning(result.ResponseData);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function filedownload(path, cid) {
	location.href = '/Handler/DownloadHandler.ashx?fileName=' + path + "&id=" + cid
}


function CorporateUserScheduleTest(usertestid) {
	$.ajax({
		type: 'POST',
		url: '/dashboard/CorporateCheckPurchasedDate',
		data: { 'usertestid': usertestid },
		dataType: 'json',
		success: function (result) {
			if (result.Status == "1") {
				var responsedt = result.ResponseData;
				if (responsedt == "7") {
					window.location.href = "/corporate/EditTest.aspx?Id=" + usertestid;
				}
				else {
					Warning("Schedule after 7 day of purchased");
				}
			}
			else {
				Warning(result.ResponseData);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function DeleteTest() {

	var arrData = [];
	// loop over each table row (tr)
	$("#MyTestTable tr").each(function () {
		var currentRow = $(this);

		var hiddenField1 = currentRow.find("#HiddenField1").val();
		var checkboxValue = currentRow.find(".icheckbox_flat-blue").attr("aria-checked");
		if (checkboxValue == "true") {
			arrData.push(hiddenField1);
		}
	});


	$.ajax({
		type: 'POST',
		url: '/dashboard/DeleteTest',
		data: { 'testIdList': arrData },
		dataType: 'json',
		success: function (result) {
			if (result.Status == "200") {
				Success(result.Message);
				LoadCorporateTest();
			}
			else if (result.Status == "202") {
				Warning(result.Message);
			}
			else if (result.Status == "203") {
				InfoGritter(result.Message);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function IntimateCorporateCourse() {

	var arrData = [];
	// loop over each table row (tr)
	$("#MyRegCoursesTable tr").each(function () {
		var currentRow = $(this);

		var hiddenField1 = currentRow.find("#HiddenField1").val();
		var checkboxValue = currentRow.find(".icheckbox_flat-blue").attr("aria-checked");
		var courseName = currentRow.find("#hdnCourseName").val();
		if (checkboxValue == "true") {
			var obj = {};
			obj.CourseName = courseName;
			obj.Id = hiddenField1;
			arrData.push(obj);
		}
	});


	$.ajax({
		type: 'POST',
		url: '/dashboard/VideoCourseIntimate',
		data: { 'courseList': arrData },
		dataType: 'json',
		success: function (result) {
			if (result.Status == "200") {
				Success(result.Message);
				LoadCorporateCourse();
			}
			else if (result.Status == "202") {
				Warning(result.Message);
			}
			else if (result.Status == "203") {
				InfoGritter(result.Message);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function IntimateCorporateTest() {

	var arrData = [];
	// loop over each table row (tr)
	$("#MyTestTable tr").each(function () {
		var currentRow = $(this);

		var hiddenField1 = currentRow.find("#HiddenField1").val();
		var checkboxValue = currentRow.find(".icheckbox_flat-blue").attr("aria-checked");
		var pinno = currentRow.find("#lblPinNo").val();
		var testId = currentRow.find("#hdnTestID").val();


		if (checkboxValue == "true") {
			var obj = {};
			obj.PinNo = pinno;
			obj.Id = hiddenField1;
			obj.TestId = testId;
			arrData.push(obj);
		}
	});


	$.ajax({
		type: 'POST',
		url: '/dashboard/TestIntimate',
		data: { 'testList': arrData },
		dataType: 'json',
		success: function (result) {
			if (result.Status == "200") {
				Success(result.Message);
				LoadCorporateTest();
			}
			else if (result.Status == "202") {
				Warning(result.Message);
			}
			else if (result.Status == "203") {
				InfoGritter(result.Message);
			}
		}
	});
}

function EnableCheckbox() {
	//Below is throwing error on dashboard my psychometric test tab
	//$('.mailbox-messages input[type="checkbox"]').iCheck({
	//	checkboxClass: 'icheckbox_flat-blue',
	//	radioClass: 'iradio_flat-blue'
	//});

	$(".checkbox-toggle").click(function () {
		var clicks = $(this).data('clicks');
		if (clicks) {
			$(".mailbox-messages input[type='checkbox']").iCheck("uncheck");
			$(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
		} else {

			$(".mailbox-messages input[type='checkbox']").iCheck("check");
			$(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
		}
		$(this).data("clicks", !clicks);
	});

	//Handle starring for glyphicon and font awesome
	$(".mailbox-star").click(function (e) {
		e.preventDefault();
		//detect type
		var $this = $(this).find("a > i");
		var glyph = $this.hasClass("glyphicon");
		var fa = $this.hasClass("fa");

		//Switch states
		if (glyph) {
			$this.toggleClass("glyphicon-star");
			$this.toggleClass("glyphicon-star-empty");
		}

		if (fa) {
			$this.toggleClass("fa-star");
			$this.toggleClass("fa-star-o");
		}
	});
}

async function LoadAvailableAds() {
	$('body').addClass('loader');
	$('body').removeClass('loaded');
	$('.nav-tabs li.active').removeClass('active');
	$('#cartlink').addClass('active');

	var data = await getDataFromAPI("/dashboard/LoadAvailableAds");
	$("#tab-content").html(data);
	$('body').removeClass('loader');
	$('body').addClass('loaded');
}

async function LoadMyAds() {
	$('body').addClass('loader');
	$('body').removeClass('loaded');
	$('.nav-tabs li.active').removeClass('active');
	$('#cartlink').addClass('active');

	var data = await getDataFromAPI("/dashboard/LoadMyAds");
	$("#tab-content").html(data);
	$('body').removeClass('loader');
	$('body').addClass('loaded');
}


//To Be Used by Tabs by Corp & Candidate
async function LoadTabs(offeringType, category) {
	$('body').addClass('loader');
	$('body').removeClass('loaded');
	$('.nav-tabs li.active').removeClass('active');
	$('#ebooklink').addClass('active');

	var apiURL = "/dashboard/Tabs?offeringType=" + offeringType;
	if (category != undefined) {
		apiURL = apiURL + "&status=" + category;
	}

	var data = await getDataFromAPI(apiURL);
	$("#tab-content").html(data);

	if (category != undefined && category != null) {
		if (document.getElementById("ddlStatus") != null) {
			document.getElementById("ddlStatus").value = category;
		}
	}
	EnableCheckbox();

	$('body').removeClass('loader');
	$('body').addClass('loaded');
}


$(function () {
	var userType = ($("#firstTab").attr('attr-UserType'));
	if (userType == 'Affiliate') {
		LoadAvailableAds();
	}
	else {
		LoadTabs(250, 0);//ToLoad 1st Tab in center page
	}
	$("#firstTab").addClass("active");

	EnableCheckbox();
});