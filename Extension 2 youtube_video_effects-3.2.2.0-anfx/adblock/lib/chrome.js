var app = {};

//app.base = chrome.extension.getURL('');
//app.version = function () {return chrome.runtime.getManifest().version};
//app.tab = {"open": function (url) {chrome.tabs.create({"url": url, "active": true})}};

app.storage = (function () {
  var objs = {};
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      objs = o;
      var script = document.createElement("script");
      script.src = "adblock/lib/common.js";
	  script.id = "htcom_commonjs";
	  if (localStorage.getItem("youtube_filter_video_adblock") !== undefined && localStorage.getItem("youtube_filter_video_adblock") !== null && localStorage.getItem("youtube_filter_video_adblock")=='true')
		document.body.appendChild(script);
    });
  }, 300);
  /*  */
  return {
    "read": function (id) {return objs[id]},
    "write": function (id, data) {
      var tmp = {};
      data = data + '';
      objs[id] = data;
      tmp[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();

app.addon = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.method === id) {
          var _data = request.data || {};
          if (sender.tab) {
            _data["top"] = sender.tab.url;
            _data["tabId"] = sender.tab.id;
          }
          _tmp[id](_data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.runtime.sendMessage({"method": id, "data": data});
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          if (tab.url.indexOf("http") === 0) {
            if (!tabId || (tabId && tab.id === tabId)) {
              var _data = data || {};
              _data["top"] = tab.url;
              _data["tabId"] = tab.id;
              chrome.tabs.sendMessage(tab.id, {"method": id, "data": _data}, function () {});
            }
          }
        });
      });
    }
  }
})();

var parentURL = {};
app.onBeforeRequest = function (callback) {
  var onBeforeRequest = function (details) {
    var url = details.url;
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      var id = details.tabId + '|' + details.frameId;
      if (details.type === 'main_frame' || details.type === 'sub_frame') parentURL[id] = url;
      return callback(parentURL[id], url);
    }
  };
  /*  */
  if (localStorage.getItem("youtube_filter_video_adblock") !== undefined && localStorage.getItem("youtube_filter_video_adblock") !== null && localStorage.getItem("youtube_filter_video_adblock")=='true')
	chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, {"urls" : ["http://*/*", "https://*/*"]}, ["blocking"]);
};
