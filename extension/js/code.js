dojo.require("dojo.data.ItemFileWriteStore");

dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dijit.form.Select");

dojo.require("dojox.dtl._DomTemplated");

function extUrl(uri) {
  return chrome.extension.getURL(uri);
}

// 
dojo.declare("ClassDetail", [dijit._Widget, dojox.dtl._DomTemplated],{
  templateString: dojo.cache(new dojo._Url(extUrl("/templates/classDetail.html")), {}),
  widgetsInTemplate: true
});

var datastore, detailTemplate;

function _onValueChange(newValue) {
  console.debug("CHANGE:", newValue);
  datastore.fetchItemByIdentity({identity: newValue, onItem: _onNewItem});
};

function _onNewItem(item) {
  console.debug("CHANGE ITEM:", item);
  detailTemplate.item = item;
  detailTemplate.hasItem = true;
  detailTemplate.render();
}

function init() {
  
  
  bgPage = chrome.extension.getBackgroundPage();
  console.debug(bgPage.HELLO_WORLD);
  
  var initialData = {
    'identifier': 'location',
    'idAttribute': 'location',
    'label': 'location',
    'items': []
  };
  datastore = new dojo.data.ItemFileWriteStore({data: initialData});
  
  dojo.xhrGet({
    url: extUrl("/api/dojo-1.6.0-api.js"),
    handleAs: "json",
    load: function(data){
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
      
      detailTemplate = new ClassDetail({}, "detailsNode");
      
      var filteringSelect = new dijit.form.FilteringSelect({
        //id: "classSelect",
        //name: "class",
        //value: "location",
        store: datastore,
        searchAttr: "location",
        pageSize: 10,
        queryExpr: "*${0}*",
        autoComplete: false,
        onChange: _onValueChange
      }, "classSelectNode");
      
      
      //console.debug(detailTemplate.);
      detailTemplate.render();

      console.debug("-- done --");
      //debugDS(datastore);
    }
  });
  
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

dojo.ready(init);