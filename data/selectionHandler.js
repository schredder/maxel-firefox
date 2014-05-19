self.on("click", function(node, data) {
  function getSelectionUrls(content) {
    var urls = content.querySelectorAll('a');
    var urlStrings = [];

    for (var i = 0; i < urls.length; i++) {
      urlStrings.push(urls[i].toString());
    };

    return urlStrings;
  };

//TODO: Figure out "Clicking on an <a>" case.
  selection = window.getSelection();
  urls = getSelectionUrls(selection.getRangeAt(0).cloneContents());

  self.postMessage(urls);
});
