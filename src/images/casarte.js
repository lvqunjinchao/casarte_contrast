// 注意：以后的代码格式，一定要先判断屏幕的宽度，然后在屏幕宽度里面进行相关的js操作


//搜索栏
// 点击其他地方隐藏搜索相关
var width = innerWidth;
console.log(width);
if (width > 1200) {
    // 头部搜索
    $(".js_main_select").on("click", function(e) {
        var main_select = $(this);
        main_select.addClass('open');
        main_select.find('.contral').find('i').addClass('displayinlineblock');
        main_select.find('.list').addClass('displayblock');
        main_select.find('input').focus();

        $(document).one("click", function() {
            main_select.removeClass('open');
            main_select.find('.contral').find('i').removeClass('displayinlineblock');
            main_select.find('.list').removeClass('displayblock');
            main_select.find('input').blur();
        });
        e.stopPropagation();

    });
    // 侧边栏
    $('.js_btnlist').on('mouseenter', '.js_user', function() {
        var li = $(this);
        li.find('b').addClass('displayblock');
        li.find('span').addClass('colorwhite');
        li.addClass('bca88747');
    });
    $('.js_btnlist').on('mouseleave', '.js_user', function() {
        var li = $(this);
        li.find('b').removeClass('displayblock');
        li.find('span').removeClass('colorwhite');
        li.removeClass('bca88747');
    });
    $('.js_btnlist').on('mouseenter', '.js_twocode', function() {
        var twocode = $(this);
        twocode.find('.cont').addClass('displayblock')
    });
    $('.js_btnlist').on('mouseleave', '.js_twocode', function() {
        var twocode2 = $(this);
        twocode2.find('.cont').removeClass('displayblock')
    });
    // 回到顶部
    $(".js_gototop_box").click(function() {
        $("html,body").animate({ scrollTop: 0 }, 500);
    });
} else if (width < 543) {
    $('.js_main_select').on('click', '.toggle i', function() {
        var main_select = $(this).parents('.js_main_select');
        $('.zhezhao').addClass('o_m_zz');
        $('body').css({ overflow: 'hidden', height: "100%" });
        main_select.find('.search_close').stop(true).animate({
            top: 0
        });
        main_select.addClass('open');
        main_select.find('.contral').find('i').addClass('displayinlineblock');
        main_select.find('.list').addClass('displayblock');
        main_select.find('input').focus();
    });
    $('.js_main_select').on('click', '.search_close', function() {
        var main_select = $(this).parents('.js_main_select');
        $('.zhezhao').removeClass('o_m_zz');
        $('body').css('overflow', 'auto');
        main_select.find('.search_close').stop(true).animate({
            top: '-50px'
        });
        main_select.removeClass('open');
        main_select.find('.contral').find('i').removeClass('displayinlineblock');
        main_select.find('.list').removeClass('displayblock');
        main_select.find('input').blur();
    });

    // 导航栏侧边栏
    $('.js_mainMenu').on('click', '.js_aboutC_menu', function() {
        var thisli = $(this);
        // 判断是否可以关闭
        var flag = thisli.find('.toggle span').hasClass('color_6F3A8A');
        if (!flag) {
            thisli.addClass('padding_bottom22');
            thisli.find('.toggle span').addClass('color_6F3A8A');
            thisli.find('.cont').removeClass('displaynone');
            thisli.find('.toggle i').toggleClass('rotate45');
            thisli.siblings('li').removeClass('padding_bottom22');
            thisli.siblings('li').find('.toggle span').removeClass('color_6F3A8A');
            thisli.siblings('li').find('.cont').addClass('displaynone');
        } else {
            thisli.find('.toggle span').removeClass('color_6F3A8A');
            thisli.find('.toggle i').toggleClass('rotate45');
            thisli.find('.cont').addClass('displaynone');
        }

    });
    // 打开导航栏
    $('.open_menu').on('click', function() {
        var open = $(this);
        open.addClass('displaynone');
        open.siblings('.close_menu').removeClass('displaynone');
        open.parents('.js_menu_link1').addClass('bg_6F3A8A');
        open.parents('.js_menu_link1').siblings('.o_g').find('.js_mainMenu').stop(true).animate({
            left: 0
        });
        $('.zhezhao').addClass('o_m_zz');
        $('body').css({ overflow: 'hidden', height: "100%" });
    });
    $('.close_menu').on('click', function() {
        var close_menu = $(this);
        close_menu.parents('.js_menu_link1').siblings('.o_g').find('.js_mainMenu').stop(true).animate({
            left: "-9999px"
        });
        close_menu.parents('.js_menu_link1').removeClass('bg_6F3A8A');
        close_menu.siblings('.open_menu').removeClass('displaynone');
        close_menu.addClass('displaynone');
        $('.zhezhao').removeClass('o_m_zz');
        $('body').css('overflow', 'auto');
    });
    // 轮播图的箭头
    $('.btn_next').text('>');
    $('.btn_prev').text('<');
}