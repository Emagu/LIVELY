var sql = require("./lib/MySQL_X.js");
var tool = require("./lib/tool.js");
var db = new sql.DB();
var newData = [
    {
		key:"UA00",
		value:"6"
	},{
	    key:"GB01",
		value:"dfasdfasdfsfa測試asfsaasdfas2313215815617",
		type:"ENCRYPT"
	},{
		key:"GB000",
		value:tool.getTimeZone()
	}
];
console.log(tool.getTimeZone());
/*db.insert(newData,'GuestBook').then(function(data){
    console.log(data);
},function error(msg) {
    console.log(msg);
});*/
db.get("GuestBook").then(function(data){
	console.log(data);
}, function (err) { 
    console.log(err);
});
