// JavaScript Document
function rele_div(id) {
    var obj = document.getElementById(id).style;
    if (obj.display == 'none') {
        obj.display = '';
    } else {
        obj.display = 'none';
    }
//resize_footer();
}

function check_send_form(id, in_curr)
{

    $("input[name='in_curr']").val(in_curr);

    if (!document.getElementById(id).elements) {
        return false;
    }


    var obj = document.getElementById(id).elements;

    var error = '';
    for (var i = 0; i < obj.length; i++) {
        if (!obj[i].value && obj[i].title) {
            error = error + '\n' + obj[i].title;
        }
    }
    if (error) {
        alert('Не заполнены поля: ' + error);
        return false;
    } else {
        document.forms[id].submit();
    }
}

function check_form(id)
{
    if (!document.getElementById(id).elements) {
        return false;
    }
    var obj = document.getElementById(id).elements;
    var error = '';
    for (var i = 0; i < obj.length; i++) {
        if (!obj[i].value && obj[i].title) {
            error = error + '\n' + obj[i].title;
        }
    }
    if (error) {
        alert('Не заполнены поля ' + error);
        return false;
    } else {
        return true;
    }
}

document.getElementsByClassName = function (cl) {
    var retnode = [];
    var myclass = new RegExp('\\b' + cl + '\\b');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) {
        var classes = elem[i].className;
        if (myclass.test(classes))
            retnode.push(elem[i]);
    }
    return retnode; // возвращает массив объектов
}


function readCookie(name) {
    //alert(document.cookie);
    var xname = name + "="
    var xlen = xname.length
    var clen = document.cookie.length;
    var i = 0;
    k = 0;
    while (i < clen) {
        k++;
        if (k > 1000) {
            return false;
        }
        var j = i + xlen
        if (document.cookie.substring(i, j) == xname) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) {
            break;
        }
    }
    return null;
}

function getCookieVal(n) {
    var endstr = document.cookie.indexOf(";", n)
    if (endstr == -1)
        endstr = document.cookie.length
    return unescape(document.cookie.substring(n, endstr))
}

function writeCookie(name, value, expires, path, domain, secure) {
    document.cookie =
            name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires.toGMTString() : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "")
}



function max_color(obj) {
    var src = obj.src;
    src = src.split("?");
    src = src[0];
    obj.src = src;
}
function min_color(obj) {
    obj.src = obj.src + "?greyscale";
}

function getBrowserInfo() {
    var t, v = undefined;
    if (window.opera)
        t = 'Opera';
    else if (document.all) {
        t = 'IE';
        var nv = navigator.appVersion;
        var s = nv.indexOf('MSIE') + 5;
        v = nv.substring(s, s + 1);
    }
    else if (navigator.appName)
        t = 'Netscape';
    return {type: t, version: v};
}

function bookmark(a) {
    var url = window.document.location;
    var title = window.document.title;
    var b = getBrowserInfo();
    if (b.type == 'IE')
        window.external.AddFavorite(url, title);
    else if (b.type == 'Opera') {
        a.href = url;
        a.rel = "sidebar";
        a.title = url + ',' + title;
        return true;
    }
    else if (b.type == "Netscape")
        window.sidebar.addPanel(title, url, "");
    else
        alert("Нажмите CTRL-D, чтобы добавить страницу в закладки.");
    return false;
}


function load_banner_swf(div, src, width, heigh, variable, allowScriptAccess) {
    if (!$("#" + div).get(0)) {
        return false;
    }
    var so = new SWFObject(src, "mymovie", width, heigh, "7", "#ffffff");
    if (typeof (variable) == "object") {
        for (v in variable) {
            so.addVariable(v, variable[v]);
        }
    }
    so.addParam("wmode", "transparent");
    if (allowScriptAccess) {
        so.addParam("allowScriptAccess", "always");
    }
    else {
        so.addParam("allowScriptAccess", "never");
    }
    so.write(div);
}


function load_yandex_map(w, h, name, adres) {
    //return false;
    var map = new YMaps.Map(document.getElementById("YMapsID"));
    map.setCenter(new YMaps.GeoPoint(w, h), 16);
    //map.addOverlay(ml);

    map.addControl(new YMaps.TypeControl());
    map.addControl(new YMaps.ToolBar());
    map.addControl(new YMaps.Zoom());
    map.addControl(new YMaps.ScaleLine());
    // map.addControl(new YMaps.Traffic.Control({ showInfoSwitcher: true }, { infoLayerShown: true }));
    map.enableScrollZoom();

    var group = new YMaps.GeoObjectCollection();
    group.add(createPlacemark(new YMaps.GeoPoint(w, h), name, adres));
    map.addOverlay(group);

}

function createPlacemark(point, name, description) {
    var placemark = new YMaps.Placemark(point);
    placemark.name = name;
    placemark.description = description;
    return placemark
}


function init_jqzoom(xOffset) {
    //return false;
    if (!xOffset) {
        xOffset = 20;
    }
    var options_init = {
        position: 'right',
        zoomWidth: 425,
        xOffset: xOffset,
        yOffset: -3,
        zoomHeight: 350,
        title: false,
        hideEffect: 'fadeout',
        fadeoutSpeed: 'slow',
        lens: 1,
        preload: 1
    };
    jQuery(".jqzoom").jqzoom(options_init);
}

$(document).ready(function () {

    $(".link_oferta").mouseover(function () {
        var alert_ = $("#oferta_mes");
        var offset = $(this).offset();
        if (offset) {
            alert_.css('left', offset.left + 20 + 'px');
            alert_.css('top', offset.top + 0 + 'px');
            alert_.fadeIn(300);
        }

        //alert_.mouseover(function(){jQuery(this).fadeIn(300);});
        //alert_.mouseout(function(){jQuery(this).slideUp(300);});
    });


    jQuery(".link_oferta").mouseout(function () {
        var alert_ = jQuery("#oferta_mes");
        alert_.fadeOut(300);
    });


    $('.content li').each(function () {
        var html = $(this).html();
        $(this).html('<span>' + html + '</span>');
    });

});


function carousel_ajax(div, file, direction, id_var, count)
{
    var divnorm = div;
    div = "#" + div;
    var id_count = div + "_count";
    if (direction == "up")
        count++;
    if (direction == "down")
        count--;
    if (direction == "start")
        count = 0;
    if (parseInt(direction) > 0)
        count = parseInt(direction, 10);
    $(div).fadeOut('normal', function () {
        $(div).html("<div class=\"load\">Идет загрузка...</div>");
        $(div).fadeIn('normal', function () {
            $.post(file, {count: count, div: divnorm, id_var: id_var}, function (msg) {
                $(div).html(msg);
                $(div).hide();
                $(div).fadeIn(500, function () {
                });
            });
        });
    });
    return false;
}

function max_color(obj) {
    var src = obj.src;
    src = src.split("?");
    src = src[0];
    obj.src = src;
}
function min_color(obj) {
    obj.src = obj.src + "?greyscale";
}

$(document).ready(function () {

    // Обертываение текста в первых ячейках таблицы характеристик товара
//    $('#parameters').find('td:first-child').each(function () {
//        if (!$(this).siblings().html() || $(this).siblings().html() === '&nbsp;') {
//            $(this).addClass('novalue');
//            return;
//        }
//        $(this).html('<span>' + $(this).html() + '</span>');
//    });

    // Переключатель вкладок info
    $("div.card").find('.hMenu').on('click', '.item', function () {
        var page = $(this).find('a').attr('href');
        $(page).css('display', '').siblings().css('display', 'none');
        $(this).addClass('selected').siblings().removeClass('selected');
        return false;
    });
    $("div.card").find('.hMenu').find('.item:first').click();
    // Стилизация title на пустых якорях
    $('.details').find('a[href="#"][title]').each(function () {
        var title = $(this).attr('title');
        var popup = $('<div class="popup-text"></div>').html(title);
        $(this).removeAttr('title').addClass('title').after(popup);
    });
    $('.mainMenu').mainMenu();
});

$.fn.mainMenu = function () {

    var make = function () {
        var $menu = $(this);
        $(this).on('click.mainMenu', 'ul.level-0 > li:not(.expanded)', function (e) {
            var $self = $(this);
            var $submenu = $(this).children('ul');
            if ($submenu.length) {
                e.preventDefault();
                $(this).addClass('expanded');
            }
            $(document).on('click.mainMenu', '*', function (e) {
 if ($(e.target).closest('.regionSelector') || $(e.target).hasClass('regionSelector'))
				{
					return true;
				}
                e.stopPropagation();
                if (!$(e.target).closest('.item.expanded').is($self)) {
                    $self.removeClass('expanded');
                }
            });
        });
    };

    return this.each(make);

};