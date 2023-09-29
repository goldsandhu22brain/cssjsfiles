
var durationTimer;
var durationInterval = 5000; // duration capture interval in milliseconds
var durationCaptured = 0;
let player;

function loadPlayer(videoId, redemptionId, lectureId, offeringId, IsTracking) {
	//  alert(videoId);
	document.getElementById('errorMsg').value = '';
	if (typeof player !== 'undefined') {
		player.destroy().then(function () {
			console.log('Previous player destroyed');
		});
	}
	var options = {
		id: videoId,
		responsive: true,
		autoplay: true

	};
	player = new Vimeo.Player('vimeoPlayer', options);

	player.loadVideo(options.id).then(function () {

		if (IsTracking) {
			player.on('play', function () {
				
				durationTimer = setInterval(function () {
					player.getCurrentTime().then(function (seconds) {
						UpdateLoadActivity(lectureId, redemptionId, Math.round(seconds), offeringId)
					});

				}, durationInterval);
			});

			player.on('pause', function () {
				player.getCurrentTime().then(function (seconds) {
					UpdateLoadActivity(lectureId, redemptionId, Math.round(seconds), offeringId)

				});
				clearInterval(durationTimer)
			});

			player.on('ended', function () {
				clearInterval(durationTimer)

				player.getCurrentTime().then(function (seconds) {
					UpdateLoadActivity(lectureId, redemptionId, Math.round(seconds), offeringId)

				});
			});
		}
	}).catch(function (error) {

		document.getElementById('errorMsg').value = error.message
	});


}



function UpdateLoadActivity(lectid, redmptId, secs, offeringId) {

	var model = {
		lecturerId: lectid,
		RedemptionId: redmptId,
		secondsWatched: secs,
		OfferingId: offeringId

	}
	// console.log(model);
	jQuery.ajax({
		type: 'POST',
		cache: false,
		async: true,
		contentType: 'application/json; charset=utf-8',
		url: '/Course/Video/LoadActivity',
		data: JSON.stringify(model),
		dataType: 'json',
		success: function (response) {

		}
		,
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
		}
	});
}
