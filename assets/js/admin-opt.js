jQuery(document).ready(function($) {
    $(document).on('click', ".rest_mpweixin_menu", function(event) {
        event.preventDefault()
        $.post(ri_opt_js.admin_url, {
            "action": "rest_mpweixin_menu",
        }, function(data) {
            // console.log(data)
            if (data.errcode == 0) {
                alert('公众号菜单更新成功');
            } else {
                alert(data.errmsg);
            }
        });
    });


    
    //////////////////////////////////
    $('#theme_act_btn').click(function(e) {
        var _this = $(this);
        var def = _this.data("text");
        var load = 'Loading...';
        _this.text(load);
        _this.attr('disabled',"true");
        $.post(ri_opt_js.admin_url, {
            "action": "riprov2_ajax_activ",
            "id": $("#theme_lic_id").val(),
            "key": $("#theme_lic_key").val(),
        }, function(res) {
            // _this.text(res.msg);
            
            setTimeout(function() {
                alert(res.msg);
                _this.text(def);
                _this.removeAttr("disabled");
                if (res.status == 1) {
                    location.reload();
                }
            }, 2000)
        });
    });
    //////////////////////////////////
});