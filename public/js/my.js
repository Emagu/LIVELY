$(window).resize(mq);
$(document).ready(function() {
    mq();
    $(".member_box_register").keypress(function(e) {
        if (e.which == 13) {
            SendRegisterData();
        }
    });
    $(".member_box_login").keypress(function(e) {
        if (e.which == 13) {
            SendLoginData();
        }
    });
    $(".member_box_bg").click(hideFloat);
    $("#logout").click(logout);
    $("#backstage").click(backstage);
});
function mq() {
    var query_mob = Modernizr.mq('(max-width: 600px)');
    var query_pad = Modernizr.mq('(max-width: 1199px)');
    if (query_mob) {
        // 當CSS media query計算的視窗寬度小於600px時執行
        $(document).scroll(function() {
            if ($(document).scrollTop() > 0) {
                $("#wrap_top").css({
                    "position": "fixed",
                    "z-index": "1001",
                    "box-shadow": "0px 1px 3px #888888",
                    "min-height": "70px"
                });
                $("#wrap_top ul li").css({
                    "line-height": "70px"
                });
                $("#wrap_top_hide").css({
                    "display": "block"
                });
                $("#wrap_top img").addClass("changetosmall");
            } else {
                $("#wrap_top").css({
                    "position": "relative",
                    "box-shadow": "0px 0px 0px black",
                    "min-height": "100px"
                });
                $("#wrap_top ul li").css({
                    "line-height": "100px"
                });
                $("#wrap_top_hide").css({
                    "display": "none"
                });
                $("#wrap_top img").removeClass("changetosmall");
            }
        });
        $("#login").click(function() {
            showLogin(5);
        });
        $("#register").click(function() {
            showRegister(5)
        });
        
        $("#side").mouseover(function() {
            $("#side img").attr("src", "/public/images/shop_hover.png");
        });
        $("#side").mouseout(function() {
            $("#side img").attr("src", "/public/images/shop.png");
        });
    } else if (query_pad) {
        // 當CSS media query計算的視窗寬度小於1199px時執行
        $(document).scroll(function() {
            if ($(document).scrollTop() > 0) {
                $("#wrap_top").css({
                    "position": "fixed",
                    "z-index": "1001",
                    "box-shadow": "0px 1px 3px #888888",
                    "min-height": "30px"
                });
                $("#wrap_top ul li").css({
                    "line-height": "30px"
                });
                $("#wrap_top_hide").css({
                    "display": "block"
                });
            } else {
                $("#wrap_top").css({
                    "position": "relative",
                    "box-shadow": "0px 0px 0px black",
                    "min-height": "30px"
                });
                $("#wrap_top ul li").css({
                    "line-height": "30px"
                });
                $("#wrap_top_hide").css({
                    "display": "none"
                });
            }
        });
        $("#login").click(function() {
            showLogin(15);
        });
        $("#register").click(function() {
            showRegister(15);
        });
    } else {
        $(document).scroll(function() {
            if ($(document).scrollTop() > 0) {
                $("#wrap_top").css({
                    "position": "fixed",
                    "z-index": "1001",
                    "box-shadow": "0px 1px 3px #888888",
                    "min-height": "70px"
                });
                $("#wrap_top ul li").css({
                    "line-height": "70px"
                });
                $("#wrap_top_hide").css({
                    "display": "block"
                });
                $("#wrap_top img").addClass("changetosmall");
            } else {
                $("#wrap_top").css({
                    "position": "relative",
                    "box-shadow": "0px 0px 0px black",
                    "min-height": "100px"
                });
                $("#wrap_top ul li").css({
                    "line-height": "100px"
                });
                $("#wrap_top_hide").css({
                    "display": "none"
                });
                $("#wrap_top img").removeClass("changetosmall");
            }
        });
        $("#login").click(function() {
            showLogin(30);
        });
        $("#register").click(function() {
            showRegister(30);
        });
        $("#side").mouseover(function() {
            $("#side img").attr("src", "/public/images/shop_hover.png");
        });
        $("#side").mouseout(function() {
            $("#side img").attr("src", "/public/images/shop.png");
        });
    }
}

function hideFloat() {
    $(".member_box_bg").removeClass("changememberopacity");
    $(".member_box_login").removeClass("changemembertrue");
    $(".member_box_login").css({
        "left": "150%"
    });
    $(".member_box_register").removeClass("changemembertrue");
    $(".member_box_register").css({
        "left": "150%"
    });
}

function showLogin(left) {
    hideFloat();
    $('#form_login').validate({
        rules: {
            m_login_account: {
                required: true
            },
            m_login_password: {
                required: true
            }
        }
    });
    $(".member_box_bg").addClass("changememberopacity");
    $(".member_box_login").addClass("changemembertrue");
    $(".member_box_login").css({
        "left": left + "%"
    });
}

function showRegister(left) {
    hideFloat();
    $('#form_register').validate({
        rules: {
            m_register_account: {
                required: true
            },
            m_register_password: {
                required: true
            },
            m_register_password_check: {
                required: true
            },
            m_register_mail: {
                required: true
            },
            m_register_name: {
                required: true
            },
            m_register_phone: {
                required: true
            },
            m_register_yes: {
                required: true
            }
        }
    });
    $(".member_box_bg").addClass("changememberopacity");
    $(".member_box_register").addClass("changemembertrue");
    $(".member_box_register").css({
        "left": left + "%"
    });
}

function SendLoginData() {
    if ($('#form_login').valid() == true) {
        $.post("/front/login", {
                Account: $("input[name='m_login_account']").val(),
                Password: $("input[name='m_login_password']").val(),
            },
            function(data) {
                if (data != 'success') {
                    toastr.error('', data, {
                        "positionClass": "toast-bottom-full-width",
                        "timeOut": "3000",
                        "closeButton": true
                    });
                } else {
                    location.reload();
                }
            }, 'html');
    }
}

function SendRegisterData() {
    if ($('#form_register').valid() == true) {
        $.post("/front/register", {
                Account: $("input[name='m_register_account']").val(),
                Password: $("input[name='m_register_password']").val(),
                Password_RE: $("input[name='m_register_password_check']").val(),
                Email: $("input[name='m_register_mail']").val(),
                Phone: $("input[name='m_register_phone']").val(),
                Name: $("input[name='m_register_name']").val(),
            },
            function(data) {
                if (data != 'success') {
                    toastr.error('', data, {
                        "positionClass": "toast-bottom-full-width",
                        "timeOut": "3000",
                        "closeButton": true
                    });
                } else {
                    location.reload();
                    //showSuccessBox("register");
                }
            }, 'html');
    }
}

function logout() {
    $.post("/front/logout", {}, function() {
        location.reload();
    }, 'html');
}

function backstage() {
    //location.href="/backstage";
    location.href = "/firmManger"; //測試
}