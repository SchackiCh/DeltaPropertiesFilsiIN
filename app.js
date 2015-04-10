var sql = require('./sql');
var fi = require('./fisi');
var sort = require('./sort');

// var result = { "cwid": '012.0012000001E83jf', "in":-100, "fi":-100}
// var result2 = { "cwid": '012.0012000001E3qjM', "in":-100, "fi":-100}
// var r = [result, result2]
var context = []

sql.getAllCustomersWithCwids(fillCwid);
//allCwids.forEach(addCwid);
//console.log("1");
//context.forEach(getValues);
//console.log("3");

function fillCwid(cwids) {
	cwids.forEach(addCwid);
}

function addCwid(cwid, index, array) {
	context.push({ cwid:cwid["cwid"], in:-100, fi:-100, delta:function() { return Math.abs(this.fi - this.in); }});
  getValues(cwid["cwid"]);
}

function getValues(cwid, index, array) {
	sql.getPropertyCount(cwid, function(count){
		setINValue(cwid, count);
		logIfAllDataReady();
	});
	fi.getPropertyCount(cwid, function(count){
		//console.log('filsiData:' + count);
		setFIValue(cwid, count);
		logIfAllDataReady();
	});

}

function setINValue(cwid, inValue){

		//console.log("---------");
	for (var i = context.length - 1; i >= 0; i--) {
		//console.log("context[i].cwid:" + context[i].cwid + "  cwid:" + cwid);

		if(context[i].cwid == cwid)	{
			context[i].in = inValue;
			//console.log("context[i].in:" + context[i].in + " inValue:" + inValue);
		}
	}
};
function setFIValue(cwid, fiValue){
	for (var i = context.length - 1; i >= 0; i--) {
		if(context[i].cwid == cwid)
			context[i].fi = fiValue;
	}
};

function logIfAllDataReady()
{
	for (var i = context.length - 1; i >= 0; i--) {
		if(context[i].in == -100 || context[i].fi ==-100)
			return;
	}

	context.sort(sort.dynamicSortByFunctionName("-delta"));
	//alle IN und Fisi Daten befuellt => Ausgabe
	context.forEach(logArrayElements)
}

function logArrayElements(element, index, array) {
  console.log('cwid:' + element.cwid + ' IN:' + element.in + ' Fisi:' + element.fi + ' Delta:' + element.delta());
}
