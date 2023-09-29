function showLoading(isLoad) {
	if (isLoad) {
		$("#pageloaddiv").css("display", "inherit");

	} else {
		$("#pageloaddiv").css("display", "none");
	}
}


//Move this to Search to Load Default page using Search Default thing
function GetCourse(pageNo = 1, categoryId = null,title='') {
	categoryId = categoryId == null ? $('#ulCourseGrp li.active')[0].id : categoryId;

	var offeringType = $('#ulCourseGrp').attr('offeringtype');

	title = title ? title : $($('#ulCourseGrp li.active .cat_name')[0]).text();
	showLoading(true);
	var replaceId = pageNo != 1 ? '#box-body' : '#boxBody';
	var viewName = pageNo != 1 ? '_TileItemCard' : '_TileCard';
	$.ajax({
		type: 'POST',
		cache: false,
		async: true,
		contentType: 'application/json; charset=utf-8',
		url: '/Search',
		data: JSON.stringify({ 'TitleToDisplay': title, 'OfferingType': offeringType, 'Status': '100', 'CategoriesId': categoryId, 'ViewName': viewName }),
		dataType: 'html',
		success: function (response) {
			$(replaceId).html(response);
			showLoading(false);
			document.getElementById('OnlineCourseTitles').scrollIntoView();
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$("#ulPaging").hide();
			showLoading(false);
		}
	});

	$('#ulCourseGrp').attr('CategoryId', categoryId);
}

$(function () {
	PaginationClick = GetCourse;
	GetCourse(1, '', 'All Courses');
})
