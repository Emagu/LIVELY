'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const fs = require("fs-extra");
const Tool = require("../lib/tool");
const SQL = require("../lib/MySQL_X");
const AccountLib = require("../lib/Account");
let router = express.Router();
router.use(busboy());
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({
     // to support URL-encoded bodies
    extended: true
}));
router.use(function(req, res, next) {//權限認證
    if(req.session._admin != null){
		AccountLib.getAuthority(req.session._admin,"02").then(next,function(){
            res.redirect('/front');
        });
	}else res.redirect('/front');
});
router.get('/', function (req, res) {
    let db = new SQL.DB();
    db.select("F00","DEFAULT","NO");
    db.select("F02","DECRYPT","Name");
    db.get("Firm").then(function(data){
        Render(res,data);
    },function(err) {
        console.error(err);
        ErrorRender();
    });
});
router.get('/firmEdit', function(req,res){
    switch (req.query.action) {
        case '0':
            EditRender(res,null);
            break;
        case '1':
            let DB = new SQL.DB();
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
                            EditRender(res,resultData[0]);
                        }
                    });
                }
            });
            break;
        default:
            ErrorRender(res);
    }    
});
router.get('/preview', function(req,res){
    PreviewRender(res,req.query);
});
router.post('/editSumit',function(req,res){
    let db = new SQL.DB();
    switch (req.body.action) {
        case '0':
            db.insert([{
                key: "F01",
                value: req.body.no,
                action: "ENCRYPT"
            },{
                key: "F02",
                value: req.body.title,
                action: "ENCRYPT"
            },{
                key: "F03A",
                value: req.body.city
            },{
                key: "F03B",
                value: req.body.ctry
            },{
                key: "F03C",
                value: req.body.addr,
                action: "ENCRYPT"
            },{
                key: "F04",
                value: req.body.phone,
                action: "ENCRYPT"
            },{
                key: "F05",
                value: req.body.fax,
                action: "ENCRYPT"
            },{
                key: "F000",
                value: Tool.getTimeZone()
            }],"Firm", {
                userNO: req.session._admin.userNO,
                IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            }, 1).then(function(){
                //寫HTML檔
                fs.writeFile('./html/firm/'+req.body.no+'.txt', req.body.html, function (err) {
                    if (err) {
                        console.error(err); 
                        res.send("fail");
                    }else{
                        res.send("success");
                    }
                });
            },function(err){
                console.error(err); 
                res.send("fail");
            });
            break;
        case '1':
            db.update([{
                key: "F01",
                value: req.body.no,
                action: "ENCRYPT"
            },{
                key: "F02",
                value: req.body.title,
                action: "ENCRYPT"
            },{
                key: "F03A",
                value: req.body.city
            },{
                key: "F03B",
                value: req.body.ctry
            },{
                key: "F03C",
                value: req.body.addr,
                action: "ENCRYPT"
            },{
                key: "F04",
                value: req.body.phone,
                action: "ENCRYPT"
            },{
                key: "F05",
                value: req.body.fax,
                action: "ENCRYPT"
            },{
                key: "F000",
                value: Tool.getTimeZone()
            }],"Firm", {
                userNO: req.session._admin.userNO,
                IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            }, 4).then(function(){
                //寫HTML檔
                fs.writeFile('./html/firm/'+req.body.no+'.txt', req.body.html, function (err) {
                    if (err) {
                        console.error(err); 
                        res.send("fail");
                    }else{
                        res.send("success");
                    }
                });
            },function(err){
                console.error(err); 
                res.send("fail");
            });
            break;
        default:
            // code
    }
});
router.post('/uploadNewsImage',function(req, res) {
    let fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);    
        //Path where image will be uploaded
        fstream = fs.createWriteStream(__dirname + '/../public/images/firm/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);
            res.json({ location: '/public/images/firm/' + filename});
        });
    });
});
router.get('*',ErrorRender);
function Render(res,firmList) {
    res.render('layouts/front_layout', {
        Title: "機構管理-機構列表",
        Login: true,
        CSSs: [
        ],
        JavaScripts: [
        ],
        Include: [
            {url:"../pages/firmManger",value:firmList}
        ],
        Script: [	
            
        ]
    });
}
function EditRender(res,firm) {
    if(firm==null) firm = {action:0};//新增
    else firm.action = 1;//修改
    res.render('layouts/front_layout', {
        Title: "機構管理-機構編輯",
        Login: true,
        CSSs: [
        ],
        JavaScripts: [
            "/public/js/tinymce/tinymce.min.js",
            "/public/js/Taiwan_Administrative_Region.js"
        ],
        Include: [
            {url:"../pages/firmEdit",value:firm}
        ],
        Script: [	
            
        ]
    });
}
function PreviewRender(res,firm){
    res.render('layouts/front_layout', {
        Title: firm.title,
        Login: true,
        CSSs: [
            
        ],
        JavaScripts: [
            "/public/js/Taiwan_Administrative_Region.js"
        ],
        Include: [
            { url: "../pages/firmPre", value: firm }
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