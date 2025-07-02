(function ($) {
    if(!misidao) {
        return
    }

    misidao.bd = $('body')
    misidao.is_logged = misidao.bd.hasClass('logged-in')

    misidao.storage = {
        set: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value))
        },
        get: function (key) {
            return JSON.parse(localStorage.getItem(key))
        }
    }

    misidao.notice = function (code, type, selector) {
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
            misidao.bd.append('<div class="tb-notice -rds ' + type + '"></div>')
        }

        $('.tb-notice').removeClass('s i e').addClass(type).stop().hide().html(tip).fadeIn().delay(2000).fadeOut()
    }

    misidao.lang_replace = function (str, txt, code) {
        if (!txt || !code || !str) { return str }
        return str.replace(txt, tbl[code] ? tbl[code] : code)
    }

    misidao.toggle_scroll = function (type) {
        type = type ? type : 'hide'
        misidao.bd[type == 'hide' ? 'addClass' : 'removeClass']('hide')
    }

    misidao.validator = {
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

    misidao.copy = function (val) {
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

    misidao.event.tb_toggle_menu = function (ele, e) {
        ele.toggleClass('active').parent().siblings('.sub-menu').slideToggle()
        e.preventDefault()
        e.stopPropagation()
        return false
    }

    misidao.event.toggle_m_nav = function (ele, e) {
        misidao.toggle_scroll($('.header').hasClass('m-nav-show') ? 'show' : 'hide')
        $('.header').toggleClass('m-nav-show')
        $('.-mnav-mask').toggleClass('m-nav-show')
    }

    misidao.event.hide_m_nav = function (ele, e) {
        misidao.toggle_scroll('show')
        $('.header').removeClass('m-nav-show')
        $('.-mnav-mask').removeClass('m-nav-show')
    }

    misidao.event.copy_link = function (ele) {
        ele.addClass('disabled -a')
        misidao.copy(window.location.href)
        var msg_ele = ele.parent().siblings('.-msg')
        msg_ele.html(tbl['T004'])
        setTimeout(function() {
            msg_ele.html('')
            ele.removeClass('disabled -a')
        }, 500)
    }

    misidao.rm_disable = function () {
        if (!misidao.vc_params || !misidao.vc_params.ele) return

        misidao.vc_params.ele.removeClass('disabled')
        misidao.vc_params = ''
    }

    misidao.setCookie = function(cname, cvalue, exdays) {
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

    misidao.event.darking = function () {
        var root = $('html:first')
        root.toggleClass('darking')

        var is_night = root.data('night')
        var is_dark  = root.hasClass('darking')

        if ((!is_night && !is_dark) || (is_night && is_dark)) {
            misidao.setCookie('darking', '', -1)
            return
        }

        misidao.setCookie('darking', is_dark ? 1 : '', 90)
    }


    misidao.getUrl = function(key, val) {
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


    misidao.event.listFilter = function(ele) {
        document.location.href = misidao.getUrl('order', $(ele).attr('data-order'))
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
    misidao.lazyload = function (ele, type) {
        if (!ele.length) return
        type = type || 'thumb'

        function load() {
            ele.lazyload({
                data_attribute: 'src',
                placeholder: misidao['default_' + type],
                threshold: 300,
                failure_limit: 120
            })
        }
        
        if (!ele.lazyload) {
            $.getScript('https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery.lazyload/1.9.0/jquery.lazyload.min.js', function () { load() })
        } else {
            load()
        }
    }
    var tmbs = $('.tb-thumb img')
    var avt = $('.cmt-main .item-avatar')
    if (tmbs.length || avt.length) {
        tmbs.length && misidao.lazyload(tmbs)
        avt.length && misidao.lazyload(avt)
    }
})(jQuery);

//  首页tab切换
//  分类页tab滚动
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    var widget_tab_info = {}

    misidao.event.widget_tab_handle = function(ele) {
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
            tmbs.length && misidao.lazyload(tmbs)
            misidao.list_show_qrcode()
            return
        }

        var query = JSON.parse(tab_wraper.attr('data-query'))
        query.action = 'tb_home_tab_info'

        if(query.tax_query && query.tax_query[0]) {
            query.tax_query[0].terms = [cur_id]
        }

        $.get(misidao.ajaxUri, query, function (data) {
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
            tmbs.length && misidao.lazyload(tmbs)

            misidao.list_show_qrcode()
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

    misidao.event.scroll_top = function () {
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
            if (!(max && parseInt(max) <= parseInt(auto.attr('data-current')))) { misidao.event.load_posts(auto) }
        }
    }

    var list_loading = false
    misidao.event.load_posts = function (ele) {
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

                var next = data.find('.tb-autoload').attr('data-href')
                if (next) {
                    ele.attr('data-href', next).attr('data-current', data.find('.tb-autoload').attr('data-current')).attr('data-event', data.find('.tb-autoload').attr('data-event')).html(data.find('.tb-autoload').html())
                } else {
                    ele.remove()
                }

                $('.tb-loop-list').append(list)
                list_loading = 0
                autoload_list(0)
                misidao.lazyload(list.find('.tb-thumb img'))
                misidao.list_show_qrcode()
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
            canRoll: side.length && roll.length && its.length && !misidao.bd.hasClass('is-mobile'),
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
    misidao.event.tb_anchor = function(ele, e) {
        if(!misidao.is_home) {
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
                    misidao.event.widget_tab_handle(current_tabs.find('.-itm[data-catid="' + current_anchor_catid + '"]'))
                }
            }
            
        }
        
        misidao.event.hide_m_nav()
        e && e.preventDefault()
        return false
    }

    var anchor = window.location.hash
    if(misidao.is_home) {
        history.scrollRestoration = 'manual'
        // 首页有锚点时自动定位
        var cur_anchor = $('.menu-item a[href="'+misidao.blog_url+anchor+'"]')
        if(cur_anchor.length){
            misidao.event.tb_anchor(cur_anchor, '')
        }
        
        // 首页锚点
        has_anchor = $('.menu-item a[data-event="tb_anchor"]').length

        // 首页主体模块
        home_anchor_module = $('.tb-sidebar-h h3[data-is-anchor="1"]')
    }

    // 滚动时自动高亮到对应菜单
    function autoActiveMenu(scrollTop) {
        if(!misidao.is_home || anchor_scrolling || scrollTop + 24 * 4 < $(home_anchor_module[0]).offset().top) {
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
        if (!misidao.vercode) { return }
        if (!code_modal.length) {
            misidao.bd.append('<div class="tb-modal active -vercode"><div class="-mask" data-event="hide_ver_modal"></div><div class="m-inner -b -rds"><span class="tbfa fa-close" data-event="hide_ver_modal"></span><div class="-title">' + tbl['T005'] + '</div><div class="-c" data-event="reset_code"><span class="-code">' + creat_code() + '</span><span class="tbfa fa-refresh"></span></div><input class="tb-ipt" name="vercode" placeholder="' + tbl['T006'] + '"><div class="submit vercode-tip tb-btn -p" data-cb="' + cb + '" data-event="handle_vercode">' + tbl['T007'] + '</div></div></div>')
            code_modal = $('.tb-modal.-vercode')
        } else {
            code_modal.addClass('active')
            misidao.event.reset_code()
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

    misidao.event.reset_code = function () {
        code_modal.find('.-code').html(creat_code())
        code_modal.find('.fa-refresh').addClass('-rotate')

        setTimeout(function () {
            code_modal.find('.fa-refresh').removeClass('-rotate')
        }, 300)
    }

    misidao.event.show_vercode = function (cb) {
        if (misidao.vercode) {
            init_code_modal(cb)
            misidao.toggle_scroll('hide')
        } else {
            misidao.event[cb]()
        }
    }

    misidao.event.hide_ver_modal = function (ele, e, flag) {
        code_modal.removeClass('active')
        misidao.toggle_scroll('show')
        !flag && misidao.rm_disable()
    }

    misidao.event.handle_vercode = function (e) {
        var c = $('.tb-ipt[name="vercode"]').val()
        if (!c) {
            misidao.notice('T006', 'e', '.vercode-tip')
            return
        }

        if (!misidao.validator.checkNum(c) || c != code_modal.find('.-c').text().toLowerCase()) {
            misidao.notice('T008', 'e', '.vercode-tip')
            return
        } else {
            $('.tb-ipt[name="vercode"]').val('')
            misidao.event.hide_ver_modal('', '', 1)
            misidao.event[code_modal.find('.submit').attr('data-cb')]()
        }
    }
})(jQuery);


//
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    if (!misidao.is_logged) {
        var lks = $('.tb-like')
        var likes = misidao.storage.get('like') || []
        lks.length && lks.each(function (i, ele) {
            var je = $(ele)
            if(likes.indexOf(je.data('id')) != -1) {
                je.addClass('-active')
            }
        })
    }

    misidao.event.like_add = function(ele) {
        ele.addClass('disabled')
        var id = ele.data('id')
        var arr = []

        if(!misidao.is_logged) {
            arr = misidao.storage.get('like') || []

            if(arr.indexOf(id) != -1) {
                ele.removeClass('disabled')
                misidao.notice('T069')
                return
            }

            arr.push(id)
        }

        $.ajax({
            url: misidao.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'like_add',
                id: id
            },
            success: function (data) {
                if(!data.result) {
                    ele.removeClass('disabled')
                    data.msg && misidao.notice(data.msg)
                    return
                }

                if(!misidao.is_logged) {
                    misidao.storage.set('like', arr)
                }

                ele.removeClass('disabled')

                $('.tb-like[data-id="' + id + '"]').addClass('-active').attr('data-event', 'like_del').find('.count').html(data.total)
            },
            error: function () {
                ele.removeClass('disabled')
            }
        })
    }

    misidao.event.like_del = function(ele) {
        ele.addClass('disabled')
        var id = ele.attr('data-id')

        $.ajax({
            url: misidao.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'like_del',
                id: id
            },
            success: function (data) {

                if(!data.result) {
                    ele.removeClass('disabled')
                    misidao.notice(data.msg)
                    return
                }

                ele.removeClass('disabled')
                
                $('.tb-like[data-id="' + id + '"]').removeClass('-active').attr('data-event', 'like_add').find('.count').html(data.total)
            },
            error: function () {
                ele.removeClass('disabled')
            }
        })
    }

    misidao.event.tb_click_handle = function (ele, e) {
        ele.addClass('disabled')

        var link = ele.data('link')
        var id = ele.data('id')

        if (link) {
            window.open(link)
            e.preventDefault()
            !id && ele.removeClass('disabled')
        }

        if (!id) return

        $.ajax({
            url: misidao.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'click_add',
                id: id
            },
            complete: function () { ele.removeClass('disabled') }
        })
    }
})(jQuery);


//  鼠标移上去显示二维码
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    misidao.list_show_qrcode = function() {
        if($('.list-qrcode').length) {
            hover_show_qrcode()
            mouseleave_hide()
        }
    }

    misidao.list_show_qrcode()

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
                    src = 'https://api.qianqi.net/code/?text=' + link
                }

                var pop = '<div class="qrcode-pop"><i class="loading"></i><img alt="qrcode" src="' + src + '"></div>'
                
                wraper.append(pop)

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
    misidao.event.tbm_favorite_add = function(ele) {
        $(ele).addClass('disabled')

        if(!TBM) {
            console.log('TBM 不存在')
            $(ele).removeClass('disabled')
            return
        }

        TBM.evName = 'favorite-add'

        var id = $(ele).data('id')
        TBM.evParams = {
            post_id: id,
        }

        TBM.soo(function (data) {

            $('.tb-collect[data-id="' + id + '"]').addClass('-active').attr('data-event', 'tbm_favorite_del')

            ele.removeClass('disabled')
            
            var list = $('.tb-clt-list')
            if (!list.length) {
                return
            }

            $.ajax({
                url: misidao.ajaxUri,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'get_collect_item',
                    id: id
                },
                success: function (data) {
                    list.append(data.output)
                    list.addClass('active')
                }
            })
        })
    }

    misidao.event.collect_add = function(ele) {
        ele.addClass('disabled')

        if (!misidao.is_logged) {
            misidao.event.show_in()
            ele.removeClass('disabled')
            return
        }

        var id = ele.data('id')
        $.ajax({
            url: misidao.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'collect_add',
                id: id
            },
            success: function (data) {
                if(!data.result) {
                    ele.removeClass('disabled')
                    misidao.notice(data.msg)
                    return
                }

                misidao.notice(data.msg)

                $('.tb-collect[data-id="' + id + '"]').addClass('-active').attr('data-event', 'collect_del').find('.count').html(data.total)

                ele.removeClass('disabled')

                var list = $('.tb-clt-list')
                if (list.length && data.output) {
                    list.append(data.output)
                    list.addClass('active')
                }
            },
            error: function (xhr, str, err) {
                ele.removeClass('disabled')
            }
        })
    }

    
    misidao.event.tbm_favorite_del = function(ele) {
        $(ele).addClass('disabled')

        if(!TBM) {
            console.log('TBM 不存在')
            $(ele).removeClass('disabled')
            return
        }

        TBM.evName = 'favorite-del'

        var id = $(ele).data('id')
        TBM.evParams = {
            post_id: id,
        }

        TBM.soo(function (data) {
            $('.tb-collect[data-id="' + id + '"]').removeClass('-active').attr('data-event', 'tbm_favorite_add')

            after_del_collect(ele, id, data)
        })
    }

    misidao.event.collect_del = function(ele) {
        ele.addClass('disabled')

        if (!misidao.is_logged) {
            ele.removeClass('disabled')
            misidao.event.show_in()
            return
        }

        var id = ele.data('id')
        $.ajax({
            url: misidao.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'collect_del',
                id: id
            },
            success: function (data) {
                
                if(!data.result) {
                    ele.removeClass('disabled')
                    misidao.notice(data.msg)
                    return
                }

                misidao.notice(data.msg)

                $('.tb-collect[data-id="' + id + '"]').removeClass('-active').attr('data-event', 'collect_add').find('.count').html(data.total)

                after_del_collect(ele, id, data)
            },
            error: function (xhr, str, err) {
                ele.removeClass('disabled')
            }
        })
    }

    function after_del_collect(ele, id, data) {
        ele.removeClass('disabled')


        var list = $('.tb-clt-list')
        list.find('li[data-id="' + id + '"]').remove()

        if (list.length && !list.children('li').length) {
            list.removeClass('active')
        }
    }
})(jQuery);


// 分享
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    misidao.shareInfo = {
        link: document.URL,
        title: document.title,
        desc: $('meta[name="description"]').length ? $('meta[name="description"]').attr("content") : "",
        imgUrl: misidao.share_img
    }

    init_sdk()
    function init_sdk() {
        if (misidao.bd.hasClass('sdk-share-on')) {
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
            url: misidao.ajaxUri,
            type: 'GET',
            data: {
                action: 'wx_signature',
                url: url
            },
            dataType: 'json',
            success: function (res) {
                if (!res.result) { return }
                
                window.misidao.wx = {
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
            appId: misidao.appID,
            timestamp: misidao.wx.timestamp,
            nonceStr: misidao.wx.nonceStr,
            signature: misidao.wx.signature,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo']
        })

        wx.ready(function () {
            wx.updateAppMessageShareData(misidao.shareInfo)
            wx.updateTimelineShareData(misidao.shareInfo)
            wx.onMenuShareWeibo(misidao.shareInfo)
        })
    }

    misidao.event.share = function (ele) {
        var type = ele.data('type')
        var url = ''
        switch (type) {
            case 'qq':
                url = 'http://connect.qq.com/widget/shareqq/index.html?url=' + misidao.shareInfo.link + '&title=' + misidao.shareInfo.title + '&desc=' + misidao.shareInfo.desc + '&pics=' + misidao.shareInfo.imgUrl + '&summary=' + misidao.shareInfo.title
                break
            case 'weibo':
                url = 'https://service.weibo.com/share/share.php?url=' + misidao.shareInfo.link + '&title=' + misidao.shareInfo.title + '&pic=' + misidao.shareInfo.imgUrl
                break
            case 'wechat':
                break
            case 'douban':
                url = 'http://www.douban.com/share/service?image=' + misidao.shareInfo.imgUrl + '&href=' + misidao.shareInfo.link + '&name=' + misidao.shareInfo.title + '&text=' + misidao.shareInfo.desc
                break
            case 'qzone':
                url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + misidao.shareInfo.link + '&title=' + misidao.shareInfo.title + '&desc=' + misidao.shareInfo.desc + '&pics=' + misidao.shareInfo.imgUrl
                break
            case 'line':
                url = 'http://line.naver.jp/R/msg/text/?' + misidao.shareInfo.title + '%0D%0A' + misidao.shareInfo.link
                break
            case 'twitter':
                url = 'https://twitter.com/intent/tweet?text=' + misidao.shareInfo.title + '&url=' + misidao.shareInfo.link
                break
            case 'facebook':
                url = 'https://www.facebook.com/sharer/sharer.php?u=' + misidao.shareInfo.link + '&title=' + misidao.shareInfo.title + '&description=' + misidao.shareInfo.desc
                break
            case 'telegram':
                url = 'https://telegram.me/share/url?text=' + misidao.shareInfo.title + '&url=' + misidao.shareInfo.link
                break
            case 'skype':
                url = 'https://web.skype.com/share?text=' + misidao.shareInfo.title + '&url=' + misidao.shareInfo.link
                break
            case 'copy':
                misidao.event.copy_link(ele)
                break
        }

        url && window.open(url)
    }

    // misidao.event.qrcode_close = function () {
    //     $('.-wechat-qr').hide()
    //     misidao.toggle_scroll('show')
    // }
})(jQuery);


// 登录\注册
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    function install() {
        var sign = $('.-sign-modal')
        if (sign.length) {
            sign.addClass('active')
            return
        }

        misidao.bd.append('<div class="tb-modal -sign-modal active"><div class="-mask" data-event="hide_sign"></div><div class="m-inner -b -rds"><span data-event="hide_sign" class="tbfa fa-close"></span><form class="tb-in" style="display: none"><h4>' + tbl['T010'] + '<span data-event="show_up">' + tbl['T013'] + '</span></h4><input type="text" name="name" class="tb-ipt" placeholder="' + tbl['T011'] + '"><input type="password" name="password" class="tb-ipt" placeholder="' + tbl['T061'] + '"><input type="button" class="tb-btn -b -p" data-event="sign_in" name="submit" value="' + tbl['T010'] + '"><input type="hidden" name="action" value="signin"><label style="display: none"><input type="checkbox" checked="checked" name="remember" value="forever">remember</label><div class="tb-f"><span>' + tbl['T012'] + ' <span class="tb-anchor" data-event="show_up">' + tbl['T013'] + '</span> ?</span><a class="tb-find" href="' + misidao.find_url + '">' + tbl['T014'] + '</a></div></form><form class="tb-up"><h4>' + tbl['T013'] + '<span data-event="show_in">' + tbl['T010'] + '</span></h4><input type="text" name="name" class="tb-ipt" placeholder="' + tbl['T015'] + '"><input type="email" name="email" class="tb-ipt" placeholder="' + tbl['T062'] + '"><input class="tb-ipt" type="text" autocomplete="off" name="password" placeholder="' + tbl['T061'] + '"><input type="button" class="tb-btn -b -p" data-event="sign_up" name="submit" value="' + tbl['T013'] + '"><input type="hidden" name="action" value="signup"><div class="tb-f"><span>' + tbl['T016'] + '<span class="tb-anchor" data-event="show_in">' + tbl['T010'] + '</span> ?</span></div></form></div></div>')

        $('.-sign-modal form').keydown(function (e) {
            if (((e = e || window.event).which || e.keyCode) == 13) {
                $(this).find('[name="submit"]').trigger('click')
            }
        })
    }

    misidao.event.hide_sign = function () {
        $('.-sign-modal').removeClass('active')
        misidao.toggle_scroll('show')
    }

    misidao.event.show_up = function () {
        misidao.toggle_scroll()
        install()
        $('.tb-up').fadeIn().find('input:first').focus()
        $('.tb-in').hide()
    }

    misidao.event.show_in = function () {
        misidao.toggle_scroll()
        install()
        $('.tb-in').fadeIn().find('input:first').focus()
        $('.tb-up').hide()
    }

    // if ($('.show-login').length) {
    //     misidao.event.show_in()
    // }

    misidao.event.sign_in = function (ele) {
        misidao.vc_params = { 'ele': ele }
        ele.addClass('disabled')
        // if (!check_in()) {
        //     misidao.rm_disable()
        //     return
        // }
        misidao.event.cb_sign_in()
        // misidao.event.show_vercode('cb_sign_in')
    }

    misidao.event.cb_sign_in = function () {
        var data = check_in()
        if (!data) {
            misidao.rm_disable()
            return
        }

        $.post(misidao.ajaxUri, data, function (val) {
            misidao.rm_disable()
            if (!val.result) {
                misidao.notice(val.code, 'e')
                val.code == 'T031' && misidao.event.hide_sign()
                return
            }

            misidao.notice(val.code, 's')
            misidao.event.hide_sign()
            location.reload()
        }, 'json')
    }

    function check_in() {
        var data = $('.tb-in').serializeObject()

        if (!data.action) {
            throw 'ERROR 1'
        }

        if (!data.name || !data.password) {
            misidao.notice('T017', 'e')
            return 0
        }
        
        return data
    }

    misidao.event.sign_up = function (ele) {
        misidao.vc_params = { 'ele': ele }
        ele.addClass('disabled')
        // if (!check_up()) {
        //     misidao.rm_disable()
        //     return
        // }
        misidao.event.cb_sign_up()
        // misidao.event.show_vercode('cb_sign_up')
    }

    misidao.event.cb_sign_up = function () {
        var data = check_up()
        if (!data) {
            misidao.rm_disable()
            return
        }

        $.post(misidao.ajaxUri, data, function (val) {
            misidao.rm_disable()
            if (!val.result) {
                misidao.notice(val.code, 'e')
                val.code == 'T031' && misidao.event.hide_sign()
                return
            }

            misidao.notice(val.code, val.code == 'T039' ? 'e' : 's')
            $('.tb-up input[name="name"]').val('')
            $('.tb-up input[name="email"]').val('')
            $('.tb-up input[name="password"]').val('')
            misidao.event.show_in()
        }, 'json')
    }

    function check_up() {
        var data = $('.tb-up').serializeObject()

        if (!data.action) {
            throw 'ERROR 2'
        }

        if (!data.name || !data.email || !data.password) {
            misidao.notice('T018', 'e')
            return
        }

        if (!misidao.validator.checkName(data.name)) {
            misidao.notice('T019', 'e')
            return
        }

        if (!misidao.validator.checkEmail(data.email)) {
            misidao.notice('T020', 'e')
            return
        }

        if (!misidao.validator.checkPassword(data.password)) {
            misidao.notice('T063', 'e')
            return
        }

        return data
    }

    misidao.event.show_out = function () {
        $.get(misidao.ajaxUri, {
            action: 'signout'
        }, function (val) {
            misidao.notice(val.code, 's')
            location.reload()
        }, 'json')
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

        var id = misidao.storage.get('tb_s_id')
        var cur = st.find(id ? '[data-id="' + id + '"]' : ':first-child')
        cur = cur.length ? cur : st.find(':first-child')
        cur.addClass('active')
        h_search_pc.attr('action', cur.attr('data-url')).find('.-cur').html($(cur[0]).text())
    }

    misidao.event.hide_search = function(ele) {
        $('.-fase-search').removeClass('active')
        misidao.toggle_scroll('show')
    }

    misidao.event.show_search = function(ele) {
        $('.-fase-search').addClass('active')
        misidao.toggle_scroll()
    }

    misidao.event.search_type_change = function (ele) {
        misidao.storage.set('tb_s_id', ele.attr('data-id'))
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
            misidao.notice('T064', 'e')
            return false
        }
        window.open($(this).attr('action').replace(/\%keyword\%/g, s))
        
        e.preventDefault()
        return false
    })
})(jQuery);


//
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($){
    misidao.event.show_share = function() {
        $('.-share-modal').addClass('active')
        misidao.toggle_scroll()
    }

    misidao.event.hide_share = function() {
        $('.-share-modal').removeClass('active')
        misidao.toggle_scroll('show')
    }
})(jQuery);


//
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    var box = $('.tb-comment')
    if(!box.length) {
        return
    }
    
    var submit_btn = box.find('#submit')
    installComment()

    function installComment() {
        $('#commentform').submit(function () {
            if (submit_btn.hasClass('disabled')) {
                return false
            }
            submit_btn.addClass('disabled')
            misidao.vc_params = { ele: submit_btn }

            if(misidao.is_logged) {
                misidao.event.s_ct()
                return false
            }
            
            if (!check()) {
                return false
            }
            misidao.event.show_vercode('s_ct')
            return false
        })
    }

    function check() {
        var form = $('#commentform').serializeObject()
        form.action = 'tb_add_comment';

        var code = ''
        if (!form.comment) {
            code = 'T021'
        }

        if (!code && form.hasOwnProperty('author') && (!form.author || !misidao.validator.checkName(form.author))) {
            code = 'T019'
        }

        if (!code && form.hasOwnProperty('email') && (!form.email || !misidao.validator.checkEmail(form.email))) {
            code = 'T023'
        }

        if (!code && form.url && !misidao.validator.checkUrl(form.url)) {
            code = 'T066'
        }

        if (code) {
            misidao.notice(code, 'e', '.comment-tips')
            misidao.rm_disable()
            return false
        }

        return form
    }

    misidao.event.s_ct = function () {
        var form = check()
        if (!form) {
            return
        }

        $.ajax({
            url: misidao.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: form,
            success: function (res) {
                misidao.rm_disable()
                if (!res.result) {
                    misidao.notice(res.code, 'e', '.comment-tips')
                    return
                }

                misidao.notice(res.code, 's', '.comment-tips')
                $('#comment').val('')
                $('#comment_parent').val('0')
                $('#cancel-comment-reply-link').css('display', 'none')
                $('#wp-temp-form-div').replaceWith($('#respond'))

                var approvedText = res.data.approvedText ? '<span class="item-user-status">' + tbl[res.data.approvedText] + '</span>' : ''

                var depth = 1
                var replyLink = ''
                var depthReg = /depth-[0-9]+/
                if (['0', 0].indexOf(res.data.comment_parent) == -1) {
                    var class_str = $('#comment-' + res.data.comment_parent).attr('class')
                    $.each(class_str.split(' '), function (i, item) {
                        if (!depthReg.test(item)) { return }
                        depth = parseInt(item.split('-')[1]) + 1
                    })
                }
                if (depth < res.data.max_depth && res.data.comment_approved == '1') {
                    replyLink = '<a rel="nofollow" class="comment-reply-link" href="javascript:;" data-commentid="' + res.data.comment_ID + '" data-postid="' + res.data.comment_post_ID + '" data-belowelement="cmt-main-' + res.data.comment_ID + '" data-respondelement="respond">' + tbl[res.data.replyText] + '</a>'
                }
                comment_class = res.data.comment_class.replace(depthReg, 'depth-' + depth)

                var commentEle = '<li ' + comment_class + 'id="comment-' + res.data.comment_ID + '">' + '<div class="cmt-main" id="cmt-main-' + res.data.comment_ID + '">' + '<div class="item-left">' + '<img class="item-avatar" src="' + res.data.comment_author_avatar + '">' + '</div>' + '<div class="item-right">' + '<div class="item-user">' + '<span class="item-user-item">' + res.data.comment_author + '</span>' + '<span class="item-user-item">' + res.data.comment_date2 + '</span>' + approvedText + replyLink + '</div>' + '<p class="item-text">' + misidao.lang_replace(res.data.comment_parent_replay, '回复', 'T002') + res.data.comment_content + '</p>' + '</div>' + '</div>' + '</li>'

                var commentsList = $('.commentlist')
                if (res.data.comment_parent === '0') {
                    if (commentsList.length) {
                        commentsList.prepend(commentEle)
                    } else {
                        $('#respond').after('<ol class="commentlist">' + commentEle + '</ol>')
                    }
                    return
                }

                var childEle = $('#comment-' + res.data.comment_parent + ' > .children')
                if (childEle.length) {
                    childEle.append(commentEle)
                } else {
                    $('#comment-' + res.data.comment_parent + ' > .cmt-main').after('<ul class="children">' + commentEle + '</ul>')
                }
            },
            error: function (xhr, str, err) {
                misidao.rm_disable()
                misidao.notice(JSON.stringify(err), 'e', '.comment-tips')
            }
        })
    }
})(jQuery);

//
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    misidao.event.tb_uploadImg = function (file) {
        $(file).attr('disabled', 'disabled')

        if (!file.files || !file.files[0]) {
            $(file).removeAttr('disabled')
            return
        }
        
        if((file.files[0].type).indexOf('image/') == -1) {
            misidao.notice('T024', 'e', '.contribute-tip')
            $(file).removeAttr('disabled')
            return
        }

        if (file.files[0].size > (1000 * 1024)) {
            misidao.notice(tbl['T025'].replace('%VAR%', tbl.img_size), 'e', '.contribute-tip')
            $(file).removeAttr('disabled')
            return
        }

        var formData = new FormData()
        formData.append('files', file.files[0])
        formData.append('action', 'fileupload')
        $.ajax({
            url: misidao.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function (val) {
                $(file).removeAttr('disabled')

                if (val.result) {
                    var wraper = $(file).parent()
                    wraper.attr('data-id', val.id)
                    wraper.children('img').remove()
                    wraper.addClass('active').append('<img src="' + val.src + '"/>')
                    wraper.children("input[type=hidden]").val(val.id)
                    misidao.notice(val.code, 's', '.contribute-tip')
                } else {
                    if(['T025', 'T065'].indexOf(val.code) > -1) {
                        val.code = tbl[val.code].replace('%VAR%', val.val)
                    } else if(val.code == 'T057') {
                        location.reload()
                    }
                    misidao.notice(val.code, 'e', '.contribute-tip')
                }
            }
        })
    }

    misidao.event.tb_remove_img = function (ele) {
        var id = ele.parent().attr('data-id')
        ele.addClass('disabled').siblings('img').remove()
        ele.parent().removeClass('active').attr('data-id', '').children("input").val('')
        ele.removeClass('disabled')
        $.ajax({
            url: misidao.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: { action: 'tb_del_attach', id: id },
            success: function (val) {}
        })
    }

    misidao.event.tb_tougao = function (ele) {
        misidao.vc_params = { 'ele': ele }
        $(ele).addClass('disabled')
        // if (!check()) { return }

        misidao.event.tg_cb()
        // misidao.event.show_vercode('tg_cb')
    }

    misidao.event.tg_cb = function () {
        var form = check()
        if (!form) { return }

        $.ajax({
            url: misidao.ajaxUri,
            type: 'POST',
            dataType: 'json',
            data: form,
            success: function (res) {
                misidao.rm_disable()
                misidao.notice(res.code, res.result ? 's' : 'e', '.contribute-tip')

                if(res.code == 'T057') {
                    setTimeout(function () {
                        location.reload()
                    }, 500);
                }

                if (res.result) {
                    setTimeout(function () {
                        location.href = $('.-tougao-btn').attr('data-home')
                    }, 500);
                }
            }
        })
    }

    function check() {
        var form = $('#tougao').serializeObject()
        form.action = 'tb_tougao'
        var code = ''

        if (!code && (!form.title || form.title.length > 50)) {
            code = tbl['T027']
        }

        if (!code && (!form.site_url || !misidao.validator.checkUrl(form.site_url))) {
            code = tbl['T066']
        }
        
        if(!code && form.hasOwnProperty('cat') && !form.cat) {
            code = tbl['T067']
        }

        if (!code && window.tinyMCE) {
            form.content = $.trim(tinyMCE.activeEditor.getContent())

            if (form.content.length < 10 || form.content.length > 10000) {
                code = tbl['T028']
            }
        }

        if (code) {
            misidao.rm_disable()
            misidao.notice(code, 'e', '.contribute-tip')
            return false
        }
        return form
    }
})(jQuery);


//////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    window.Swiper = null
    function loadSwiper(callback) {
        if (Swiper) {
            callback()
            return
        }

        $.getScript('https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/Swiper/4.0.2/js/swiper.min.js', function () { callback() })
    }
    
    
    if (misidao.article_swiper) {
        init_article_swiper()
    }
    
    function init_article_swiper() {
        var article_c = $('.art-content')
        if (!article_c.length) return

        var img_arr = article_c.find('img')
        if (!img_arr.length) return

        loadSwiper(function () {
            img_arr.on('click', function () {
                var index = article_swiper_render($(this).attr('src'), img_arr)
                
                new Swiper('.-art-swiper', {
                    loop: false,
                    speed: 800,
                    zoom: true,
                    initialSlide: index,
                    navigation: {
                        nextEl: '.swiper-next',
                        prevEl: '.swiper-prev',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction'
                    },
                    on: {
                        slideNextTransitionStart: function () {
                            $('.-art-swiper .swiper-slide-prev img').addClass('-swiper-no-transition')
                        },
                        slidePrevTransitionStart: function () {
                            $('.-art-swiper .swiper-slide-next img').addClass('-swiper-no-transition')
                        },
                        slideChange: function () {
                            $('.-art-swiper .-swiper-no-transition').removeClass('-swiper-no-transition')
                        }
                    }
                })
            })
        })
    }

    function article_swiper_render(active, img_arr) {
        var wraper = $('.-article-modal')
        
        var swiper_items = ''
        var index = 0
        img_arr.each(function (i, item) {
            var src = $(item).attr('src')
            if (active == src) {
                index = i
            }

            if(!wraper.length) {
                swiper_items += '<div class="swiper-slide swiper-item"><div class="swiper-zoom-container"><img alt="swiper" src="' + src + '" /></div></div>'
            }
        });

        if(!wraper.length) {
            misidao.bd.append('<div class="tb-modal -article-modal"><div class="-mask" data-event="hide_article_modal"></div><span class="tbfa fa-close" data-event="hide_article_modal"></span><div class="-art-swiper"><div class="swiper-wrapper swiper-inner">' + swiper_items + '</div><div class="swiper-nav swiper-prev tbfa fa-left"></div><div class="swiper-nav swiper-next tbfa fa-right"></div></div><div class="swiper-pagination"></div></div>')
        } else if(index === 0) {
            wraper.find('.swiper-wrapper').attr('style', '')
        }

        misidao.toggle_scroll('hide')
        $('.-article-modal').addClass('active')
        return index
    }
    

    misidao.event.hide_article_modal = function () {
        misidao.toggle_scroll('show')
        $('.-article-modal').removeClass('active')
    }
})(jQuery);

//
////////////////////////////////////////////////////////////////////////////////////////////////////
(function ($) {
    var search_filter = $('.search-filter')
    if(search_filter.length) {
        search_filter.animate({ scrollLeft: search_filter.find('.active').offset().left - search_filter.offset().left}, 200)
    }

    if($('body').hasClass('is-mobile')) {
        misidao.event.filter_show = function(ele) {
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
        if (e.type === event_type && eventMethod && misidao.event[eventMethod]) {
            misidao.event[eventMethod](ele, e)
        }
    })
})(jQuery)