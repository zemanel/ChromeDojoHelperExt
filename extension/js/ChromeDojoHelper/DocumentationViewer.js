dojo.provide("ChromeDojoHelper.DocumentationViewer");

dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dijit._Widget");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dijit.form.Select");

dojo.require("dojox.dtl._DomTemplated");        
dojo.require("dijit._Templated");

dojo.require("ChromeDojoHelper.ClassDetail");

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

//dojo.declare("ChromeDojoHelper.DocumentationViewer", [dijit._Widget, dojox.dtl._DomTemplated],{
dojo.declare("ChromeDojoHelper.DocumentationViewer", [dijit._Widget, dijit._Templated],{
  templateString: dojo.cache("ChromeDojoHelper.templates", "documentationViewer.html"),
  widgetsInTemplate: true,
  _versionSelect: null,
  _itemSelectNode: null,
  //  datastore for the api
  datastore:null,

  // summary:
  //  constructor
  constructor: function() {
    this.inherited(arguments);
  },

  // summary:
  //  sets the datastore from which api data is searched
  setStore: function(datastore) {
    console.log("Setting datastore");
    this.datastore = datastore;
    var currentVersion = this._versionSelect.get("value");
    this._itemSelect = new dijit.form.FilteringSelect({
        id: "_itemSelect",
        name: "_itemSelect",
        store: datastore,
        searchAttr: "location",
        autoComplete: false,
        pageSize: 15,
        query: {
          dojoVersion: currentVersion
        }
      }, this._itemSelectNode);
    //dojo.connect(this, _itemSelectNode, "onChange", _onItemSelectValueChange);
    dojo.connect(this._versionSelect, "onChange", this, "_onVersionSelectValueChange");
  },
  
  _onItemSelectValueChange: function(newValue) {
    console.debug("CHANGE:", newValue);
    datastore.fetchItemByIdentity({identity: newValue, onItem: _onNewItem});
  },

  _onVersionSelectValueChange: function(newValue) {
    console.debug("CHANGE:", newValue);
    console.debug("changed dojo version to:",  newValue);
    this._itemSelect.query = {
        dojoVersion:  newValue
    };
  },
  
  _onNewItem: function (item) {
    console.debug("CHANGE ITEM:", item);
    detailTemplate.item = item;
    detailTemplate.hasItem = true;
    detailTemplate.render();
  },
  
  // summary:
  //  startup
  startup: function() {
    this.inherited(arguments);
    console.log("viewer started");
  }
});