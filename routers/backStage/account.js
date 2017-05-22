'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const SQL = require("../../lib/MySQL_X");
const Tool = require("../../lib/tool");
const AccountLib = require("../../lib/Account");
let router = express.Router();
router.use(busboy());
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
     // to support URL-encoded bodies
    extended: true
}));
router.use(function(req, res, next) {//權限認證
    if(req.session._admin != null){
		AccountLib.getAuthority(req.session._admin,"01").then(next,function(){
            res.redirect('/front');
        });
	}else res.redirect('/front');
});
router.get('/', function (req, res) {
    Render(res,req);
});
router.post("/getAccountTable",function(req,res){
    let DB = new SQL.DB();
    let pageLimit = parseInt(req.body.pageLimit);//單頁數量
    let pages = parseInt(req.body.pages);//所選頁數
    let sortColums = req.body.sortSetting.colums;//排列欄位設定資料
    let firstSort = req.body.sortSetting.sortColums;//最優先排列欄位名稱
    DB.select("1");
    if(req.body.search !=null && req.body.search != ""){
        switch(req.body.searchType){
            case "NO":
                DB.where("UA00",req.body.search);
                break;
            case "Name":
                DB.where("UserAccount.UA01","%"+req.body.search+"%","LIKE","AND","DEFAULT","DECRYPT");
                break;
            case "NickName":
                DB.where("UserAccount.UA06","%"+req.body.search+"%","LIKE","AND","DEFAULT","DECRYPT");
                break;
        }
    }
    DB.join("AccountAuthority","AccountAuthority.UA00=UserAccount.UA00");
    DB.get("UserAccount").then(function (countData) {
        DB.select("UserAccount.UA00", "DEFAULT", "ID");
        DB.select("UserAccount.UA01", "DECRYPT", "Account");
        DB.select("UserAccount.UA06", "DECRYPT", "NickName");
        DB.select("AccountAuthority.AA01", "DEFAULT", "A_1");
        DB.select("AccountAuthority.AA02", "DEFAULT", "A_2");
        DB.select("AccountAuthority.AA02", "DEFAULT", "A_3");
        if(firstSort != null) {
            if (sortColums.hasOwnProperty(firstSort)){
                let sortType = sortColums[firstSort];
                if (sortType == 'DESC' || sortType == 'desc' || sortType == "ASC" || sortType == "asc") { 
                    DB.orderBy(firstSort, sortType);
                }
            }
        }
        for (var key in sortColums) {
            if (sortColums.hasOwnProperty(key)) {
                let sortType = sortColums[key];
                if ((sortType == 'DESC' || sortType == 'desc' || sortType == "ASC" || sortType == "asc") && sortType != firstSort) { 
                    DB.orderBy(key, sortType);
                }
            }
        }
        DB.limit(pages*pageLimit, pageLimit);
        DB.get("UserAccount").then(function (pageData) {
            res.json({
                rowsData: pageData,
                TotalDataNum: countData.length
            });
        }, function (err) {
            console.error(err);
            res.json("搜尋失敗");
        });
    }, function (err) {
        console.error(err);
        res.json("搜尋失敗");
    }); 
});
router.post("/getAccountDetail",function(req,res){
    let DB = new SQL.DB();
    DB.select("UserAccount.UA00", "DEFAULT", "ID");
    DB.select("UserAccount.UA01", "DECRYPT", "Account");
    DB.select("UserAccount.UA06", "DECRYPT", "NickName");
    DB.select("AccountAuthority.AA01", "DEFAULT", "A_1");
    DB.select("AccountAuthority.AA02", "DEFAULT", "A_2");
    DB.select("AccountAuthority.AA02", "DEFAULT", "A_3");
    DB.where("UserAccount.UA00",req.body.NO);
    DB.join("AccountAuthority","AccountAuthority.UA00=UserAccount.UA00");
    DB.get("UserAccount").then(function (Data) {
        if(Data.length>0){
            res.json(Data[0]);
        }else{
            res.json("error");
        }
    });
});
router.post("/editAccountDetail",function(req, res) {
    let DB = new SQL.DB();
    let updateArray = [];
    if(req.body.AA1 == "true" || req.body.AA1 == "false"){
        updateArray.push({
            key:"AA01",
            value:req.body.AA1 == "true" ? 1 : 0
        });
    }
    if(req.body.AA2 == "true" || req.body.AA2 == "false"){
        updateArray.push({
            key:"AA02",
            value:req.body.AA2 == "true" ? 1 : 0
        });
    }
    if(req.body.AA3 == "true" || req.body.AA3 == "false"){
        updateArray.push({
            key:"AA03",
            value:req.body.AA3 == "true" ? 1 : 0
        });
    }
    if(updateArray.length > 0 && req.body.UserNO != null){
        updateArray.push({
            key:"AA000",
            value:Tool.getTimeZone()
        });
        DB.select(1);
        DB.where("UA00",req.body.UserNO);
        DB.get("AccountAuthority").then(function(status){
            DB = new SQL.DB();
            if(status.length>0){
                DB.where("UA00",req.body.UserNO);
                DB.update(updateArray,"AccountAuthority",{
                    userNO: req.session._admin.userNO,
                    IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                },10).then(function(){
                    res.send("success");
                },function(e){
                    console.error(e);
                    res.send("修改錯誤");
                });
            }else{
                updateArray.push({
                    key:"UA00",
                    value:req.body.UserNO
                });
                DB.insert(updateArray,"AccountAuthority",{
                    userNO: req.session._admin.userNO,
                    IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                },11).then(function(){
                    res.send("success");
                },function(e){
                    console.error(e);
                    res.send("修改錯誤");
                });
            }
        },function(e){
            console.error(e);
            res.send("資料庫錯誤");
        });
        
    }else{
        res.send("success");
    }
});
router.get('*',ErrorRender);
function Render(res,req) {
    res.render('layouts/backStage_layout2', {
        Title: "會員管理-會員列表",
        Login: req.session._admin.nickName,
        Authority: req.session._admin.Authority,
        CSSs: [
            '/public/css/dataTable.css'
        ],
        JavaScripts: [
            "/public/js/dataTable.js"
        ],
        Include: [
            {url:"../pages/backStage/account",value:{}}
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
            
        ]
    });
}
module.exports = router;