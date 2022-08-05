sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/base/util/UriParameters"
], function (MockServer, UriParameters) {
	"use strict";

	return {
		init: function () {
			// create
			var oMockServer = new MockServer({
				rootUri: "/"
			});

			oMockServer.simulate("../localService/metadata.xml", {
			 	sMockdataBaseUrl: "../localService/mockdata",			//folder with files in JSON format
			 	bGenerateMissingMockData: true
			});

			oMockServer.start();
		}
	};

}); 