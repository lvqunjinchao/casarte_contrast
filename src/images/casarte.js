// 注意：以后的代码格式，一定要先判断屏幕的宽度，然后在屏幕宽度里面进行相关的js操作
$(document).ready(function() {
    //搜索栏
    // 点击其他地方隐藏搜索相关
    var width = innerWidth;
    console.log(width);
    if (width > 1200) {
        //  casarte 对比部分功能 start

        // 分类具体和遮罩 start
        $('.js_proListNavBox').on('mouseenter', '.name', function() {
            var $this = $(this);
            $this.siblings('.list').removeClass('displaynone');
            $this.parents('.js_proListNavBox').siblings('.js_prolistboxs').find('.zhezhao').removeClass('displaynone');
        });

        $('.js_proListNavBox').on('mouseleave', '.list', function() {
            var $this = $(this);
            $this.addClass('displaynone');
            $this.parents('.js_proListNavBox').siblings('.js_prolistboxs').find('.zhezhao').addClass('displaynone');
        });
        // 分类具体和遮罩 end

        //    调取产品ajax封装成函数 start
        function pro_ajax() {
            $.ajax({
                // ajax一般不使用同步，因为会出问题，当数据大量的时候，可免会非常卡顿
                // async: false,
                url: "../images/pro_ajax.json", //json文件位置,必须从images开始写
                type: "GET", //请求方式为get
                dataType: "json", //返回数据格式为json
                success: function(data) { //请求成功完成后要执行的方法 
                    console.log(data.products);
                    var html = '';
                    $.each(data.products, function(index, item) {
                        // 注意！select值(value)就等于选中option的值，可以找到category_id直接赋值就行，不用转换了
                        html += `<div class="o_u o_df_3-12 o_md_4-12 o_sm_1-2 o_xs_2-2">
                        <div class="proListBox js_proListBox">
                            <a href="javasrcipt:;" class="js_link">
                                <div class="${item.labelclass}">${item.label}</div>
                                <div class="title">${item.title}</div>
                                <div class="type">${item.type}</div>
                                <h1 class="name">
                                    <span>${item.name}</span>
                                </h1>
                                <div class="pic">
                                    <img src="${item.pic}" alt="">
                                </div>
                                <div class="price">￥${item.jiawei}</div>
                            </a>
                            <div class="btnBox o_g">
                                <div class="o_u o_df_1-2 o_xs_2-2 btn subscribe js_subscribe">
                                    <i class="iconfont">&#xe60c;</i>
                                    <span>收藏</span>
                                </div>
                                <div class="o_u o_df_1-2 o_xs-hide btn contrast js_contrast">
                                    <i class="iconfont">&#xe81a;</i>
                                    <span>加入对比</span>
                                </div>
                                <div class="clear"></div>
                            </div>
                        </div>
                    </div>`
                    });
                    // html方法会把无弄没有，所以用append来添加，无是默认的
                    $('.proList').append(html);
                }
            })
        }
        pro_ajax();
        //    调取产品ajax封装成函数 end

        //  casarte 对比部分功能 end



        // 原来 casarte的js >1200 end
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
        // 原来 casarte的js >1200 end

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
});