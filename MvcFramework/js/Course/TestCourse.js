var GetOpenTestCoursePopup = function () { };
$(document).ready(function () {

	GetOpenTestCoursePopup = function (details) {
		var id = $(details).data('categoriesid');
		var Name = $(details).data('catname');

		$("#pageloaddiv").css("display", "inherit");

		$.ajax({
			type: 'POST',
			cache: false,
			async: true,		
			url: '/test/TestDetails',
			data: { 'CategoriesId': id },
			dataType: 'html',
			success: function (response) {
				if (response != null) {
						$("#bTestTitle").html(Name);
						$(".TestCourseTable").html(response);
						$('#myModal').modal("show");
				}
				$("#pageloaddiv").css("display", "none");
				return true;
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				$("#pageloaddiv").css("display", "none");
				return true;
			},
			always: function () {
				$("#pageloaddiv").css("display", "none");
				return true;
			}
		});
	}

	$('#myModal').on('shown.bs.modal', function () {
		$(".modal-backdrop.in").hide();
	})
	$('#myModal').on('hidden.bs.modal', function () {
	});
	function ReLoadImages() {
		setTimeout(() => {

			$('img[data-src]').each(function () {
				$(this).attr('src', $(this).attr('data-src'));

				//$(this).attr('onError', "this.onerror=null;this.src='/images/logo.jpg'");
				$(this).removeAttr('data-src');
			})
		}, 40);

	}
	ReLoadImages();
});
var TestDetailPage = function () {
	/*Details Page*/
	new WOW().init();
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	})
	$(window).on('load', function () {
		$("#Vdo").on("hidden.bs.modal", function () { jQuery("#Vdo iframe").attr("src", jQuery("#Vdo iframe").attr("src")); });
		var giftofspeed1 = document.createElement("link");
		giftofspeed1.rel = "stylesheet",
			giftofspeed1.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css",
			giftofspeed1.type = "text/css"; var godefer1 = document.getElementsByTagName("link")[0];
		godefer1.parentNode.insertBefore(giftofspeed1, godefer1);

		$("#seshow").click(function () {
			$("#sehide").show(500);
		});
		$("#sehideX").click(function () {
			$("#sehide").hide(500);
		});

		$("#seyshow").click(function () {
			$("#sey").show(500);
		});
		$("#seyhide").click(function () {
			$("#sey").hide(500);
		});
		$("img.lazy").lazyload();
		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=1083223395132382';
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	});
}