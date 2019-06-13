var _LOG = false;

app.addon.receive("page:get-storage", function (e) {
  if (config.youtube.nativeBlock === true) {
    if (_LOG) console.error(">> Blocking Ads Using Complementary Method");
    app.addon.send("page:set-storage", app.base, e.tabId);
  }
});

app.addon.receive("options:change-storage", function (e) {
  config.set(e.pref, e.value);
  app.addon.send("options:set-storage", {"pref": e.pref, "value": config.get(e.pref)}, null);
  if (e.pref === "youtube.nativeBlock") {if (e.value === true) app.addon.send("page:reload", null, null)};
});

app.addon.receive("options:get-storage", function (e) {app.addon.send("options:set-storage", {"pref": e, "value": config.get(e)}, null)});

app.onBeforeRequest(function (top, current) {
  var isYoutubeURL = config.youtube.requestBlock.matchRegexp.test(top);
  if (isYoutubeURL) {
    if (current.indexOf(".googlevideo.") !== -1) return;
    var isAdRequest = config.youtube.requestBlock.blockAdsRegexp.test(current);
    if (isAdRequest) {
      if (_LOG) console.error(">> Blocking Ads: ", current);
      return {"cancel": true}
    }
    /*  */
    if (config.youtube.annotations === true) {
      var isAnnotationsRequest = config.youtube.requestBlock.blockAnnotationsRegexp.test(current);
      if (isAnnotationsRequest) {
        if (_LOG) console.error(">> Blocking Annotation: ", current);
        return {"cancel": true}
      }
    }
  }
});
