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
router.post("/getReadTable",function(req,res){
    let DB = new SQL.DB();
    let pageLimit = parseInt(req.body.pageLimit);//單頁數量
    let pages = parseInt(req.body.pages);//所選頁數
    let sortColums = req.body.sortSetting.colums;//排列欄位設定資料
    let firstSort = req.body.sortSetting.sortColums;//最優先排列欄位名稱
    DB.select("1");
    /*搜尋*/
    if(req.body.search !=null && req.body.searchType != null && req.body.search != ""){
        switch (req.body.searchType) {
            case 'User':
                DB.where("UserAccount.UA05","%"+req.body.search+"%","LIKE","AND","ENCRYPT","DECRYPT");
                break;
            case 'Firm':
                DB.where("Firm.F02","%"+req.body.search+"%","LIKE");
                break;
        }
    }
    /*
    搜尋類型
    */
    switch (req.body.replyType) {
        case 'unread':
            DB.where("GuestBook.GB002A","0");
            break;
        case 'unreply':
            DB.where("GuestBook.GB02","null","IS");
            break;
        case 'reply':
            DB.where("GuestBook.GB02","null","IS NOT");
            break;
        default:
            DB.where("GuestBook.GB002A","0");
            break;
    }
    DB.join("Firm","Firm.F00=GuestBook.F00");
    DB.join("UserAccount","UserAccount.UA00=GuestBook.UA00");
    DB.get("GuestBook").then(function (countData) {
        DB.select("GuestBook.GB00", "DEFAULT", "ID");
        DB.select("UserAccount.UA05", "DECRYPT", "User");
        DB.select("Firm.F02", "DEFAULT", "Firm");
        DB.select("GuestBook.GB00", "DEFAULT", "ID_A");
        DB.select("GuestBook.GB000","DEFAULT","Time");
        /*
        排列
        */
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
        DB.get("GuestBook").then(function (pageData) {
            for(var i=0;i<pageData.length;i++){
                pageData[i].Time = Tool.getTimeZone(null,null,pageData[i].Time);
            }
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
router.post("/replyRead",function(req,res){
    if(req.body.NO!=null){
        let DB = new SQL.DB();
        DB.where("GB00",req.body.NO);
        DB.update([
            {
                key:"GB002A",
                value:"1"
            }
        ],"GuestBook",{
            userNO: req.session._admin.userNO,
            IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        },18).then(function(s){
            DB = new SQL.DB();
            DB.select("F00");
            DB.where("GB00",req.body.NO);
            DB.get("GuestBook").then(function(result){
                res.send("/front/firm?NO="+result[0].F00+"#data_"+req.body.NO);
            },function(err){
                console.error(err);
                res.send("error");
            });
        },function(err){
            console.error(err);
            res.send("error");
        });
    }
});
router.get('*',ErrorRender);
function Render(res,req) {
    res.render('layouts/backStage_layout2', {
        Title: "會員管理-機構留言",
        Login: req.session._admin.nickName,
        Authority: req.session._admin.Authority,
        CSSs: [
            '/public/css/dataTable.css'
        ],
        JavaScripts: [
            "/public/js/dataTable.js"
        ],
        Include: [
            {url:"../pages/backStage/reply",value:{}}
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