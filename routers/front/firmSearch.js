'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Sql = require("../../lib/MySQL_X");
const AccountLib = require("../../lib/Account");
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
     // to support URL-encoded bodies
    extended: true
}));
router.get('/', function (req, res) {
    let db = new Sql.DB();
    db.select("F00","DEFAULT","NO");
    db.select("F02","DEFAULT","Name");
    //db.select("F06","DEFAULT","Coordinate");
    db.where("F001",0);
    if(req.query.keyword!=null) db.where("F02","%"+req.query.keyword+"%","LIKE");
    if(req.query.city!=null && req.query.city!="-1") db.where("F03A",req.query.city);
    if(req.query.ctry!=null && req.query.ctry!="-1") db.where("F03B",req.query.ctry);
    if(req.query.type!=null && req.query.type!="-1") db.where("F07",req.query.type);
    if(req.query.type2!=null && req.query.type2!="-1") db.where("F08",req.query.type2);
    if(req.query.level!=null && req.query.level!="-1") db.where("F09",req.query.level);
    if(req.query.price!=null){
        switch (req.query.price) {
            /*
                <option value='0'>0~20000</option>
                <option value='1'>20001~50000</option>
                <option value='2'>50001~100000</option>
                <option value='3'>100001已上</option>
            */
            case '0':
                db.where("F10",20000,"<=");
                break;
            case '1':
                db.where("F10",20000,">");
                db.where("F10",50000,"<=");
                break;
            case '2':
                db.where("F10",50000,">");
                db.where("F10",100000,"<=");
                break;    
            case '3':
                db.where("F10",100000,">");
                break;    
        }
    }
    db.get("Firm").then(function(data){
        Render(res,req,data);
    },function(err){
        console.error(err);
        Render(res,req,null);
    }); 
});
router.get('*', ErrorRender);
//method
function Render(res,req,data) {
    res.render('layouts/front_layout', {
        Title: "搜尋機構",
        Login: req.session._admin==null ? null : {name:req.session._admin.nickName,no:req.session._admin.userNO},
        isManger: req.session._admin==null ? null : req.session._admin.isManger,
        CSSs: [
        ],
        JavaScripts: [
            "/public/js/Taiwan_Administrative_Region.js"
        ],
        Include: [
            { url: "../pages/front/firmSearch", value: {res:data,req:req.query} }
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