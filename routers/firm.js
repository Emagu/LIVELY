'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Sql = require("../lib/MySQL_X");
const Tool = require("../lib/tool");
const AccountLib = require("../lib/Account");
const fs = require("fs");
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
     // to support URL-encoded bodies
    extended: true
}));
router.use(function(req, res, next) {//權限認證
    if(req.session._admin!=null) AccountLib.checkLoginBySession(req.session._admin)
	    .then(function(){
    		req.session.isLogin = true;
    		req.session.save();
    		next();
    	},function(){
    	    req.session.isLogin = false;
    	    req.session.save();
		    next();
	    });
    else{
        req.session.isLogin = false;
        req.session.save();
        next();
    }
});
router.get('/', function (req, res) {
    if(req.query.NO==null){
        ErrorRender(res);
    }else{
        let DB = new Sql.DB();
        DB.select("F01","DECRYPT","no");
        DB.select("F02","DECRYPT","title");
        DB.select("F03A","DEFAULT","city");
        DB.select("F03B","DEFAULT","ctry");
        DB.select("F03C","DECRYPT","addr");
        DB.select("F04","DECRYPT","phone");
        DB.select("F05","DECRYPT","fax");
        DB.where("F00",req.query.NO);
        DB.get("Firm").then(function(resultData){
            if(resultData.length<=0){
                ErrorRender(req,res);
            }else{
                fs.readFile('./html/firm/'+resultData[0].no+'.txt',function(err,data){
                    if(err) {
                        console.error(err);
                        ErrorRender(res);
                    }else{
                        resultData[0].html = data.toString();
                        Render(res,req.session.isLogin,resultData[0]);
                    }
                });
            }
        },function(err){
            console.error(err);
            ErrorRender(res);
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
router.get('*', ErrorRender);
//method
function Render(res,login,firm) {
    res.render('layouts/front_layout', {
        Title: firm.title,
        Login: login,
        CSSs: [
            
        ],
        JavaScripts: [
            "/public/js/Taiwan_Administrative_Region.js"
        ],
        Include: [
            { url: "../pages/firm", value: firm }
        ],
        Script: [	
        ]
    });
}
function ErrorRender(req,res) {//無畫面
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