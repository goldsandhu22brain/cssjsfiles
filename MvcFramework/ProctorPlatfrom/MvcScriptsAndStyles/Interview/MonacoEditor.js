
var editor = null;

$(document).ready(function () {
    var MODES = (function () {
        var modesIds = monaco.languages.getLanguages().map(function (lang) {
            //console.log(Object.values(lang));
            return lang.id;
        });
        modesIds.sort();

        return modesIds.map(function (language) {
            return {
                modeId: language,
                //sampleURL: 'https://test.brainmeasures.com/code/index/samples/sample.' + language + '.txt'
            };
        });
    })();

    var startModeIndex = 0;
    for (var i = 0; i < MODES.length; i++) {
        var o = document.createElement('option');
        o.textContent = MODES[i].modeId;
        if (MODES[i].modeId === selectedLanguage) {
            startModeIndex = i;
        }
        //$('.language-picker').append(o);
    }
    //$('.language-picker')[0].selectedIndex = startModeIndex;
    loadSample(MODES[startModeIndex]);
    changeTheme(1);
    //$('#inline-diff-checkbox').change(function () {
    //    diffEditor.updateOptions({
    //        renderSideBySide: !$(this).is(':checked')
    //    });
    //});
    //});
    $("#btn").on("click", function () {
        var emailText = GetMonacoValue();// monaco.editor.getModels()[0].getValue();
        var submit = document.getElementById("testDiv");        
        var nextQuestionId = submit.attr('data-question-id');
        var currentQuestionId = submit.attr('data-current-question');

        var url = getInterviewBaseUrl() + "/SubmitAnswer";
        $.ajax({
            url: url,
            type: 'POST',
            data: { _testType: 200, Visited: true, TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionId, AnswerString: emailText/*, QuestionType: currentQuestionType*/ },           
            success: function (response) {
                DestroyMonacoEditor();
                var result = response;
                if (result != null) {
                    alert("Record Inserted to CRM Successfully");
                } else {
                    alert("Something went wrong");
                }
                $('#testDiv').html(result);
                ReStartTimer();
                WarningSection(fullScreen, mouseActivity, debuggerCheck);
            }
        });

    });

    window.onresize = function () {
        if (editor) {
            editor.layout();
        }
    };
    window.SetMonacoValue && window.SetMonacoValue(codingAnswer);
});

var preloaded = {};
(function () {
    var elements = Array.prototype.slice.call(document.querySelectorAll('pre[data-preload]'), 0);

    elements.forEach(function (el) {
        var path = el.getAttribute('data-preload');
        preloaded[path] = el.innerText || el.textContent;
        el.parentNode.removeChild(el);
    });
})();

function xhr(url, cb) {
    if (preloaded[url]) {
        return cb(null, preloaded[url]);
    }
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'text',
        error: function () {
            cb(this, null);
        }
    }).done(function (data) {
        cb(null, data);
    });
}
function GetMonacoValue() {
    return monaco.editor.getModels()[0].getValue();
}
function SetMonacoValue(value) {
    monaco.editor.getModels()[0].setValue(value);
}
function DestroyMonacoEditor() {
    monaco.editor.getModels().forEach(model => model.dispose());
}
window.DestroyMonacoEditor = DestroyMonacoEditor;
window.SetMonacoValue = SetMonacoValue;
window.GetMonacoValue = GetMonacoValue;
////code for getting next code question based on question no
//function nextCodingQuestion(input) {
//    var nextQuestionId = $(input).attr('data-question-id');
//    var currentQuestionId = $(input).attr('data-current-question');
//    var currentQuestionNo = $(input).attr('data-question-no');
//    //var subQuestionType = $(input).attr('data-sub-questionType');
//    var answer = window.GetMonacoValue && window.GetMonacoValue();// GetAnswer(currentQuestionType, subQuestionType);
//    var fullScreen = GetDisplayAlert("fullScreen");
//    var mouseActivity = GetDisplayAlert("mouseActivity");
//    var debuggerCheck = GetDisplayAlert("debuggerCheck");
//    var url = getInterviewBaseUrl() + "/SubmitAnswer";
//    PushTracking(210, nextQuestionId);
//    $.ajax({
//        url: url,
//        type: 'POST',
//        dataType: 'html',
//        data: { _testType: 200, Visited: true, TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionNo, AnswerString: answer },
//        cache: false,
//        beforeSend: function () {
//            //$('.proctor-loader').css("visibility", "visible");
//        },
//        success: function (response) {
//            var result = response;
//            //console.log(result);			
//            $('#testDiv').replaceWith(result);
//            ReStartTimer();
//            //clearInterval(timerExamInterval);
//            WarningSection(fullScreen, mouseActivity, debuggerCheck);
//            //LoadQuestionIdTileCard();
//        },
//        complete: function () {
//            //$('.proctor-loader').css("visibility", "hidden");
//        },
//        error: function () {
//            WarningSection(fullScreen, mouseActivity, debuggerCheck);
//            alert('Error while loading question...');
//        }
//    });
//}

////submitting test
//function submitCodeTest(input) {
//    var testCallBack = window.AfterSubmitTest;
//    var beforeTestCallBack = window.BeforeSubmitTest;
//    beforeTestCallBack = beforeTestCallBack == null ? function () { } : beforeTestCallBack;
//    var allAnswered = $(input).attr('data-allquestion-answered');
//    if (allAnswered == true || allAnswered == 'true' || allAnswered == 'True') {
//        beforeTestCallBack && beforeTestCallBack();
//        callSubmit(input, testCallBack);
//    }
//    else {
//        $("#test-confiramtion-body").html("");
//        GetAnswerCount(input, function (e) {
//            $("#test-confiramtion-body").html(e);
//            $('#test-confiramtion').modal("show");
//            $('#SubmitYes').unbind('click', () => { beforeTestCallBack(); callSubmit(input, testCallBack); });
//            $('#SubmitYes').bind('click', () => { beforeTestCallBack(); callSubmit(input, testCallBack); $("#test-confiramtion").modal("hide"); });
//            $('#testclose').unbind('click', () => { $("#test-confiramtion").modal("hide"); });
//            $('#testclose').bind('click', () => { $("#test-confiramtion").modal("hide"); });
//        });
//    }
//}

//function GetAnswerCount(input, callBack = null) {

//    var currentQuestionId = $(input).attr('data-current-question');
//    var currentQuestionNo = $(input).attr('data-question-no');
//    //var subQuestionType = $(input).attr('data-sub-questionType');
//    var answer = window.GetMonacoValue && window.GetMonacoValue();// GetAnswer(currentQuestionType, subQuestionType);

//    var url = getBaseUrl() + "/GetAnswerTypeCount";
//    $.ajax({
//        url: url,
//        type: 'POST',
//        dataType: 'html',
//        data: { _testType: 200, Visited: true, TimeTakenInSeconds: timervalue, Id: currentQuestionId, QuestionId: currentQuestionNo, AnswerString: answer },
//        cache: false,
//        async: false,
//        beforeSend: function () {
//            $('.proctor-loader').css("visibility", "visible");
//        },
//        success: function (response) {
//            var result = response;
//            var fn = function (callbackFn) {
//                if (callbackFn) {
//                    callbackFn(result);
//                }
//            }
//            fn(callBack);

//        },
//        complete: function () {

//        },
//        error: function () {
//        }
//    });
//}
//function nextPrev(input) {
//    var nextQuestionId = $(input).attr('data-question-id');
//    var currentQuestionId = $(input).attr('data-current-question');
//    var currentQuestionNo = $(input).attr('data-question-no');
//    //var subQuestionType = $(input).attr('data-sub-questionType');
//    var answer = window.GetMonacoValue && window.GetMonacoValue();// GetAnswer(currentQuestionType, subQuestionType);
//    var fullScreen = GetDisplayAlert("fullScreen");
//    var mouseActivity = GetDisplayAlert("mouseActivity");
//    var debuggerCheck = GetDisplayAlert("debuggerCheck");
//    var url = getInterviewBaseUrl() + "/SubmitAnswer";
//    PushTracking(220, nextQuestionId);
//    $.ajax({
//        url: url,
//        type: 'POST',
//        dataType: 'html',
//        data: { _testType: 200, Visited: true, TimeTakenInSeconds: timervalue, NextId: nextQuestionId, Id: currentQuestionId, QuestionId: currentQuestionNo, AnswerString: answer },
//        cache: false,
//        beforeSend: function () {
//            //$('.proctor-loader').css("visibility", "visible");
//        },
//        success: function (response) {
//            var result = response;
//            $('#testDiv').replaceWith(result);
//            ReStartTimer();
//            //clearInterval(timerExamInterval);
//            WarningSection(fullScreen, mouseActivity, debuggerCheck);
//            //LoadQuestionIdTileCard();
//        },
//        complete: function () {
//            //$('.proctor-loader').css("visibility", "hidden");
//        },
//        error: function () {
//            WarningSection(fullScreen, mouseActivity, debuggerCheck);
//            alert('Error while loading question...');
//        }
//    });
//}

function loadSample(mode) {
    $('.loading.editor').show();
    //xhr(mode.sampleURL, function (err, data) {
    //    if (err) {
    //        if (editor) {
    //            if (editor.getModel()) {
    //                editor.getModel().dispose();
    //            }
    //            editor.dispose();
    //            editor = null;
    //        }
    //        $('.loading.editor').fadeOut({ duration: 200 });
    //        $('#editor').empty();
    //        $('#editor').append(
    //            '<p class="alert alert-error">Failed to load ' + mode.modeId + ' sample</p>'
    //        );
    //        return;
    //    }

    //});
    if (!editor) {
        $('#editor').empty();
        editor = monaco.editor.create(document.getElementById('editor'), {
            model: null
        });
    }

    var oldModel = editor.getModel();
    var newModel = monaco.editor.createModel(null, mode.modeId);
    editor.setModel(newModel);
    if (oldModel) {
        oldModel.dispose();
    }
    $('.loading.editor').fadeOut({ duration: 300 });
}
function changeTheme(theme) {
    var newTheme = theme === 1 ? 'vs-dark' : theme === 0 ? 'vs-dark' : 'vs-dark';
    monaco.editor.setTheme(newTheme);
}