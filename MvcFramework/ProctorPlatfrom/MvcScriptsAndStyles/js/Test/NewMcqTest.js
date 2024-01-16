/***********************custom js for mcq test window***********************/

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

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	ev.dataTransfer.setData("parent", ev.target.parentElement.id);
}

function drop(ev) {
	ev.preventDefault();

	var data = ev.dataTransfer.getData("text");
	if (ev.target.hasChildNodes()) {
		var answerList = document.getElementById(data).parentNode;
		removeChild(ev.target, answerList, data);
	} else {
		//dropItem(ev);
		ev.target.appendChild(document.getElementById(data));
	}
}
function dropItem(ev) {
	var data = ev.dataTransfer.getData("text");
	var target = ev.target.closest('ul');
	target.appendChild(document.getElementById(data));

	var parentData = ev.dataTransfer.getData("parent");
	if ($("#" + parentData).children().length == 0) {
		$("#" + parentData).append(EmptyData);
	}
}

function removeChild(target, answerList, data) {
	if (!(target instanceof HTMLDivElement)) {
		target = target.closest('div');
	}
	var previousChildId = target.firstElementChild.id;
	var previousChildNode = document.getElementById(previousChildId);
	answerList.appendChild(previousChildNode);
	target.appendChild(document.getElementById(data));
}

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
function GetQuestionHTML(currentQuestionType, subQuestionType) {
	var ans = { AnswerString: "", MultiQAnswerString: [] };
	switch (currentQuestionType) {
		case 'Ordering':
		case 'MapOrdering':
		case 'FillInTheBlanks': {
			ans.AnswerString = $(".drop-area")[0].innerHTML;
			break;
		}		
		case 'MultipleQuestion':
			switch (subQuestionType) {
				case 'FillInTheBlanks':
				case 'Ordering':
				case 'MapOrdering':
					for (var i = 0; i < $(".drop-area").length; i++) {
						ans.MultiQAnswerString.push($(".drop-area")[i].innerHTML);
					}
					break;
			}
			break;
	}
	return ans;
}
function GetAnswer(currentQuestionType, subQuestionType) {
	var ans;
	let ansList = [];
	switch (currentQuestionType) {
		case 'RadioButton':
			ans = $("input:radio[name='radio']:checked");
			break;
		case 'RadioButtonWithImageOnlyQuestion':
		case 'ImageRadioButtonWithImageOnlyQuestion':
		case 'ImageRadioButton':
			ans = $("input:radio[name='dia-option']:checked");
			break;
		case 'CheckBox':
		case 'CheckBoxWithImageOnlyQuestion':
			ans = $("input:checkbox[name='checkbox']:checked");
			break;
		case 'ImageCheckBox':
		case 'ImageCheckBoxWithImageOnlyQuestion':
			ans = $("input:checkbox[name='imageCheck']:checked");
			break;
		case 'SituationalMostLeast':
			{
				ans = $("input:radio[name='s0']:checked");
				var _ans2 = $("input:radio[name='s1']:checked");
				$.merge(ans, _ans2);
				break;
			}
		case 'SituationalTrueFalseCannotTell':
			{
				ans = $("input:radio[name='s0']:checked");
				var _ans2 = $("input:radio[name='s1']:checked");
				var _ans3 = $("input:radio[name='s2']:checked");
				$.merge(ans, $.merge(_ans2, _ans3));
				break;
			}
		case 'SituationalAgreeDisAgree5Options':
			ans = $("input:radio[name='s0']:checked");
			var _ans1 = $("input:radio[name='s1']:checked");
			var _ans2 = $("input:radio[name='s2']:checked");
			var _ans3 = $("input:radio[name='s3']:checked");
			var _ans4 = $("input:radio[name='s4']:checked");
			$.merge(ans, $.merge(_ans1, $.merge(_ans2, $.merge(_ans3, _ans4))));
			break;
		case 'Ordering':
		case 'MapOrdering':
		case 'FillInTheBlanks': {
			ans = $(".drop-area div.blank button");
			break;
		}
		case 'MultipleQuestion':
			switch (subQuestionType) {
				case 'RadioButton':
				case 'ImageRadioButtonWithImageOnlyQuestion':
				case 'RadioButtonWithImageOnlyQuestion':
				case 'ImageRadioButtonWithImageOnlyQuestion':
				case 'ImageRadioButton':
				case 'SituationalMostLeast':
				case 'SituationalTrueFalseCannotTell':
				case 'SituationalAgreeDisAgree5Options':
					ans = $("input:radio:checked");
					break;
				case 'CheckBox':
				case 'CheckBoxWithImageOnlyQuestion':
				case 'ImageCheckBox':
				case 'ImageCheckBoxWithImageOnlyQuestion':
					ans = $("input:checkbox:checked");
					break;
				case 'Ordering':
				case 'MapOrdering':
				case 'FillInTheBlanks': {
					ans = $(".drop-area div.blank button");
					break;
				}
			}
			break;
	}
	if (ans != undefined) {
		for (var i = 0; i < ans.length; i++) {
			let my_object = {};
			if (ans[i] != null && ans[i].attributes['data-option-id'] != null && ans[i].attributes['data-option-id'].value != null)
				var optionId = ans[i].attributes['data-option-id'].value;
			var split = optionId.split('_');
			my_object.Id = split[0];

			if (ans[i].attributes['data-subquestion-id'] != null) {
				my_object.SubQuestionId = ans[i].attributes['data-subquestion-id'].value;
			}
			my_object.OptionNo = ans[i].value;
			ansList.push(my_object);
		}
	}
	return ansList;
}
function getBaseUrl() {
	return "/Test";
}

function LoadQuestionIdTileCard() {
	var url = getBaseUrl() + "/NewLoadTileCardSection";
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: {},
		cache: false,
		success: function (response) {
			var result = response;
			$('#newTileCardSection').replaceWith(result);
		},
		error: function () {
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
		}
	});
}

function reportBtn(input) {
	$(input).text($(input).attr('data-loading'));
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
			$(input).text($(input).attr('data-original'));
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

//code for getting next question based on question no mcq
function nextQuestion(input, isReview) {
	$(input).text($(input).attr('data-loading'));	
	var nextQuestionId = $(input).attr('data-question-id');
	var currentQuestionId = $(input).attr('data-current-question');
	var currentQuestionType = $(input).attr('data-current-questionType');
	var subQuestionType = $(input).attr('data-sub-questionType');
	var answer = GetAnswer(currentQuestionType, subQuestionType);
	var QuestionHTML = GetQuestionHTML(currentQuestionType, subQuestionType);
	var fullScreen = GetDisplayAlert("fullScreen");
	var mouseActivity = GetDisplayAlert("mouseActivity");
	var debuggerCheck = GetDisplayAlert("debuggerCheck");
	var url = getBaseUrl() + "/SubmitAnswer";	
	PushTracking(210, nextQuestionId);
	var dataJson = { IsReviewChecked: isReview, _testType: 100, Visited: true, TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionId, AllSubQuestionAnswers: answer, QuestionType: currentQuestionType };
	$.extend(dataJson, QuestionHTML);
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: dataJson,
		cache: false,
		beforeSend: function () {
			//$('.proctor-loader').css("visibility", "visible");
		},
		success: function (response) {
			var result = response;
			$(input).text($(input).attr('data-original'));
			$('#testDiv').replaceWith(result);
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

//code for getting next question based on question no mcq
function onClikQuestionNo(input, isReview) {
	var btnData;
	var questionNo = $(input).attr('data-questionNo');
	var totalQuestion = $(input).attr('data-totalQuestion');
	if (questionNo == totalQuestion) {
		btnData = document.getElementById("submitBtn");
	}
	else {
		btnData = document.getElementById("nextBtn");
		$(btnData).text($(btnData).attr('data-loading'));
	}
	var nextQuestionId = $(input).attr('data-question-id');
	PushTracking(230, questionNo);
	if (btnData != null) {
		var currentQuestionId = $(btnData).attr('data-current-question');
		var currentQuestionType = $(btnData).attr('data-current-questionType');
		var subQuestionType = $(btnData).attr('data-sub-questionType');
		var answer = GetAnswer(currentQuestionType, subQuestionType);
		var QuestionHTML = GetQuestionHTML(currentQuestionType, subQuestionType);
	}
	var url = getBaseUrl() + "/SubmitAnswer";
	var fullScreen = GetDisplayAlert("fullScreen");
	var mouseActivity = GetDisplayAlert("mouseActivity");
	var debuggerCheck = GetDisplayAlert("debuggerCheck");	
	var dataJson = { IsReviewChecked: isReview, _testType: 100, Visited: true, TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionId, AllSubQuestionAnswers: answer, QuestionType: currentQuestionType };
	$.extend(dataJson, QuestionHTML);
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: dataJson,
		cache: false,
		beforeSend: function () {
			//$('.proctor-loader').css("visibility", "visible");
		},
		success: function (response) {
			var result = response;
			$(btnData).text($(btnData).attr('data-original'));
			$('#testDiv').replaceWith(result);
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
function nextPrev(input, isReview) {
	$(input).text($(input).attr('data-loading'));	
	var nextQuestionId = $(input).attr('data-question-id');
	var currentQuestionId = $(input).attr('data-current-question');
	var currentQuestionType = $(input).attr('data-current-questionType');
	var subQuestionType = $(input).attr('data-sub-questionType');
	var answer = GetAnswer(currentQuestionType, subQuestionType);
	var QuestionHTML = GetQuestionHTML(currentQuestionType, subQuestionType);
	var fullScreen = GetDisplayAlert("fullScreen");
	var mouseActivity = GetDisplayAlert("mouseActivity");
	var debuggerCheck = GetDisplayAlert("debuggerCheck");
	var url = getBaseUrl() + "/SubmitAnswer";	
	PushTracking(220, nextQuestionId);
	var dataJson = { IsReviewChecked: isReview, _testType: 100, Visited: true, TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionId, AllSubQuestionAnswers: answer, QuestionType: currentQuestionType };
	$.extend(dataJson, QuestionHTML);
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: dataJson,
		cache: false,
		beforeSend: function () {
			//$('.proctor-loader').css("visibility", "visible");
		},
		success: function (response) {
			var result = response;
			$(input).text($(input).attr('data-original'));
			$('#testDiv').replaceWith(result);
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
	var url = getBaseUrl() + "/SubmitTest";
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
				//	$('#testDiv').replaceWith(result);
					$(".test-main").html(result);
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

function callSubmit(input, isReview, callBack = null) {
	stopRecordingForce = stopRecordingForce ?? window.stopRecordingForce;
	stopRecordingForce = {
		camera: true,
		screen: true,
		photo: true
	};
	window.stopRecordingForce = stopRecordingForce; // nodejs 
	var currentQuestionId = $(input).attr('data-current-question');
	var currentQuestionType = $(input).attr('data-current-questionType');
	var subQuestionType = $(input).attr('data-sub-questionType');
	var answer = GetAnswer(currentQuestionType, subQuestionType);
	var QuestionHTML = GetQuestionHTML(currentQuestionType, subQuestionType);
	var fullScreen = GetDisplayAlert("fullScreen");
	var mouseActivity = GetDisplayAlert("mouseActivity");
	var debuggerCheck = GetDisplayAlert("debuggerCheck");
	var url = getBaseUrl() + "/SubmitAnswer";
	var dataJson = { IsReviewChecked: isReview, _testType: 100, Visited: true, TimeTakenInSeconds: timervalue, Id: currentQuestionId, QuestionId: currentQuestionId, AllSubQuestionAnswers: answer, QuestionType: currentQuestionType };
	$.extend(dataJson, QuestionHTML);
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: dataJson,
		cache: false,
		beforeSend: function () {
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
					//$('#testDiv').replaceWith(result);
					$(".test-main").html(result);
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
function submitTest(input, isReview) {
	var testCallBack = window.AfterSubmitTest;
	var beforeTestCallBack = window.BeforeSubmitTest;
	beforeTestCallBack = beforeTestCallBack == null ? function () { } : beforeTestCallBack;
	var allAnswered = $(input).attr('data-allquestion-answered');
	if (allAnswered == true || allAnswered == 'true' || allAnswered == 'True') {
		beforeTestCallBack && beforeTestCallBack();
		callSubmit(input, isReview, testCallBack);
	}
	else {
		$("#test-confiramtion-body").html("");

		GetAnswerCount(input, isReview, function (e) {
			$("#test-confiramtion-body").html(e);
			$('#test-confiramtion').modal("show");
			$('#SubmitYes').unbind('click', () => { beforeTestCallBack(); callSubmit(input, isReview, testCallBack); });
			$('#SubmitYes').bind('click', () => { beforeTestCallBack(); callSubmit(input, isReview, testCallBack); $("#test-confiramtion").modal("hide"); });
			$('#testclose').unbind('click', () => { $("#test-confiramtion").modal("hide"); });
			$('#testclose').bind('click', () => { $("#test-confiramtion").modal("hide"); });
		});
	}
}

function GetAnswerCount(input, isReview, callBack = null) {
	var currentQuestionId = $(input).attr('data-current-question');
	var currentQuestionType = $(input).attr('data-current-questionType');
	var subQuestionType = $(input).attr('data-sub-questionType');
	var answer = GetAnswer(currentQuestionType, subQuestionType);
	var QuestionHTML = GetQuestionHTML(currentQuestionType, subQuestionType);	
	var url = getBaseUrl() + "/GetAnswerTypeCount";
	var dataJson = { IsReviewChecked: isReview, _testType: 100, Visited: true, TimeTakenInSeconds: timervalue, Id: currentQuestionId, QuestionId: currentQuestionId, AllSubQuestionAnswers: answer, QuestionType: currentQuestionType };
	$.extend(dataJson, QuestionHTML);
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: dataJson,
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
			$('.proctor-loader').css("visibility", "hidden");
		},
		error: function () {
		}
	});
}