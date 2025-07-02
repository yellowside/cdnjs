(function ($) {
    if(!tbCtx) {
        return
    }

    tbCtx.bd = $('body')
    tbCtx.is_logged = tbCtx.bd.hasClass('logged-in')

    tbCtx.storage = {
        set: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value))
        },
        get: function (key) {
            return JSON.parse(localStorage.getItem(key))
        }
    }

    tbCtx.notice = function (code, type, selector) {
        if (!code) return

        type = type ? type : 's'

        if (['s', 'i', 'e'].indexOf(type) == -1) return

        var tip = tbl[code] ? tbl[code] : code
        if(['.vercode-tip', '.contribute-tip'].indexOf(selector) != -1) {
            var bf_html = $(selector).html()
            $(selector).removeClass('s i e').addClass(type).html(tip)
            setTimeout(function() {
                $(selector).removeClass('s i e').html(bf_html)
            }, 1000)
            return
        } else if(selector) {
            $(selector).removeClass('s i e').addClass(type).stop().hide().html(tip).slideDown().delay(1000).slideUp()
            return
        }

        if (!$('.tb-notice').length) {
            tbCtx.bd.append('<div class="tb-notice -rds ' + type + '"></div>')
        }

        $('.tb-notice').removeClass('s i e').addClass(type).stop().hide().html(tip).fadeIn().delay(2000).fadeOut()
    }

    tbCtx.lang_replace = function (str, txt, code) {
        if (!txt || !code || !str) { return str }
        return str.replace(txt, tbl[code] ? tbl[code] : code)
    }

    tbCtx.toggle_scroll = function (type) {
        type = type ? type : 'hide'
        tbCtx.bd[type == 'hide' ? 'addClass' : 'removeClass']('hide')
    }

    tbCtx.validator = {
        checkEmail: function (val) {
            return val && /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)
        },
        checkPassword: function(val) {
            return val && /^[a-zA-Z0-9]{8,16}$/.test(val)
        },
        checkNum: function(val) {
            return val && /^\d+$/.test(val)
        },
        checkName: function (val) {
            return val && /^[\u4E00-\u9FA5a-zA-Z\d_]{2,20}$/.test(val)
        },
        checkUrl: function (val) {
            return val && /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/.test(val)
        }
    }

    tbCtx.copy = function (val) {
        var ipt = document.createElement('input')
        ipt.setAttribute('readonly', 'readonly')
        ipt.setAttribute('value', val)
        document.body.appendChild(ipt)
        ipt.select()
        if (document.execCommand('copy')) {
            document.execCommand('copy')
        }
        document.body.removeChild(ipt)
    }

    tbCtx.event.tb_toggle_menu = function (ele, e) {
        ele.toggleClass('active').parent().siblings('.sub-menu').slideToggle()
        e.preventDefault()
        e.stopPropagation()
        return false
    }

    tbCtx.event.toggle_m_nav = function (ele, e) {
        tbCtx.toggle_scroll($('.header').hasClass('m-nav-show') ? 'show' : 'hide')
        $('.header').toggleClass('m-nav-show')
        $('.-mnav-mask').toggleClass('m-nav-show')
    }

    tbCtx.event.hide_m_nav = function (ele, e) {
        tbCtx.toggle_scroll('show')
        $('.header').removeClass('m-nav-show')
        $('.-mnav-mask').removeClass('m-nav-show')
    }

    tbCtx.event.copy_link = function (ele) {
        ele.addClass('disabled -a')
        tbCtx.copy(window.location.href)
        var msg_ele = ele.parent().siblings('.-msg')
        msg_ele.html(tbl['T004'])
        setTimeout(function() {
            msg_ele.html('')
            ele.removeClass('disabled -a')
        }, 500)
    }

    tbCtx.rm_disable = function () {
        if (!tbCtx.vc_params || !tbCtx.vc_params.ele) return

        tbCtx.vc_params.ele.removeClass('disabled')
        tbCtx.vc_params = ''
    }

    tbCtx.setCookie = function(cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
        var expires = 'expires=' + d.toGMTString()
        document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/'
    }

    $.fn.serializeObject = function () {
        var obj = {}
        $.each(this.serializeArray(), function (i, param) {
            if (!(param.name in obj)) {
                obj[param.name] = param.value.trim()
            }
        })
        return obj
    }

    tbCtx.event.darking = function () {
        var root = $('html:first')
        root.toggleClass('darking')

        var is_night = root.data('night')
        var is_dark  = root.hasClass('darking')

        if ((!is_night && !is_dark) || (is_night && is_dark)) {
            tbCtx.setCookie('darking', '', -1)
            return
        }

        tbCtx.setCookie('darking', is_dark ? 1 : '', 90)
    }


    tbCtx.getUrl = function(key, val) {
        var params = []
        var exists = 0

        var search = document.location.search
        var href = document.location.href.replace(search, '')

        if(search.indexOf('?') != -1) {
            search = search.replace('?', '')
            var search_arr = search.split('&')

            for (var i = 0; i < search_arr.length; i++) {
                if (!search_arr[i]) {
                    continue
                }

                var temp = search_arr[i].split('=')
                if(temp[0] == key) {
                    params.push(key + '=' + val)
                    exists = 1
                } else {
                    params.push(search_arr[i])
                }
            }
        }

        if(!exists) {
            params.push(key + '=' + val)
        }

        return href + '?' + params.join('&')
    }


    tbCtx.event.listFilter = function(ele) {
        document.location.href = tbCtx.getUrl('order', $(ele).attr('data-order'))
    }


    prop_up()
    function prop_up() {
        var f_ele = $('.tb-main-wraper.-prop')
        if(!f_ele.length) {
            return
        }
        // var nodata = $('.tb-nodata.-bg')
        var win_h = $(window).height()
        var ft_h = $('.tb-footer').parent().outerHeight(true)
        f_ele.css({ 'minHeight': (win_h - f_ele.offset().top - 3 - ft_h) + 'px' })
        // nodata.css({'minHeight': (win_h - nodata.offset().top - 3 - 24 - ft_h) + 'px'})
    }

    init_bulletin()
    function init_bulletin() {
        var bulletin = $('.bulletin')
        var item = bulletin.find('li')
        if(!bulletin.length || item.length <= 1) {
            return
        }

        var ul = bulletin.find('ul')
        var h  = '-' + ul.find('li:first').height() + 'px'
        setInterval(function() {
            var first = ul.find('li:first')
            ul.animate({ top: h }).animate({top: 0 }, 0, function() {
                ul.append(first.clone())
                first.remove()
            })
        }, 5000)
    }
})(jQuery);


//
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    tbCtx.lazyload = function (ele, type) {
        if (!ele.length) return
        type = type || 'thumb'

        function load() {
            ele.lazyload({
                data_attribute: 'src',
                placeholder: tbCtx['default_' + type],
                threshold: 300,
                failure_limit: 120
            })
        }
        
        if (!ele.lazyload) {
           $.getScript('https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery.lazyload/1.9.0/jquery.lazyload.min.js', function () { load() })
			// $.getScript('../js/lazyload.min.js', function () { load() })
        } else {
            load()
        }
    }
    var tmbs = $('.tb-thumb img')
    var avt = $('.cmt-main .item-avatar')
    if (tmbs.length || avt.length) {
        tmbs.length && tbCtx.lazyload(tmbs)
        avt.length && tbCtx.lazyload(avt)
    }
})(jQuery);





//  首页tab切换
//  分类页tab滚动
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    var widget_tab_info = {}
    tbCtx.event.widget_tab_handle = function(ele) {
        if(ele.siblings('.disabled').length || ele.hasClass('disabled')) {
            return
        }

        ele.addClass('disabled')

        var cur_active = ele.siblings('.active').data('catid')
        var cur_id = ele.data('catid')

        if(cur_active == cur_id) {
            ele.removeClass('disabled')
            return
        }

        var widget_wraper = ele.closest('.widget')
        var tab_wraper = ele.closest('.sub-menu-tabs')
        var widget_id = tab_wraper.attr('id')
        
        ele.siblings().removeClass('active')
        ele.addClass('active')
        tab_wraper.find('.-inner').scrollLeft(ele.position().left)

        // 显示正在加载中
        widget_wraper.append('<div class="tab-change-loading"><span class="tb-spin"></span></div>')

        // 更多
        var more = widget_wraper.find('.-more')
        var more_link = ele.data('more')
        if(more_link && more.length) {
            more.attr('href', more_link)
        }
        

        if(!widget_tab_info[widget_id]) {
            widget_tab_info[widget_id] = {}
        }

        // 缓存当前显示内容
        var content_html = widget_wraper.find('ul.post-list') || widget_wraper.find('.tb-nodata')
        if(!widget_tab_info[widget_id][cur_active]) {
            widget_tab_info[widget_id][cur_active] = content_html.clone()
        }


        // 当前点击tab是否已有缓存
        if(widget_tab_info[widget_id][cur_id]) {
            // 删除当前显示内容
            content_html.fadeOut().remove()

            var html_str = $(widget_tab_info[widget_id][cur_id])

            widget_wraper.append(html_str)

            html_str.hide().fadeIn()

            widget_wraper.find('.tab-change-loading').remove()
            ele.removeClass('disabled')

            var tmbs = $('.tb-thumb img')
            tmbs.length && tbCtx.lazyload(tmbs)
            tbCtx.list_show_qrcode()
            return
        }

        var query = JSON.parse(tab_wraper.attr('data-query'))
        query.action = 'tb_home_tab_info'

        if(query.tax_query && query.tax_query[0]) {
            query.tax_query[0].terms = [cur_id]
        }

        $.get(tbCtx.ajaxUri, query, function (data) {
            if(!data.result) {
                return
            }
            
            content_html.fadeOut().remove()

            var html_str = $(data.data)
            widget_wraper.append(html_str)
            html_str.hide().fadeIn()

            widget_wraper.find('.tab-change-loading').remove()
            ele.removeClass('disabled')

            var tmbs = $('.tb-thumb img')
            tmbs.length && tbCtx.lazyload(tmbs)

            tbCtx.list_show_qrcode()
        }, 'json')
    }


    // 分类页tab滚动
    var category_sub_tab = $('.tb-bar .sub-menu-tabs')
    if(category_sub_tab.length) {
        category_sub_tab.find('.-inner').scrollLeft(category_sub_tab.find('.-itm.active').position().left)
    }
})(jQuery);


//
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    var gap = 24
    var lastTime = ''
    var anchor_scrolling = 0
    var anchor_timer = null
    var home_anchor_module = ''
    var has_anchor = ''

    // 默认执行，避免帖子数较小时未出现滚动条
    $(window).load(function () {
        autoload_list($(window).scrollTop())
    })

    var side = sideRollInit(gap)
    scrollHandle(function (arg) {
        toggleScrollTop(arg)
        autoload_list(arg)
        has_anchor && autoActiveMenu(arg)
        side.canRoll && s_roll(arg, side, gap)
    })

    tbCtx.event.scroll_top = function () {
        $('html,body').animate({ scrollTop: 0 }, 300)
    }

    function scrollHandle(handle) {
        $(window).scroll(function () {
            var curTime = Date.now()
            if(curTime - lastTime >= 100) {
                lastTime = curTime
                handle($(window).scrollTop())
            }
        })
    }

    function toggleScrollTop(scrollTop) {
        var e = $('.scroll-top')
        scrollTop > 300 ? e.addClass('show') : e.removeClass('show')
    }

    function autoload_list(scrollTop) {
        if (!$('.tb-loop-list').length) return
        var last = $('.tb-loop-list li' + ':last-child')
        if (!last.length) return
        var auto = $('.tb-autoload')
        if (auto.attr('data-href') && scrollTop + $(window).height() >= last.offset().top + last.outerHeight()) {
            auto.fadeIn()
            var max = auto.attr('data-max')
            if (!(max && parseInt(max) <= parseInt(auto.attr('data-current')))) { tbCtx.event.load_posts(auto) }
        }
    }

    var list_loading = false
    tbCtx.event.load_posts = function (ele) {
        if (list_loading) return
        list_loading = 1

        ele.html('<span class="tb-spin"></span>')
        $.ajax({
            type: 'get',
            url: ele.attr('data-href'),
            success: function (data) {
                var max = ele.attr('data-max')
                if (!(max && parseInt(max) == parseInt(ele.attr('data-current')))) {
                    ele.hide()
                }

                var data = $(data)
                var list = data.find('.tb-loop-list li')
                var collect = list.find('.fa-collect')
                var goods = list.find('.fa-good')
                collect.length && tbCtx.collect_install(collect)
                goods.length && tbCtx.good_install(goods)

                var next = data.find('.tb-autoload').attr('data-href')
                if (next) {
                    ele.attr('data-href', next).attr('data-current', data.find('.tb-autoload').attr('data-current')).attr('data-event', data.find('.tb-autoload').attr('data-event')).html(data.find('.tb-autoload').html())
                } else {
                    ele.remove()
                }

                $('.tb-loop-list').append(list)
                list_loading = 0
                autoload_list(0)
                tbCtx.lazyload(list.find('.tb-thumb img'))
                tbCtx.list_show_qrcode()
            }
        })
    }

    function sideRollInit(gap) {
        var side = $('.tb-sidebar')
        var roll = side.attr('data-roll') ? side.attr('data-roll').split(' ') : []
        var its = side.children('.widget')
        var fh = 0
        for (var i = 0; i < roll.length; i++) {
            var dom = its.eq(roll[i] - 1)
            if (!dom.length) {
                continue
            }
            fh += dom.outerHeight(true)
        }
        return {
            canRoll: side.length && roll.length && its.length && !tbCtx.bd.hasClass('is-mobile'),
            sidebar: side,
            side_h: side.height() - gap,
            roll: roll,
            items: its,
            fixed_h: fh,
        }
    }

    function s_roll(st, sd, gap) {
        var doc_h = $(document).height()
        var footer_h = $('.tb-footer').outerHeight()
        var header_h = $(document).width() <= 1024 + 202 ? $('.tb-topper').outerHeight() : 0
        var side_top_menu = sd.sidebar.offset().top - header_h
        if (st > side_top_menu + sd.side_h) {
            var top = 0
            for (var i = 0; i < sd.roll.length; i++) {
                var dom = sd.items.eq(sd.roll[i] - 1)
                if (!dom.length) {
                    break
                }
                if (st > doc_h - footer_h - header_h - gap - sd.fixed_h) {
                    dom.removeClass('-fix-t').addClass('-fix-b').css('top', doc_h - footer_h - header_h - sd.fixed_h - side_top_menu + top)
                } else {
                    dom.removeClass('-fix-b').addClass('-fix-t').css('top', header_h + gap + top)
                }
                top += dom.outerHeight(true)
            }
        } else {
            sd.items.removeClass('-fix-t -fix-b').css('top', '')
        }
    }

    // ============================== 首页锚点 ==============================
    tbCtx.event.tb_anchor = function(ele, e) {
        if(!tbCtx.is_home) {
            return
        }
        if(anchor_timer) {
            clearTimeout(anchor_timer)
        }
        anchor_scrolling = 1

        $('.menu-item').removeClass('current-anchor').removeClass('current-menu-parent')

        var current_anchor = ele.parent('.menu-item')
        current_anchor.addClass('unfold')

        // 仅点击非分类菜单时高亮
        if(!ele.data('catid')) {
            current_anchor.addClass('current-anchor')
        }

        // 高亮并展开父级
        current_anchor.parents('.menu-item').addClass('current-menu-parent').addClass('unfold')

        var anchor_id = ''
        var anchor = []

        if(ele.attr('data-anchor')) {
            anchor_id = ele.attr('data-anchor').split('|')
            anchor = $(anchor_id[0])
        }

        if(anchor.length) {
            $('html,body').animate({
                scrollTop: anchor.offset().top - 24 * 4
            }, 300, 'swing', function() {
                if(anchor_timer) {
                    clearTimeout(anchor_timer)
                }
                
                anchor_timer = setTimeout(function() {
                    anchor_scrolling = 0
                }, 300)
            })
            
            // 切换tab
            var current_tabs = anchor.siblings('.sub-menu-tabs')
            if(current_tabs.length) {
                var current_active = current_tabs.find('.-itm.active').data('catid')

                var current_anchor_catid = ele.data('catid')
                current_anchor_catid = current_anchor_catid || 'all'

                if(current_active != current_anchor_catid) {
                    tbCtx.event.widget_tab_handle(current_tabs.find('.-itm[data-catid="' + current_anchor_catid + '"]'))
                }
            }
            
        }
        
        tbCtx.event.hide_m_nav()
        e && e.preventDefault()
        return false
    }

    var anchor = window.location.hash
    if(tbCtx.is_home) {
        history.scrollRestoration = 'manual'
        // 首页有锚点时自动定位
        var cur_anchor = $('.menu-item a[href="'+anchor+'"]')
        if(cur_anchor.length){
            tbCtx.event.tb_anchor(cur_anchor, '')
        }
        
        // 首页锚点
        has_anchor = $('.menu-item a[data-event="tb_anchor"]').length

        // 首页主体模块
        home_anchor_module = $('.tb-sidebar-h h3[data-is-anchor="1"]')
    }

    // 滚动时自动高亮到对应菜单
    function autoActiveMenu(scrollTop) {
        if(!tbCtx.is_home || anchor_scrolling || scrollTop + 24 * 4 < $(home_anchor_module[0]).offset().top) {
            return
        }

        var len = home_anchor_module.length
        var active_id = ''

        home_anchor_module.each(function(i) {
            var next = i < len -1 ? home_anchor_module[i + 1] : null
            if(next) {
                if($(next).offset().top - 24 * 4 >= scrollTop) {
                    active_id = $(this).attr('id')
                    return false
                }
            } else {
                active_id = $(this).attr('id')
                return false
            }
        })

        if(!active_id) {
            return
        }
        
        $('.menu-item').removeClass('current-anchor').removeClass('current-menu-parent').removeClass('unfold')

        var current_anchor = $('.menu-item a[data-anchor="#'+active_id+'"]').parent('.menu-item')
        current_anchor.addClass('current-anchor').addClass('unfold')

        current_anchor.parents('.menu-item').addClass('current-menu-parent').addClass('unfold')
    }
})(jQuery);

//
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    var code_modal = $('.tb-modal.-vercode')
    function init_code_modal(cb) {
        if (!tbCtx.vercode) { return }
        if (!code_modal.length) {
            tbCtx.bd.append('<div class="tb-modal active -vercode"><div class="-mask" data-event="hide_ver_modal"></div><div class="m-inner -b -rds"><span class="tbfa fa-close" data-event="hide_ver_modal"></span><div class="-title">' + tbl['T005'] + '</div><div class="-c" data-event="reset_code"><span class="-code">' + creat_code() + '</span><span class="tbfa fa-refresh"></span></div><input class="tb-ipt" name="vercode" placeholder="' + tbl['T006'] + '"><div class="submit vercode-tip tb-btn -p" data-cb="' + cb + '" data-event="handle_vercode">' + tbl['T007'] + '</div></div></div>')
            code_modal = $('.tb-modal.-vercode')
        } else {
            code_modal.addClass('active')
            tbCtx.event.reset_code()
            $('.tb-modal .submit').attr('data-cb', cb)
        }
    }

    function creat_code(len) {
        len = len || 4
        var str = '1234567890'
        var code = ''
        for (var i = 0; i < len; i++) {
            code += str.substr(Math.floor(Math.random() * str.length), 1)
        }
        return code
    }

    tbCtx.event.reset_code = function () {
        code_modal.find('.-code').html(creat_code())
        code_modal.find('.fa-refresh').addClass('-rotate')

        setTimeout(function () {
            code_modal.find('.fa-refresh').removeClass('-rotate')
        }, 300)
    }

    tbCtx.event.show_vercode = function (cb) {
        if (tbCtx.vercode) {
            init_code_modal(cb)
            tbCtx.toggle_scroll('hide')
        } else {
            tbCtx.event[cb]()
        }
    }

    tbCtx.event.hide_ver_modal = function (ele, e, flag) {
        code_modal.removeClass('active')
        tbCtx.toggle_scroll('show')
        !flag && tbCtx.rm_disable()
    }

    tbCtx.event.handle_vercode = function (e) {
        var c = $('.tb-ipt[name="vercode"]').val()
        if (!c) {
            tbCtx.notice('T006', 'e', '.vercode-tip')
            return
        }

        if (!tbCtx.validator.checkNum(c) || c != code_modal.find('.-c').text().toLowerCase()) {
            tbCtx.notice('T008', 'e', '.vercode-tip')
            return
        } else {
            $('.tb-ipt[name="vercode"]').val('')
            tbCtx.event.hide_ver_modal('', '', 1)
            tbCtx.event[code_modal.find('.submit').attr('data-cb')]()
        }
    }
})(jQuery);


//
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    tbCtx.good_install = install
    tbCtx.event.like = handleLike

    var lks = $('.tb-like')
    if (lks.length) { install(lks)}

    function install(lks) {
        if(tbCtx.is_logged) {
            $.get(tbCtx.ajaxUri, {
                action: 'tb_get_actioned',
                type: 'like'
            }, function (data) {
                if(!data.result) {
                    return
                }
                likes_active(lks, data.posts)
            }, 'json')
        } else {
            likes_active(lks, tbCtx.storage.get('like') || [])
        }
    }

    function likes_active(lks, likes) {
        lks.each(function (i, ele) {
            var je = $(ele)
            if(likes.indexOf(je.attr('data-id')) != -1) {
                je.addClass('fa-good-fill')
                je.html((je.attr('data-active-hide') ? ' ' : je.html()) + je.attr('data-suffix'))
            }
        })
    }

    function handleLike(ele) {
        ele.addClass('disabled')
        var id = ele.attr('data-id')
        
        var arr = [], is_cancle = 0

        if(!tbCtx.is_logged) {
            arr = tbCtx.storage.get('like') || []
            is_cancle = arr.indexOf(id) != -1 ? 1 : 0
    
            if (is_cancle) {
                arr = arr.filter(function (item) { return item !== id })
            } else {
                arr.push(id)
            }
        }

        $.ajax({
            url: tbCtx.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: { action: 'tb_user_action', id: id, type: 'like', is_cancle: is_cancle },
            success: function (data) {
                if(!tbCtx.is_logged) {
                    tbCtx.storage.set('like', arr)
                }
                var html = ' ' + (ele.attr('data-active-hide') && !data.is_cancel ? ele.attr('data-suffix') : data.total)
                ele[!data.is_cancel ? 'addClass' : 'removeClass']('fa-good-fill').html(html).removeClass('disabled')
            },
            error: function () {
                ele.removeClass('disabled')
            }
        })
    }

    tbCtx.event.tb_click_handle = function (ele, e) {
        ele.addClass('disabled')

        var link = ele.data('link')
        var id = ele.data('id')

        if (link) {
            window.open(link)
            e.preventDefault()
            !id && ele.removeClass('disabled')
        }

        if (!id) { return }
        $.ajax({
            url: tbCtx.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'tb_user_action',
                id: id,
                type: 'click'
            },
            complete: function () { ele.removeClass('disabled') }
        })
    }
})(jQuery);


//  鼠标移上去显示二维码
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    tbCtx.list_show_qrcode = function() {
        if($('.list-qrcode').length) {
            hover_show_qrcode()
            mouseleave_hide()
        }
    }

    tbCtx.list_show_qrcode()

    function hover_show_qrcode() {
        $('.list-qrcode').hover(function() {
            var wraper = $(this).parent().parent()
            var qrcode_pop = wraper.find('.qrcode-pop')
            if(qrcode_pop.length) {
                qrcode_pop.show()
            } else {
                var src = $(this).attr('data-img')
                var link = $(this).attr('data-link')
                if(!src && link) {
                    src = tbCtx.themeUri + 'https://api.qianqi.net/code/?text=' + link
                }

                var pop = '<div class="qrcode-pop"><i class="loading"></i><img alt="qrcode" src="' + src + '"></div>'
                
                if(wraper.find('.tb-collect-wraper')) {
                    wraper.find('.tb-collect-wraper').before(pop)
                } else {
                    wraper.append(pop)
                }

                wraper.find('.qrcode-pop').show()
                mouseleave_hide()
            }
        })
    }

    function mouseleave_hide() {
        $('.qrcode-pop').bind('mouseleave', function() {
            $(this).hide()
        })
    }
})(jQuery);


//
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    var collect = $('.tb-collect')
    if (collect.length) {
        install(collect)
    }

    tbCtx.collect_install = install
    tbCtx.event.collect = handleCollect

    function get_user_collected(callback) {
        if (!tbCtx.is_logged) {
            return
        }

        $.get(tbCtx.ajaxUri, {
            action: 'tb_get_actioned',
            type: 'collect'
        }, function (data) {
            callback(data && data.posts ? data.posts : [])
        }, 'json')
    }

    function install(collect) {
        get_user_collected(function (collected) {
            if (!collected.length) {
                return
            }

            collect.each(function (i, ele) {
                var jEle = $(ele)
                if(collected.indexOf(jEle.attr('data-id')) != -1) {
                    jEle.addClass('fa-collect-fill')
                    jEle.html((jEle.attr('data-active-hide') ? '' : jEle.html()) + jEle.attr('data-suffix'))
                }
            })
        })
    }

    function handleCollect(ele) {
        ele.addClass('disabled')

        if (!tbCtx.is_logged) {
            tbCtx.event.show_in()
            return
        }

        var id = ele.attr('data-id')
        $.ajax({
            url: tbCtx.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: { action: 'tb_user_action', id: id, type: 'collect' },
            success: function (data) {
                ele.removeClass('disabled')
                var show_count = ele.attr('data-count'), active_hide = ele.attr('data-active-hide')
                if (show_count) {
                    ele.html(' ' + (active_hide && !data.is_cancel ? '' : data.total) + (data.is_cancel ? '' : ele.attr('data-suffix')) )
                }

                var list = $('.tb-clt-list')
                if (data.is_cancel) {
                    $('.tb-collect[data-id="' + id + '"]').removeClass('fa-collect-fill')
                    list.find('li[data-id="' + id + '"]').remove()

                    if (list.length && !list.children('li').length) {
                        list.removeClass('active')
                    }
                } else {
                    $('.tb-collect[data-id="' + id + '"]').addClass('fa-collect-fill')
                    if (list.length && data.output) {
                        list.append(data.output)
                        list.addClass('active')
                    }
                }
                tbCtx.notice(data.msg)
            },
            error: function (xhr, str, err) {
                ele.removeClass('disabled')
            }
        })
    }
})(jQuery);


// 分享
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    tbCtx.shareInfo = {
        link: document.URL,
        title: document.title,
        desc: $('meta[name="description"]').length ? $('meta[name="description"]').attr("content") : "",
        imgUrl: tbCtx.share_img
    }

    init_sdk()
    function init_sdk() {
        if (tbCtx.bd.hasClass('sdk-share-on')) {
            getAccessToken(location.href.split('#')[0]).done(function (res) {
                if (res.result) {
                    $.getScript('https://res.wx.qq.com/open/js/jweixin-1.6.0.js', function () { sdkShare() })
                } else {
                    console.log(res)
                }
            })
        }
    }

    function getAccessToken(url) {
        return $.ajax({
            url: tbCtx.ajaxUri,
            type: 'GET',
            data: {
                action: 'wx_signature',
                url: url
            },
            dataType: 'json',
            success: function (res) {
                if (!res.result) { return }
                
                window.tbCtx.wx = {
                    timestamp: res.info.timestamp,
                    nonceStr: res.info.nonceStr,
                    signature: res.info.signature
                }
            }
        })
    }

    function sdkShare() {
        wx.config({
            debug: false,
            appId: tbCtx.appID,
            timestamp: tbCtx.wx.timestamp,
            nonceStr: tbCtx.wx.nonceStr,
            signature: tbCtx.wx.signature,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo']
        })

        wx.ready(function () {
            wx.updateAppMessageShareData(tbCtx.shareInfo)
            wx.updateTimelineShareData(tbCtx.shareInfo)
            wx.onMenuShareWeibo(tbCtx.shareInfo)
        })
    }

    tbCtx.event.share = function (ele) {
        var type = ele.data('type')
        var url = ''
        switch (type) {
            case 'qq':
                url = 'http://connect.qq.com/widget/shareqq/index.html?url=' + tbCtx.shareInfo.link + '&title=' + tbCtx.shareInfo.title + '&desc=' + tbCtx.shareInfo.desc + '&pics=' + tbCtx.shareInfo.imgUrl + '&summary=' + tbCtx.shareInfo.title
                break
            case 'weibo':
                url = 'https://service.weibo.com/share/share.php?url=' + tbCtx.shareInfo.link + '&title=' + tbCtx.shareInfo.title + '&pic=' + tbCtx.shareInfo.imgUrl
                break
            case 'wechat':
                break
            case 'douban':
                url = 'http://www.douban.com/share/service?image=' + tbCtx.shareInfo.imgUrl + '&href=' + tbCtx.shareInfo.link + '&name=' + tbCtx.shareInfo.title + '&text=' + tbCtx.shareInfo.desc
                break
            case 'qzone':
                url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + tbCtx.shareInfo.link + '&title=' + tbCtx.shareInfo.title + '&desc=' + tbCtx.shareInfo.desc + '&pics=' + tbCtx.shareInfo.imgUrl
                break
            case 'line':
                url = 'http://line.naver.jp/R/msg/text/?' + tbCtx.shareInfo.title + '%0D%0A' + tbCtx.shareInfo.link
                break
            case 'twitter':
                url = 'https://twitter.com/intent/tweet?text=' + tbCtx.shareInfo.title + '&url=' + tbCtx.shareInfo.link
                break
            case 'facebook':
                url = 'https://www.facebook.com/sharer/sharer.php?u=' + tbCtx.shareInfo.link + '&title=' + tbCtx.shareInfo.title + '&description=' + tbCtx.shareInfo.desc
                break
            case 'telegram':
                url = 'https://telegram.me/share/url?text=' + tbCtx.shareInfo.title + '&url=' + tbCtx.shareInfo.link
                break
            case 'skype':
                url = 'https://web.skype.com/share?text=' + tbCtx.shareInfo.title + '&url=' + tbCtx.shareInfo.link
                break
            case 'copy':
                tbCtx.event.copy_link(ele)
                break
        }

        url && window.open(url)
    }

})(jQuery);


//
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    var h_search_pc = $('.tb-search.-pc')

    init()
    function init() {
        var st = $('.tb-s-type')
        if (!st) {
            return
        }

        var id = tbCtx.storage.get('tb_s_id')
        var cur = st.find(id ? '[data-id="' + id + '"]' : ':first-child')
        cur = cur.length ? cur : st.find(':first-child')
        cur.addClass('active')
        h_search_pc.attr('action', cur.attr('data-url')).find('.-cur').html($(cur[0]).text())
    }

    tbCtx.event.hide_search = function(ele) {
        $('.-fase-search').removeClass('active')
        tbCtx.toggle_scroll('show')
    }

    tbCtx.event.show_search = function(ele) {
        $('.-fase-search').addClass('active')
        tbCtx.toggle_scroll()
    }

    tbCtx.event.search_type_change = function (ele) {
        tbCtx.storage.set('tb_s_id', ele.attr('data-id'))
        ele.siblings().removeClass('active')
        ele.addClass('active')
        h_search_pc.attr('action', ele.attr('data-url')).find('.-cur').text(ele.text())
        $('.tb-s-cur').trigger('mouseleave')
    }
    
    $('.tb-s-cur').on('click mouseenter', function() {
        $(this).addClass('tooptip-show')
    })
    $('.tb-s-cur').on('mouseleave', function() {
        $(this).removeClass('tooptip-show')
    })
    
    $('.tb-search').submit(function (e) {
        var s = $(this).find('input[name="s"]').val().trim()
        if (!s || s.length > 100) {
            e.preventDefault()
            tbCtx.notice('T064', 'e')
            return false
        }
        window.open($(this).attr('action').replace(/\%keyword\%/g, s))
        
        e.preventDefault()
        return false
    })
})(jQuery);

////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($){
    tbCtx.event.show_share = function() {
        $('.-share-modal').addClass('active')
        tbCtx.toggle_scroll()
    }

    tbCtx.event.hide_share = function() {
        $('.-share-modal').removeClass('active')
        tbCtx.toggle_scroll('show')
    }
})(jQuery);

////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    var search_filter = $('.search-filter')
    if(search_filter.length) {
        search_filter.animate({ scrollLeft: search_filter.find('.active').offset().left - search_filter.offset().left}, 200)
    }

    if($('body').hasClass('is-mobile')) {
        tbCtx.event.filter_show = function(ele) {
            $(ele).find('.tb-tooltip').toggle()
            $(ele).find('.close-icon').toggle()
            $(ele).find('.order-icon').toggle()
        }
    }


    $(document).on('click change', '[data-event]', function (e) {
        var ele = $(this)
        var event_type = ele.attr('data-event-type') || 'click'
        if (ele.hasClass('disabled')) { return }

        var eventMethod = ele.attr('data-event')
        if (e.type === event_type && eventMethod && tbCtx.event[eventMethod]) {
            tbCtx.event[eventMethod](ele, e)
        }
    })
})(jQuery)
