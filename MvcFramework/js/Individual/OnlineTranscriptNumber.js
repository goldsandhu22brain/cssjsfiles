$(document).ready(function () {

    $('#grdpurchasecert').dataTable({
        "bPaginate": true,
        "bFilter": false,
        "bInfo": false
    });

    var oTable = $('#grdpurchasecert').dataTable();

    $(document).on("click", ".btnaction", function (event) {
        var $current = $(this);
        var newStatus = $(this).attr("data-attr-status");
        var redemptionId = $(this).attr("data-redemptionId");
        $.ajax({
            type: 'POST',
            cache: false,
            async: true,
            url: '/Individual/UpdateVisibilityOnResult',
            data: { 'redemptionId': redemptionId, 'newStatus': newStatus },
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            dataType: 'json',
            success: function (response) {
                if (response != null) {
                    if (response.Status == 200) {                        
                        var $row = $current.closest('tr');
                        var $checkboxes = $row.find('input:checkbox');
                        $checkboxes.each(function (i, elem) {
                            console.log($(elem).prop("id"));
                            $(elem).prop('checked', JSON.parse(newStatus));
                            if (newStatus == "true") {
                                $current.attr('data-attr-status', 'false');
                                $current.text("Hide")
                            }
                            else {
                                $current.attr('data-attr-status', 'true');
                                $current.text("Show")
                            }                            
                        });

                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);

            },
            complete: function () {
                $('.ajax-loader').css("visibility", "hidden");
            }
        });

        event.preventDefault();
    });


});