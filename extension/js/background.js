dojo.registerModulePath("ChromeDojoHelper", "/js/ChromeDojoHelper");

dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dojo.DeferredList");

var datastore;

function extUrl(uri) {
  return chrome.extension.getURL(uri);
}

function debugDS(datastore) {
  var kwArgs = {
    //query: {"processID":"*"},
    query: null,
    onComplete:function(items){
      console.debug(items);
      
    }
  };
  datastore.fetch(kwArgs);
}

//summary:
//  callback for preload complete 
function _preloadCompleteCallback() {
  console.debug("-- done preloading --");
//  var views = chrome.extension.getViews({"type":"popup"});
//  var popupView = views[0];
//  console.debug(popupView);
//  console.debug(popupView.documentationViewer);
//  popupView.documentationViewer.itemSelect.setStore(datastores[0]);
//  var dv = new ChromeDojoHelper.DocumentationViewer({}, "documentationViewerPlacer");
  debugDS(datastore);
}

//summary:
//callback for api file request
function _dataCallback(dojoVersion, data) {
console.debug("back");
var item;
for (var namespace in data) {
  item = data[namespace];
  try {
    datastore.newItem({
      id          : namespace+"#"+dojoVersion,
      dojoVersion : dojoVersion,
      location    : item.location, //+" ("+dojoVersion+")",
      resources   : item.resources,
      methods     : item.methods,
      provides    : item.provides,
      type        : item.type,
      classlike   : item.classlike,
      superclass  : item.superclass,
      summary     : item.summary,
      description : item.description,
      examples    : item.examples,
      mixins      : item.mixins,
      properties  : item.properties
    });      
  } catch (e) {
    console.error("Error adding item to ds",dojoVersion+"#"+idx , e);
  }
}
}
// summary:
//  preload the api data in the background.
//  i'm aware it's memory intensive, will figure out a lazyloading mechanism, possibly with local storage.
function _preloadDatastore() {
  var API_FILES = [
    ["1.6", "/api/dojo-1.6.0-api.js"],
    ["1.5", "/api/dojo-1.5.0-api.js"],
    ["1.4.3", "/api/dojo-1.4.3-api.js"],
  ]; 
  var version, file, deferreds=[];
  // create a datastore for holding the api info
  datastore = new dojo.data.ItemFileWriteStore({data: {
    'identifier': 'id',
    'idAttribute': 'location',
    'label': 'location',
    'items': []
  }});

  for(v in API_FILES) {
    dojoVersion = API_FILES[v][0];
    file = API_FILES[v][1];
    console.debug("Preloading version:", dojoVersion, ", file: ", file);
    // initiate the request for preloading the version data
    deferreds[v] = dojo.xhrGet({
      url: extUrl(file),
      handleAs: "json",
      load: dojo.partial(_dataCallback, dojoVersion)
    });
    // add a callback at the end of all requests
    var dl = new dojo.DeferredList(deferreds);
    dl.addCallback(_preloadCompleteCallback);
  }
  
}
dojo.addOnLoad(_preloadDatastore);