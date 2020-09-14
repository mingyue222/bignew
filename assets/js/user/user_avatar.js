$(function() {
    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
        //给file添加点击上传事件
    $('#uploading').on('click', function() {
            $('#file').click()
        })
        //为文件选择框添加一个chanege事件
    $('#file').on('change', function(e) {
        // console.log(e);
        var fileList = e.target.files
            // console.log(fileList);
        if (fileList.length === 0) {
            return layer.msg('请上传图片')
        }
        var file = e.target.files[0]
        console.log(file);
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#btnImg').on('click', function() {
        //拿到用户裁剪的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            //调用接口，将图片渲染到服务器
        $.ajax({
            url: '/my/update/avatar',
            type: 'post',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更换头像成功')
                window.parent.getUserInfo()
            }
        })
    })
})