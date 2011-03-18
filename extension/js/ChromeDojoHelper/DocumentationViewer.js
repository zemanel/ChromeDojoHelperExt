dojo.provide("ChromeDojoHelper.DocumentationViewer");

dojo.require("dijit._Widget");
dojo.require("dojox.dtl._DomTemplated");        
dojo.require("dojo.data.ItemFileWriteStore");
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
dojo.declare("ChromeDojoHelper.DocumentationViewer", [dijit._Widget, dojox.dtl._DomTemplated],{
  templateString: dojo.cache("ChromeDojoHelper.templates", "documentationViewer.html"),
  widgetsInTemplate: true,
  //  datastore for the api
  _datastore:null,

  // summary:
  //  constructor
  constructor: function() {
    this.inherited(arguments);
  },

  // summary:
  //  startup
  startup: function() {
    this.inherited(arguments);
    console.log("viewer started");
  }
});