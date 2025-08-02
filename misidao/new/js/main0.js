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
                    src = 'https://api.bingdou.com.cn/code/?text=' + link
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