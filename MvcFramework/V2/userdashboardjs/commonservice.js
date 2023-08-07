async function postDataToAPI(url, inputData) {
    $.ajax({
        url: url,
        type: "POST",
        data: inputData,
        success: function (data) {
            return data;          
        },
        error: function (err) {
            return err;
        }
    });
}


function getDataFromAPI(url) {
    return new Promise((resolve) => {
        $.ajax({
            url: url,
            headers: {
                'IsAjaxCall': true
            },
            type: "GET",
            success: function (data, textStatus, xhr) {
                if (xhr.status == 201) {
                    resolve(data);
                }
                else {
                    window.location.href="/login.aspx"
                }
            }
        });      
    });  
}
