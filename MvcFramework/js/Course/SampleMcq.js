const baseUrl = '/Course/Video/';
$(function () {

    //alert("ok");
    let offeringId = $("#hiddenOfferingId").val();
    if (offeringId != undefined && offeringId != '') {
        LoadSampleMCq(offeringId)
    }

    $(document).on("click", "#btnSampleTestSubmit", function () {
        SubmitSampleTest($("#hiddenOfferingId").val());
    });

    $(document).on("click", ".answer", function () {


        let spanId = $(this).parent().parent().attr("id");
        let id = `#span_${spanId.split('_')[1]}`
        $(id).addClass("filled");


    })

})

function LoadSampleMCq(offeringId) {
    var url = baseUrl + "GetSampleMcqQuestions?OfferingId=" + offeringId;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'html',
        cache: false,
        success: function (response) {
            var result = response;
            $('#test-section').replaceWith(result);
        },
        error: function () {

        }
    });
}
function SubmitSampleTest(offeringId) {
    var url = baseUrl + "SubmitSampleMcqQuestions";
    let answerListArray = [];
    $(".test-box").each(function () {

        var obj = {};
        obj.Id = $(this).attr("data-val");
        var arr = $(this).find("input[type=radio]:checked").map(function () {
            return $(this).val();
        }).get();

        //console.log(arr);
        obj.optionNo = arr;
        answerListArray.push(obj);

    })

    var model = {
        OfferingId: offeringId,
        Answers: answerListArray

    }
    console.log(model);


    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: JSON.stringify(model),
        contentType: "application/json; charset=utf-8",
        cache: false,
        beforeSend: function () {

        },
        success: function (response) {
            var result = response;
            $('#test-section').hide();
            $('#divResult').show();
            $('#divResult').replaceWith(result);
        },
        complete: function () {
        },
        error: function () {
        }
    });


}

doAction = (t) => {
    var e = $(t).text(),
        n = $("#div_" + e),
        o = $("#test-body");
    o.animate({ scrollTop: n.offset().top - o.offset().top + o.scrollTop() });
};