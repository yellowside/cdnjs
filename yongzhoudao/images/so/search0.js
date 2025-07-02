function sendSiteClickCount(name, url) {
    var seed = new Date().getTime();
    url = url || ('#' + name);
    var oScript = document.createElement("script");
    oScript.type = 'text/javascript';
    oScript.className = 'siteClickCountScript';
    oScript.src = path;
    document.getElementsByTagName('head')[0].appendChild(oScript);
};
var TJ = sendSiteClickCount;

function getObj(id) {
    return document.getElementById(id);
};
G = getObj;
var j;

function search_init() {
    var liS = getObj("selectId").getElementsByTagName("input");
    j = liS.length;
    for (var i = 0; i < j; i++) {
        liS[i].lisNum = i;
        liS[i].onclick = function () {
            displayTab(this.lisNum, 0);
        }
    }
};
var searchs = [];
searchs[0] = [];
searchs[0][0] = new Array("网页", "http://so.bingdou.net/search.asp", "search", "百度", -1, "http://so.bingdou.net/search.asp", "engine:baidu", "gb2312");
searchs[0][1] = new Array("新闻", "http://so.bingdou.net/search.asp", "search", "百度", -1, "http://so.bingdou.net/search.asp", "want:news;engine:baidu", "gb2312");
searchs[0][2] = new Array("贴吧", "http://so.bingdou.net/search.asp", "search", "百度", -1, "http://so.bingdou.net/search.asp", "want:bbs;engine:baidutb", "gb2312");
searchs[0][3] = new Array("知道", "http://so.bingdou.net/search.asp", "search", "百度", -1, "http://so.bingdou.net/search.asp", "want:know;engine:baidu", "gb2312");
searchs[0][4] = new Array("音乐", "http://so.bingdou.net/search.asp", "search", "百度", -1, "http://so.bingdou.net/search.asp", "want:music;engine:baidu", "gb2312");
searchs[0][5] = new Array("图片", "http://so.bingdou.net/search.asp", "search", "百度", -1, "http://so.bingdou.net/search.asp", "want:photo;engine:baidu", "gb2312");
searchs[0][6] = new Array("视频", "http://so.bingdou.net/search.asp", "search", "百度", -1, "http://so.bingdou.net/search.asp", "want:video;engine:baidu", "gb2312");
searchs[0][7] = new Array("地图", "http://so.bingdou.net/search.asp", "search", "百度", -1, "http://so.bingdou.net/search.asp", "want:map;engine:baidu", "gb2312");
searchs[1] = [];
searchs[1][0] = new Array("网页", "http://so.bingdou.net/search.asp", "search", "搜搜", -65, "http://so.bingdou.net/search.asp", "engine:soso", "gb2312");
searchs[1][1] = new Array("图片", "http://so.bingdou.net/search.asp", "search", "搜搜", -65, "http://so.bingdou.net/search.asp", "want:photo;engine:soso", "gb2312");
searchs[1][2] = new Array("视频", "http://so.bingdou.net/search.asp", "search", "搜搜", -65, "http://so.bingdou.net/search.asp", "want:video;engine:soso", "gb2312");
searchs[1][3] = new Array("音乐", "http://so.bingdou.net/search.asp", "search", "搜搜", -65, "http://so.bingdou.net/search.asp", "want:music;engine:soso", "gb2312");
searchs[1][4] = new Array("新闻", "http://so.bingdou.net/search.asp", "search", "搜搜", -65, "http://so.bingdou.net/search.asp", "want:news;engine:soso", "gb2312");
searchs[1][5] = new Array("搜吧", "http://so.bingdou.net/search.asp", "search", "搜搜", -65, "http://so.bingdou.net/search.asp", "want:bbs;engine:sososb", "gb2312");
searchs[1][6] = new Array("地图", "http://so.bingdou.net/search.asp", "search", "搜搜", -65, "http://so.bingdou.net/search.asp", "want:map;engine:soso", "gb2312");
searchs[2] = [];
searchs[2][0] = new Array("网页", "http://so.bingdou.net/search.asp", "search", "谷歌", -29, "http://so.bingdou.net/search.asp", "engine:google", "gb2312");
searchs[2][1] = new Array("图片", "http://so.bingdou.net/search.asp", "search", "必应", -240, "http://so.bingdou.net/search.asp", "want:photo;engine:bing", "gb2312");
searchs[2][2] = new Array("视频", "http://so.bingdou.net/search.asp", "search", "必应", -240, "http://so.bingdou.net/search.asp", "want:video;engine:bing", "gb2312");
searchs[2][3] = new Array("地图", "http://so.bingdou.net/search.asp", "search", "必应", -240, "http://so.bingdou.net/search.asp", "want:map;engine:bing", "gb2312");
searchs[2][4] = new Array("新闻", "http://so.bingdou.net/search.asp", "search", "必应", -240, "http://so.bingdou.net/search.asp", "want:news;engine:bing", "gb2312");
searchs[2][5] = new Array("文档", "http://so.bingdou.net/search.asp", "search", "必应", -240, "http://so.bingdou.net/search.asp", "want:file;engine:bing", "gb2312");
searchs[3] = [];
searchs[3][0] = new Array("网页", "http://so.bingdou.net/search.asp", "search", "搜狗", -210, "http://so.bingdou.net/search.asp", "engine:sogou", "gb2312");
searchs[3][1] = new Array("图片", "http://so.bingdou.net/search.asp", "search", "搜狗", -210, "http://so.bingdou.net/search.asp", "want:photo;engine:sogou", "gb2312");
searchs[3][2] = new Array("视频", "http://so.bingdou.net/search.asp", "search", "搜狗", -210, "http://so.bingdou.net/search.asp", "want:video;engine:sogou", "gb2312");
searchs[3][3] = new Array("音乐", "http://so.bingdou.net/search.asp", "search", "搜狗", -210, "http://so.bingdou.net/search.asp", "want:music;engine:sogou", "gb2312");
searchs[3][4] = new Array("新闻", "http://so.bingdou.net/search.asp", "search", "搜狗", -210, "http://so.bingdou.net/search.asp", "want:news;engine:sogou", "gb2312");
searchs[3][5] = new Array("地图", "http://so.bingdou.net/search.asp", "search", "搜狗", -210, "http://so.bingdou.net/search.asp", "want:map;engine:sogou", "gb2312");
searchs[4] = [];
searchs[4][0] = new Array("淘宝", "http://so.bingdou.net/search.asp", "search", "购物", -90, "http://so.bingdou.net/search.asp", "want:shop;engine:taobao", "gb2312");
searchs[4][1] = new Array("当当", "http://union.dangdang.com/transfer.php", "key", "购物", -120, "http://union.dangdang.com/transfer.php", "from:P-268136", "gb2312");
searchs[4][2] = new Array("卓越", "http://so.bingdou.net/search.asp", "search", "购物", -150, "http://so.bingdou.net/search.asp", "want:shop;engine:amazon", "gb2312");
searchs[4][3] = new Array("京东", "http://so.bingdou.net/search.asp", "search", "购物", -180, "http://so.bingdou.net/search.asp", "want:shop;engine:360buy", "gb2312");

function displayTab(sNum, tNum) {
    var s_tabs = $("#selectId li");
    for (var i = 0; i < s_tabs.length; i++) {
        if (i == sNum) {
            s_tabs.eq(i).addClass('current');
        } else {
            s_tabs.eq(i).removeClass('current');
        }
    }
    getObj("hidpar").innerHTML = '';
    getObj("searchForm").action = searchs[sNum][tNum][1];
    if (searchs[sNum][tNum][7] != null) {
        $("#searchForm").attr("accept-charset", searchs[sNum][tNum][7]);
    } else {
        $("#searchForm").removeAttr("accept-charset");
    }
    getObj("kw_1").name = searchs[sNum][tNum][2];
    getObj("searchBtn").value = searchs[sNum][tNum][3] + "搜索";
    var _seBox = getObj("se_current");
    if (_seBox) {
        if (_seBox.style.backgroundPositionY) {
            _seBox.style.backgroundPositionY = searchs[sNum][tNum][4] + "px";
        } else {
            _seBox.style.backgroundPosition = "0 " + searchs[sNum][tNum][4] + "px";
        }
    }
    tabLen = searchs[sNum].length;
    tabStr = '';
    var selectWeb = document.getElementsByName("searchRadio");
    for (var i = 0; i < selectWeb.length; i++) {
        if (i == sNum) selectWeb[i].checked = true;
        else selectWeb[i].checked = false;
    }
    for (var i = 0; i < tabLen; i++) {
        if (i == tNum) {
            tabStr = tabStr + "<li  class='current'>" + searchs[sNum][i][0] + "</li>";
        } else {
            tabStr = tabStr + "<li";
            if (i == tabLen - 1) {
                tabStr += ' class="last"';
            }
            tabStr += " onclick='displayTab(" + sNum + "," + i + ")'>" + searchs[sNum][i][0] + "</li>";
        }
    }
    if (getObj("searchTab")) {
        getObj("searchTab").innerHTML = tabStr;
    }
    if (searchs[sNum][tNum][6] != null) {
        paramArrs = searchs[sNum][tNum][6].split(";");
        for (var i = 0; i < paramArrs.length; i++) {
            pvalue = paramArrs[i].split(":");
            pel = document.createElement("INPUT");
            pel.type = "hidden";
            pel.name = pvalue[0];
            pel.id = pvalue[0];
            pel.value = pvalue.slice(1).join(':');
            getObj("hidpar").appendChild(pel);
        }
    }
    if (sNum == 3 && (tNum == 1 || tNum == 2 || tNum == 3)) {
        getObj("searchForm").onsubmit = function () {
            if (getObj("tu")) {
                getObj("t").value = 'http://' + decodeURIComponent(getObj("tu").value) + getObj("kw_1").value;
                return true;
            }
        };
    }
    if (sNum > 4) {
        sNum = 0;
        tNum = 0;
    }
    setSearchTab(sNum + ',' + tNum);
}
function setDisplay(i, d) {
    getObj(i).style.display = d ? "block" : "none";
}
function getSearchTabCookieName() {
    return 'schtab';
}
function setSearchTab(value) {
    var expire = 365;
    $.cookie(getSearchTabCookieName(), value, {
        expires: 365
    });
}
function getSearchTabByIndex() {
    var index = arguments[0] ? arguments[0] : 0;
    var schtab = $.cookie(getSearchTabCookieName());
    if ((schtab == null || schtab == '')) {
        if (arguments[1]) {
            return arguments[1];
        } else {
            return 0;
        }
    }
    schtabs = schtab.split(',');
    return schtabs[index];
}
function highlightSearchTab() {
    var s = getSearchTabByIndex(0, -1);
    if (s == -1) {
        s = 0;
    }
    var t = getSearchTabByIndex(1);
    displayTab(s, t);
}

function myhint_1(event) {
    var keyword = getObj('kw_1');
    var h = getObj('suggests_1');
    if (!keyword.value || !keyword.value.length || event.keyCode == 27 || event.keyCode == 13) {
        h.style.display = 'none';
        return;
    }
    if (event.keyCode == 38 || event.keyCode == 40) {
        if (h.style.display == 'none') return;
        if (event.keyCode == 38) {
            if (h._i == -1) h._i = h.firstChild.rows.length - 1;
            else {
                h._i--;
            }
        } else {
            h._i++;
        }
        for (var i = 0; i < h.firstChild.rows.length; i++) h.firstChild.rows[i].style.background = "#FFF";
        if (h._i >= 0 && h._i < h.firstChild.rows.length) with(h.firstChild.rows[h._i]) {
            style.background = "#E1EEFF";
            keyword.value = cells[0].attributes['_h'].value;
        } else {
            keyword.value = h._kw;
            h._i = -1;
        }
    } else {
        h._i = -1;
        h._kw = keyword.value;
        googleHint(keyword.value);
        with(h.style) {
            width = keyword.offsetWidth - 2;
        }
    }
}


function searchSubmit(index) {}
var WEATHER_COOKIE_CITY_KEY = 'WEATHER_COOKIE_CITY_KEY';