var Sql = require("../lib/MySQL_X");
/**
 * 確認是否為有效帳號
 * @param {User Session} session 
 * ----------------------------
 * 有效的話執行success
 * 無效的話執行error
 * ----------------------------
 **/
function checkLoginBySession(session){
    return new Promise(function (success, error){
        var DB = new Sql.DB();
        DB.select("1");
        DB.where("UA01",session.userID);
        DB.where("UA00",session.userNO);
        DB.get("UserAccount").then(function(resultData){
            if(resultData.length>0){
                success();
            }else{
                error();
            }
        });
    });
}
/**
 * 登出
 * @param {Html request}  req      
 * @param {html response} res      
 * ----------------------------
 * 重新導向登入畫面
 * ----------------------------
 **/
function logout(req,res){
    if(req.session._admin != null) delete req.session._admin;
    res.redirect('/login');
}
function getAuthority(session,Authority){
    return new Promise(function (success, error){
        checkLoginBySession(session).then(function(){
            var DB = new Sql.DB();
            DB.select("1");
            DB.where("UA00",session.userNO);
            DB.where("AA"+Authority,1);
            DB.get("AccountAuthority").then(function(data){
                if(data.length>0) success();
                else error();
            },function(err){
                error(err);
            });
        },function(err){
            error(err);
        });
    });
}
module.exports={
    checkLoginBySession:checkLoginBySession,
    logout: logout,
    getAuthority: getAuthority
};