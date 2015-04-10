var sql = require('mssql');

 function getPropertyCount(cwid, callback){
 var config = {
   user: 'eresusername',
   password: 'erespassword',
   server: 'sqlm200\\my_dispatcher_base',
   database: 'Dispatcher',

   //options: {
   //    encrypt: true // use this if you're on windows azure
   //}
 }

	  var connection = new sql.Connection(config, function(err) {
		// ... error checks

		// Query

		var request = new sql.Request(connection); // or: var request = connection.request();
		var selectText = 'select count(*) from immo.Immobilien where online=1 and fk_Kanzlei in (Select id from immo.Kanzleien where CWID=\'' + cwid + '\'COLLATE SQL_Latin1_General_CP1_CS_AS)';
		request.query(selectText, function(err, recordset) {
			// ... error checks
			 console.log(recordset);
			// console.log(recordset[0].number);
		  //console.log(cwid + ' SQL:' + fils.exposes.length + " query:" + );
      if(recordset == undefined || recordset[0] == undefined){

         console.log(recordset);
         callback(0);
       }
      else{
	       callback(recordset[0][0]);
       }
			connection.close();
		});
		request.on('error', function(err) {
			console.log('ERROR:' + err);
		});

		request.on('done', function(returnValue) {
			//console.log('DONE');
		});
	});
}

 function getAllCustomersWithCwids(callback){
 var config = {
   user: 'eresusername',
   password: 'erespassword',
   server: 'sqlw2',
   database: 'Dispatcher',

   //options: {
   //    encrypt: true // use this if you're on windows azure
   //}
 }

    var connection = new sql.Connection(config, function(err) {
    // ... error checks

    // Query

    var request = new sql.Request(connection); // or: var request = connection.request();
    var selectText = 'select top 10 cwid from immo.Kanzleien where cwid is not null';
    request.query(selectText, function(err, recordset) {
      callback(recordset);
      connection.close();
    });
    request.on('error', function(err) {
      //console.log('ERROR:' + err);
    });

    request.on('done', function(returnValue) {
      //console.log('DONE');
    });
  });
}
module.exports.getPropertyCount = getPropertyCount;
module.exports.getAllCustomersWithCwids = getAllCustomersWithCwids;
