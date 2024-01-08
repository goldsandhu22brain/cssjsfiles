function DisplayAlert(type, msg = "") {
	if ($("#scroll-container #" + type) == null || $("#scroll-container #" + type).length == 0) {
		var div = AlertType(type, msg);
		$("#scroll-container").append(div);
	}
	if ($("#scroll-container").children().length > 0) {
		$(".alert-container").removeClass("hide");
	}
	else if (!$(".alert-container").hasClass("hide")) { $(".alert-container").addClass("hide"); }
}
function GetDisplayAlert(type) {
	var title = $("#scroll-container #" + type);	
	return title != null && title.length > 0;
}
function AlertType(type, msg = "") {
	var text = "";
	if (type == "fullScreen") {
		text = '<div id="fullScreen" class="col-12 pb-1"><span class="me-1 dot" ></span>Full-screen mode is always active</div>';	
	}
	else if (type == "mouseActivity") {
		text = '<div id="mouseActivity" class="col-12 pb-1"><span class="me-1 dot" ></span>Mouse is always in the assessment window</div>';
	}
	else if (type == "debuggerCheck") {
		text = '<div id="debuggerCheck" class="col-12 pb-1"><span class="me-1 dot" ></span>Tried to break Test</div>';
	}
	else if (type == "webcamCheck") {
		text = '<div id="webcamCheck" class="col-12 pb-1"><span class="me-1 dot" ></span>Webcam enabled</div>';
	}
	else if (type == "NoFaceDetection" || type == "MultiFaceDetection" || type == "FaceDetectionError") {
		text = '<div id="' + type + '" class="col-12 pb-1"><span class="me-1 dot" ></span>' + msg + '</div>';
	}
	return text;
}
function getBaseUrl() {
	return "/Test";
}

function PushTracking(activityId, questionNo = "") {

	$.ajax({
		url: '/Tracker/ReportActions',
		type: 'POST',
		data: { ActivityType: activityId, Details: questionNo },
		success: function (response) {
			//if (isProctorLive) {
				//UserAlertTrigger();				
			//}
		},
		error: function () {
		},
	});
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
		PushTracking(200);		
		var fullScreen = GetDisplayAlert("fullScreen");
		var mouseActivity = GetDisplayAlert("mouseActivity");
		var debuggerCheck = GetDisplayAlert("debuggerCheck");
		var url = getBaseUrl() + "/NewLoadTest?Id=" + testingId;
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'html',
			data: {},
			cache: false,
			beforeSend: function () {
				$('.proctor-loader').css("visibility", "visible");
			},
			success: function (response) {
				var result = response;
				$("#fullScreenElement").hide();
				$('#InjectTest').replaceWith(result);
				Timer();
				Disable_Keys();
				DisableMouseRightClick();
				DisableCutCopyPaste();
			},
			complete: function () {
				$('.proctor-loader').css("visibility", "hidden");
			},
			error: function () {
				WarningSection(fullScreen, mouseActivity, debuggerCheck);
			}
		});
		if (typeof (syncChatMessage) != 'undefined') {
			syncChatMessage();
		}
	}
}
function InitiatingTimer() {
	//for timer
	var timer;
	var timerExamInterval;
	if (document.getElementById("exam-timer") != null) {
		var minutes, seconds;		
		if (initialTimer && !window.pauseAll) {
			var duration = 60 * totalMcqTime;
			timer = duration, minutes, seconds;
			initialTimer = false;
		}
		timerExamInterval = setInterval(function () {
			countExamTimer();
			if (isNaN(timer)) {
				clearInterval(timerExamInterval);
			}
		}, 1000);
		function countExamTimer() {
			if (!window.pauseAll && !isNaN(timer)) {
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
			}
		}
	}

}
function Timer() {
	InitiatingTimer();
	var debuggerCheck = false;
	setInterval(function () {
		var startTime = performance.now(), check, diff;
		for (check = 0; check < 1000; check++) {
			//	console.log(check);
			//console.clear();
		}
		diff = performance.now() - startTime;
		if (diff > 200 || debuggerCheck) {
			DisplayAlert("debuggerCheck");			
			debuggerCheck = true;
			PushTracking(120);
		}
	}, 500);

	$(window).blur(function () {
		DisplayAlert("mouseActivity");		
		PushTracking(110);
	});
}

$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function () {
	//if (IsFullScreenCurrently()) {
	LoadQuestion();
	if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
		//TODO: Make Ajax Call to Send Tracking
		PushTracking(8);
		DisplayAlert("fullScreen");				
		//if (isProctor) {
		//	pauseTest();
		//}
	}

});
var QuizButton = setInterval(() => {
	if (document.getElementById('load-test') != null) {
		clearInterval(QuizButton);
		document.getElementById('load-test').onclick = function () {
			if (!IsFullScreenCurrently())
				GoInFullscreen(document.documentElement);
		}
	}	
}, 1000);
//$(document).ready(function () {
//	if (!IsFullScreenCurrently())
//		GoInFullscreen(document.documentElement);
//});

//Keyboard Keys Disable 
function Disable_Keys() {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey) {
			PushTracking(48);
			return false;
		}
		if (event.altKey) {
			PushTracking(47);
			return false;
		}
		if (event.keyCode === 44) {
			//PrintScreen
			alert("PrintScreen is disabled.");
			PushTracking(44);
			return false;
		}
		if (event.keyCode === 122) {
			//F11
			PushTracking(122);
			return false;
		}
		if (event.keyCode === 123) {
			//F12
			alert("Developer Tool is disabled.");
			PushTracking(123);
			return false;
		}
		if (event.keyCode === 116) {
			//f5
			alert("Refresh Page is disabled.");
			PushTracking(116);
			return false;
		}
	});
}
function DisableCutCopyPaste() {
	//Disable cut copy paste
	$('body').bind('cut copy paste', function (e) {
		//alert("cut copy paste functionalities are disabled.");		
		PushTracking(49);
		alert("Cut copy paste functionalities are disabled.");
		iscontext = true;
		e.preventDefault();
		return false;
	});
}
function DisableMouseRightClick() {
	window.oncontextmenu = function () {
		//alert("right click is disabled for this page.");
		PushTracking(50);
		alert("Right click is disabled for this page.");
		iscontext = true;
		return false;
	}
}

$(window).on('load', function () {
	$('.proctor-loader').css("visibility", "hidden");
})