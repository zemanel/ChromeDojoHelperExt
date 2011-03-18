dependencies = {
	layers: [
		{
			name: "dojo.js",
			dependencies: [
			  "dojo/_base",
        "dojo.data.ItemFileWriteStore",
        "dijit.layout.ContentPane",
        "dijit.form.FilteringSelect",
        "dijit.form.Select",
        "dojox.dtl._DomTemplated"
			]
		}
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ]
	]
}
