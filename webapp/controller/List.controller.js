sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library',
	"sap/m/MessagePopover",
	"sap/m/MessageItem",
	"sap/ui/core/Core"
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary, MessagePopover, MessageItem, Core) {
	"use strict";

	return Controller.extend("prs.client.controller.Master", {
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
	
	
	
				////////// Message manager //////
			this.oMessageManager = Core.getMessageManager();
			this.getView().setModel(this.oMessageManager.getMessageModel(), "message");
			
			// var oMainPage = this.getView().byId("mainPage");
			// this.oMessageManager.registerObject(oMainPage, true);
            this.oMessageManager.registerObject(this.getView(), true);

		
			
		},
		// 	this._createMessagePopover();
			
			
		// 	var oMessageTemplate = new MessageItem({
		// 		type: 'Error',
		// 		title: '{title}',
		// 		description: '{description}',
		// 		counter: '{counter}'
		// 	});
			
		// 	this.oMessagePopover = new MessagePopover({
		// 		items: {
		// 			path: '/messages',
		// 			template: oMessageTemplate
		// 		},
		// 		activeTitlePress: function () {
		// 			sap.m.MessageToast.show('Active title is pressed');
		// 		}
		// 	});
		// },
		
		// 	_createMessagePopover: function () {
		// 	var that = this;

		// 	this.oMessagePopover = new MessagePopover({
		// 		activeTitlePress: function (oEvent) {
		// 			var oItem = oEvent.getParameter("item"),
		// 				oPage = that.getView().byId("mainPage"),
		// 				oMessage = oItem.getBindingContext("message").getObject(),
		// 				oControl = Element.registry.get(oMessage.getControlId());

		// 			if (oControl) {
		// 				oPage.scrollToElement(oControl.getDomRef(), 200, [0, -100]);
		// 				setTimeout(function(){
		// 					oControl.focus();
		// 				}, 300);
		// 			}
		// 		},
		// 		items: {
		// 			path:"message>/",
		// 			template: new MessageItem(
		// 				{
		// 					title: "{message>message}",
		// 					subtitle: "{message>additionalText}",
		// 					// activeTitle: {parts: [{path: 'appModel>controlIds'}], formatter: this.isPositionable},
		// 					type: "{message>type}",
		// 					description: "{message>message}"
		// 				})
		// 		}
		// 	});

		// 	this.getView().byId("messagePopoverBtn").addDependent(this.oMP);
		// },
		
	
		
		//  //################ Private APIs ###################

  //      _getMessagePopover : function () {
  //          // create popover lazily (singleton)
  //          if (!this._oMessagePopover) {
  //              this._oMessagePopover = sap.ui.xmlfragment(this.getView().getId(),"sap.ui.core.sample.MessageManager.BasicMessages.MessagePopover", this);
  //              this.getView().addDependent(this._oMessagePopover);
  //          }
  //          return this._oMessagePopover;
  //      },
        
  //      onShowMessagePopover: function (oEvent) {
		// 	// this.oMessagePopover.toggle(oEvent.getSource());
		// 	this.oMessagePopover.openBy(oEvent.getSource());
		// },
		
		
		
		
		
		
		
		
	///////////////////////////////////////
	
	
	
	
		onAfterRendering: function() {
			this.oAppModel = this.getView().getModel("appModel");
			this.oFCL = this.getView().getParent().getParent();
			this.oEventBus = this.getOwnerComponent().getEventBus();
			
			
		},

		onSearch: function (oEvent) {
				var oTableSearchState = [];
				var sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("FirstName", FilterOperator.Contains, sQuery)];
			}

			this.getView().byId("EmployeeList").getBinding("items").filter(oTableSearchState, "Application");
		},

		
		onListItemPress: function (oEvent) {
			this.oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
			
			var sPath = oEvent.getSource().getBindingContext().getPath();    // /Employees(123)
			this.oAppModel.setProperty("/CurrentEmplyee", sPath);
			
			this.oEventBus.publish("onEmployeePress");
			
			// this.oEventBus.publish("onEmployeePress", {
			// 	sPath: sPath
			// });
			
		},
		
		onNavBack:function() {
			this.oRouter.navTo("MainView");
		},
		
		onShowMessagePopover: function() {
			
		}
	});
});