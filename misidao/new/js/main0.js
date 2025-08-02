(function ($) {
    if(!misidao) {
        return
    }

    misidao.bd = $('body')

    misidao.storage = {
        set: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value))
        },
        get: function (key) {
            return JSON.parse(localStorage.getItem(key))
        }
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
        var win_h = $(window).height()
        var ft_h = $('.tb-footer').parent().outerHeight(true)
        f_ele.css({ 'minHeight': (win_h - f_ele.offset().top - 3 - ft_h) + 'px' })
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