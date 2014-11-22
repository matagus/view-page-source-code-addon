const { Hotkey } = require("sdk/hotkeys");
var prefs = require("sdk/simple-prefs");
var tabUtils = require('sdk/tabs/utils');
var tabs = require('sdk/tabs');
var { viewFor } = require("sdk/view/core");

exports.main = function(options) {

  var toggleView = function() {
    var currentTab = tabs.activeTab;

    if (!currentTab) return;

    var currentURL = new String(currentTab.url);
    if (currentURL.indexOf("view-source:") == -1) {
      currentTab.url = "view-source:" + currentURL;
    } else {
      if (prefs.prefs.reloadPage) {
        currentTab.url = currentURL.slice(12);
      } else {
        var lowLevelTab = viewFor(currentTab);
        var browser = tabUtils.getBrowserForTab(lowLevelTab);
        browser.goBack();
      }
    }
  };

  prefs.on("toggleViewShortcut", function(value) {
      showHotKey.destroy();
      showHotKey = Hotkey({
        combo: prefs.prefs["toggleViewShortcut"],
        onPress: function() {
          toggleView();
        }
      });
  });

  var toggleHotKey = Hotkey({
    combo: prefs.prefs["toggleViewShortcut"],
    onPress: function() {
      toggleView();
    }
  });
}
