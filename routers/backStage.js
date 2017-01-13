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
    console.log(req.session);
    //Render(res);
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