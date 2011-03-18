dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dojo.DeferredList");

var datastores = {};

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
//  callback for api file request
function _dataCallback(datastore, data) {
  console.debug("back");
  var item;
  for (var idx in data) {
    item = data[idx];
    datastore.newItem({
      "id"        : idx,
      "location"  : item.location,
      "resources" : item.resources,
      "methods"   : item.methods,
      "provides"  : item.provides,
      "type"      : item.type,
      "classlike" : item.classlike,
      "superclass": item.superclass,
      "summary"   : item.summary,
      "description": item.description,
      "examples"  : item.examples,
      "mixins"    : item.mixins,
      "properties": item.properties
    });
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
  
  for(v in API_FILES) {
    version = API_FILES[v][0];
    file = API_FILES[v][1];
    console.debug("Preloading version:", version, ", file: ", file);
    // create a datastore for the Dojo version api
    datastores[version] = new dojo.data.ItemFileWriteStore({data: {
      'identifier': 'location',
      'idAttribute': 'location',
      'label': 'location',
      'items': []
    }});
    // initiate the request for preloading the version data
    deferreds[v] = dojo.xhrGet({
      url: extUrl(file),
      handleAs: "json",
      load: dojo.partial(_dataCallback, datastores[version])
    });
    // add a callback at the end of all requests
    var dl = new dojo.DeferredList(deferreds);
    dl.addCallback(function(){
      console.debug("-- done preloading --");
    });
  }
  
}
dojo.addOnLoad(_preloadDatastore);