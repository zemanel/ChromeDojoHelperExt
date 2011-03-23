dependencies = {
  layers: [
    {
      name: "dojo.js",
      dependencies: [
        "dojo.DeferredList",
        "dojo.data.ItemFileWriteStore",

        "dijit._Widget",
        "dijit._Templated",
        "dijit.layout.ContentPane",
        "dijit.form.FilteringSelect",
        "dijit.form.Select",
        "dojox.dtl._DomTemplated",

        "ChromeDojoHelper.ClassDetail",
        "ChromeDojoHelper.DocumentationViewer"
      ]
    }
  ],

  prefixes: [
    [ "dijit", "../dijit" ],
    [ "dojox", "../dojox" ],
    ["ChromeDojoHelper", "/js/ChromeDojoHelper"]
  ]
}
