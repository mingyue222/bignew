$(function() {
        var layer = layui.layer
            //跟新用户信息
        getUserInfo()
            //自定义一个获取用户信息的函数
        function getUserInfo() {
            $.ajax({
                url: '/my/userinfo',
                type: 'get',
                headers: {
                    Authorization: localStorage.getItem('token') || ''
                },
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    //更新用户信息成功的话我们要判断用户是否有头象
                    //调用下面的函数
                    randerAvatar(res.data)
                }
            })
        }

        function randerAvatar(user) {
            //获取用户的名称
            var name = user.username || user.user_pic
                //设置欢迎文本
            $('.welcome').html('欢迎&nbsp;&nbsp' + name)
                //判断用户有没有设置头像
            if (user.user_pic == null) { //如果设置的头像为空
                $('.layui-nav-img').hide()
                var first = name[0].toUpperCase()
                $('.text-avatar').html(first).show()
            } else { //否则用户是设置了头像的
                $('.layui-nav-img').attr('src', user_pic).show()
                $('text-avatar').hide()
            }
        }
    })
    //给退出绑定点击事

$('#btnLogout').on('click', function() {
    layer.confirm('确定退出', { icon: 3, title: '提示' }, function(index) {
        //do something
        localStorage.removeItem('token')
        location.href = 'login.html'
        layer.close(index);

    });
})