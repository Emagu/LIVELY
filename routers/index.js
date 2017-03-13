'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Sql = require("../lib/MySQL_X");
const Tool = require("../lib/tool");
const AccountLib = require("../lib/Account");
const AccountRule = require("../config/Account");
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
     // to support URL-encoded bodies
    extended: true
}));
router.get('/', function (req, res) {
	AccountLib.checkLoginBySession(req.session._admin)
	.then(function(){
		Render(res,true);
	},function(){
		Render(res,false);
	});
});
/**
 * 登入
 * @param {string} Account   : 使用者帳號(UA01)
 * @param {string} Password  : 使用者密碼(UA02)
 * --------------------------------------------
 * 回傳值
 * @status {string} "success"
 * @status {string} 各類錯誤訊息
 **/
router.post("/login", function (req, res) {
    var DB = new Sql.DB();
    DB.select("UA00",'DEFAULT','userNO');
    DB.select("UA01",'DEFAULT','userID');
    DB.select("UA001");
    DB.where("UA01",req.body.Account.trim(),"=","AND","ENCRYPT");
    DB.where("UA02",req.body.Password.trim(),"=","AND","HASH");
    DB.where("UA002","0");
    DB.get("UserAccount").then(function(resultData){
        if (resultData.length <= 0) {
            res.send("帳號或密碼不正確!");
        } else if (resultData[0].UA003 == 0) {
            res.send("帳號尚未認證啟用！");
        } else {//登入成功
            DB.update([	
                {
                    key:"UA001",
                    value:Tool.getTimeZone()
                }
            ]
            ,"UserAccount",{
                userNO: resultData[0].userNO,
                IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            },3).then(function(){
				req.session._admin = {
					userNO: resultData[0].userNO,
					userID: resultData[0].userID
				};
				req.session.save();
				res.send("success");
            },function(err){
                console.error(err);
            });
        }
    });
});
/**
 * 註冊
 * @param {string} Account      : 使用者帳號(UA01)
 * @param {string} Password     : 使用者密碼(UA02)
 * @param {string} Password_RE  : 使用者密碼確認(UA02)
 * @param {string} Phone        : 使用者手機(UA03)
 * @param {string} Email        : 使用者信箱(UA04)
 * @param {string} Name         : 使用者姓名(UA05)
 * --------------------------------------------
 * 回傳值
 * @status {string} "success"
 * @status {string} "註冊失敗"
 **/
router.post("/register", function (req, res) {
   /*資料格試驗證*/
    let newData = [];
    if(req.body.Account!=null){
        let accountTest = req.body.Account.length;
        if(AccountRule.AccountMin > accountTest || accountTest > AccountRule.AccountMax){
            res.send("帳號格式錯誤");
            return;
        }else{
            newData.push({
        		key:"UA01",
    		    value:req.body.Account,
    		    action:"ENCRYPT"
    	    });
        }
    }else{
        res.send("帳號格式錯誤");
        return;
    }
    if(req.body.Password!=null){
        let passwordTest = req.body.Password.length;
        if(AccountRule.PasswordMin > passwordTest || passwordTest > AccountRule.PasswordMax){
            res.send("密碼格式錯誤");
            return;
        }
    }else{
        res.send("密碼格式錯誤");
        return;
    }
    if(req.body.Password_RE!=null){
        let passwordReTest = req.body.Password_RE.length;
        if(AccountRule.PasswordMin > passwordReTest || passwordReTest > AccountRule.PasswordMax){
            res.send("兩次密碼輸入不相同");
            return;
        }else if(req.body.Password_RE != req.body.Password){
            res.send("兩次密碼輸入不相同");
            return;
        }else{
            newData.push({
        		key:"UA02",
    		    value:req.body.Password,
    		    action:"HASH"
    	    });
        }
    }else{
        res.send("兩次密碼輸入不相同");
        return;
    }
    if(req.body.Phone!=null){
        let PhoneTest = req.body.Phone;
        if(AccountRule.PhoneRegularize.test(PhoneTest)){
            res.send("手機格式錯誤");
            return;
        }else{
            newData.push({
        		key:"UA03",
    		    value:req.body.Phone,
    		    action:"ENCRYPT"
    	    });
        }
    }else{
        res.send("手機格式錯誤");
        return;
    }
    if(req.body.Email!=null){
        let EmailTest = req.body.Email;
        if(!AccountRule.MailRegularize.test(EmailTest)){
            res.send("信箱格式錯誤");
            return;
        }else{
            newData.push({
        		key:"UA04",
    	        value:req.body.Email,
    	        action:"ENCRYPT"
    	    });
        }
    }else{
        res.send("信箱格式錯誤");
        return;
    }
	let userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let db = new Sql.DB();
    newData.push({
            key:"UA05",
            value:req.body.Name,
    		action:"ENCRYPT"
        });
    newData.push({
            key:"UA000",
            value:Tool.getTimeZone()
        });
    newData.push({
            key:"UA001",
            value:Tool.getTimeZone()
        });
    db.insert(newData,'UserAccount',{
        userNO: -1,//系統
        IP: userIP
    },2).then(function(data){
		/*STMPMail.register({//寄出認證信
			account : req.body.Account,
			mail : req.body.Email,
			IP: userIP,
			userNO: data.insertId
		},'http://' + req.get('host')).then(function(){
			res.send("success");
		},function(err){
			console.error(err);
			res.send("認證信寄出失敗");
		});*/
		res.send("success");
    },function(err) {
        console.error(err);
        res.send("註冊失敗");
    });
});
router.post("/logout", AccountLib.logout);
router.get('*',ErrorRender);
function Render(res,login) {
    res.render('layouts/front_layout', {
        Title: "首頁",
        Login: login,
        CSSs: [
        ],
        JavaScripts: [
        ],
        Include: [
            { url: "../pages/index", value: {} }
        ],
        Script: [	
            
        ]
    });
}
function ErrorRender(req, res) {//無畫面
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