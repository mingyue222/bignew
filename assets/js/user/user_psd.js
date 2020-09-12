$(function() {
    var form = layui.form
    var layer = layui.layer
        //修改密码验证规则
    form.verify({
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            samePwd: function(value) {
                if (value === $('.layui-form [name=oldPwd]').val()) {
                    return '新密码和原密码相同'
                }
            },
            rePwd: function(value) {
                if (value !== $('.layui-form [name=newPwd]').val()) {
                    return '两次密码输入不一致'
                }
            }
        })
        //重置密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
                localStorage.removeItem('token')
                top.window.location.href = '/login.html'
            }
        })
    })
})