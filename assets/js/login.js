$(function() {
    //点击注册时
    $('#link_reg').on('click', function() {
            $('.login_box').hide()
            $('.reg_box').show()
        })
        //点击登陆时
    $('#link_login').on('click', function() {
            $('.reg_box').hide()
            $('.login_box').show()
        })
        //自定义验证规则
        //获取form表单模块
    var form = layui.form
    form.verify({
        password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repassword: function(value) {
            var pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) {
                return '两密码输入不一致'
            }
        }
    })

})