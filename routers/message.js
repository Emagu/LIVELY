'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var Sql = require("../lib/MySQL_X");
var Tool = require("../lib/tool");
var router = express.Router();
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
}));
router.get('/', function (req, res) {//路由攔劫~
    testRender(res);
});
router.post('/send',function (req, res) {//發出訊息
    var DB = new Sql.DB();
    DB.insert([
        {
            key:"UA00A",
            value:req.session._admin.userNO
        },
        {
            key:"UA00B",
            value:req.body.SendTo
        },
        {
            key:"M01",
            value:req.body.Message,
            type:"ENCRYPT"
        },
        {
            key:"M000",
            value:Tool.getTimeZone
        }
    ],"Message").then(function(){
        res.send("secces");
    },function(){
        res.send("發送失敗");
    });
});
//method
function testRender(res) {
    res.render('layouts/login_layout', {
        Title: "測試",
        CSSs: [
            { url: "./public/css/toastr.min.css", local: "head" },
        ],
        JavaScripts: [
            { url: "./public/js/toastr.min.js", local: "head" },
            { url: "./public/js/jquery.backstretch.min.js", local: "head" },
            { url: "./public/js/jquery.validate.js", local: "head" }
        ],
        Include: [
            { url: "../pages/test", value: {} }
        ],
        Script: [	
            { url: "../script/message", value: {} }
        ]
    });
}
module.exports = router;