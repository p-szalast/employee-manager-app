sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
	"use strict";
	
	return Controller.extend("prs.client.controller.Employees", {
	
	// onAfterRendering: function() {
	// 		var oFCL = this.oView.getParent().getParent();
	// 		oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
	// 	}
	// }

		// onSort: function () {
		// 	this._bDescendingSort = !this._bDescendingSort;
		// 	var oBinding = this.oProductsTable.getBinding("items"),
		// 		oSorter = new Sorter("Name", this._bDescendingSort);

		// 	oBinding.sort(oSorter);
		// },

		// onListItemPress: function () {
		// 	var oFCL = this.oView.getParent().getParent();

		// 	oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
		// }
	});
});