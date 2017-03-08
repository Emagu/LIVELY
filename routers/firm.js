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
    if(req.query.NO==null){
        ErrorRender(res);
    }else{
        var DB = new Sql.DB();
        DB.select("F00","DEFAULT","No");
        DB.select("F01","DECRYPT","GovernmentNo");
        DB.select("F02","DECRYPT","Name");
        DB.select("F03A","DEFAULT","CountyNo");
        DB.select("F03B","DEFAULT","TownshipNo");
        DB.select("F03C","DECRYPT","Address");
        DB.select("F04","DECRYPT","Telephone");
        DB.select("F05","DECRYPT","Fax");
        DB.where("F00",req.query.NO);
        DB.get("Firm").then(function(resultData){
            if(resultData.length<=0){
                ErrorRender(res);
            }else{
                Render(res,resultData[0]);
            }
        },function(err){
            ErrorRender(res);
            console.log(err);
        });
    }
});

/**
 * 留言
 * @param {string} Message      : 訊息
 * @param {string} firmNO       : 機構編號(F00)
 * --------------------------------------------
 * 回傳值
 * @status {string} "success"
 * @status {string} 各類錯誤訊息
 **/
router.post('/message',function(req, res){
    if(req.session._admin == null){
        res.send("未登入");
    }else if(req.body.Message == null){
        res.send("空訊息");
    }else if(req.body.firmNO == null){
        res.send("空機構");
    }else{
        var DB = new Sql.DB();
        DB.select("1");
        DB.where("F00",req.body.firmNO.trim());
        DB.get("Firm").then(function(resultData){
            if(resultData.length>0){
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
            	    },{
                	    key:"GB000",
            	        value:Tool.getTimeZone()
            	    }
                ];
                db.insert(newData,'GuestBook').then(function(data){
                    res.send("success");
                },function(err) {
                    console.log(err);
                    res.send("留言失敗");
                });
            }else{
                res.send("空機構");
            }
        });
    }
});
/**
 * 回覆
 * @param {string} Message      : 訊息
 * @param {string} GusetBookNO  : 留言編號(GB00)
 * --------------------------------------------
 * 回傳值
 * @status {string} "success"
 * @status {string} 各類錯誤訊息
 **/
router.post('/reply',function(req, res){
    if(req.session._admin == null){
        res.send("未登入");
    }else if(req.body.Message == null){
        res.send("空訊息");
    }else if(req.body.GusetBookNO == null){
        res.send("空留言");
    }else{
        var DB = new Sql.DB();
        var updateData = [
            {
                key:"UA00B",
                value:req.session._admin.userNO
            },{
                key:"GB02",
                value:req.body.Message,
                type:"ENCRYPT"
            },{
                key:"GB001",
            	value:Tool.getTimeZone()
            }
        ];
        DB.where("GB00",req.body.GusetBookNO);
        DB.update(updateData,'GuestBook').then(function(data){
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
function Render(res,firmData) {
    res.render('layouts/firm_layout', {//因為前面在app.js有設定views的root資料夾在./views所以這邊路徑是從./views開始算
        /*
         * 參數資料從server根目錄開始算
         * */
        Title: "機構",
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
            { url: "../pages/firm", value: firmData }
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