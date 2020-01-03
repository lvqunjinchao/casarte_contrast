// 注意：以后的代码格式，一定要先判断屏幕的宽度，然后在屏幕宽度里面进行相关的js操作
$(document).ready(function() {
    //搜索栏
    // 点击其他地方隐藏搜索相关
    var width = innerWidth;
    // console.log(width);
    if (width > 1200) {

        // 分页 casarte 对比部分功能 start


        // 获取cookie，动态改变个数 start
        var compare_num = $.cookie('compare_num');
        $('.js_compare_pro_total').text(compare_num);
        // 获取cookie，动态改变个数 end

        // 对比项列表空余项 start
        var yiyou_kongyu = 0;

        function kongyu() {
            var kongyu = '';
            var zancun_yiyou = yiyou_kongyu;
            for (i = 0; i < 4 - compare_num - zancun_yiyou; i++) {
                kongyu += `<div class="row">
                <div class="fenye_a_box">
                    <a href="./index.shtml" class="fenye_add">
                        <i class="iconfont">&#xe81a;</i> 添加新产品
                    </a>
                </div>
            </div> `
                yiyou_kongyu++;
            }
            // html方法会把无弄没有，所以用append来添加，无是默认的
            $('.js_compareBoxR .o_g').append(kongyu);
        }
        // 对比项列表空余项 end

        // 点击对比项删除按钮 start
        $('.js_compareListbox').on('click', '.fenye_close', function() {
            var $this = $(this);
            var this_index = $this.parents('.row').index();
            var shanchu_canshu = $this.parents('.js_compareListbox').siblings('.js_parameterBox').find('.canshu_item');
            $.each(shanchu_canshu, function(index, item) {
                var $item = $(item);
                $item.find('.canshu').eq(this_index).remove();
                $item.find('.table_compareBoxR .o_g').append('<div class="canshu">&nbsp;</div>');
            });
            $this.parents('.row').remove();
            compare_num--;
            $('.js_compare_pro_total').text(compare_num);
            kongyu();
            if (compare_num == 1) {
                var first_tabbox = `<div class="table_compareBox">
                <div class="o_g">
                    <span class="tit">全景体验</span>
                </div>
                <div class="o_g canshu_item">
                    <div class="table_compareBoxL">
                        <span>全景体验</span>
                    </div>
                    <div class="table_compareBoxR">
                        <div class="o_g">
                            <div class="canshu">&nbsp;</div>
                            <div class="canshu">&nbsp;</div>
                            <div class="canshu">&nbsp;</div>
                            <div class="canshu">&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>`
                $('.js_parameterBox').prepend(first_tabbox);
            } else if (compare_num == 0) {
                $('.js_parameterBox').empty();
            }
        });
        // 点击对比项删除按钮 end




        var fenye_compare_pro;

        // 对比项列表信息 start
        function fenye_compare_list() {
            var fenye_compare_list = '';
            $.ajax({
                // ajax一般不使用同步，因为会出问题，当数据大量的时候，可免会非常卡顿
                // async: false,
                url: "../images/pro_ajax.json", //json文件位置,必须从images开始写
                type: "GET", //请求方式为get
                dataType: "json", //返回数据格式为json
                success: function(data) { //请求成功完成后要执行的方法 
                    // console.log(data.products);
                    // 暂存json中的内容，可以省不少事
                    fenye_compare_pro = {...data.products };
                    $.each(fenye_compare_pro, function(index, item) {
                        fenye_compare_list += ` <div class="row">
                            <div class="fenye_close">
                                <i class="iconfont">&#xe65c;</i>
                            </div>
                            <a href="javascript:;">
                                <div class="fenye_pic">
                                    <img src="${item.pic}" alt="">
                                </div>
                                <h1 class="fenye_name">
                                    <span>${item.name}</span>
                                </h1>
                                <div class="fenye_title">
                                ${item.title}
                                </div>
                            </a>
                            <div class="fenye_type">${item.type}</div>
                            <div class="fenye_money">￥${item.jiawei}</div>
                        </div>`
                    });
                    // html方法会把无弄没有，所以用append来添加，无是默认的
                    $('.js_compareBoxR .o_g').append(fenye_compare_list);
                    kongyu();
                    fenye_pro();
                    fenye_pro_data(fenye_compare_pro);
                }
            })

        }
        fenye_compare_list();

        // 对比项列表信息 end

        // products中含有数据，假装是ajax返回来的数据，将返回的数据放到页面上 start
        var jibencanshu = ['基本参数', '类别', '箱门结构', '机身颜色', '面板材质', '能效等级', '尺寸(深*宽*高mm)', '重量(kg)', '宽度', '总容积(L)'];
        var jishushuju = ['技术数据', '冷藏容积(L)', '冷冻容积(L)', '综合耗电量(kW·h/24h)', '噪音值dB(A)', '冷冻能力(kg/12h)'];
        var peizhi = ['配置', '搁物架（个）', '果菜盒(个)', '变温抽屉（个）', '瓶座（个）', '冷冻抽屉（个）', '折叠搁物架', '蛋盒（个）', '红酒架', '灯', '制冰机'];
        var xingneng = ['性能', '压缩机类型', '制冷方式', '控制方式', '速冻功能', '开门报警', '童锁功能', '按键方式'];
        var tesegongneng = ['特色功能', '特色功能'];
        var jichushuxing = ['基础属性', '价位', '产品系列', '人口', '场景'];
        // 这是总的数组
        var all_list = [jibencanshu, jishushuju, peizhi, xingneng, tesegongneng, jichushuxing];

        // 新方法，二次动态生成内容 第一次动态生成参数列表
        function fenye_pro(fenye_compare_pro) {
            var table_compareBox = '';
            var div = '</div>';
            $.each(all_list, function(index, item) {
                var canshu_item = '';
                table_compareBox += `
                <div class="table_compareBox">
                     <div class="o_g">
                         <span class="tit">${item[0]}</span>
                     </div>`
                item.forEach(function(item2, index2) {
                    if (index2 > 0) {
                        canshu_item += `  
                    <div class="o_g canshu_item">
                         <div class="table_compareBoxL">
                             <span>${item2}</span>
                         </div>
                         <div class="table_compareBoxR">
                             <div class="o_g">
                                <div class="canshu">&nbsp;</div>
                                <div class="canshu">&nbsp;</div>
                                <div class="canshu">&nbsp;</div>
                                <div class="canshu">&nbsp;</div>
                             </div>
                         </div>
                     </div>`
                    }
                });
                table_compareBox = table_compareBox + canshu_item + div;
            });
            $('.js_parameterBox').append(table_compareBox);
        };

        // 第二次动态生成数据来显示
        function fenye_pro_data(fenye_compare_pro) {
            $.each(fenye_compare_pro, function(index, item) {
                var allcanshu_list = $('.canshu_item');
                var arr = [];
                $.each(item, function(index2, item2) {
                    arr.push(item2);
                });
                arr.splice(0, 7);
                $.each(allcanshu_list, function(index3, item3) {
                    $(item3).find('.canshu').eq(index).text(arr[index3]);
                });
            });
        };


        // products中含有数据，假装是ajax返回来的数据，将返回的数据放到页面上 end

        // 清空所有产品 start
        $('.compareListbox').on('click', '.js_linkBtn', function() {
            var $this = $(this);
            $this.parents('.js_compareBoxL').siblings('.js_compareBoxR').find('.o_g').empty();
            compare_num = 0;
            yiyou_kongyu = 0;
            $('.js_compare_pro_total').text(compare_num);
            kongyu();
            $this.parents('.js_compareListbox').siblings('.js_parameterBox').empty();
        });
        // 清空所有产品 end

        // 高亮显示不同项 start
        var yes_high_light = false;
        $('.js_compareListbox').on('click', '.js_high_light_box', function() {
            var $this = $(this);
            var high_light_list = $('.canshu_item');
            var arr = [];
            if (!yes_high_light) {
                yes_high_light = true;
                $this.find('.js_high_light').addClass('xuanzhong');
                $.each(high_light_list, function(index, item) {
                    var $item = $(item);
                    arr = [];
                    $item.find('.canshu').each(function(index2, item2) {
                        arr.push($(item2).text());
                    });
                    if (compare_num == 2) {
                        if (arr[0] != arr[1]) {
                            $item.addClass('bc_248');
                            $item.find('.canshu').addClass('color_6500');
                        }
                    } else if (compare_num == 3) {
                        if (arr[0] != arr[1] || arr[0] != arr[2] || arr[1] != arr[2]) {
                            $item.addClass('bc_248');
                            $item.find('.canshu').addClass('color_6500');
                        }
                    } else if (compare_num == 4) {
                        if (arr[0] != arr[1] || arr[0] != arr[2] || arr[0] != arr[3] || arr[1] != arr[2] || arr[1] != arr[3] || arr[2] != arr[3]) {
                            $item.addClass('bc_248');
                            $item.find('.canshu').addClass('color_6500');
                        }
                    }
                });
            } else {
                yes_high_light = false;
                $this.find('.js_high_light').removeClass('xuanzhong');
                high_light_list.removeClass('bc_248');
                high_light_list.find('.canshu').removeClass('color_6500');
            }

        });
        // 高亮显示不同项 end

        // 隐藏相同项 start
        var yes_hide = false;
        $('.js_compareListbox').on('click', '.js_hide_diff_box', function() {
            var $this = $(this);
            var hide_list = $('.canshu_item');
            var arr = [];
            if (!yes_hide) {
                yes_hide = true;
                $this.find('.js_hide_diff').addClass('xuanzhong');
                $.each(hide_list, function(index3, item3) {
                    var $item = $(item3);
                    arr = [];
                    $item.find('.canshu').each(function(index4, item4) {
                        arr.push($(item4).text());
                    });
                    if (compare_num == 2) {
                        if (arr[0] == arr[1]) {
                            $item.addClass('displaynone');
                        }
                    } else if (compare_num == 3) {
                        if (arr[0] == arr[1] == arr[2]) {
                            $item.addClass('displaynone');
                        }
                    } else if (compare_num == 4) {
                        if (arr[0] == arr[1] == arr[2] == arr[3]) {
                            $item.addClass('displaynone');
                        }
                    }
                });
            } else {
                yes_hide = false;
                $this.find('.js_hide_diff').removeClass('xuanzhong');
                hide_list.removeClass('displaynone');
            }

        });
        // 隐藏相同项 end

        // 分页 casarte 对比部分功能 end



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