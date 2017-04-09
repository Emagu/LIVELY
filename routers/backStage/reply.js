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
    DB.select("UserAccount.UA00", "DEFAULT", "ID");
    DB.select("UserAccount.UA01", "DECRYPT", "Account");
    DB.select("UserAccount.UA06", "DECRYPT", "NickName");
    if(req.body.search !=null && req.body.searchType != null){
        switch (req.body.searchType) {
            case 'Title':
                DB.where("UserAccount.UA01","%"+req.body.search+"%","LIKE","AND","DEFAULT","DECRYPT");
                break;
            case 'Firm':
                DB.where("UserAccount.UA01","%"+req.body.search+"%","LIKE","AND","DEFAULT","DECRYPT");
                break;
        }
        
    }
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
    DB.join("AccountAuthority","AccountAuthority.UA00=UserAccount.UA00");
    DB.get("UserAccount").then(function (pageData) {
        DB.select("1");
        DB.join("AccountAuthority","AccountAuthority.UA00=UserAccount.UA00");
        DB.get("UserAccount").then(function (countData) {
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