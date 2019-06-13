if (localStorage.getItem("youtube_filter_video_adblock") !== undefined && localStorage.getItem("youtube_filter_video_adblock") !== null && localStorage.getItem("youtube_filter_video_adblock")=='true'){
	background.receive("page:set-storage", function (path) {
	  var script = document.getElementById("adblocker-for-youtube");
	  if (script) script.parentNode.removeChild(script);
	  /*  */
	  var script = document.createElement('script');
	  script.type = "text/javascript";
	  script.setAttribute("id", "adblocker-for-youtube");
	  script.src = "adblock/data/content_script/block.js";
	  document.documentElement.appendChild(script);
	});

	background.send("page:get-storage");

	background.receive("page:reload", function () {document.location.reload()});
}