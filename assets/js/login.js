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
    var layer = layui.layer
    form.verify({
        password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repassword: function(value) {
            var pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) {
                return '两密码输入不一致'
            }
        }
    })
    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                url: '/api/reguser',
                type: 'post',
                data: {
                    username: $('#form_reg [name=username]').val(),
                    password: $('#form_reg [name=password]').val()
                },
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        // return console.log(res.message);
                        return layer.msg(res.message)
                    }
                    // console.log(res.message);
                    layer.msg(res.message)
                    $('#link_login').click()
                }
            })
        })
        //登陆页面
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);

                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = 'index.html'
            }
        })
    })
})