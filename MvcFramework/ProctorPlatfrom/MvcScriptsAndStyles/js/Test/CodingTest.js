/***********************custom js for coding test window***********************/
//TO Do: change all the function as per the coding process instead of mcq
var elem = document.documentElement;

if (document.addEventListener) {
	document.addEventListener('fullscreenchange', exitHandler, false);
	document.addEventListener('mozfullscreenchange', exitHandler, false);
	document.addEventListener('MSFullscreenChange', exitHandler, false);
	document.addEventListener('webkitfullscreenchange', exitHandler, false);
}

document.onkeydown = function (ev) {
	//console.log(ev.keyCode);
	if (ev.keyCode === 27 || ev.keyCode === 122) {
		DisplayAlert("fullScreen");		
	}
}

function exitHandler() {
	if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
		DisplayAlert("fullScreen");		
	}
}

// drag and drop
//let dragged;
document.addEventListener(
	"dragstart",
	function (e) {
		dragged = e.target;
		e.dataTransfer.setData("text", null);
	},
	false
);
document.querySelectorAll(".dropzone").forEach((el) =>
	el.addEventListener(
		"dragover",
		function (e) {
			e.preventDefault();
		},
		false
	)
);
document.addEventListener(
	"dragenter",
	function (e) {
		if (e.target.classList.contains("dropzone")) {
			e.target.style.border = "2px dashed #ccc";
		}
	},
	false
);
document.addEventListener(
	"dragleave",
	function (e) {
		if (e.target.classList.contains("dropzone")) {
			e.target.style.border = "";
		}
	},
	false
);
document.addEventListener(
	"drop",
	function (e) {
		e.preventDefault();
		if (e.target.classList.contains("dropzone")) {
			dragged.parentElement.removeChild(dragged);
			e.target.firstChild && e.target.removeChild(e.target.firstChild);
			e.target.appendChild(dragged);
			e.target.style.border = "";
		}
	},
	false
);

function ReLoadImages() {
	setTimeout(() => {
		$('img[data-lazysrc1]').each(function () {
			$(this).attr('src', $(this).attr('data-lazysrc1'));
			if ($(this).attr('onError').length <= 0) {
				$(this).attr('onError', "this.onerror=null;this.src='https://cdn.brainmeasures.com/Proctor/logo.jpg'");
			}			
			$(this).removeAttr('data-lazysrc1');
		})
	}, 40);

}

/* Logical - spatial grid click */
$(".grid-item").click(function () {
	$(".ls-grid-click").each(function () {
		$('.ls-grid-click').removeClass("grid-item-selected");
	});
	$(this).addClass("grid-item-selected");
});

var questiontimer = null,
	interval = 1000,
	timervalue = 0;

function StartTimer() {
	if (questiontimer !== null) return;
	questiontimer = setInterval(function () {
		timervalue = timervalue + 1;
	}, interval);
}

function ReStartTimer() {
	clearInterval(questiontimer);
	ReLoadImages();
	questiontimer = null;
	timervalue = 0;
	StartTimer();
	$(this).scrollTop(0);
}
function PushTracking(activityId, questionNo = "") {

	//$.ajax({
	//	url: '/Tracker/ReportActions',
	//	type: 'POST',
	//	data: { ActivityType: activityId, Details: questionNo },
	//	success: function (response) {
	//		//if (isProctorLive) {
	//		//UserAlertTrigger();				
	//		//}
	//	},
	//	error: function () {
	//	},
	//});
}

function getBaseUrl() {	
	return "/Test";
}
function getInterviewBaseUrl() {
	return "/Interview";
}
function LoadQuestionIdTileCard() {
	var url = getBaseUrl() + "/LoadTileCardSection";
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: {},
		cache: false,
		success: function (response) {
			var result = response;
			$('#tileCardSection').replaceWith(result);
		},
		error: function () {
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
		}
	});
}

function DisplayAlert(type, msg = "") {
	var title = $('.warning-display').attr("data-bs-original-title");
	var list = [];
	var TitleValue = "";
	if (title != "" && title != null) {
		list = $(title);
		var Ids = ["fullScreen", "mouseActivity", "debuggerCheck", "webcamCheck", "NoFaceDetection", "MultiFaceDetection", "FaceDetectionError"];
		if (Ids.includes(type)) {
			TitleValue = TitleValue + AlertType(type, msg);
		}
		for (var a = 0; a < list.length; a++) {
			var Id = list[a].id;
			if (type == Id) { }
			else if (Ids.includes(Id)) {
				TitleValue = TitleValue + AlertType(Id, msg);
			}
		}
	}
	else {
		TitleValue = AlertType(type, msg);
	}
	if (TitleValue != null && TitleValue != "") {
		if ($(".test-small-text").hasClass("d-none")) {
			$(".test-small-text").removeClass("d-none");
		}
	}
	else {
		if (!$(".test-small-text").hasClass("d-none")) {
			$(".test-small-text").addClass("d-none");
		}
	}
	$('.warning-display').attr("data-bs-original-title", TitleValue);
}
function GetDisplayAlert(type) {
	var title = $('.warning-display').attr("data-bs-original-title");
	var list = [];
	var valid = false;
	if (title != "" && title != null) {
		list = $(title);
		var Ids = ["fullScreen", "mouseActivity", "debuggerCheck", "webcamCheck", "NoFaceDetection", "MultiFaceDetection", "FaceDetectionError"];
		for (var a = 0; a < list.length; a++) {
			var Id = list[a].id;
			if (type == Id) {
				valid = true;
				break;
			}
		}
	}
	return valid;
}
function AlertType(type, msg = "") {
	var text = "";
	if (type == "fullScreen") {
		text = '<p id="fullScreen">Full-screen mode is always active</p></br>';
	}
	else if (type == "mouseActivity") {
		text = '<p id="mouseActivity">Mouse is always in the assessment window</p></br>';
	}
	else if (type == "debuggerCheck") {
		text = '<p id="debuggerCheck">Tried to break Test</p></br>';
	}
	else if (type == "webcamCheck") {
		text = '<p id="webcamCheck">Webcam enabled</p></br>';
	}
	else if (type == "NoFaceDetection" || type == "MultiFaceDetection" || type == "FaceDetectionError") {
		text = '<p id="' + type + '">' + msg + '</p></br>';
	}
	return text;
}

function reportBtn(input) {
	var url = getBaseUrl() + "/ReportQuestion";
	var currentQuestionId = $(input).attr('data-question-id');
	PushTracking(260);
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'Json',
		data: { Id: currentQuestionId },
		cache: false,
		beforeSend: function () {
			//$('.proctor-loader').css("visibility", "visible");
		},
		success: function (response) {
			$(".ReportMessage").empty();
			$(".ReportMessage").html("Current Question's Reported Successfully!!!");
			$('#ReportQuestionModal').modal("show");
			$('#reportclose').unbind('click', () => { $('#ReportQuestionModal').modal("hide"); });
			$('#reportclose').bind('click', () => { $('#ReportQuestionModal').modal("hide"); });
			$(".modal-backdrop").hide();
		},
		complete: function () {
			//$('.proctor-loader').css("visibility", "hidden");
		},
		error: function () {
		}
	});
}

//code for getting next question based on question no code
function nextCodingQuestion(input) {
	var nextQuestionId = $(input).attr('data-question-id');
	var currentQuestionId = $(input).attr('data-current-question');
	var currentQuestionNo = $(input).attr('data-question-no');
	//var subQuestionType = $(input).attr('data-sub-questionType');
	var answer = window.GetMonacoValue && window.GetMonacoValue();// GetAnswer(currentQuestionType, subQuestionType);
	var fullScreen = GetDisplayAlert("fullScreen");
	var mouseActivity = GetDisplayAlert("mouseActivity");
	var debuggerCheck = GetDisplayAlert("debuggerCheck");
	var url = getInterviewBaseUrl() + "/SubmitAnswer";
	PushTracking(210, nextQuestionId);
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: { _testType: 200, Visited: true, TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionNo, AnswerString: answer },
		cache: false,
		beforeSend: function () {
			//$('.proctor-loader').css("visibility", "visible");
		},
		success: function (response) {
			window.DestroyMonacoEditor && window.DestroyMonacoEditor();//Destroy all model
			var result = response;
			//console.log(result);			
			$('#testDiv').html(result);
			ReStartTimer();
			//clearInterval(timerExamInterval);
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			//LoadQuestionIdTileCard();
		},
		complete: function () {
			//$('.proctor-loader').css("visibility", "hidden");
		},
		error: function () {
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			alert('Error while loading question...');
		}
	});
}

//code for getting next question based on question no code
function onClikQuestionNo(input) {
	var btnData;
	var questionNo = $(input).attr('data-questionNo');
	var totalQuestion = $(input).attr('data-totalQuestion');
	if (questionNo == totalQuestion) {
		btnData = document.getElementById("submitBtn");
	}
	else {
		btnData = document.getElementById("nextBtn");
	}
	var nextQuestionId = $(input).attr('data-question-id');
	PushTracking(230, questionNo);
	if (btnData != null) {
		var currentQuestionId = $(btnData).attr('data-current-question');
		var currentQuestionNo = $(input).attr('data-questionno');
		//var subQuestionType = $(input).attr('data-sub-questionType');
		var answer = window.GetMonacoValue && window.GetMonacoValue();// GetAnswer(currentQuestionType, subQuestionType);
	}
	var url = getInterviewBaseUrl() + "/SubmitAnswer";
	var fullScreen = GetDisplayAlert("fullScreen");
	var mouseActivity = GetDisplayAlert("mouseActivity");
	var debuggerCheck = GetDisplayAlert("debuggerCheck");
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: { _testType: 200, Visited: true, TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionNo, AnswerString: answer},
		cache: false,
		beforeSend: function () {
			//$('.proctor-loader').css("visibility", "visible");
		},
		success: function (response) {
			window.DestroyMonacoEditor && window.DestroyMonacoEditor();//Destroy all model
			var result = response;
			$('#testDiv').html(result);
			ReStartTimer();
			//clearInterval(timerExamInterval);
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			//LoadQuestionIdTileCard();
		},
		complete: function () {
			//$('.proctor-loader').css("visibility", "hidden");
		},
		error: function () {
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			alert('Error while loading question...');

		}
	});
}
function WarningSection(_fullScreen, _mouseActivity, _debugger) {
	if (!_fullScreen) {
		DisplayAlert("fullScreen");		
	}
	if (!_mouseActivity) {
		DisplayAlert("mouseActivity");		
	}
	if (!_debugger) {
		DisplayAlert("debuggerCheck");		
	}
}
//code for previous question
function nextPrev(input) {
	var nextQuestionId = $(input).attr('data-question-id');
	var currentQuestionId = $(input).attr('data-current-question');
	var currentQuestionNo = $(input).attr('data-question-no');
	//var subQuestionType = $(input).attr('data-sub-questionType');
	var answer = window.GetMonacoValue && window.GetMonacoValue();// GetAnswer(currentQuestionType, subQuestionType);
	var fullScreen = GetDisplayAlert("fullScreen");
	var mouseActivity = GetDisplayAlert("mouseActivity");
	var debuggerCheck = GetDisplayAlert("debuggerCheck");
	var url = getInterviewBaseUrl() + "/SubmitAnswer";
	PushTracking(220, nextQuestionId);	
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: { _testType: 200, Visited: true, TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionNo, Answer: answer },
		cache: false,
		beforeSend: function () {
			//$('.proctor-loader').css("visibility", "visible");
		},
		success: function (response) {
			window.DestroyMonacoEditor && window.DestroyMonacoEditor();//Destroy all model
			var result = response;
			$('#testDiv').html(result);
			ReStartTimer();
			//clearInterval(timerExamInterval);
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			LoadQuestionIdTileCard();
		},
		complete: function () {
			//$('.proctor-loader').css("visibility", "hidden");
		},
		error: function () {
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			alert('Error while loading question...');
		}
	});
}

function SubmitTestAutomatically(callBack = null) {
	stopRecordingForce = stopRecordingForce ?? window.stopRecordingForce;
	stopRecordingForce = {
		camera: true,
		screen: true,
		photo: true
	};
	window.stopRecordingForce = stopRecordingForce;
	var url = getInterviewBaseUrl() + "/SubmitTest";
	PushTracking(270);
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		cache: false,
		beforeSend: function () {
			if (window.BeforeSubmitTest != null) {
				window.BeforeSubmitTest();
			}
			$('.proctor-loader').css("visibility", "visible");
		},
		success: function (response) {
			var result = response;
			var fn = function (callbackFn) {

				if (callbackFn) {
					callbackFn(result);
				}
				else {
					$('.proctor-loader').css("visibility", "hidden");
					$('#testDiv').html(result);
					ReStartTimer();
					clearInterval(timerExamInterval);
				}
			}
			CompletedRecording = CompletedRecording ?? window.CompletedRecording;
			if (CompletedRecording != null) {
				window.CompletedRecording = CompletedRecording;//update the model
				var stopinterval = setInterval(() => {
					if (window.CompletedRecording.photo) {
						clearInterval(stopinterval);
						fn(callBack);
					}
				}, 1000);
			}
			else {
				fn(callBack);
			}
		},
		complete: function () {
			$('.proctor-loader').css("visibility", "hidden");
		},
		error: function () {
			alert('Error while submitting test...');
		}
	});
}

window.SubmitTestAutomatically = SubmitTestAutomatically;

function callSubmit(input, callBack = null) {
	stopRecordingForce = stopRecordingForce ?? window.stopRecordingForce;
	stopRecordingForce = {
		camera: true,
		screen: true,
		photo: true
	};
	window.stopRecordingForce = stopRecordingForce; // nodejs 
	var currentQuestionId = $(input).attr('data-current-question');
	var currentQuestionNo = $(input).attr('data-question-no');
	//var subQuestionType = $(input).attr('data-sub-questionType');
	var answer = window.GetMonacoValue && window.GetMonacoValue();// GetAnswer(currentQuestionType, subQuestionType);
	var fullScreen = GetDisplayAlert("fullScreen");
	var mouseActivity = GetDisplayAlert("mouseActivity");
	var debuggerCheck = GetDisplayAlert("debuggerCheck");
	var url = getInterviewBaseUrl() + "/SubmitAnswer";
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: { _testType: 200, Visited: true, TimeTakenInSeconds: timervalue, Id: currentQuestionId, QuestionId: currentQuestionNo, AnswerString: answer},
		cache: false,
		beforeSend: function () {
			$('.proctor-loader').css("visibility", "visible");
		},
		success: function (response) {
			window.DestroyMonacoEditor && window.DestroyMonacoEditor();//Destroy all model
			var result = response;
			var fn = function (callbackFn) {
				//check result is json or html
				var apiResponse;
				var isResponseJson = false;
				try {
					apiResponse = JSON.parse(result);//jsonresult
					isResponseJson = true;
				} catch (e) {
					apiResponse = result;//html response
				}
				if (callbackFn) {
					callbackFn(apiResponse);
				}
				else {
					$('#testDiv').html(apiResponse);
					ReStartTimer();
					//clearInterval(timerExamInterval);
					WarningSection(fullScreen, mouseActivity, debuggerCheck);
				}
			}
			if (CompletedRecording != null) {
				window.CompletedRecording = CompletedRecording;//update the model
				var stopinterval = setInterval(() => {
					if (window.CompletedRecording.photo) {
						clearInterval(stopinterval);
						fn(callBack);
					}
				}, 1000);
			}
			else {
				fn(callBack);
			}
		},
		complete: function () {

		},
		error: function () {
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			alert('Error while submitting test...');
		}
	});
}
//submitting test
function submitCodeTest(input) {
	var testCallBack = window.AfterSubmitTest;
	var beforeTestCallBack = window.BeforeSubmitTest;
	beforeTestCallBack = beforeTestCallBack == null ? function () { } : beforeTestCallBack;
	var allAnswered = $(input).attr('data-allquestion-answered');
	if (allAnswered == true || allAnswered == 'true' || allAnswered == 'True') {
		beforeTestCallBack && beforeTestCallBack();
		callSubmit(input, testCallBack);
	}
	else {
		$("#test-confiramtion-body").html("");
		GetAnswerCount(input, function (e) {
			$("#test-confiramtion-body").html(e);
			$('#test-confiramtion').modal("show");
			$('#SubmitYes').unbind('click', () => { beforeTestCallBack(); callSubmit(input, testCallBack); });
			$('#SubmitYes').bind('click', () => { beforeTestCallBack(); callSubmit(input, testCallBack); $("#test-confiramtion").modal("hide"); });
			$('#testclose').unbind('click', () => { $("#test-confiramtion").modal("hide"); });
			$('#testclose').bind('click', () => { $("#test-confiramtion").modal("hide"); });
		});
	}
}

function GetAnswerCount(input, callBack = null) {
	
	var currentQuestionId = $(input).attr('data-current-question');
	var currentQuestionNo = $(input).attr('data-question-no');
	//var subQuestionType = $(input).attr('data-sub-questionType');
	var answer = window.GetMonacoValue && window.GetMonacoValue();// GetAnswer(currentQuestionType, subQuestionType);
	
	var url = getBaseUrl() + "/GetAnswerTypeCount";
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: { _testType: 200, Visited: true, TimeTakenInSeconds: timervalue, Id: currentQuestionId, QuestionId: currentQuestionNo, AnswerString: answer },
		cache: false,
		async: false,
		beforeSend: function () {
			$('.proctor-loader').css("visibility", "visible");
		},
		success: function (response) {
			var result = response;
			var fn = function (callbackFn) {
				if (callbackFn) {
					callbackFn(result);
				}
			}
			fn(callBack);

		},
		complete: function () {

		},
		error: function () {
		}
	});
}