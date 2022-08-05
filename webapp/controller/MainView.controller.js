/*eslint-disable no-console*/

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Core",
	"sap/m/MessagePopover",
	"sap/m/MessageItem",
	 "sap/ui/core/message/Message",
	  "sap/ui/core/library",
	  "sap/ui/model/json/JSONModel"
], function (Controller, Core, MessagePopover, MessageItem, Message, library, JSONModel) {
	"use strict";

	return Controller.extend("prs.client.controller.MainView", {
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			
			
			////////// Message manager //////
			this.oMessageManager = Core.getMessageManager();
			this.getView().setModel(this.oMessageManager.getMessageModel(), "message");
			
			// var oMainPage = this.getView().byId("mainPage");
			// this.oMessageManager.registerObject(oMainPage, true);
            this.oMessageManager.registerObject(this.getView(), true);

            this.oMessageModel = new JSONModel({
              //messages: [{
              //	title: "testTitle",
              //	description: "testDescription"
              //	}]
              messages: []
            });
            
			var oMessageTemplate = new MessageItem({
				type: 'Error',
				title: '{title}',
				description: '{description}'
			});
			
			this.oMessagePopover = new MessagePopover({
				items: {
					path: '/messages',
					template: oMessageTemplate
				}
			});
			
           	// this.getView().setModel(this.oMessageModel);											
           	this.oMessagePopover.setModel(this.oMessageModel);	
           	
			this.getView().byId("messagePopoverBtn").addDependent(this.oMessagePopover);

		},
		
		onShowMessagePopover: function (oEvent) {
			// this.oMessagePopover.toggle(oEvent.getSource());
			this.oMessagePopover.openBy(oEvent.getSource());
		},
		
		 //################ Private APIs ###################

        // _getMessagePopover : function () {
        //     // create popover lazily (singleton)
        //     if (!this._oMessagePopover) {
        //         this._oMessagePopover = sap.ui.xmlfragment(this.getView().getId(),"sap.ui.core.sample.MessageManager.BasicMessages.MessagePopover", this);
        //         this.getView().addDependent(this._oMessagePopover);
        //     }
        //     return this._oMessagePopover;
        // },
        
		onAfterRendering: function() {
			this.oBundle = this.getView().getModel("i18n").getResourceBundle();
			this.oModel = this.getView().getModel();
			this.oAppModel = this.getView().getModel("appModel");
			this.oNewEmployeeModel = this.getView().getModel("newEmployee");
		},
		
		onNavToEmployeeList: function() {
			// this.oRouter.navTo("EmployeeList") ;
			this.oRouter.navTo("Employees") ;
		},
		
		onSaveEmployee: function() {
			//save to model
			var oNewEmployee = this.getView().getModel("newEmployee");
			var oNewEmployeeData = oNewEmployee.getData();
			
	
			this._addEmployee(oNewEmployeeData);
			
			this.onNavToEmployeeList();
			
		},
		
		_addEmployee: function(oNewEmployeeData) {

			var pAddEmployee = new Promise(function(resolve, reject) {
					this.oModel.create("/Employees", oNewEmployeeData , {
						success: function(data) {
							resolve(data.results);
						},
						error: function(err) {
							reject(err);
						}
					});
			}.bind(this));	
			
			pAddEmployee.then(function() {	
				sap.m.MessageToast.show(this.oBundle.getText("addSuccess"));
			}.bind(this)).catch(function(err) {
				console.error(err);
				sap.m.MessageToast.show(this.oBundle.getText("addError"));
			}.bind(this));
		},
		
		liveValidateData:function() {
			var sFirstName = this.oNewEmployeeModel.getProperty("/FirstName");
			var sLastName = this.oNewEmployeeModel.getProperty("/LastName");
			var nPESEL = this.oNewEmployeeModel.getProperty("/PESEL");
			var nPhoneNumber = this.oNewEmployeeModel.getProperty("/PhoneNumber");
			
			var sCountry = this.oNewEmployeeModel.getProperty("/Country");
			var sCity = this.oNewEmployeeModel.getProperty("/City");
			var sPostCode = this.oNewEmployeeModel.getProperty("/PostCode");
			var sStreet = this.oNewEmployeeModel.getProperty("/Street");
			var nHouseNumber = this.oNewEmployeeModel.getProperty("/HouseNumber");
			var nFlatNumber = this.oNewEmployeeModel.getProperty("/FlatNumber");
			
			var nEmployeeID = this.oNewEmployeeModel.getProperty("/EmployeeID");

			this.oMessageModel.setData({messages: []});


			if (!sFirstName) {
				this.oAppModel.setProperty("/firstNameState", "None");
			} else if (/[^a-zA-ZąęćńółżźĄĘĆŃÓŁŻŹ]+/.test(sFirstName)) {
			this.oAppModel.setProperty("/firstNameState", "Error");
			
			// sap.ui.getCore().getMessageManager().addMessages(new Message({
   //             title: "Wrong First Name",
   //             description: "First Name must contain Letters only",
   //             target: "/messages",
   //             processor: this.getView().getModel("message")
   //         }));
            
           
            var oNewMessage = {
                title: "Wrong First Name",
                description: "First Name must contain Letters only",
                target: "/messages",
                processor: this.getView().getModel("message")
            };
            
            var aMessageModelData = this.oMessageModel.getData();
            aMessageModelData.messages.push(oNewMessage);
            this.oMessageModel.setData(aMessageModelData);
            
			} else {
				this.oAppModel.setProperty("/firstNameState", "Success");
			}
			
			if (!sLastName) {
				this.oAppModel.setProperty("/lastNameState", "None");
			} else if (/[^a-zA-Z]+/.test(sLastName)) {
			this.oAppModel.setProperty("/lastNameState", "Error");
			
			oNewMessage = {
                title: "Wrong Last Name",
                description: "Last Name must contain Letters only",
                target: "/messages",
                processor: this.getView().getModel("message")
            };
            
            aMessageModelData = this.oMessageModel.getData();
            aMessageModelData.messages.push(oNewMessage);
            this.oMessageModel.setData(aMessageModelData);
            
			} else {
				this.oAppModel.setProperty("/lastNameState", "Success");
			}
			
			if (!nPESEL) {
				this.oAppModel.setProperty("/PESELState", "None");
			} else if (/[^0-9]+/.test(nPESEL) || nPESEL.length !== 13) {
			this.oAppModel.setProperty("/PESELState", "Error");
			
			oNewMessage = {
                title: "Wrong PESEL",
                description: "PESEL must contain digits only",
                target: "/messages",
                processor: this.getView().getModel("message")
            };
            
            aMessageModelData = this.oMessageModel.getData();
            aMessageModelData.messages.push(oNewMessage);
            this.oMessageModel.setData(aMessageModelData);
            
            
			} else {
				this.oAppModel.setProperty("/PESELState", "Success");
			}
			
			if (!nPhoneNumber) {
				this.oAppModel.setProperty("/phoneNumberState", "None");
			} else if (/[^0-9]+/.test(nPhoneNumber)) {
			this.oAppModel.setProperty("/phoneNumberState", "Error");
			
			oNewMessage = {
                title: "Wrong Phone Number",
                description: "Phone Number must contain digits only",
                target: "/messages",
                processor: this.getView().getModel("message")
            };
            
            aMessageModelData = this.oMessageModel.getData();
            aMessageModelData.messages.push(oNewMessage);
            this.oMessageModel.setData(aMessageModelData);
			} else {
				this.oAppModel.setProperty("/phoneNumberState", "Success");
			}
			
			if (!sCountry) {
				this.oAppModel.setProperty("/countryState", "None");
			} else if (/[^a-zA-Z]+/.test(sCountry)) {
			this.oAppModel.setProperty("/countryState", "Error");
			
			oNewMessage = {
                title: "Wrong Country",
                description: "Country must contain letters only",
                target: "/messages",
                processor: this.getView().getModel("message")
            };
            
            aMessageModelData = this.oMessageModel.getData();
            aMessageModelData.messages.push(oNewMessage);
            this.oMessageModel.setData(aMessageModelData);
			} else {
				this.oAppModel.setProperty("/countryState", "Success");
			}
			
			if (!sCity) {
				this.oAppModel.setProperty("/cityState", "None");
			} else if (/[^a-zA-Z]+/.test(sCity)) {
			this.oAppModel.setProperty("/cityState", "Error");
			
			oNewMessage = {
                title: "Wrong City",
                description: "City must contain letters only",
                target: "/messages",
                processor: this.getView().getModel("message")
            };
            
            aMessageModelData = this.oMessageModel.getData();
            aMessageModelData.messages.push(oNewMessage);
            this.oMessageModel.setData(aMessageModelData);
			} else {
				this.oAppModel.setProperty("/cityState", "Success");
			}
			
			if (!sPostCode) {
				this.oAppModel.setProperty("/postCodeState", "None");
			} else if (!/[0-9]+/.test(sPostCode)) {
			this.oAppModel.setProperty("/postCodeState", "Error");
			
			oNewMessage = {
                title: "Wrong Post Code",
                description: "Post Code must contain digits",
                target: "/messages",
                processor: this.getView().getModel("message")
            };
            
            aMessageModelData = this.oMessageModel.getData();
            aMessageModelData.messages.push(oNewMessage);
            this.oMessageModel.setData(aMessageModelData);
			} else {
				this.oAppModel.setProperty("/postCodeState", "Success");
			}
			
			if (!sStreet) {
				this.oAppModel.setProperty("/streetState", "None");
			} else if (!/[a-zA-Z]+/.test(sStreet)) {
			this.oAppModel.setProperty("/streetState", "Error");
			} else {
				this.oAppModel.setProperty("/streetState", "Success");
			}
			
			if (!nHouseNumber) {
				this.oAppModel.setProperty("/houseNumberState", "None");
			} else if (!/[0-9]+/.test(nHouseNumber)) {
			this.oAppModel.setProperty("/houseNumberState", "Error");
			} else {
				this.oAppModel.setProperty("/houseNumberState", "Success");
			}
			
			if (!nFlatNumber) {
				this.oAppModel.setProperty("/flatNumberState", "None");
			} else if (!/[0-9]+/.test(nFlatNumber)) {
			this.oAppModel.setProperty("/flatNumberState", "Error");
			} else {
				this.oAppModel.setProperty("/flatNumberState", "Success");
			}
			
			if (!nEmployeeID) {
				this.oAppModel.setProperty("/employeeIDState", "None");
			} else if (/[^0-9]+/.test(nEmployeeID) || nEmployeeID.length !== 4) {
			this.oAppModel.setProperty("/employeeIDState", "Error");
			
			oNewMessage = {
                title: "Wrong Employee ID",
                description: "Employee ID must contain exacly 4 digits",
                target: "/messages",
                processor: this.getView().getModel("message")
            };
            
            aMessageModelData = this.oMessageModel.getData();
            aMessageModelData.messages.push(oNewMessage);
            this.oMessageModel.setData(aMessageModelData);
			} else {
				this.oAppModel.setProperty("/employeeIDState", "Success");
			}
			
			this._handleSaveBtnState();
			
			},
		
			_handleSaveBtnState: function() {
			
			var FirstNameState = this.oAppModel.getProperty("/firstNameState");
			var LastNameState = this.oAppModel.getProperty("/lastNameState");
			var PESELState = this.oAppModel.getProperty("/PESELState");
			var PhoneNumberState = this.oAppModel.getProperty("/phoneNumberState");
			var CountryState = this.oAppModel.getProperty("/countryState");
			var CityState = this.oAppModel.getProperty("/cityState");
			var PostCodeState = this.oAppModel.getProperty("/postCodeState");
			var StreetState = this.oAppModel.getProperty("/streetState");
			var HouseNumberState = this.oAppModel.getProperty("/houseNumberState");
			var FlatNumberState = this.oAppModel.getProperty("/flatNumberState");
			var EmployeeIDState = this.oAppModel.getProperty("/employeeIDState");

			if (FirstNameState === "Success" 
				&& LastNameState === "Success" 
				&& PESELState === "Success"
				&& PhoneNumberState === "Success"
				&& CountryState === "Success"
				&& CityState === "Success"
				&& PostCodeState === "Success"
				&& StreetState === "Success"
				&& HouseNumberState === "Success"
				&& FlatNumberState === "Success"
				&& EmployeeIDState === "Success") {
						this.oAppModel.setProperty("/addEmployeeBtnEnabled", true);
					} else {
						// this.oAppModel.setProperty("/addEmployeeBtnEnabled", true);						//switch before send
						this.oAppModel.setProperty("/addEmployeeBtnEnabled", false);					
					}
			
			}

	});
});