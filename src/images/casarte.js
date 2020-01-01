// 注意：以后的代码格式，一定要先判断屏幕的宽度，然后在屏幕宽度里面进行相关的js操作
$(document).ready(function() {
    //搜索栏
    // 点击其他地方隐藏搜索相关
    var width = innerWidth;
    // console.log(width);
    if (width > 1200) {
        //  casarte 对比部分功能 start

        // 分类具体和遮罩 start
        $('.js_proListNavBox').on('mouseenter', '.js_proClass', function() {
            var $this = $(this);
            $this.find('.list').removeClass('displaynone');
            $this.parents('.js_proListNavBox').siblings('.zhezhaobox').find('.zhezhao').removeClass('displaynone');
        });

        $('.js_proListNavBox').on('mouseleave', '.js_proClass', function() {
            var $this = $(this);
            $this.find('.list').addClass('displaynone');
            $this.parents('.js_proListNavBox').siblings('.zhezhaobox').find('.zhezhao').addClass('displaynone');
        });
        // 分类具体和遮罩 end

        // 点击选中进行对比部分 start
        // 声明变量记录比较列表的个数
        var compare_item_num = 0;
        // 找到侧边栏
        var slide_compare = $('.js_slide_compare_box');

        $('.js_prolistboxs').on('click', '.js_contrast', function() {
            var $this = $(this);
            var pro_id = $this.parents('.js_itemindex').data('pro_id');
            var checked = $this.data('checked');
            // index获取该元素在兄弟中的位置,有bug，只能删除相对位置对应的，无法发准确对应，只能用固定不变的才可以
            // var index = $this.parents('.js_itemindex').index();
            // 根据data缓存属性判断是否选中
            if (checked == 'no') {
                $this.data('checked', 'yes');
                $this.find('.addicon').addClass('displaynone');
                $this.find('.itemclose').removeClass('displaynone');
                $this.find('span').addClass('color88747');
                $this.find('span').text('取消对比');
                compare_list(pro_id);
                $this.parents('.js_prolistboxs').siblings('.js_flyout').removeClass('displaynone');
                // 侧边栏数据改变
                slide_compare.removeClass('displaynone');
                // 获取子元素个数动态更改
                compare_item_num = $(".js_compare_col").children(".compare_item").length;
                slide_compare.find('.number span').text(compare_item_num + '/4');
            } else if (checked == 'yes') {
                $this.data('checked', 'no');
                $this.find('.addicon').removeClass('displaynone');
                $this.find('.itemclose').addClass('displaynone');
                $this.find('span').removeClass('color88747');
                $this.find('span').text('加入对比');
                // 删除该元素，需要先找到这个元素
                var arr_compare_item = $this.parents('.js_prolistboxs').siblings('.js_flyout').find('.compare_item');
                arr_compare_item.each(function(index, item) {
                    if (item.dataset.pro_id == pro_id) {
                        item.remove();
                    }
                });
                // 获取子元素个数动态更改
                compare_item_num = $(".js_compare_col").children(".compare_item").length;
                if (compare_item_num == 0) {
                    // 侧边栏数据改变
                    slide_compare.addClass('displaynone');
                    $this.parents('.js_prolistboxs').siblings('.js_flyout').addClass('displaynone');
                } else {
                    // 侧边栏数据改变
                    // 获取子元素个数动态更改
                    slide_compare.find('.number span').text(compare_item_num + '/4');
                }
            }
        });
        // 点击选中进行对比部分 end

        // 隐藏 展开 对比栏 start
        // 声明变量判断是否显示对比列表
        var flag_compare_list = true;
        $('.js_flyout').on('click', '.title span', function() {
            var $this = $(this);
            if (flag_compare_list) {
                $this.parents('.js_flyout').removeClass('height');
                $this.parents('.title').siblings('.js_compare_list_box').addClass('displaynone');
                $this.text('展开');
                flag_compare_list = false;
            } else {
                $this.parents('.js_flyout').addClass('height');
                $this.parents('.title').siblings('.js_compare_list_box').removeClass('displaynone');
                $this.text('隐藏');
                flag_compare_list = true;
            }
        });
        // 隐藏 展开 对比栏 end

        // 清空对比栏 start
        $('.js_flyout').on('click', '.clear_compare', function() {
            var $this = $(this);
            $this.parents('.compare_option').siblings('.js_compare_col').empty();
            $this.parents('.js_flyout').addClass('displaynone');
            $this.parents('.js_flyout').siblings('.js_prolistboxs').find('.addicon').removeClass('displaynone');
            $this.parents('.js_flyout').siblings('.js_prolistboxs').find('.itemclose').addClass('displaynone');
            $this.parents('.js_flyout').siblings('.js_prolistboxs').find('.js_contrast').find('span').text('加入对比');
            $this.parents('.js_flyout').siblings('.js_prolistboxs').find('.js_contrast').find('span').removeClass('color88747');
            slide_compare.addClass('displaynone');
            //还原最初的data属性状态，checked更改为false
            $this.parents('.js_flyout').siblings('.js_prolistboxs').find('.js_itemindex').find('.js_contrast').data('checked', 'no');
        });
        // 清空对比栏 end

        //compare_list_item 的点击删除 start
        $('.js_flyout').on('click', '.js_close_icon', function() {
            var $this = $(this);
            var $js_flyou = $('.js_flyout');
            // 声明一个变量获取该产品的pro_id
            var compare_proid = $this.parents('.compare_item').data('pro_id');
            //此处删除了之后，就找不到该元素了，所以$this就不好使了
            $this.parents('.compare_item').remove();
            compare_item_num = $(".js_compare_col").children(".compare_item").length;
            if (compare_item_num == 0) {
                slide_compare.addClass('displaynone');
                $js_flyou.addClass('displaynone');
            } else {
                slide_compare.find('.number span').text(compare_item_num + '/4');

            }
            //产品列表中的选中状态 恢复初始化 不能笼统的全部，必须点击哪个就是哪个才可以，字体样式同理
            var products_item = $js_flyou.siblings('.js_prolistboxs').find('.js_itemindex');
            var xunhuannum = -1;
            products_item.each(function(index, item) {
                xunhuannum++;
                if (item.dataset.pro_id == compare_proid) {
                    var checked_products = $('.js_prolistboxs').find('.js_itemindex').eq(xunhuannum);
                    checked_products.find('.addicon').removeClass('displaynone');
                    checked_products.find('.itemclose').addClass('displaynone');
                    checked_products.find('.js_contrast').find('span').text('加入对比');
                    checked_products.find('.js_contrast').find('span').removeClass('color88747');
                    checked_products.find('.js_contrast').data('checked', 'no');
                }
            });
        });
        //compare_list_item 的点击删除 end

        // 点击对比之后，动态生成html元素，直接使用暂存的即可 封装成函数 start
        function compare_list(pro_id) {
            var html2 = '';
            $.each(products, function(index, item) {
                if (pro_id == item.pro_id) {
                    html2 += `<div class="compare_item clearfix" data-pro_id=${item.pro_id}>
                    <i class="iconfont close_icon js_close_icon">&#xe65c;</i>
                    <div class="pic">
                        <a href="javascript:;">
                            <img src="${item.pic}" alt="">
                        </a>
                    </div>
                    <div class="name">
                        <a href="javascript:;">
                        ${item.name}
                        </a>
                    </div>
                    <div class="type">${item.type}</div>
                    <div class="money">￥${item.jiawei}</div>
                </div>`
                }
            });
            // html方法会把无弄没有，所以用append来添加，无是默认的
            $('.js_compare_col').append(html2);
        }
        // 点击对比之后，动态生成html元素，直接使用暂存的即可 封装成函数 end

        // 声明一个变量暂存点击对比时候的一些数据
        var products;

        //    调取产品ajax封装成函数 start
        function pro_ajax() {
            $.ajax({
                // ajax一般不使用同步，因为会出问题，当数据大量的时候，可免会非常卡顿
                // async: false,
                url: "../images/pro_ajax.json", //json文件位置,必须从images开始写
                type: "GET", //请求方式为get
                dataType: "json", //返回数据格式为json
                success: function(data) { //请求成功完成后要执行的方法 
                    // console.log(data.products);
                    var html = '';
                    // 暂存json中的内容，可以省不少事
                    products = {...data.products };

                    $.each(data.products, function(index, item) {
                        // 注意！select值(value)就等于选中option的值，可以找到category_id直接赋值就行，不用转换了
                        html += `<div class="o_u o_df_3-12 o_md_4-12 o_sm_1-2 o_xs_2-2 js_itemindex" data-pro_id=${item.pro_id}>
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
                                <div class="o_u o_df_1-2 o_xs-hide btn contrast js_contrast" data-checked='no'>
                                    <i class="iconfont addicon">&#xe81a;</i>
                                    <i class="iconfont displaynone itemclose color88747">&#xe65c;</i>
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