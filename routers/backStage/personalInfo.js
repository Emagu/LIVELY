'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const SQL = require("../../lib/MySQL_X");
const AccountRule = require("../../config/Account");
let router = express.Router();
router.use(busboy());
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
     // to support URL-encoded bodies
    extended: true
}));
router.use(function(req, res, next) {//權限認證
    if(req.session._admin != null){
        next();
	}else res.redirect('/front');
});
router.get('/', function (req, res) {
    let DB = new SQL.DB();
    DB.select("UA00","DEFAULT","id");
    DB.select("UA01","DECRYPT","account");
    DB.select("UA03","DECRYPT","phone");
    DB.select("UA04","DECRYPT","Email");
    DB.select("UA06","DECRYPT","nickname");
    DB.get("UserAccount").then(function(data){
        if(data.length>0)
            Render(res,req,data[0]);
        else
            ErrorRender(req,res);
    });
});
router.post("/editEmail",function(req,res){
    if(req.body.userNO != null && req.body.email !=null){
        if(!AccountRule.MailRegularize.test(req.body.email)){
            res.send("修改錯誤");
            return;
        }else{
            let DB = new SQL.DB();
            DB.where("UA00",req.body.userNO);
            DB.update([{
                key:"UA04",
                value:req.body.email,
                action:"ENCRYPT"
            }],"UserAccount",{
                userNO: req.session._admin.userNO,
                IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            },12).then(function(){
                res.send("success");
            },function(e){
                console.error(e);
                res.send("修改錯誤");
            }); 
        }
    }else{
        res.send("修改錯誤");
    }
});
router.post("/editNickName",function(req,res){
    if(req.body.userNO != null && req.body.nickname !=null){
        let nickNameTest = req.body.nickname.length;
        if(AccountRule.NickNameMin > nickNameTest || nickNameTest > AccountRule.NickNameMax){
            res.send("修改錯誤");
            return;
        }else{
            let DB = new SQL.DB();
            DB.where("UA00",req.body.userNO);
            DB.update([{
                key:"UA06",
                value:req.body.nickname,
                action:"ENCRYPT"
            }],"UserAccount",{
                userNO: req.session._admin.userNO,
                IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            },13).then(function(){
                res.send("success");
            },function(e){
                console.error(e);
                res.send("修改錯誤");
            }); 
        }
    }else{
        res.send("修改錯誤");
    }
});
router.post("/editPhone",function(req,res){
    if(req.body.userNO != null && req.body.phone !=null){
        if(!AccountRule.PhoneRegularize.test(req.body.phone)){
            res.send("修改錯誤");
            return;
        }else{
            let DB = new SQL.DB();
            DB.where("UA00",req.body.userNO);
            DB.update([{
                key:"UA03",
                value:req.body.phone,
                action:"ENCRYPT"
            }],"UserAccount",{
                userNO: req.session._admin.userNO,
                IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            },14).then(function(){
                res.send("success");
            },function(e){
                console.error(e);
                res.send("修改錯誤");
            }); 
        }
    }else{
        res.send("修改錯誤");
    }
});
router.get('*',ErrorRender);
function Render(res,req,userData) {
    res.render('layouts/backStage_layout2', {
        Title: "會員管理-個人資料管理",
        Login: req.session._admin.nickName,
        Authority: req.session._admin.Authority,
        CSSs: [
        ],
        JavaScripts: [
        ],
        Include: [
            {url:"../pages/backStage/personalInfo",value:userData}
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
        Include: [
            
        ],
        Script: [	
            
        ]
    });
}
module.exports = router;