dojo.require("dojo.data.ItemFileWriteStore");

dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dijit.form.Select");

dojo.registerModulePath("ChromeDojoHelper", "/js/ChromeDojoHelper");

dojo.require("ChromeDojoHelper.ClassDetail");
dojo.require("ChromeDojoHelper.DocumentationViewer");


function init() {
  bgPage = chrome.extension.getBackgroundPage();
  console.debug(bgPage.datastores);
}

dojo.ready(init);