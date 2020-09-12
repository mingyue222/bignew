$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '请输入1-6个的字符'
            }
        }
    })
    initUserInfo()

    function initUserInfo() {
        //用户更新请求
        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                form.val('formUserInfo', res.data)

            }
        })
    }
    //重置表单
    $('#btnReset').on('click', function(e) {
            e.preventDefault()
            initUserInfo()
        })
        //更新基本资料
    $('.layui-form').on('click', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.initUserInfo()
            }
        })
    })
})