$(document).ready(function () {

    var itemIds = [];

    var oTable = $('#grdforwardtestresult').dataTable({
        "bPaginate": true,
        "bFilter": false,
        "bInfo": true,
        stateSave: true
    });


    var allPages = oTable.fnGetNodes();

    $('body').on('click', '#headerCheckbox', function () {
        var CheckBox = this.checked;
        if (CheckBox) {
            $('input.chktestClass[type="checkbox"]', allPages).prop('checked', true);
            var rowcollection = oTable.$("input.chktestClass:checked", { "page": "all" });
            var gethdn = $("#hdncheckboxids").val();

            rowcollection.each(function (index, elem) {
                var a = gethdn.indexOf($(elem).attr("data-item-id"));
                if (a == -1) {
                    itemIds.push($(elem).attr("data-item-id"));
                    $("#hdncheckboxids").val(itemIds);

                }
            });

        }
        else {
            $('input.chktestClass[type="checkbox"]', allPages).prop('checked', false);
            $("#hdncheckboxids").val("");
            itemIds = [];
        }
        $(this).toggleClass('chktestClass');
    });


    $('body').on('click', '.chktestClass', function () {
        var CheckBox = this.checked;
        var gethdn = $("#hdncheckboxids").val();
        var currentItemID = $(this).attr("data-item-id");
        var a = gethdn.indexOf(currentItemID);
        if (CheckBox) {
            if (a == -1) {
                if (typeof (currentItemID) != "undefined") {
                    itemIds.push(currentItemID)
                    $("#hdncheckboxids").val(itemIds);
                }
            }
        }
        else {
            itemIds.splice($.inArray(currentItemID, itemIds), 1);
            $("#hdncheckboxids").val(itemIds);
        }
    });




});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$('#btnForwardResult').click(function () {

    var itemIds = $("#hdncheckboxids").val();
    var email = $("#Email").val();
    var name = $("#Name").val();

    if (email == '') {
        alert("Email address required")
        return false;
    }
    if (itemIds == '') {
        alert("Please select at least one test result to forward")
        return false;
    }
    if (!isEmail(email)) {
        alert("Please enter a valid email address")
        return false;
    }

    var temp = new Array();
    temp = itemIds.split(",");
    var inputData = JSON.stringify({
        "request": {
            "Name": name,
            "Email": email,
            "RedemptionIds": temp
        }
    });
    $.ajax({
        url: '/User/Individual/ForwardTestResult',
        type: "POST",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: inputData,
        beforeSend: function () {
            $('.ajax-loader').css("visibility", "visible");
        },
        success: function (result) {
            if (result != null && result.Status == 200) {
                // Redirect to 
                alert("Email sent successfully!!")
                window.location = "/User/Individual/ForwardTestResult";
            }
            else {
                alert(result.Message);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest);
        },
        complete: function () {
            $('.ajax-loader').css("visibility", "hidden");
        }
    });


});
//('#btnForwardResult').click(function () {

//	alert("clciked");
//	var itemIds = $("#hdncheckboxids").val();
//	if (itemIds != "" && typeof (itemIds) != "undefined") {
//		ForwardResult(itemIds);
//	}
//	else {
//		alert("Please select a Test")
//	}
//});

function ForwardResult(itemIds) {


}


//function addHidden(theForm, key, value) {
	//	var input = document.createElement('input');
	//	input.type = 'hidden';
	//	input.name = key; //name-as-seen-at-the-server
	//	input.value = value;
	//	theForm.appendChild(input);
	//}

	//// Form reference:
	//var theForm = document.forms['forwardTestResultForm'];

	//$("#loader-wrapper").remove();


	//$(".CheckAllcheckbox").change(function () {
	//	if (this.checked) {

	//		$(".rowCheckBox").prop("checked", true);
	//	}
	//	else {
	//		$(".rowCheckBox").prop("checked", false);
	//	}
	//});


	//$("#btnForwardResult").click(function () {
	//	var array = [];
	//	$("input:checkbox[name=CheckBox]:checked").each(function () {
	//		array.push($(this).val());
	//	});

	//	$("input[type='hidden']").remove();

	//	for (i = 0; i < array.length; i++) {
	//		addHidden(theForm, 'RedemptionIds[' + i + ']', array[i]);
	//	}

	//});