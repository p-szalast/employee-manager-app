sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/f/library',
	"sap/ui/core/Fragment"
], function (Controller, fioriLibrary, Fragment) {
	"use strict";

	return Controller.extend("prs.client.controller.Details", {
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
		
		},
		
		onBeforeRendering: function() {
			this.oAppModel = this.getView().getModel("appModel");
			this._getMonthWorkHoursPassed();
		},
		
	
		onAfterRendering: function() {
			this.oBundle = this.getView().getModel("i18n").getResourceBundle();
			this.oModel = this.getView().getModel();
			// this.oAppModel = this.getView().getModel("appModel");
			
			this.oFCL = this.getView().getParent().getParent();
			
			this.oEventBus = this.getOwnerComponent().getEventBus();
			
			// if (!this.oEventBus._mChannels._defaultChannel?._mEventRegistry.manageProductBtnPress) {
			// 	this.oEventBus.subscribe("onEmployeePress", this._bindEmployee, this);
			// // }
			
			if (!this.oEventBus._defaultChannel.mEventRegistry.onEmployeePress) {
				this.oEventBus.subscribe("onEmployeePress", this._bindEmployee, this);
			}
			
			this._getMonthWorkHoursPassed();
			
		},
		
		onNavBack:function() {
			this.oRouter.navTo("MainView");
		},
		
		onOneColumn: function() {
			this.oFCL.setLayout(fioriLibrary.LayoutType.OneColumn);
		},
		
		
		_bindEmployee: function() {
			var sPath = this.oAppModel.getProperty("/CurrentEmplyee");
					
			this.getView().bindElement({	
				path: sPath
			});
			
			this.oModel.read(sPath, {
				success: function(data) {
				this.oAppModel.setProperty("/CurrentEmployeeMonthHours", data.CurrentMonthHours);
				}.bind(this),
				
				error: function(err) {
					console.error(err);
				}
				
			});

			
			// var nMonthWorkHoursPassed = this.oAppModel.getProperty("/MonthWorkHoursPassed");
			// var	nCurrentEmployeeMonthHours = this.getView().getBiningContext().CurrentMonthHours;
		
			// var nCurrentEmployeeAbsentHours = nMonthWorkHoursPassed - nCurrentEmployeeMonthHours ;                           
			
			// this.oAppModel.setProperty("/CurrentEmployeeAbsentHours", nCurrentEmployeeAbsentHours);
		},
		
		onSelectionChanged:function(oEvent) {

			var oIcon = oEvent.getSource();
			var oView = this.getView();
			
			var sPath = this.oAppModel.getProperty("/CurrentEmplyee");

			// create popover
			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: oView.createId(),
					// id: oView.createId("popoverID"),
					name: "prs.client.view.WorkHoursPopover",
					controller: this
				}).then(function(oPopover) {
					oView.addDependent(oPopover);
					oPopover.bindElement(sPath);
					return oPopover;
				});
			} else {
				this._pPopover.then(function(oPopover) {
					oPopover.bindElement(sPath);
				});
			}
			
			
			this._pPopover.then(function(oPopover) {
				oPopover.openBy(oIcon);
			});

		},
		
		onClosebtn: function() {
		this._pPopover.then(function(oPopover) {
				oPopover.close();
				// oPopover.destroy();
			});
			
		// this.getView().byId("popoverID").destroy();
		},
		
		_getMonthWorkHoursPassed: function() {
			var dDate = new Date();
			var iDay = dDate.getDate();
			var iPreviousDay = iDay - 1;
			var nMonthDaysPassed = iPreviousDay * 8 ;
			
			this.oAppModel.setProperty("/MonthWorkHoursPassed", nMonthDaysPassed);
			
		}
		
	
	});
});