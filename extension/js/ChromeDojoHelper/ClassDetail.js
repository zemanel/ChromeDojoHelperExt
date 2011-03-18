dojo.provide("ChromeDojoHelper.ClassDetail");

dojo.require("dijit._Widget");
dojo.require("dojox.dtl._DomTemplated");        
    
dojo.declare("ChromeDojoHelper.ClassDetail", [dijit._Widget, dojox.dtl._DomTemplated],{
  templateString: dojo.cache("ChromeDojoHelper.templates", "classDetail.html"),
  widgetsInTemplate: false
});