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
		$("#fullScreen").removeClass("disabled");
	}
}

function exitHandler() {
	if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
		$("#fullScreen").removeClass("disabled");
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
			$(this).attr('onError', "this.onerror=null;this.src='/images/logo.jpg'");
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

function GetAnswer(currentQuestionType, subQuestionType) {
	var ans;
	let ansList = [];
	switch (currentQuestionType) {
		case 'RadioButton':
			ans = $("input:radio[name='radio']:checked");
			break;
		case 'RadioButtonWithImageOnlyQuestion':
		case 'ImageRadioButtonWithImageOnlyQuestion':
			ans = $("input:radio[name='dia-option']:checked");
			break;
		case 'CheckBox':
			ans = $("input:checkbox[name='checkbox']:checked");
			break;
		case 'ImageCheckBox':
			ans = $("input:checkbox[name='imageCheckbox']:checked");
			break;
		case 'SituationalMostLeast':
			{
				ans = $("input:radio[name='s0']:checked");
				var _ans2 = $("input:radio[name='s1']:checked");
				$.merge(ans, _ans2);
				break;
			}
		case 'MultipleQuestion':
			switch (subQuestionType) {
				case 'RadioButton':
				case 'ImageRadioButtonWithImageOnlyQuestion':
				case 'SituationalMostLeast':
				case 'SituationalAgreeDisAgree5Options':
				case 'SituationalTrueFalseCannotTell':
					ans = $("input:radio:checked");
					break;
				case 'CheckBox':
					ans = $("input:checkbox:checked");
					break;
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
	var baseUrl = "/TestPlatform/Free";
	if (isCorporate == "true") {
		baseUrl = "/TestPlatform/Corporate";
	}
	else if (isFree == "false") {
		baseUrl = "/TestPlatform/Paid";
	}
	return baseUrl;
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
//code for getting next question based on question no
function nextQuestion(input) {
	var nextQuestionId = $(input).attr('data-question-id');
	var currentQuestionId = $(input).attr('data-current-question');
	var currentQuestionType = $(input).attr('data-current-questionType');
	var subQuestionType = $(input).attr('data-sub-questionType');
	var answer = GetAnswer(currentQuestionType, subQuestionType);
	var fullScreen = $("#fullScreen").hasClass("disabled");
	var mouseActivity = $("#mouseActivity").hasClass("disabled");
	var debuggerCheck = $("#debuggerCheck").hasClass("disabled");
	var url = getBaseUrl() + "/SubmitAnswer";
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: { TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionId, AllSubQuestionAnswers: answer, QuestionType: currentQuestionType },
		cache: false,
		beforeSend: function () {
			//$('.ajax-loader').css("visibility", "visible");
		},
		success: function (response) {
			var result = response;
			//console.log(result);			
			$('#testDiv').replaceWith(result);
			ReStartTimer();
			//clearInterval(timerExamInterval);
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			LoadQuestionIdTileCard();
		},
		complete: function () {
			//$('.ajax-loader').css("visibility", "hidden");
		},
		error: function () {
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			alert('Error while loading question...');
		}
	});
}

//code for getting next question based on question no
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
	if (btnData != null) {
		var currentQuestionId = $(btnData).attr('data-current-question');
		var currentQuestionType = $(btnData).attr('data-current-questionType');
		var subQuestionType = $(btnData).attr('data-sub-questionType');
		var answer = GetAnswer(currentQuestionType, subQuestionType);
	}
	var url = getBaseUrl() + "/SubmitAnswer";
	var fullScreen = $("#fullScreen").hasClass("disabled");
	var mouseActivity = $("#mouseActivity").hasClass("disabled");
	var debuggerCheck = $("#debuggerCheck").hasClass("disabled");
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: { TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionId, AllSubQuestionAnswers: answer, QuestionType: currentQuestionType },
		cache: false,
		beforeSend: function () {
			//$('.ajax-loader').css("visibility", "visible");
		},
		success: function (response) {
			var result = response;			
			$('#testDiv').replaceWith(result);
			ReStartTimer();
			//clearInterval(timerExamInterval);
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			LoadQuestionIdTileCard();
		},
		complete: function () {
			//$('.ajax-loader').css("visibility", "hidden");
		},
		error: function () {
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			alert('Error while loading question...');

		}
	});
}
function WarningSection(_fullScreen, _mouseActivity, _debugger) {
	if (!_fullScreen) {
		$("#fullScreen").removeClass("disabled");
	}
	if (!_mouseActivity) {
		$("#mouseActivity").removeClass("disabled");
	}
	if (!_debugger) {
		$("#debuggerCheck").removeClass("disabled");
	}
}
//code for previous question
function nextPrev(input) {
	var nextQuestionId = $(input).attr('data-question-id');
	var currentQuestionId = $(input).attr('data-current-question');
	var currentQuestionType = $(input).attr('data-current-questionType');
	var subQuestionType = $(input).attr('data-sub-questionType');
	var answer = GetAnswer(currentQuestionType, subQuestionType);
	var fullScreen = $("#fullScreen").hasClass("disabled");
	var mouseActivity = $("#mouseActivity").hasClass("disabled");
	var debuggerCheck = $("#debuggerCheck").hasClass("disabled");
	var url = getBaseUrl() + "/SubmitAnswer";
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: { TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionId, AllSubQuestionAnswers: answer, QuestionType: currentQuestionType },
		cache: false,
		beforeSend: function () {
			//$('.ajax-loader').css("visibility", "visible");
		},
		success: function (response) {
			var result = response;			
			$('#testDiv').replaceWith(result);
			ReStartTimer();
			//clearInterval(timerExamInterval);
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			LoadQuestionIdTileCard();
		},
		complete: function () {
			//$('.ajax-loader').css("visibility", "hidden");
		},
		error: function () {
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			alert('Error while loading question...');
		}
	});
}

function SubmitTestAutomatically() {
	var url = getBaseUrl() + "/SubmitTest";
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		cache: false,
		beforeSend: function () {
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function (response) {
			var result = response;			
			$('#testDiv').replaceWith(result);
			ReStartTimer();
			clearInterval(timerExamInterval);
		},
		complete: function () {
			$('.ajax-loader').css("visibility", "hidden");
		},
		error: function () {
			alert('Error while submitting test...');
		}
	});
}

function callSubmit(input) {
	var currentQuestionId = $(input).attr('data-current-question');
	var currentQuestionType = $(input).attr('data-current-questionType');
	var subQuestionType = $(input).attr('data-sub-questionType');
	var answer = GetAnswer(currentQuestionType, subQuestionType);
	var fullScreen = $("#fullScreen").hasClass("disabled");
	var mouseActivity = $("#mouseActivity").hasClass("disabled");
	var debuggerCheck = $("#debuggerCheck").hasClass("disabled");
	var url = getBaseUrl() + "/SubmitAnswer";
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'html',
		data: { TimeTakenInSeconds: timervalue, Id: currentQuestionId, QuestionId: currentQuestionId, AllSubQuestionAnswers: answer, QuestionType: currentQuestionType },
		cache: false,
		beforeSend: function () {
			$('.ajax-loader').css("visibility", "visible");
		},
		success: function (response) {
			var result = response;			
			$('#testDiv').replaceWith(result);
			ReStartTimer();
			//clearInterval(timerExamInterval);
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
		},
		complete: function () {
			$('.ajax-loader').css("visibility", "hidden");
		},
		error: function () {
			WarningSection(fullScreen, mouseActivity, debuggerCheck);
			alert('Error while submitting test...');
		}
	});
}
//submitting test
function submitTest(input) {
	var allAnswered = $(input).attr('data-allquestion-answered');
	if (allAnswered == true || allAnswered == 'true' || allAnswered == 'True') {
		callSubmit(input);
	}
	else {
		$('#test-confiramtion').modal("show");
		$('#SubmitYes').unbind('click', () => { callSubmit(input); });
		$('#SubmitYes').bind('click', () => { callSubmit(input); $("#test-confiramtion").modal("hide"); });
		$('#testclose').unbind('click', () => { $("#test-confiramtion").modal("hide"); });
		$('#testclose').bind('click', () => { $("#test-confiramtion").modal("hide"); });

	}
}
