/**
 * Created by lonel on 2016/1/6.
 */
$(document).ready(function () {

    //更新验证码
    $('.change-captcha').bind("click touch", function () {
        chgCaptcha();
    });

    //pers signIn
    /*Deprecated*/
    /*$('#pers_signIn_form button:submit').click(function (e) {
        //一定要阻止html的默认事件
        e.preventDefault();
        console.log($('#pers_signIn_form').serialize());
        $.ajax({
            type: 'GET',
            url: '/pers/signIn',
            data: $('#pers_signIn_form').serialize(),
            dataType: 'json',
            success: function (data) {
                if(data.state){
                    $('#model_signIn .model-close').click();
                    $.cookie('persUn', data.persUn, {expires: 7, path: '/'});
                    $.cookie('persId', data.persId, {expires: 7, path: '/'});
                    window.location.href = "/";
                }else{
                    console.log(data.message);
                    $('#model_signIn .alert-info').html("<strong>错误！</strong>" + data.message);
                    if(!data.isCaptcha){
                        chgCaptcha();
                    }
                }
            },
            error: function () {
                alert("错误！");
            }
        });
    });*/

    $('#signIn_form button:submit').click(function (e) {
        //一定要阻止html的默认事件
        e.preventDefault();
        var url = '';
        var co = '';
        if ($('#user-type').bootstrapSwitch('state')) {
            co = 'pers';
            url = '/pers/signIn';
        } else {
            co = 'busi';
            url = '/busi/signIn';
        }

        signIn(url, co);
    });

    $('#signOut').click(function(){
        if ($.cookie('persId') != undefined) {
            $.removeCookie('persUn', {path: '/'});
            $.removeCookie('persId', {path: '/'});
        }
        if ($.cookie('busiId') != undefined) {
            $.removeCookie('busiUn', {path: '/'});
            $.removeCookie('busiId', {path: '/'});
        }
        if ($.cookie('menu_index') != undefined) {
            $.removeCookie('menu_index', {path: '/'});
        }
        //window.location.href="/index.html";
    });


    /**
     * 验证个人注册表单
     */
    $('#pers_signUp_form input').blur(function () {
        var flag = true;
        $('#pers_signUp_form input').each(function (index) {
            if ($(this).val().trim() == "") {
                flag = false;
            }
        });
        if (flag && $('#sign-003').val() == $('#sign-004').val()) {
            $('#pers_signUp_form button[type="submit"]').removeAttr('disabled');
        } else {
            if ($('#pers_signUp_form button[type="submit"]').attr('disabled') == undefined) {
                $('#pers_signUp_form button[type="submit"]').attr('disabled', 'disabled');
            }
            if ($('#sign-003').val() != $('#sign-004').val() && $(this).attr('id') == "sign-004") {
                alert("两次密码不相同！");
            }
        }
    });

    /**
     * 验证企业注册表单
     */
    $('#busi_signUp_form input').blur(function () {
        var flag = true;
        $('#busi_signUp_form input:not(.ignore)').each(function (index) {
            if ($(this).val().trim() == "") {
                flag = false;
            }
        });
        if (flag && $('#sign-102').val() == $('#sign-112').val()) {
            $('#busi_signUp_form button[type="submit"]').removeAttr('disabled');
        } else {
            if ($('#busi_signUp_form button[type="submit"]').attr('disabled') == undefined) {
                $('#busi_signUp_form button[type="submit"]').attr('disabled', 'disabled');
            }
            if ($('#sign-102').val() != $('#sign-112').val() && $(this).attr('id') == "sign-004") {
                alert("两次密码不相同！");
            }
        }
    });
});
