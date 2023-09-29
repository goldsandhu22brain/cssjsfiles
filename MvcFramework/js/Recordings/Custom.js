$(document).ready(function () {

	function ShowDefault() {
		$("#divVideoRecorded").replaceWith("<div id='divVideoRecorded' class='col-md-12'></div>");
	}
	$("#ddlTest").change(function () {
		$('body').removeClass('loaded'); 
		var id = (this.value);
		if (id == "0") {
			ShowDefault();
		} else {
			$.ajax({
				type: 'GET',
				cache: false,
				async: true,
				url: "/testplatform/ViewRecording/DisplayRecording?TestId=" + id,
				dataType: 'html',
				success: function (response) {
					$("#divVideoRecorded").replaceWith(response);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					ShowDefault();
				}
			});
		}
		$('body').addClass('loaded');
	});

})