var COOKIES = require('cookie');
var Sql = require("./MySQL_X");
var Users = [];
var WebSocket = function(http,session){
    var io = require('socket.io')(http);
    //Session初始化
	io.use(function(socket, next) {
		session(socket.request, socket.request.res, next);
    });
    //客戶連線瞜~
    io.on("connection", function (socket){
        //socket = 客戶端
		var cookiesObject = COOKIES.parse(socket.request.headers.cookie);
        var SessionObject = socket.request.session;
        var user = SessionObject._admin;
        if(user!=null){
            user.socket = socket;
            Users[user.userNO] = user;
            socket.userNO = user.userNO;
    		socket.on('disconnect', function () {
    		    delete Users[socket.userNO];
    			console.log('disconnect');
    		});
        }
	});
	setInterval(function(){//週期任務
	    Users.forEach(function(user){//所有已連線使用者
	        //判斷是否有為接收的訊息
	        getNewMessage(user.userNO).then(function(data){
	            if(data.length>0) {
	                updateMessageStatus(data[0].NO);
	                user.socket.emit("SendMessage",data[0]);
	            }
	        });
	    });
	},1000);
};
/**
 * 取得為傳送的訊息
 * @param {int} userNo  : 接收者的userNO(UA00)
 **/
function getNewMessage(userNO){
    var DB = new Sql.DB();
    DB.select("M00","DEFAULT","NO");
    DB.select("M01","DECRYPT","Message");
    DB.select("UA01","DECRYPT","Sender");
    DB.select("UA00","DEFAULT","SenderNO");
    DB.join("UserAccount","Message.UA00A=UserAccount.UA00");
    DB.where("UA00B",userNO);
    DB.where("M002",0);
    return DB.get("Message");
}
/**
 * 更新傳送的訊息的狀態
 * @param {int} MessageNo  : 剛傳送訊息的MessageNO(M00)
 **/
function updateMessageStatus(MessageNO){
    var DB = new Sql.DB();
    DB.where("M00",MessageNO.toString());
    DB.update([
        {
            key:"M002",
            value:1
        }
    ],"Message").then(function(){
        console.log("susses");
    },function(err){
        console.log(err);
    });
}
module.exports = WebSocket;