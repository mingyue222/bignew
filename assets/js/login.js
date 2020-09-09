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

})