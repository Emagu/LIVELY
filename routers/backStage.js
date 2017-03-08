'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Sql = require("../lib/MySQL_X");
var Tool = require("../lib/tool");
var AccountLib = require("../lib/Account");
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
     // to support URL-encoded bodies
    extended: true
}));
router.use(function(req, res, next) {//權限認證
  if(req.session._admin != null)  AccountLib.checkLoginBySession(req.session._admin).then(next,AccountLib.logout);  
  else res.redirect('/login');
});
router.get('/', function (req, res) {
    console.log(req.session);
    //Render(res);
});

/**
 * 新增機構
 * @param {string} Name         : 訊息
 * @param {string} CityNo       : 縣市編號
 * @param {string} TownShipNO   : 鄉鎮編號
 * @param {string} Address      : 地址
 * @param {string} GovernmentNo : 政府編號
 * @param {string} Phone        : 電話
 * @param {string} Fax          : 傳真
 * --------------------------------------------
 * 回傳值
 * @status {string} "success"
 * @status {string} 各類錯誤訊息
 **/
router.post('/newFirm',function(req, res){
    if(req.session._admin == null){
        res.send("未登入");
    }else if(req.body.Message == null){
        res.send("空訊息");
    }else if(req.body.firmNO == null){
        res.send("空機構");
    }else{
        var db = new Sql.DB();
        var newData = [
            {
                key:"UA00A",
                value:req.session._admin.userNO
            },{
                key:"F00",
                value:req.body.firmNO
            },{
                key:"GB01",
                value:req.body.Message,
                type:"ENCRYPT"
            }
        ];
        db.insert(newData,'GuestBook').then(function(data){
            res.send("success");
        },function(err) {
            console.log(err);
            res.send("留言失敗");
        });
    }
});
router.get('*', function (req, res) {//404~
    ErrorRender(res);
});
//method
function ClientRender(res) {//一般使用者
    res.render('layouts/firm_layout', {//因為前面在app.js有設定views的root資料夾在./views所以這邊路徑是從./views開始算
        /*
         * 參數資料從server根目錄開始算
         * */
        Title: "管理後台",
        CSSs: [
            { url: "./public/css/toastr.min.css", local: "head" },
        ],
        JavaScripts: [
            { url: "./public/js/toastr.min.js", local: "head" },
            { url: "./public/js/jquery.backstretch.min.js", local: "head" },
            { url: "./public/js/jquery.validate.js", local: "head" }
        ],
        //為了傳送Value所以根目錄一樣是./views開始算
        Include: [
            { url: "../pages/firm", value: {} }
        ],
        Script: [	
            { url: "../script/firm", value: {} }
        ]
    });
}
function MangerRender(res) {//一般使用者
    res.render('layouts/firm_layout', {//因為前面在app.js有設定views的root資料夾在./views所以這邊路徑是從./views開始算
        /*
         * 參數資料從server根目錄開始算
         * */
        Title: "管理後台",
        CSSs: [
            { url: "./public/css/toastr.min.css", local: "head" },
        ],
        JavaScripts: [
            { url: "./public/js/toastr.min.js", local: "head" },
            { url: "./public/js/jquery.backstretch.min.js", local: "head" },
            { url: "./public/js/jquery.validate.js", local: "head" }
        ],
        //為了傳送Value所以根目錄一樣是./views開始算
        Include: [
            { url: "../pages/firm", value: {} }
        ],
        Script: [	
            { url: "../script/firm", value: {} }
        ]
    });
}
function ErrorRender(res) {//無畫面
    res.render('layouts/error_layout', {
        Title: "無法顯示頁面",
        CSSs: [
        ],
        JavaScripts: [
        ],
        //為了傳送Value所以根目錄一樣是./views開始算
        Include: [
            
        ],
        Script: [	
            
        ]
    });
}
module.exports = router;