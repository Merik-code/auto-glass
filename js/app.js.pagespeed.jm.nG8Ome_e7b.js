{\rtf1\ansi\ansicpg1251\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 $(document).ready(function() \{\
    var startload = 20;\
    var inProgress = false;\
    var startFrom = 0;\
    var glass_c = 0;\
    var filter = '';\
    var more_places = false;\
    $("#places_list .place_item:gt(5)").hide();\
    $(".shl").hide();\
    $(".show_more").on("click", function(e) \{\
        if (!more_places) \{\
            more_places = true;\
            $("#places_list .place_item:gt(5)").show();\
            $(".shm").hide();\
            $(".shl").show();\
        \} else \{\
            more_places = false;\
            $("#places_list .place_item:gt(5)").hide();\
            $(".shl").hide();\
            $(".shm").show();\
        \}\
        return false;\
    \})\
    LoadMakes(0);\
    $("#more").on("click", function(e) \{\
        startFrom += 6;\
        LoadGlass(cat_id, ltype, startFrom, filter);\
    \})\
    $("#filter_year").change(function() \{\
        var year = $('#filter_year :selected').val();\
        filter = year;\
        LoadGlass(cat_id, ltype, 0, filter);\
    \})\
    $("#load_more_makes").on("click", function(e) \{\
        LoadAllMakes(startload);\
    \})\
    $("#fmake_1").change(function() \{\
        var make = $('#fmake_1 :selected').val();\
        LoadModels(make, 1);\
    \})\
    $("#fmake_2").change(function() \{\
        var make = $('#fmake_2 :selected').val();\
        LoadModels(make, 2);\
    \})\
    $(".fsearch").on("click", function(e) \{\
        url = '';\
        obj_id = $(this).data('obj');\
        var ffmake = $('#fmake_' + obj_id).find(':selected').data('alias');\
        var ffmodel = $('#fmodel_' + obj_id).find(':selected').data('alias');\
        var fftype = $('#ftype' + obj_id + ' :selected').val();\
        if (typeof (ffmake) !== "undefined" && typeof (ffmodel) !== "undefined") \{\
            url = lurl + 'catalog/' + ffmake + '/' + ffmodel + '/';\
        \}\
        if (typeof (ffmake) !== "undefined" && typeof (ffmodel) === "undefined") \{\
            url = lurl + 'catalog/' + ffmake + '/';\
        \}\
        if (url != '')\
            document.location.href = url;\
    \});\
    $(function() \{\
        var flag = false;\
        $(".blink").css("background-color", "#f1f1f1");\
        setTimeout(function() \{\
            $(".blink").css("background-color", "#f1f1f1");\
            setInterval(function() \{\
                $(".blink").css("background-color", flag ? "#f1f1f1" : "#e0e0e0");\
                flag = !flag;\
            \}, 2000)\
        \}, 6000);\
    \});\
    $(document).on('click', '.get_route_card', function() \{\
        label = $(this).data("place");\
        trackEvents('get_route_card', label);\
    \});\
    $(document).on('click', '.click_to_header_phone', function() \{\
        label = $(this).data("phone");\
        trackEvents('click_to_header_phone', label);\
    \});\
    $(document).on('click', '.click_to_phone', function() \{\
        label = $(this).data("phone");\
        label = '';\
        trackEvents('click_to_phone', label);\
    \});\
    $(document).on('click', '.click_phone_place', function() \{\
        label = $(this).data("place") + ' ' + $(this).data("phone");\
        trackEvents('click_phone_place', label);\
    \});\
    $(document).on('click', '.click_phone_card', function() \{\
        label = $(this).data("place") + ' ' + $(this).data("phone");\
        trackEvents('click_phone_card', label);\
    \});\
    var trackEvents = function(cat, label) \{\
        var action = 'act.php';\
        $.post(action, \{\
            cat: cat,\
            label: label,\
            act: 'get_stat'\
        \}, function(data) \{\});\
    \}\
\});\
function LoadModels(make_id, obj_id) \{\
    var action = 'act.php';\
    $.post(action, \{\
        make_id: make_id,\
        obj_id: obj_id,\
        act: 'get_models'\
    \}, function(data) \{\
        $("#fmodels" + obj_id).html(data);\
    \});\
\}\
function LoadMakes(loaded) \{\
    var action = 'act.php';\
    $.post(action, \{\
        loaded: loaded,\
        act: 'get_makes'\
    \}, function(data) \{\
        if (data !== null && $("#catalog").length) \{\
            document.getElementById('catalog').innerHTML = data;\
        \}\
    \});\
\}\
function LoadAllMakes(loaded) \{\
    var action = 'act.php';\
    $.post(action, \{\
        loaded: loaded,\
        act: 'get_more_makes'\
    \}, function(data) \{\
        $(".load_more_makes").hide();\
        $("#catalog").append(data);\
    \});\
\}\
function LoadGlass(cid, ltype, startFrom, filter) \{\
    var action = 'act.php';\
    itemcount = startFrom;\
    glass_item = '';\
    $.ajax(\{\
        url: action,\
        method: 'POST',\
        data: \{\
            "startFrom": startFrom,\
            "act": "get_glass",\
            "cid": cid,\
            "type": ltype,\
            "filter": filter\
        \},\
        beforeSend: function() \{\
            $("#loadmore-icon").removeClass("icon-eye-7");\
            $("#loadmore-icon").addClass("icon-spin3 animate-spin");\
            inProgress = true;\
        \},\
        error: function(data) \{\
            console.log(data);\
        \}\
    \}).done(function(data) \{\
        if (data != 0) \{\
            $("#loadmore-icon").addClass("icon-eye-7");\
            $("#loadmore-icon").removeClass("icon-spin3 animate-spin");\
            data = jQuery.parseJSON(data);\
            if (data.length < 6) \{\
                $(".load_more_makes").hide();\
            \}\
            if (data.length > 0) \{\
                $.each(data, function(index, data) \{\
                    if (data.oes_code != '') \{\
                        oes_code = '<br>OES: ' + data.oes_code\
                    \} else \{\
                        oes_code = '';\
                    \}\
                    if (data.brand != '') \{\
                        brand = '<br>Brand: ' + data.brand\
                    \} else \{\
                        brand = '';\
                    \}\
                    glass_item = glass_item + '<div class="glass_list" class="gitem_' + itemcount + '"><div class="row"><div class="col-lg-3 d-md-none d-lg-block">' + data.warranty + '<div class="img_glass"><a href="' + data.url + '" title="' + data.alt + '"><img  src="img/glass.svg"  alt="' + data.alt + '"><div class="short_glass_info">' + data.euro_code + '</div></a></div></div><div class="col-lg-7 col-md-9"><div class="glass_list_desc"><div class="score">AGC: ' + data.agc_code + oes_code + brand + '</div><h3><a href="' + data.url + '">' + data.title + '</a></h3><p>' + data.year_title + ': <span>' + data.years + '</span></p><span class="opt">' + data.features + '</span></div></div><div class="col-lg-2 col-md-3"><div class="price_list"><div>' + data.price + '<span class="normal_price_list"></span><small>' + data.price_services + '</small><p><a href="" onclick="popup_form(\\'' + data.btn_title + '\\',\\'' + data.agc_code + '\\',\\'' + data.alt + '\\');return false;" class="popup_form btn_1 red frfr" data-title="' + data.btn_title + ' ' + data.agc_code + '">' + data.btn_title + '</a></p></div></div></div></div></div>';\
                    itemcount = itemcount + 1;\
                \});\
                if (filter == '') \{\
                    $("#glass_area").append(glass_item);\
                \}\
                if (filter != '') \{\
                    $("#glass_area").html(glass_item);\
                \}\
                inProgress = false;\
            \} else \{\
                $("#more").hide();\
            \}\
        \} else \{\
            $("#more").hide();\
            $("#glass_area").append('<h3 class="text-center">' + noglass + '</h3>');\
        \}\
    \});\
\}\
function getlatlng(ip='') \{\
    var access_key = '58dc6d5b833d891d1827e5c37efda9c8';\
    $.ajax(\{\
        url: 'http://api.ipstack.com/' + ip + '?access_key=' + access_key,\
        dataType: 'jsonp',\
        success: function(json) \{\
            console.log(json.latitude + ' ' + json.longitude);\
            return json;\
        \}\
    \});\
\}\
;\
}