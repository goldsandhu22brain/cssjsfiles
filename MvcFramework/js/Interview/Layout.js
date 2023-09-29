function getBaseUrl() {
	var baseUrl = "/TestPlatform/Free";
	if (isCorporate == "true") {
		baseUrl = "/TestPlatform/Corporate";
	}
	else if (isFree == "false") {
		baseUrl = "/TestPlatform/Paid";
	}
	return baseUrl;
}

///* Get into full screen */
function GoInFullscreen(element) {
	if (element.requestFullscreen)
		element.requestFullscreen();
	else if (element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if (element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if (element.msRequestFullscreen)
		element.msRequestFullscreen();
}


///* Is currently in full screen or not */
function IsFullScreenCurrently() {
	var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;

	// If no element is in full-screen
	if (full_screen_element === null)
		return false;
	else
		return true;
}

function LoadQuestion() {

	var isExists = document.getElementById('InjectTest');
	if (isExists != null) {
		$("#fullScreenElement").hide();
		var fullScreen = $("#fullScreen").hasClass("disabled");
		var mouseActivity = $("#mouseActivity").hasClass("disabled");
		var debuggerCheck = $("#debuggerCheck").hasClass("disabled");
		if (isResting == "true")
			var url = getBaseUrl() + "/LoadReTest?Id=" + testingId;
		else
			var url = getBaseUrl() + "/LoadTest?Id=" + testingId;
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'html',
			data: {},
			cache: false,
			beforeSend: function () {
				$('.ajax-loader').css("visibility", "visible");
			},
			success: function (response) {
				var result = response;
				$('#InjectTest').replaceWith(result);
				Timer();
			},
			complete: function () {
				$('.ajax-loader').css("visibility", "hidden");
			},
			error: function () {
				WarningSection(fullScreen, mouseActivity, debuggerCheck);
			}
		});
	}
}
function Timer() {
	//for timer
	var timer;
	var timerExamInterval;
	if (document.getElementById("exam-timer") != null) {
		var minutes, seconds;
		timerExamInterval = setInterval(countExamTimer, 1000);
		if (initialTimer) {
			var duration = 60 * totalMcqTime;
			timer = duration, minutes, seconds;
			initialTimer = false;
		}
		function countExamTimer() {
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			if (document.getElementById("exam-timer") != null) {
				document.getElementById("exam-timer").innerHTML = maxMcqTime + " / " + minutes + ":" + seconds;
			}
			if (--timer < 0) {
				timer = duration;
				SubmitTestAutomatically();
			}

			if (seconds == "00") {
				console.log('refresh call');

				var url = "/Testplatform/Tracker/RefreshSession";
				$.ajax({
					url: url,
					type: 'GET',
					dataType: 'Json',
					cache: false,
					success: function (response) {
						if (response == null || response.Status != "200") {
							console.log('Session Renewal Issue');
						}
					},
					error: function () {
						console.log('refresh call Error');						
					}
				});
			}
		}
	}

	var debuggerCheck = false;
	setInterval(function () {
		var startTime = performance.now(), check, diff;
		for (check = 0; check < 1000; check++) {
			//	console.log(check);
				console.clear();
		}
		diff = performance.now() - startTime;
		if (diff > 200 || debuggerCheck) {
			$("#debuggerCheck").removeClass("disabled");
			debuggerCheck = true;
		}
	}, 500);

	$(window).blur(function () {
		$("#mouseActivity").removeClass("disabled");
	});
}

$("#go-button").on('click', function () {
	if (!IsFullScreenCurrently())
		GoInFullscreen(document.documentElement);
});

$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function () {
	//if (IsFullScreenCurrently()) {
	LoadQuestion();
	if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
		$("#fullScreen").removeClass("disabled");
	}
	//}
	//else {
	//	$("#go-button").trigger("click");
	//	console.log('else');
	//}
});


