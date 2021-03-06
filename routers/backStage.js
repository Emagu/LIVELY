'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const AccountLib = require("../lib/Account");
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
    extended: true// to support URL-encoded bodies
}));
router.use(function(req, res, next) {//權限認證
  if(req.session._admin != null)  AccountLib.checkLoginBySession(req.session._admin).then(next,AccountLib.logout);  
  else res.redirect('/front');
});
router.get('/', function (req, res) {
    AccountLib.getAuthorityList(req.session._admin).then(function(data){
        req.session._admin.Authority = data;
        req.session.save();
        Render(res,req);
    },function(err){
        console.error(err);
        AccountLib.logout();
    });
});
router.use('/firm', require('./backStage/firm'));
router.use('/account', require('./backStage/account'));
router.use('/personalInfo', require('./backStage/personalInfo'));
router.use('/reply', require('./backStage/reply'));
router.get('*', function (req, res) {//404~
    ErrorRender(res);
});
function Render(res,req) {
    res.render('layouts/backStage_layout2', {
        Title: "管理後台",
        Login: {name:req.session._admin.nickName,no:req.session._admin.userNO},
        Authority: req.session._admin.Authority,
        CSSs: [
        ],
        JavaScripts: [
        ],
        Include: [
            { url: "../pages/backStage/backStage", value: {} }
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
            
        ]
    });
}
module.exports = router;