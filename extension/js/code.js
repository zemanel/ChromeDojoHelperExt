dojo.registerModulePath("ChromeDojoHelper", "/js/ChromeDojoHelper");
dojo.require("ChromeDojoHelper.DocumentationViewer");


function init() {
  //alert("init");
  bgPage = chrome.extension.getBackgroundPage();
  console.debug(bgPage.datastore);
  console.debug(documentationViewer);
  documentationViewer.setStore(bgPage.datastore);
}

dojo.ready(init);