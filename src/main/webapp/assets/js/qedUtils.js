/**
 * Created by lonel on 2016/2/3.
 */

/*
 修改密码
 */
$('.modify-pwd input').blur(function () {
    var flag = true;
    $('.modify-pwd input').each(function (index) {
        if ($(this).val().trim() == "") {
            flag = false;
        }
    });
    if (flag && $('#pwd-002').val() == $('#pwd-003').val()) {
        //$('.modify-pwd button[type="submit"]').removeAttr('disabled');
        $('.modify-pwd button[type="submit"]').removeClass('btn-disabled');
    } else {
        if (!$('.modify-pwd button[type="submit"]').hasClass('btn-disabled')) {
            $('.modify-pwd button[type="submit"]').addClass('btn-disabled');
        }
    }
});
var modifyPwd = function (url) {
    var t = $(this),
        opwd = $('#pwd-001').val().trim(),
        npwd = $('#pwd-002').val().trim(),
        rnpwd = $('#pwd-003').val().trim(),
        $tip = $('.modify-pwd .alert-info');
    if ("" === opwd || "" === npwd || "" === rnpwd) {
        return void $tip.html("<strong>错误！</strong>密码不能为空！<span class='glyphicon glyphicon-remove'></span>");
    }
    return npwd != rnpwd ? void $tip.html("<strong>错误！</strong>两次密码不相同！<span class='glyphicon glyphicon-remove'>") : void $.ajax({
        type: 'PUT',
        url: url,
        dataType: "json",
        beforeSend: function (e) {
            t.prop("disabled", !0),
                e.setRequestHeader("oldPwd", opwd),
                e.setRequestHeader("newPwd", npwd)
        }
    }).done(function (e) {
        return e.state ? (void $('.modify-pwd button[type="reset"]').click(), $tip.html("<strong>成功！</strong>密码修改成功！<span class='glyphicon glyphicon-ok'></span>")) : ($tip.html("<strong>错误！</strong>密码修改失败！" + e.message + "<span class='glyphicon glyphicon-remove'>"), void t.prop("disabled", !1))
    }).error(function () {
        t.prop("disabled", !1)
    })
};

/**
 * 登录
 * @param url
 * @param co 要保存的 cookie 对象
 */
function signIn (url, co) {
    var t = $(this),
        un = $('#username').val().trim(),
        pwd = $('#password').val().trim(),
        captcha = $('#captcha').val().trim(),
        dialog = {
            container: {
                header: '<strong style="color: red;">错误</strong>',
                content: ''
            },
            autoClose : 1800
        };
    if ("" === un || "" === pwd || "" === captcha) {
        return (dialog.container.content="表单不能为空！", easyDialog.open(dialog));
    }
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        beforeSend: function (e) {
            e.setRequestHeader("un", un);
            e.setRequestHeader("pwd", pwd);
            e.setRequestHeader("captcha", captcha);
        }
    }).done(function (e) {
        if (e.state) {
            if (co != undefined && co != '') {
                $.cookie(co+'Un', e[co+'Un'], {expires: 1, path: '/'});
                $.cookie(co+'Id', e[co+'Id'], {expires: 1, path: '/'});
            }
            dialog.container.header = '<strong>成功</strong>';
            dialog.container.content = '正在加载...';
            window.location.href = "/";
        } else {
            dialog.container.content = e.message;
            chgCaptcha();
        }
        return easyDialog.open(dialog);
    }).error(function () {
        dialog.container.content = '网络错误！';
        easyDialog.open(dialog);
        chgCaptcha();
    })
}

//Ajax 删除操作
$('.delete-link').on("click", function (e) {
    e.preventDefault();
    console.log($(this).attr("href"));
    if (confirm("是否确定要删除？")) {
        $.ajax({
            type: 'DELETE',
            url: $(this).attr("href"),
            dataType: "json",
            success: function (data) {
                if (data.state) {
                    document.location.reload();//当前页面
                } else {
                    alert("请求出错~~");
                }
            },
            error: function () {
                alert("网络连接出错~~");
            }
        });
    }
});

/*get param from query string*/
function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/*captcha*/
//更新验证码
function chgCaptcha() {
    var imgSrc = $("#imgObj");
    var src = imgSrc.attr("src");
    imgSrc.attr("src", chgUrl(src));
}


//时间戳
//为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳
function chgUrl(url) {
    var timestamp = (new Date()).valueOf();
    url = url.substring(0, 17);
    if (url.indexOf("&") >= 0) {
        url = url + "×tamp=" + timestamp;
    } else {
        url = url + "?timestamp=" + timestamp;
    }
    return url;
}

/*school*/
//弹出窗口
function pop() {
    //将窗口居中
    makeCenter();

    //初始化省份列表
    initProvince();

    //默认情况下, 给第一个省份添加choosen样式
    $('[province-id="1"]').addClass('choosen');

    //初始化大学列表
    initSchool(1);
}

//隐藏窗口
function hide() {
    $('#choose-box-wrapper').css("display", "none");
}

function initProvince() {
    //原先的省份列表清空
    $('#choose-a-province').html('');
    for (i = 0; i < schoolList.length; i++) {
        $('#choose-a-province').append('<a class="province-item" province-id="' + schoolList[i].id + '">' + schoolList[i].name + '</a>');
    }
    //添加省份列表项的click事件
    $('.province-item').bind('click', function () {
            var item = $(this);
            var province = item.attr('province-id');
            var choosenItem = item.parent().find('.choosen');
            if (choosenItem)
                $(choosenItem).removeClass('choosen');
            item.addClass('choosen');
            //更新大学列表
            initSchool(province);
        }
    );
}

function initSchool(provinceID) {
    //原先的学校列表清空
    $('#choose-a-school').html('');
    var schools = schoolList[provinceID - 1].school;
    for (i = 0; i < schools.length; i++) {
        $('#choose-a-school').append('<a class="school-item" school-id="' + schools[i].id + '">' + schools[i].name + '</a>');
    }
    //添加大学列表项的click事件
    $('.school-item').bind('click', function () {
            var item = $(this);
            var school = item.attr('school-id');
            //更新选择大学文本框中的值
            $('#school-name').val(item.text());
            //关闭弹窗
            hide();
        }
    );
}

function makeCenter() {
    $('#choose-box-wrapper').css("display", "block");
    $('#choose-box-wrapper').css("position", "absolute");
    $('#choose-box-wrapper').css("top", Math.max(0, (($(window).height() - $('#choose-box-wrapper').outerHeight()) / 2) + $(window).scrollTop()) + "px");
    $('#choose-box-wrapper').css("left", Math.max(0, (($(window).width() - $('#choose-box-wrapper').outerWidth()) / 2) + $(window).scrollLeft()) + "px");
}



