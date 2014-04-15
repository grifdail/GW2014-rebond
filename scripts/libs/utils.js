define([], function (){

	var Utils = function(){		
	}

	function addAntiCache(url) {
		return url+="?d="+Date.now();
	}

	Utils.prototype.loadJSONFiles = function(files){
		var jsonFiles = { };
		for (fileName in files){
			jsonFiles[fileName] = { 
				fileName : files[fileName] , 
				file: httpGetData(files[fileName]) 
			};
		}
		console.info("loadJSONFiles(...) JSON files loaded",jsonFiles);
		return jsonFiles;
	}

	// utility Utils.prototype.for loading assets from server
	Utils.prototype.httpGet = function(theUrl) {
		var xmlHttp = null;
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET",  addAntiCache(theUrl), false);
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}

	// utility Utils.prototype.for loading json data from server
	Utils.prototype.httpGetData = function(theUrl) {
		var responseText = this.httpGet(theUrl);
		return JSON.parse(responseText);
	}
	return new Utils();
});
