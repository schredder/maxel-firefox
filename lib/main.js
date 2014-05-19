var cm = require("sdk/context-menu"),
    selection = require("sdk/selection"),
    self = require("sdk/self"),
    url = require("sdk/url"),
    tabs = require("sdk/tabs"),
    timer = require("timers");

var urlListHandler = function(urlList) {
  urlList = urlList.filter(function(uri) {
    return url.isValidURI(uri);
  });

  urlList = urlList.map(function(uri) {
    return {
      "href": uri,
      "title": ""
    }
  })

  // Generate payload for Maxel
  payload = {
    'version': 0.1,
    'agent': 'Firefox to Maxel',
    'urls': urlList
  }

  urlPayload = 'maxel://add/' + encodeURIComponent(JSON.stringify(payload));
  console.log(urlPayload);

  tabs.open({
    url: urlPayload,
    isPinned: false,
    inBackground: true,
    onOpen: function onOpen(tab) {
      timer.setTimeout(tab.close, 0);
    }
  });

  console.log(urlList);
}

var maxelButton = cm.Item({
  label: "Download selected link(s) in Maxel",
  image: self.data.url('icon_16x16.png'),
  context: cm.SelectionContext(),
  contentScriptFile: self.data.url('selectionHandler.js'),
  onMessage: function(urlList) {
    urlListHandler(urlList);
  }
});
