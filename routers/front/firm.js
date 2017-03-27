'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const promise = require("promise");
const router = express.Router();
const Sql = require("../../lib/MySQL_X");
const Tool = require("../../lib/tool");
const AccountLib = require("../../lib/Account");
const fs = require("fs");
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
     // to support URL-encoded bodies
    extended: true
}));
router.use(function(req, res, next) {//權限認證
    if(req.session._admin!=null) AccountLib.checkLoginBySession(req.session._admin)
	    .then(function(data){
    		req.session.nickName = data;
    		req.session.save();
    		next();
    	},function(){
    	    req.session.save();
		    next();
	    });
    else{
        req.session.save();
        next();
    }
});
router.get('/', function (req, res) {
    if(req.query.NO==null){
        ErrorRender(req,res);
    }else{
        promise.all([new promise(function(success,fail){//機構資料蒐尋
            let DB = new Sql.DB();
            DB.select("F00","DEFAULT","ID");
            DB.select("F01","DECRYPT","no");
            DB.select("F02","DEFAULT","title");
            DB.select("F03A","DEFAULT","city");
            DB.select("F03B","DEFAULT","ctry");
            DB.select("F03C","DECRYPT","addr");
            DB.select("F04","DECRYPT","phone");
            DB.select("F05","DECRYPT","fax");
            //DB.select("F06","DECRYPT","fax");
            DB.select("F07","DEFAULT","type");
            DB.select("F08","DEFAULT","type2");
            DB.select("F09","DEFAULT","level");
            DB.select("F10","DEFAULT","price");
            DB.where("F00",req.query.NO);
            DB.where("F001",0);
            DB.get("Firm").then(function(resultData){
                if(resultData.length<=0){
                    ErrorRender(req,res);
                }else{
                    fs.readFile('./html/firm/'+resultData[0].no+'.txt',function(err,data){
                        if(err) {
                            console.error(err);
                            fail();
                        }else{
                            resultData[0].html = data.toString();
                            success(resultData[0]);
                        }
                    });
                }
            },function(err){
                console.error(err);
                fail();
            });
        }),
        new promise(function(success,fail){//留言搜尋
            let DB = new Sql.DB();
            DB.select("GB00","DEFAULT","NO");
            DB.select("UA06","DECRYPT","Name");
            DB.select("GB01","DECRYPT","data");
            DB.select("GB02","DECRYPT","reply");
            DB.select("GB000","DEFAULT","time");
            DB.select("GB001","DEFAULT","replyTime");
            DB.select("GB004","DEFAULT","replyStatus");
            DB.join("UserAccount","UserAccount.UA00=GuestBook.UA00");
            DB.where("F00",req.query.NO);
            DB.where("GB003",0);
            DB.get("GuestBook").then(function(resultData){
                for(var i=0;i<resultData.length;i++){
                    if(resultData[i].time!=null)  resultData[i].time = Tool.getTimeZone(null,null,resultData[i].time);
                    if(resultData[i].replyTime!=null)  resultData[i].replyTime = Tool.getTimeZone(null,null,resultData[i].replyTime);
                }
                success(resultData);
            },function(err){
                console.error(err);
                fail();
            });
        })
        ]).then(function (resultArray) {
            AccountLib.getAuthority(req.session._admin,"03").then(function(){
                Render(res,req,resultArray[0],resultArray[1],true);
            },function(){
                Render(res,req,resultArray[0],resultArray[1],false);
            });
            
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
router.post('/commentSumit',function(req, res){
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
                		key:"UA00",
            		    value:req.session._admin.userNO
            	    },{
                	    key:"F00",
            		    value:req.body.firmNO
            	    },{
                		key:"GB01",
            		    value:req.body.Message,
            		    action:"ENCRYPT"
            	    },{
                	    key:"GB000",
            	        value:Tool.getTimeZone()
            	    }
                ];
                db.insert(newData,'GuestBook', {
                    userNO: req.session._admin.userNO,
                    IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                }, 5).then(function(data){
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
        AccountLib.getAuthority(req.session._admin,"03").then(function(){
            var DB = new Sql.DB();
            var updateData = [
                {
                    key:"GB02",
                    value:req.body.Message,
                    action:"ENCRYPT"
                },{
                    key:"GB001",
                	value:Tool.getTimeZone()
                },{
                    key:"GB004",
                    value:1
                }
            ];
            DB.where("GB00",req.body.GusetBookNO);
            DB.update(updateData,'GuestBook', {
                userNO: req.session._admin.userNO,
                IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            }, 6).then(function(data){
                res.send("success");
            },function(err) {
                console.log(err);
                res.send("留言失敗");
            });
        },function(){
            res.send("權限不足");
        });
    }
});
router.post('/deleteReply',function(req, res) {
    if(req.session._admin == null){
        res.send("未登入");
    }else if(req.body.GusetBookNO == null){
        res.send("空留言");
    }else{
        AccountLib.getAuthority(req.session._admin,"03").then(function(){
            var DB = new Sql.DB();
            var updateData = [{
                    key:"GB004",
                	value:0
                }
            ];
            DB.where("GB00",req.body.GusetBookNO);
            DB.update(updateData,'GuestBook', {
                userNO: req.session._admin.userNO,
                IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            }, 7).then(function(data){
                res.send("success");
            },function(err) {
                console.log(err);
                res.send("失敗");
            });
        },function(){
            res.send("權限不足");
        });
        
    }
});
router.post('/deleteComment',function(req, res) {
    if(req.session._admin == null){
        res.send("未登入");
    }else if(req.body.GusetBookNO == null){
        res.send("空留言");
    }else{
        AccountLib.getAuthority(req.session._admin,"03").then(function(){
            var DB = new Sql.DB();
            var updateData = [{
                    key:"GB003",
                	value:1
                }
            ];
            DB.where("GB00",req.body.GusetBookNO);
            DB.update(updateData,'GuestBook', {
                userNO: req.session._admin.userNO,
                IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            }, 8).then(function(data){
                res.send("success");
            },function(err) {
                console.log(err);
                res.send("失敗");
            });
        },function(){
            res.send("權限不足");
        });
        
    }
});
router.get('*', ErrorRender);
//method
function Render(res,req,firm,guestBook,isManger) {
    res.render('layouts/front_layout', {
        Title: firm.title,
        Login: req.session.nickName,
        CSSs: [
            
        ],
        JavaScripts: [
            "/public/js/Taiwan_Administrative_Region.js"
        ],
        Include: [
            { url: "../pages/front/firm", value: {
                                        firm:firm,
                                        guestBook:guestBook,
                                        isManger:isManger
                                    } 
            }
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
            
        ]
    });
}
module.exports = router;