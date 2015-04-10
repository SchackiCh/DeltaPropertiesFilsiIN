
function getPropertyCount(cwid, callback){
	var Client = require('node-rest-client').Client;
	client = new Client();
	var url = "https://www.eineGuteUrl.de/is24at-online/REST-API/GetExposeIDs/" + cwid ;
	client.get(url, function(data, response){
		 var fils = JSON.parse(data);
		callback(fils.exposes.length);
		//console.log('fils.exposes.length);
    });
}

module.exports.getPropertyCount = getPropertyCount
