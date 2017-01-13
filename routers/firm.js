'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Sql = require("../lib/MySQL_X");
var Tool = require("../lib/tool");
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
     // to support URL-encoded bodies
    extended: true
}));
router.get('/', function (req, res) {//路由攔劫~
    console.log(req.query.NO);
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