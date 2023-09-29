
$(document).ready(function () {

    var itemIds = [];

    var oTable = $('#grdpurchasecert').dataTable({
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
    })

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





function handleKeyPress(e) {
	var key = e.keyCode || e.which;
	if (key == 13) {
		alert('Enter Key');
		//
	}
}

$('#headerAddToCart').click(function () {

    var itemIds = $("#hdncheckboxids").val();
    if (itemIds != "" && typeof (itemIds) != "undefined") {
        MyCart(itemIds);
    }
    else {
        alert("Please select a certificate")
    }
});


function MyCart(itemIds) {
    var temp = new Array();
    temp = itemIds.split(",");
    var inputData = JSON.stringify({
        "request": {
            "Ids": temp
        }
    });
    $.ajax({
        url: '/User/Corporate/AddCertificatesToCart',
        type: "POST",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: inputData,
        beforeSend: function () {
            $('.ajax-loader').css("visibility", "visible");
        },
        success: function (result) {
            if (result != null && result.Status == 200) {                
                // Redirect to cart
                window.location = "/user/corporate/mycart";
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
}
