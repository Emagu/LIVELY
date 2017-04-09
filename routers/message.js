'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let Sql = require("../lib/MySQL_X");
let Tool = require("../lib/tool");
let AccountLib = require("../lib/Account");
let router = express.Router();
let DEFAULT_ACCOUNT = require("../config/CustomerService").AccountNO;//接待用帳號
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
}));
router.use(function(req, res, next) {//權限認證
    if(req.session._admin!=null)    AccountLib.checkLoginBySession(req.session._admin).then(next,AccountLib.logout);
    else res.redirect("/front");
});
router.post('/getMessageList',function(req, res) {
    let DB = new Sql.DB();
    DB.select("UserAccount.UA06","DECRYPT","nickName");
    DB.select("UserAccount.UA00","DEFAULT","no");
    DB.select("Message.M001","DEFAULT","isRead");
    DB.where("UA00B",req.session._admin.userNO);
    //DB.where("M003",0);
    DB.join("UserAccount","UserAccount.UA00=Message.UA00A");
    DB.get("Message").then(function(unread){
        res.json(unread);
    },function(e){
        console.error(e);
        res.json("error");
    });
});
router.post("/getMessage",function(req, res) {
    let DB = new Sql.DB();
    let no = req.body.no;
    if(no==null)no = DEFAULT_ACCOUNT;
    DB.select("M00","DEFAULT","no");
    DB.select("M01","DECRYPT","text");
    DB.select("UA00A","DEFAULT","sender");
    DB.select("M001","DEFAULT","isRead");
    DB.where("(UA00B="+req.session._admin.userNO+" AND UA00A="+no+")","null","null","AND");
    DB.where("(UA00A="+req.session._admin.userNO+" AND UA00B="+no+")","null","null","OR");
    //DB.where("M003",0);
    DB.get("Message").then(function(message){
        res.json(message);
    },function(e){
        console.error(e);
        res.json("error");
    });
});
router.post('/send',function (req, res) {//發出訊息
    let SendTo = req.body.SendTo;
    if(SendTo == null || SendTo == ""){
        SendTo = DEFAULT_ACCOUNT;
    }
    let DB = new Sql.DB();
    DB.insert([
        {
            key:"UA00A",
            value:req.session._admin.userNO
        },
        {
            key:"UA00B",
            value:SendTo
        },
        {
            key:"M01",
            value:req.body.Message,
            action:"ENCRYPT"
        },
        {
            key:"M000",
            value:Tool.getTimeZone()
        }
    ],"Message",{
        userNO: req.session._admin.userNO,
        IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    },15).then(function(){
        res.send("success");
    },function(){
        res.send("發送失敗");
    });
});
router.post("/updateReadStatus",function(req, res) {
    let DB = new Sql.DB();
    DB.where("M00",req.body.no);
    DB.update([
        {
            key:"M001",
            value:1
        }
    ],"Message",{
        userNO: req.session._admin.userNO,
        IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    },16).then(function(){
        res.send("success");
    },function(err){
        console.error(err);
        res.send("error");
    });
});
router.get('*', function(req, res){
    ErrorRender(res);
});
function ErrorRender(res) {//無畫面
    res.render('layouts/error_layout', {
        Title: "無法顯示頁面",
        CSSs: [
        ],
        JavaScripts: [
        ],
        //為了傳送Value所以根目錄一樣是./views開始算
        Include: [
            
        ]
    });
}
module.exports = router;