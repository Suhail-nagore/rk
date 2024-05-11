(function () {
  "use strict";
  window.trx_addons_get_cookie = function (name) {
    var defa = arguments[1] != undefined ? arguments[1] : null;
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if (!start && name != document.cookie.substring(0, name.length)) {
      return defa;
    }
    if (start == -1) return defa;
    var end = document.cookie.indexOf(";", len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
  };
  window.trx_addons_set_cookie = function (
    name,
    value,
    expires,
    path,
    domain,
    secure
  ) {
    var expires = arguments[2] != undefined ? arguments[2] : 0;
    var path = arguments[3] != undefined ? arguments[3] : "/";
    var domain = arguments[4] != undefined ? arguments[4] : "";
    var secure = arguments[5] != undefined ? arguments[5] : "";
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
      expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + expires);
    document.cookie =
      name +
      "=" +
      escape(value) +
      (expires ? ";expires=" + expires_date.toGMTString() : "") +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      (secure ? ";secure" : "");
  };
  window.trx_addons_del_cookie = function (name, path, domain) {
    var path = arguments[1] != undefined ? arguments[1] : "/";
    var domain = arguments[2] != undefined ? arguments[2] : "";
    if (trx_addons_get_cookie(name))
      document.cookie =
        name +
        "=" +
        (path ? ";path=" + path : "") +
        (domain ? ";domain=" + domain : "") +
        ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
  };
  window.trx_addons_clear_listbox = function (box) {
    for (var i = box.options.length - 1; i >= 0; i--) box.options[i] = null;
  };
  window.trx_addons_add_listbox_item = function (box, val, text) {
    var item = new Option();
    item.value = val;
    item.text = text;
    box.options.add(item);
  };
  window.trx_addons_del_listbox_item_by_value = function (box, val) {
    for (var i = 0; i < box.options.length; i++) {
      if (box.options[i].value == val) {
        box.options[i] = null;
        break;
      }
    }
  };
  window.trx_addons_del_listbox_item_by_text = function (box, txt) {
    for (var i = 0; i < box.options.length; i++) {
      if (box.options[i].text == txt) {
        box.options[i] = null;
        break;
      }
    }
  };
  window.trx_addons_find_listbox_item_by_value = function (box, val) {
    var idx = -1;
    for (var i = 0; i < box.options.length; i++) {
      if (box.options[i].value == val) {
        idx = i;
        break;
      }
    }
    return idx;
  };
  window.trx_addons_find_listbox_item_by_text = function (box, txt) {
    var idx = -1;
    for (var i = 0; i < box.options.length; i++) {
      if (box.options[i].text == txt) {
        idx = i;
        break;
      }
    }
    return idx;
  };
  window.trx_addons_select_listbox_item_by_value = function (box, val) {
    for (var i = 0; i < box.options.length; i++) {
      box.options[i].selected = val == box.options[i].value;
    }
  };
  window.trx_addons_select_listbox_item_by_text = function (box, txt) {
    for (var i = 0; i < box.options.length; i++) {
      box.options[i].selected = txt == box.options[i].text;
    }
  };
  window.trx_addons_get_listbox_values = function (box) {
    var delim = arguments[1] ? arguments[1] : ",";
    var str = "";
    for (var i = 0; i < box.options.length; i++) {
      str += (str ? delim : "") + box.options[i].value;
    }
    return str;
  };
  window.trx_addons_get_listbox_texts = function (box) {
    var delim = arguments[1] ? arguments[1] : ",";
    var str = "";
    for (var i = 0; i < box.options.length; i++) {
      str += (str ? delim : "") + box.options[i].text;
    }
    return str;
  };
  window.trx_addons_sort_listbox = function (box) {
    var temp_opts = new Array();
    var temp = new Option();
    for (var i = 0; i < box.options.length; i++) {
      temp_opts[i] = box.options[i].clone();
    }
    for (var x = 0; x < temp_opts.length - 1; x++) {
      for (var y = x + 1; y < temp_opts.length; y++) {
        if (temp_opts[x].text > temp_opts[y].text) {
          temp = temp_opts[x];
          temp_opts[x] = temp_opts[y];
          temp_opts[y] = temp;
        }
      }
    }
    for (var i = 0; i < box.options.length; i++) {
      box.options[i] = temp_opts[i].clone();
    }
  };
  window.trx_addons_get_listbox_selected_index = function (box) {
    for (var i = 0; i < box.options.length; i++) {
      if (box.options[i].selected) return i;
    }
    return -1;
  };
  window.trx_addons_get_listbox_selected_value = function (box) {
    for (var i = 0; i < box.options.length; i++) {
      if (box.options[i].selected) {
        return box.options[i].value;
      }
    }
    return null;
  };
  window.trx_addons_get_listbox_selected_text = function (box) {
    for (var i = 0; i < box.options.length; i++) {
      if (box.options[i].selected) {
        return box.options[i].text;
      }
    }
    return null;
  };
  window.trx_addons_get_listbox_selected_option = function (box) {
    for (var i = 0; i < box.options.length; i++) {
      if (box.options[i].selected) {
        return box.options[i];
      }
    }
    return null;
  };
  window.trx_addons_get_radio_value = function (radioGroupObj) {
    for (var i = 0; i < radioGroupObj.length; i++)
      if (radioGroupObj[i].checked) return radioGroupObj[i].value;
    return null;
  };
  window.trx_addons_set_radio_checked_by_num = function (radioGroupObj, num) {
    for (var i = 0; i < radioGroupObj.length; i++)
      if (radioGroupObj[i].checked && i != num)
        radioGroupObj[i].checked = false;
      else if (i == num) radioGroupObj[i].checked = true;
  };
  window.trx_addons_set_radio_checked_by_value = function (radioGroupObj, val) {
    for (var i = 0; i < radioGroupObj.length; i++)
      if (radioGroupObj[i].checked && radioGroupObj[i].value != val)
        radioGroupObj[i].checked = false;
      else if (radioGroupObj[i].value == val) radioGroupObj[i].checked = true;
  };
  window.trx_addons_form_validate = function (form, opt) {
    if (typeof opt.error_message_show == "undefined")
      opt.error_message_show = true;
    if (typeof opt.error_message_time == "undefined")
      opt.error_message_time = 5000;
    if (typeof opt.error_message_class == "undefined")
      opt.error_message_class = "trx_addons_message_box_error";
    if (typeof opt.error_message_text == "undefined")
      opt.error_message_text = "Incorrect data in the fields!";
    if (typeof opt.error_fields_class == "undefined")
      opt.error_fields_class = "trx_addons_field_error";
    if (typeof opt.exit_after_first_error == "undefined")
      opt.exit_after_first_error = false;
    var error_msg = "";
    form.find(":input").each(function () {
      if (error_msg != "" && opt.exit_after_first_error) return;
      for (var i = 0; i < opt.rules.length; i++) {
        if (jQuery(this).attr("name") == opt.rules[i].field) {
          var val = jQuery(this).val();
          var error = false;
          if (typeof opt.rules[i].min_length == "object") {
            if (
              opt.rules[i].min_length.value > 0 &&
              val.length < opt.rules[i].min_length.value
            ) {
              if (error_msg == "") jQuery(this).get(0).focus();
              error_msg +=
                '<p class="trx_addons_error_item">' +
                (typeof opt.rules[i].min_length.message != "undefined"
                  ? opt.rules[i].min_length.message
                  : opt.error_message_text) +
                "</p>";
              error = true;
            }
          }
          if (
            (!error || !opt.exit_after_first_error) &&
            typeof opt.rules[i].max_length == "object"
          ) {
            if (
              opt.rules[i].max_length.value > 0 &&
              val.length > opt.rules[i].max_length.value
            ) {
              if (error_msg == "") jQuery(this).get(0).focus();
              error_msg +=
                '<p class="trx_addons_error_item">' +
                (typeof opt.rules[i].max_length.message != "undefined"
                  ? opt.rules[i].max_length.message
                  : opt.error_message_text) +
                "</p>";
              error = true;
            }
          }
          if (
            (!error || !opt.exit_after_first_error) &&
            typeof opt.rules[i].mask == "object"
          ) {
            if (opt.rules[i].mask.value != "") {
              var regexp = new RegExp(opt.rules[i].mask.value);
              if (!regexp.test(val)) {
                if (error_msg == "") jQuery(this).get(0).focus();
                error_msg +=
                  '<p class="trx_addons_error_item">' +
                  (typeof opt.rules[i].mask.message != "undefined"
                    ? opt.rules[i].mask.message
                    : opt.error_message_text) +
                  "</p>";
                error = true;
              }
            }
          }
          if (
            (!error || !opt.exit_after_first_error) &&
            typeof opt.rules[i].state == "object"
          ) {
            if (
              opt.rules[i].state.value == "checked" &&
              !jQuery(this).get(0).checked
            ) {
              if (error_msg == "") jQuery(this).get(0).focus();
              error_msg +=
                '<p class="trx_addons_error_item">' +
                (typeof opt.rules[i].state.message != "undefined"
                  ? opt.rules[i].state.message
                  : opt.error_message_text) +
                "</p>";
              error = true;
            }
          }
          if (
            (!error || !opt.exit_after_first_error) &&
            typeof opt.rules[i].equal_to == "object"
          ) {
            if (
              opt.rules[i].equal_to.value != "" &&
              val !=
                jQuery(
                  jQuery(this).get(0).form[opt.rules[i].equal_to.value]
                ).val()
            ) {
              if (error_msg == "") jQuery(this).get(0).focus();
              error_msg +=
                '<p class="trx_addons_error_item">' +
                (typeof opt.rules[i].equal_to.message != "undefined"
                  ? opt.rules[i].equal_to.message
                  : opt.error_message_text) +
                "</p>";
              error = true;
            }
          }
          if (opt.error_fields_class != "")
            jQuery(this).toggleClass(opt.error_fields_class, error);
        }
      }
    });
    if (error_msg != "" && opt.error_message_show) {
      var error_message_box = form.find(".trx_addons_message_box");
      if (error_message_box.length == 0)
        error_message_box = form.parent().find(".trx_addons_message_box");
      if (error_message_box.length == 0) {
        form.append('<div class="trx_addons_message_box"></div>');
        error_message_box = form.find(".trx_addons_message_box");
      }
      if (opt.error_message_class)
        error_message_box.toggleClass(opt.error_message_class, true);
      error_message_box.html(error_msg).fadeIn();
      setTimeout(function () {
        error_message_box.fadeOut();
      }, opt.error_message_time);
    }
    return error_msg != "";
  };
  window.trx_addons_refresh_list = function (
    parent_type,
    parent_val,
    list_fld,
    list_lbl,
    list_not_selected
  ) {
    var list_val = list_fld.val();
    if (list_lbl.find(".trx_addons_refresh").length == 0)
      list_lbl.append(
        '<span class="trx_addons_refresh trx_addons_icon-spin3 animate-spin"></span>'
      );
    var data = {
      action: "trx_addons_refresh_list",
      nonce: TRX_ADDONS_STORAGE["ajax_nonce"],
      parent_type: parent_type,
      parent_value: parent_val,
      list_not_selected:
        list_not_selected === true ||
        list_fld.data("not-selected") === true ||
        list_fld.parents(".vc_edit-form-tab").length > 0 ||
        list_fld.parents(".siteorigin-widget-field").length > 0 ||
        list_fld.parents('[class*="widget_field_type_"]').length > 0 ||
        list_fld.parents(".widget-liquid-right").length > 0 ||
        list_fld.parents(".widgets-holder-wrap").length > 0 ||
        list_fld.parents(".customize-control-widget_form").length > 0,
    };
    jQuery.post(TRX_ADDONS_STORAGE["ajax_url"], data, function (response) {
      var rez = {};
      try {
        rez = JSON.parse(response);
      } catch (e) {
        rez = { error: TRX_ADDONS_STORAGE["msg_ajax_error"] };
        console.log(response);
      }
      if (rez.error === "") {
        var opt_list = "";
        var list_type = list_fld.prop("tagName").toLowerCase();
        var list_name =
          list_type == "select"
            ? list_fld.attr("name")
            : list_fld.data("field_name");
        for (var i in rez.data) {
          if (list_type != "select" && rez.data[i]["key"] == 0) continue;
          opt_list +=
            list_type == "select"
              ? '<option class="' +
                rez.data[i]["key"] +
                '"' +
                ' value="' +
                rez.data[i]["key"] +
                '"' +
                (rez.data[i]["key"] == list_val ? ' selected="selected"' : "") +
                ">" +
                rez.data[i]["value"] +
                "</option>"
              : '<label><input type="checkbox"' +
                ' value="' +
                rez.data[i]["key"] +
                '"' +
                ' name="' +
                list_name +
                '"' +
                ">" +
                rez.data[i]["value"] +
                "</label>";
        }
        list_fld.html(opt_list);
        if (
          list_type == "select" &&
          list_fld.find("option:selected").length == 0 &&
          list_fld.find("option").length > 0
        )
          list_fld.find("option").get(0).selected = true;
        list_lbl.find("span.trx_addons_refresh").remove();
        list_fld.trigger("change");
      }
    });
    return false;
  };
  window.trx_addons_document_animate_to = function (id, callback) {
    var oft = !isNaN(id) ? Number(id) : 0;
    if (isNaN(id)) {
      if (id.indexOf("#") == -1) id = "#" + id;
      var obj = jQuery(id).eq(0);
      if (obj.length == 0) return;
      oft = obj.offset().top;
    }
    var st = jQuery(window).scrollTop();
    var oft2 = Math.max(0, oft - trx_addons_fixed_rows_height());
    var speed = Math.min(
      1200,
      Math.max(
        300,
        Math.round((Math.abs(oft2 - st) / jQuery(window).height()) * 300)
      )
    );
    if (true || st == 0) {
      setTimeout(function () {
        if (isNaN(id)) oft = obj.offset().top;
        oft2 = Math.max(0, oft - trx_addons_fixed_rows_height());
        jQuery("body,html")
          .stop(true)
          .animate(
            { scrollTop: oft2 },
            Math.floor(speed / 2),
            "linear",
            callback
          );
      }, Math.floor(speed / 2));
    }
    jQuery("body,html")
      .stop(true)
      .animate({ scrollTop: oft2 }, speed, "linear", callback);
  };
  window.trx_addons_fixed_rows_height = function () {
    var with_admin_bar = arguments.length > 0 ? arguments[0] : true;
    var with_fixed_rows = arguments.length > 1 ? arguments[1] : true;
    var oft = 0;
    if (with_admin_bar) {
      var admin_bar = jQuery("#wpadminbar");
      oft +=
        admin_bar.length > 0 &&
        admin_bar.css("display") != "none" &&
        admin_bar.css("position") == "fixed"
          ? admin_bar.height()
          : 0;
    }
    if (with_fixed_rows) {
      jQuery(".sc_layouts_row_fixed_on").each(function () {
        if (jQuery(this).css("position") == "fixed")
          oft += jQuery(this).height();
      });
    }
    return oft;
  };
  window.trx_addons_document_set_location = function (curLoc) {
    if (
      history.pushState === undefined ||
      navigator.userAgent.match(/MSIE\s[6-9]/i) != null
    )
      return;
    try {
      history.pushState(null, null, curLoc);
      return;
    } catch (e) {}
    location.href = curLoc;
  };
  window.trx_addons_add_to_url = function (loc, prm) {
    var ignore_empty = arguments[2] !== undefined ? arguments[2] : true;
    var q = loc.indexOf("?");
    var attr = {};
    if (q > 0) {
      var qq = loc.substr(q + 1).split("&");
      var parts = "";
      for (var i = 0; i < qq.length; i++) {
        var parts = qq[i].split("=");
        attr[parts[0]] = parts.length > 1 ? parts[1] : "";
      }
    }
    for (var p in prm) {
      attr[p] = prm[p];
    }
    loc = (q > 0 ? loc.substr(0, q) : loc) + "?";
    var i = 0;
    for (p in attr) {
      if (ignore_empty && attr[p] == "") continue;
      loc += (i++ > 0 ? "&" : "") + p + "=" + attr[p];
    }
    return loc;
  };
  window.trx_addons_is_local_link = function (url) {
    var rez = url !== undefined;
    if (rez) {
      var url_pos = url.indexOf("#");
      if (url_pos == 0 && url.length == 1) rez = false;
      else {
        if (url_pos < 0) url_pos = url.length;
        var loc = window.location.href;
        var loc_pos = loc.indexOf("#");
        if (loc_pos > 0) loc = loc.substring(0, loc_pos);
        rez = url_pos == 0;
        if (!rez) rez = loc == url.substring(0, url_pos);
      }
    }
    return rez;
  };
  window.trx_addons_browser_is_mobile = function () {
    var check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };
  window.trx_addons_browser_is_ios = function () {
    return navigator.userAgent.match(/iPad|iPhone|iPod/i) != null ||
      navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)
      ? true
      : false;
  };
  window.trx_addons_is_retina = function () {
    var mediaQuery =
      "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
    return (
      window.devicePixelRatio > 1 ||
      (window.matchMedia && window.matchMedia(mediaQuery).matches)
    );
  };
  window.trx_addons_get_file_name = function (path) {
    path = path.replace(/\\/g, "/");
    var pos = path.lastIndexOf("/");
    if (pos >= 0) path = path.substr(pos + 1);
    return path;
  };
  window.trx_addons_get_file_ext = function (path) {
    var pos = path.lastIndexOf(".");
    path = pos >= 0 ? path.substr(pos + 1) : "";
    return path;
  };
  window.trx_addons_check_images_complete = function (cont) {
    var complete = true;
    cont.find("img").each(function () {
      if (!complete) return;
      if (!jQuery(this).get(0).complete) complete = false;
    });
    return complete;
  };
  window.trx_addons_round_number = function (num) {
    var precision = arguments[1] !== undefined ? arguments[1] : 0;
    var p = Math.pow(10, precision);
    return Math.round(num * p) / p;
  };
  Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
      c = c == undefined ? 2 : isNaN((c = Math.abs(c))) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
      j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      s +
      (j ? i.substr(0, j) + t : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : "")
    );
  };
  window.trx_addons_replicate = function (str, num) {
    var rez = "";
    for (var i = 0; i < num; i++) {
      rez += str;
    }
    return rez;
  };
  window.trx_addons_get_icon_class = function (classes) {
    var classes = classes.split(" ");
    var icon = "";
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf("icon-") >= 0) {
        icon = classes[i];
        break;
      }
    }
    return icon;
  };
  window.trx_addons_chg_icon_class = function (classes, icon) {
    var chg = false;
    classes = classes.split(" ");
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf("icon-") >= 0) {
        classes[i] = icon;
        chg = true;
        break;
      }
    }
    if (!chg) {
      if (classes.length == 1 && classes[0] == "") classes[0] = icon;
      else classes.push(icon);
    }
    return classes.join(" ");
  };
  window.trx_addons_hex2rgb = function (hex) {
    hex = parseInt(hex.indexOf("#") > -1 ? hex.substring(1) : hex, 16);
    return { r: hex >> 16, g: (hex & 0x00ff00) >> 8, b: hex & 0x0000ff };
  };
  window.trx_addons_hex2rgba = function (hex, alpha) {
    var rgb = trx_addons_hex2rgb(hex);
    return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + alpha + ")";
  };
  window.trx_addons_rgb2hex = function (color) {
    var aRGB;
    color = color.replace(/\s/g, "").toLowerCase();
    if (color == "rgba(0,0,0,0)" || color == "rgba(0%,0%,0%,0%)")
      color = "transparent";
    if (color.indexOf("rgba(") == 0)
      aRGB = color.match(
        /^rgba\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i
      );
    else
      aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
    if (aRGB) {
      color = "";
      for (var i = 1; i <= 3; i++)
        color += Math.round(
          (aRGB[i][aRGB[i].length - 1] == "%" ? 2.55 : 1) * parseInt(aRGB[i])
        )
          .toString(16)
          .replace(/^(.)$/, "0$1");
    } else
      color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, "$1$1$2$2$3$3");
    return (color.substr(0, 1) != "#" ? "#" : "") + color;
  };
  window.trx_addons_components2hex = function (r, g, b) {
    return (
      "#" +
      Number(r).toString(16).toUpperCase().replace(/^(.)$/, "0$1") +
      Number(g).toString(16).toUpperCase().replace(/^(.)$/, "0$1") +
      Number(b).toString(16).toUpperCase().replace(/^(.)$/, "0$1")
    );
  };
  window.trx_addons_rgb2components = function (color) {
    color = trx_addons_rgb2hex(color);
    var matches = color.match(
      /^#?([\dabcdef]{2})([\dabcdef]{2})([\dabcdef]{2})$/i
    );
    if (!matches) return false;
    for (var i = 1, rgb = new Array(3); i <= 3; i++)
      rgb[i - 1] = parseInt(matches[i], 16);
    return rgb;
  };
  window.trx_addons_hex2hsb = function (hex) {
    var h = arguments[1] !== undefined ? arguments[1] : 0;
    var s = arguments[2] !== undefined ? arguments[2] : 0;
    var b = arguments[3] !== undefined ? arguments[3] : 0;
    var hsb = trx_addons_rgb2hsb(trx_addons_hex2rgb(hex));
    hsb.h = Math.min(359, hsb.h + h);
    hsb.s = Math.min(100, hsb.s + s);
    hsb.b = Math.min(100, hsb.b + b);
    return hsb;
  };
  window.trx_addons_hsb2hex = function (hsb) {
    var rgb = trx_addons_hsb2rgb(hsb);
    return trx_addons_components2hex(rgb.r, rgb.g, rgb.b);
  };
  window.trx_addons_rgb2hsb = function (rgb) {
    var hsb = {};
    hsb.b = Math.max(Math.max(rgb.r, rgb.g), rgb.b);
    hsb.s =
      hsb.b <= 0
        ? 0
        : Math.round(
            (100 * (hsb.b - Math.min(Math.min(rgb.r, rgb.g), rgb.b))) / hsb.b
          );
    hsb.b = Math.round((hsb.b / 255) * 100);
    if (rgb.r == rgb.g && rgb.g == rgb.b) hsb.h = 0;
    else if (rgb.r >= rgb.g && rgb.g >= rgb.b)
      hsb.h = (60 * (rgb.g - rgb.b)) / (rgb.r - rgb.b);
    else if (rgb.g >= rgb.r && rgb.r >= rgb.b)
      hsb.h = 60 + (60 * (rgb.g - rgb.r)) / (rgb.g - rgb.b);
    else if (rgb.g >= rgb.b && rgb.b >= rgb.r)
      hsb.h = 120 + (60 * (rgb.b - rgb.r)) / (rgb.g - rgb.r);
    else if (rgb.b >= rgb.g && rgb.g >= rgb.r)
      hsb.h = 180 + (60 * (rgb.b - rgb.g)) / (rgb.b - rgb.r);
    else if (rgb.b >= rgb.r && rgb.r >= rgb.g)
      hsb.h = 240 + (60 * (rgb.r - rgb.g)) / (rgb.b - rgb.g);
    else if (rgb.r >= rgb.b && rgb.b >= rgb.g)
      hsb.h = 300 + (60 * (rgb.r - rgb.b)) / (rgb.r - rgb.g);
    else hsb.h = 0;
    hsb.h = Math.round(hsb.h);
    return hsb;
  };
  window.trx_addons_hsb2rgb = function (hsb) {
    var rgb = {};
    var h = Math.round(hsb.h);
    var s = Math.round((hsb.s * 255) / 100);
    var v = Math.round((hsb.b * 255) / 100);
    if (s == 0) {
      rgb.r = rgb.g = rgb.b = v;
    } else {
      var t1 = v;
      var t2 = ((255 - s) * v) / 255;
      var t3 = ((t1 - t2) * (h % 60)) / 60;
      if (h == 360) h = 0;
      if (h < 60) {
        rgb.r = t1;
        rgb.b = t2;
        rgb.g = t2 + t3;
      } else if (h < 120) {
        rgb.g = t1;
        rgb.b = t2;
        rgb.r = t1 - t3;
      } else if (h < 180) {
        rgb.g = t1;
        rgb.r = t2;
        rgb.b = t2 + t3;
      } else if (h < 240) {
        rgb.b = t1;
        rgb.r = t2;
        rgb.g = t1 - t3;
      } else if (h < 300) {
        rgb.b = t1;
        rgb.g = t2;
        rgb.r = t2 + t3;
      } else if (h < 360) {
        rgb.r = t1;
        rgb.g = t2;
        rgb.b = t1 - t3;
      } else {
        rgb.r = 0;
        rgb.g = 0;
        rgb.b = 0;
      }
    }
    return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
  };
  window.trx_addons_color_picker = function () {
    var id =
      arguments[0] !== undefined
        ? arguments[0]
        : "iColorPicker" + Math.round(Math.random() * 1000);
    var colors =
      arguments[1] !== undefined
        ? arguments[1]
        : "#f00,#ff0,#0f0,#0ff,#00f,#f0f,#fff,#ebebeb,#e1e1e1,#d7d7d7,#cccccc,#c2c2c2,#b7b7b7,#acacac,#a0a0a0,#959595," +
          "#ee1d24,#fff100,#00a650,#00aeef,#2f3192,#ed008c,#898989,#7d7d7d,#707070,#626262,#555,#464646,#363636,#262626,#111,#000," +
          "#f7977a,#fbad82,#fdc68c,#fff799,#c6df9c,#a4d49d,#81ca9d,#7bcdc9,#6ccff7,#7ca6d8,#8293ca,#8881be,#a286bd,#bc8cbf,#f49bc1,#f5999d," +
          "#f16c4d,#f68e54,#fbaf5a,#fff467,#acd372,#7dc473,#39b778,#16bcb4,#00bff3,#438ccb,#5573b7,#5e5ca7,#855fa8,#a763a9,#ef6ea8,#f16d7e," +
          "#ee1d24,#f16522,#f7941d,#fff100,#8fc63d,#37b44a,#00a650,#00a99e,#00aeef,#0072bc,#0054a5,#2f3192,#652c91,#91278f,#ed008c,#ee105a," +
          "#9d0a0f,#a1410d,#a36209,#aba000,#588528,#197b30,#007236,#00736a,#0076a4,#004a80,#003370,#1d1363,#450e61,#62055f,#9e005c,#9d0039," +
          "#790000,#7b3000,#7c4900,#827a00,#3e6617,#045f20,#005824,#005951,#005b7e,#003562,#002056,#0c004b,#30004a,#4b0048,#7a0045,#7a0026";
    var colorsList = colors.split(",");
    var tbl = '<table class="colorPickerTable"><thead>';
    for (var i = 0; i < colorsList.length; i++) {
      if (i % 16 == 0) tbl += (i > 0 ? "</tr>" : "") + "<tr>";
      tbl += '<td style="background-color:' + colorsList[i] + '">&nbsp;</td>';
    }
    tbl +=
      "</tr></thead><tbody>" +
      '<tr style="height:60px;">' +
      '<td colspan="8" id="' +
      id +
      '_colorPreview" style="vertical-align:middle;text-align:center;border:1px solid #000;background:#fff;">' +
      '<input style="width:55px;color:#000;border:1px solid rgb(0, 0, 0);padding:5px;background-color:#fff;font:11px Arial, Helvetica, sans-serif;" maxlength="7" />' +
      '<a href="#" id="' +
      id +
      '_moreColors" class="iColorPicker_moreColors"></a>' +
      "</td>" +
      '<td colspan="8" id="' +
      id +
      '_colorOriginal" style="vertical-align:middle;text-align:center;border:1px solid #000;background:#fff;">' +
      '<input style="width:55px;color:#000;border:1px solid rgb(0, 0, 0);padding:5px;background-color:#fff;font:11px Arial, Helvetica, sans-serif;" readonly="readonly" />' +
      "</td>" +
      "</tr></tbody></table>";
    jQuery(document.createElement("div"))
      .attr("id", id)
      .css("display", "none")
      .html(tbl)
      .appendTo("body")
      .addClass("iColorPickerTable")
      .on("mouseover", "thead td", function () {
        var aaa = trx_addons_rgb2hex(jQuery(this).css("background-color"));
        jQuery("#" + id + "_colorPreview").css("background", aaa);
        jQuery("#" + id + "_colorPreview input").val(aaa);
      })
      .on("keypress", "#" + id + "_colorPreview input", function (key) {
        var aaa = jQuery(this).val();
        if (key.which === 13 && (aaa.length === 4 || aaa.length === 7)) {
          var fld = jQuery("#" + id).data("field");
          var func = jQuery("#" + id).data("func");
          if (func != null && func != "undefined") {
            func(fld, aaa);
          } else {
            fld.val(aaa).css("backgroundColor", aaa).trigger("change");
          }
          jQuery("#" + id + "_Bg").fadeOut(500);
          jQuery("#" + id).fadeOut(500);
          key.preventDefault();
          return false;
        }
      })
      .on("change", "#" + id + "_colorPreview input", function (key) {
        var aaa = jQuery(this).val();
        if (
          aaa.substr(0, 1) === "#" &&
          (aaa.length === 4 || aaa.length === 7)
        ) {
          jQuery("#" + id + "_colorPreview").css("background", aaa);
        }
      })
      .on("click", "thead td", function (e) {
        var fld = jQuery("#" + id).data("field");
        var func = jQuery("#" + id).data("func");
        var aaa = trx_addons_rgb2hex(jQuery(this).css("background-color"));
        if (func != null && func != "undefined") {
          func(fld, aaa);
        } else {
          fld.val(aaa).css("backgroundColor", aaa).trigger("change");
        }
        jQuery("#" + id + "_Bg").fadeOut(500);
        jQuery("#" + id).fadeOut(500);
        e.preventDefault();
        return false;
      })
      .on("click", "tbody .iColorPicker_moreColors", function (e) {
        var thead = jQuery(this).parents("table").find("thead");
        var out = "";
        if (thead.hasClass("more_colors")) {
          for (var i = 0; i < colorsList.length; i++) {
            if (i % 16 == 0) out += (i > 0 ? "</tr>" : "") + "<tr>";
            out +=
              '<td style="background-color:' + colorsList[i] + '">&nbsp;</td>';
          }
          thead
            .removeClass("more_colors")
            .empty()
            .html(out + "</tr>");
          jQuery("#" + id + "_colorPreview").attr("colspan", 8);
          jQuery("#" + id + "_colorOriginal").attr("colspan", 8);
        } else {
          var rgb = [0, 0, 0],
            i = 0,
            j = -1;
          while (rgb[0] < 0xf || rgb[1] < 0xf || rgb[2] < 0xf) {
            if (i % 18 == 0) out += (i > 0 ? "</tr>" : "") + "<tr>";
            i++;
            out +=
              '<td style="background-color:' +
              trx_addons_components2hex(
                rgb[0] * 16 + rgb[0],
                rgb[1] * 16 + rgb[1],
                rgb[2] * 16 + rgb[2]
              ) +
              '">&nbsp;</td>';
            rgb[2] += 3;
            if (rgb[2] > 0xf) {
              rgb[1] += 3;
              if (rgb[1] > (j === 0 ? 6 : 0xf)) {
                rgb[0] += 3;
                if (rgb[0] > 0xf) {
                  if (j === 0) {
                    j = 1;
                    rgb[0] = 0;
                    rgb[1] = 9;
                    rgb[2] = 0;
                  } else {
                    break;
                  }
                } else {
                  rgb[1] = j < 1 ? 0 : 9;
                  rgb[2] = 0;
                }
              } else {
                rgb[2] = 0;
              }
            }
          }
          thead
            .addClass("more_colors")
            .empty()
            .html(
              out +
                '<td style="background-color:#ffffff" colspan="8">&nbsp;</td></tr>'
            );
          jQuery("#" + id + "_colorPreview").attr("colspan", 9);
          jQuery("#" + id + "_colorOriginal").attr("colspan", 9);
        }
        jQuery("#" + id + " table.colorPickerTable thead td").css({
          width: "12px",
          height: "14px",
          border: "1px solid #000",
          cursor: "pointer",
        });
        e.preventDefault();
        return false;
      });
    jQuery(document.createElement("div"))
      .attr("id", id + "_Bg")
      .on("click", function (e) {
        jQuery("#" + id + "_Bg").fadeOut(500);
        jQuery("#" + id).fadeOut(500);
        e.preventDefault();
        return false;
      })
      .appendTo("body");
    jQuery("#" + id + " table.colorPickerTable thead td").css({
      width: "12px",
      height: "14px",
      border: "1px solid #000",
      cursor: "pointer",
    });
    jQuery("#" + id + " table.colorPickerTable").css({
      "border-collapse": "collapse",
    });
    jQuery("#" + id).css({
      border: "1px solid #ccc",
      background: "#333",
      padding: "5px",
      color: "#fff",
    });
    jQuery("#" + id + "_colorPreview").css({ height: "50px" });
    return id;
  };
  window.trx_addons_color_picker_show = function (id, fld, func) {
    if (id === null || id === "") {
      id = jQuery(".iColorPickerTable").attr("id");
    }
    var eICP = fld.offset();
    var w = jQuery("#" + id).width();
    var h = jQuery("#" + id).height();
    var l =
      eICP.left + w < jQuery(window).width() - 10
        ? eICP.left
        : jQuery(window).width() - 10 - w;
    var t =
      eICP.top + fld.outerHeight() + h <
      jQuery(document).scrollTop() + jQuery(window).height() - 10
        ? eICP.top + fld.outerHeight()
        : eICP.top - h - 13;
    jQuery("#" + id)
      .data({ field: fld, func: func })
      .css({
        top: t + "px",
        left: l + "px",
        position: "absolute",
        "z-index": 999999,
      })
      .fadeIn(500);
    jQuery("#" + id + "_Bg")
      .css({
        position: "fixed",
        "z-index": 999998,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      })
      .fadeIn(500);
    var def =
      fld.val().substr(0, 1) == "#"
        ? fld.val()
        : trx_addons_rgb2hex(fld.css("backgroundColor"));
    jQuery(
      "#" + id + "_colorPreview input,#" + id + "_colorOriginal input"
    ).val(def);
    jQuery("#" + id + "_colorPreview,#" + id + "_colorOriginal").css(
      "background",
      def
    );
  };
  window.trx_addons_serialize = function (mixed_val) {
    var obj_to_array = arguments.length == 1 || argument[1] === true;
    switch (typeof mixed_val) {
      case "number":
        if (isNaN(mixed_val) || !isFinite(mixed_val)) return false;
        else
          return (
            (Math.floor(mixed_val) == mixed_val ? "i" : "d") +
            ":" +
            mixed_val +
            ";"
          );
      case "string":
        return "s:" + mixed_val.length + ':"' + mixed_val + '";';
      case "boolean":
        return "b:" + (mixed_val ? "1" : "0") + ";";
      case "object":
        if (mixed_val == null) return "N;";
        else if (mixed_val instanceof Array) {
          var idxobj = { idx: -1 };
          var map = [];
          for (var i = 0; i < mixed_val.length; i++) {
            idxobj.idx++;
            var ser = trx_addons_serialize(mixed_val[i]);
            if (ser) map.push(trx_addons_serialize(idxobj.idx) + ser);
          }
          return "a:" + mixed_val.length + ":{" + map.join("") + "}";
        } else {
          var class_name = trx_addons_get_class(mixed_val);
          if (class_name == undefined) return false;
          var props = new Array();
          for (var prop in mixed_val) {
            var ser = trx_addons_serialize(mixed_val[prop]);
            if (ser) props.push(trx_addons_serialize(prop) + ser);
          }
          if (obj_to_array)
            return "a:" + props.length + ":{" + props.join("") + "}";
          else
            return (
              "O:" +
              class_name.length +
              ':"' +
              class_name +
              '":' +
              props.length +
              ":{" +
              props.join("") +
              "}"
            );
        }
      case "undefined":
        return "N;";
    }
    return false;
  };
  window.trx_addons_get_class = function (obj) {
    if (
      obj instanceof Object &&
      !(obj instanceof Array) &&
      !(obj instanceof Function) &&
      obj.constructor
    ) {
      var arr = obj.constructor.toString().match(/function\s*(\w+)/);
      if (arr && arr.length == 2) return arr[1];
    }
    return false;
  };
})();
jQuery(document).ready(function () {
  "use strict";
  var vc_init_counter = 0;
  trx_addons_init_actions();
  jQuery(window).on("beforeunload", function (e) {
    if (jQuery.browser && !jQuery.browser.safari) {
      jQuery("#page_preloader")
        .css({ display: "block", opacity: 0 })
        .animate({ opacity: 0.8 }, 300);
      setTimeout(trx_addons_hide_preloader, 5000);
    }
  });
  function trx_addons_hide_preloader() {
    jQuery("#page_preloader").animate({ opacity: 0 }, 800, function () {
      jQuery(this).css({ display: "none" });
    });
  }
  function trx_addons_init_actions() {
    if (
      TRX_ADDONS_STORAGE["vc_edit_mode"] > 0 &&
      jQuery(".vc_empty-placeholder").length == 0 &&
      vc_init_counter++ < 30
    ) {
      setTimeout(trx_addons_init_actions, 200);
      return;
    }
    trx_addons_hide_preloader();
    var msg = jQuery(".trx_addons_message_box_system"),
      msg_delay = 5000;
    if (msg.length > 0) {
      setTimeout(function () {
        msg.fadeIn().delay(msg_delay).fadeOut();
      }, 1000);
      var login = jQuery(".trx_addons_login_link");
      if (msg.hasClass("trx_addons_message_box_error") && login.length > 0) {
        setTimeout(function () {
          login.trigger("click");
        }, 2000 + msg_delay);
      }
    }
    if (
      typeof TRX_ADDONS_STORAGE["animate_to_hash"] == "undefined" &&
      !jQuery("body").hasClass("single-product")
    ) {
      TRX_ADDONS_STORAGE["animate_to_hash"] = true;
      setTimeout(function () {
        if (
          window.mc4wp_forms_config &&
          window.mc4wp_forms_config.submitted_form &&
          window.mc4wp_forms_config.submitted_form.element_id
        ) {
          trx_addons_document_animate_to(
            window.mc4wp_forms_config.submitted_form.element_id
          );
        } else if (location.hash != "") {
          var off = jQuery(location.hash).offset().top,
            scroll = jQuery(window).scrollTop();
          if (!isNaN(off) && off - scroll < 100) {
            var fixed_height = trx_addons_fixed_rows_height();
            if (fixed_height > 0)
              trx_addons_document_animate_to(
                jQuery(window).scrollTop() - fixed_height
              );
          }
        }
      }, 500);
    }
    trx_addons_set_cookie(
      "trx_addons_is_retina",
      trx_addons_is_retina() ? 1 : 0,
      365
    );
    jQuery(document).on("action.init_hidden_elements", function () {
      trx_addons_ready_actions();
      jQuery(window).trigger("scroll");
    });
    trx_addons_ready_actions();
    var vc_js = false;
    jQuery(document).on("vc_js", function () {
      if (!vc_js) {
        vc_js = true;
        trx_addons_add_handlers();
      }
    });
    setTimeout(function () {
      if (!vc_js) {
        trx_addons_add_handlers();
      }
    }, 1);
    function trx_addons_add_handlers() {
      trx_addons_resize_actions();
      jQuery(window).resize(function () {
        trx_addons_resize_actions();
      });
      trx_addons_scroll_actions();
      jQuery(window).scroll(function () {
        trx_addons_scroll_actions();
      });
      typeof window.wpb_prepare_tab_content == "function" &&
        typeof window.wpb_prepare_tab_content_old == "undefined" &&
        (window.wpb_prepare_tab_content_old = window.wpb_prepare_tab_content) &&
        (window.wpb_prepare_tab_content = function (e, ui) {
          if (typeof ui.newPanel !== "undefined" && ui.newPanel.length > 0) {
            jQuery(document).trigger("action.init_hidden_elements", [
              ui.newPanel,
            ]);
          } else if (typeof ui.panel !== "undefined" && ui.panel.length > 0) {
            jQuery(document).trigger("action.init_hidden_elements", [ui.panel]);
          }
          window.wpb_prepare_tab_content_old(e, ui);
        });
      typeof window.vc_accordionActivate == "function" &&
        typeof window.vc_accordionActivate_old == "undefined" &&
        (window.vc_accordionActivate_old = window.vc_accordionActivate) &&
        (window.vc_accordionActivate = function (e, ui) {
          if (typeof ui.newPanel !== "undefined" && ui.newPanel.length > 0) {
            jQuery(document).trigger("action.init_hidden_elements", [
              ui.newPanel,
            ]);
          } else if (typeof ui.panel !== "undefined" && ui.panel.length > 0) {
            jQuery(document).trigger("action.init_hidden_elements", [ui.panel]);
          }
          window.vc_accordionActivate_old(e, ui);
        });
    }
  }
  function trx_addons_ready_actions(e, container) {
    if (container === undefined) container = jQuery("body");
    if (
      TRX_ADDONS_STORAGE["animate_inner_links"] > 0 &&
      !container.hasClass("animate_to_inited")
    ) {
      container.addClass("animate_to_inited").on("click", "a", function (e) {
        var link_obj = jQuery(this);
        var link_parent = link_obj.parent();
        if (
          link_parent.parent().hasClass("trx_addons_tabs_titles") ||
          link_parent.hasClass("vc_tta-tab") ||
          link_obj.hasClass("vc_pagination-trigger") ||
          link_obj.hasClass("ui-tabs-anchor") ||
          link_parent.hasClass("vc_tta-panel-title") ||
          link_parent.hasClass("wpb_accordion_header")
        )
          return;
        var href = link_obj.attr("href");
        if (href == "#") return;
        if (trx_addons_is_local_link(href)) {
          var pos = href.indexOf("#"),
            offset = 0;
          if (pos >= 0) {
            href = href.substr(pos);
            if (jQuery(href).length > 0) {
              trx_addons_document_animate_to(href);
              e.preventDefault();
              return false;
            }
          }
        }
      });
    }
    if (
      jQuery.ui &&
      jQuery.ui.tabs &&
      container.find(".trx_addons_tabs:not(.inited)").length > 0
    ) {
      container.find(".trx_addons_tabs:not(.inited)").each(function () {
        var init = jQuery(this).data("active");
        if (isNaN(init)) {
          init = 0;
          var active = jQuery(this).find('> ul > li[data-active="true"]').eq(0);
          if (active.length > 0) {
            init = active.index();
            if (isNaN(init) || init < 0) init = 0;
          }
        } else {
          init = Math.max(0, init);
        }
        var disabled = [];
        jQuery(this)
          .find('> ul > li[data-disabled="true"]')
          .each(function () {
            disabled.push(jQuery(this).index());
          });
        jQuery(this)
          .addClass("inited")
          .tabs({
            active: init,
            disabled: disabled,
            show: { effect: "fadeIn", duration: 300 },
            hide: { effect: "fadeOut", duration: 300 },
            create: function (event, ui) {
              if (ui.panel.length > 0)
                jQuery(document).trigger("action.init_hidden_elements", [
                  ui.panel,
                ]);
            },
            activate: function (event, ui) {
              if (ui.newPanel.length > 0)
                jQuery(document).trigger("action.init_hidden_elements", [
                  ui.newPanel,
                ]);
            },
          });
      });
    }
    if (
      jQuery.ui &&
      jQuery.ui.accordion &&
      container.find(".trx_addons_accordion:not(.inited)").length > 0
    ) {
      container.find(".trx_addons_accordion:not(.inited)").each(function () {
        var accordion = jQuery(this);
        var headers = accordion.data("headers");
        if (headers === undefined) headers = "h5";
        var height_style = accordion.data("height-style");
        if (height_style === undefined) height_style = "content";
        var collapsible = accordion.data("collapsible");
        if (collapsible === undefined) collapsible = false;
        var init = accordion.data("active");
        var active = false;
        if (isNaN(init)) {
          init = 0;
          var active = accordion.find(headers + '[data-active="true"]').eq(0);
          if (active.length > 0) {
            while (!active.parent().hasClass("trx_addons_accordion")) {
              active = active.parent();
            }
            init = active.index();
            if (isNaN(init) || init < 0) init = 0;
          }
        } else {
          init = Math.max(0, init);
        }
        accordion.addClass("inited").accordion({
          active: init,
          collapsible: collapsible,
          header: headers,
          heightStyle: height_style,
          create: function (event, ui) {
            if (ui.panel.length > 0) {
              jQuery(document).trigger("action.init_hidden_elements", [
                ui.panel,
              ]);
            } else if (active !== false && active.length > 0) {
              active.find(">" + headers).trigger("click");
            }
          },
          activate: function (event, ui) {
            if (ui.newPanel.length > 0)
              jQuery(document).trigger("action.init_hidden_elements", [
                ui.newPanel,
              ]);
          },
        });
      });
    }
    var cp = container.find(".trx_addons_color_selector:not(.inited)"),
      cp_created = false;
    if (cp.length > 0) {
      cp.addClass("inited").each(function () {
        if (jQuery(this).hasClass("iColorPicker")) {
          if (!cp_created) {
            trx_addons_color_picker();
            cp_created = true;
          }
          trx_addons_change_field_colors(jQuery(this));
          jQuery(this)
            .on("focus", function (e) {
              trx_addons_color_picker_show(
                null,
                jQuery(this),
                function (fld, clr) {
                  fld.val(clr).trigger("change");
                  trx_addons_change_field_colors(fld);
                }
              );
            })
            .on("change", function (e) {
              trx_addons_change_field_colors(jQuery(this));
            });
        } else if (typeof jQuery.fn.wpColorPicker != "undefined") {
          jQuery(this).wpColorPicker({
            change: function (e, ui) {
              jQuery(e.target).val(ui.color).trigger("change");
            },
            clear: function (e) {
              jQuery(e.target).prev().trigger("change");
            },
          });
        }
      });
    }
    function trx_addons_change_field_colors(fld) {
      var clr = fld.val(),
        hsb = trx_addons_hex2hsb(clr);
      fld.css({ backgroundColor: clr, color: hsb["b"] < 70 ? "#fff" : "#000" });
    }
    if (
      jQuery.ui &&
      jQuery.ui.slider &&
      container.find(".trx_addons_range_slider:not(.inited)").length > 0
    ) {
      container.find(".trx_addons_range_slider:not(.inited)").each(function () {
        var range_slider = jQuery(this);
        var linked_field = range_slider.data("linked_field");
        if (linked_field === undefined)
          linked_field = range_slider.prev('input[type="hidden"]');
        else linked_field = jQuery("#" + linked_field);
        if (linked_field.length == 0) return;
        var range_slider_cur = range_slider.find(
          "> .trx_addons_range_slider_label_cur"
        );
        var range_slider_type = range_slider.data("range");
        if (range_slider_type === undefined) range_slider_type = "min";
        var values = linked_field.val().split(",");
        var minimum = range_slider.data("min");
        if (minimum === undefined) minimum = 0;
        var maximum = range_slider.data("max");
        if (maximum === undefined) maximum = 0;
        var step = range_slider.data("step");
        if (step === undefined) step = 1;
        var init_obj = {
          range: range_slider_type,
          min: minimum,
          max: maximum,
          step: step,
          slide: function (event, ui) {
            var cur_values =
              range_slider_type === "min" ? [ui.value] : ui.values;
            linked_field.val(cur_values.join(",")).trigger("change");
            for (var i = 0; i < cur_values.length; i++) {
              range_slider_cur
                .eq(i)
                .html(cur_values[i])
                .css(
                  "left",
                  Math.max(
                    0,
                    Math.min(
                      100,
                      ((cur_values[i] - minimum) * 100) / (maximum - minimum)
                    )
                  ) + "%"
                );
            }
          },
          create: function (event, ui) {
            for (var i = 0; i < values.length; i++) {
              range_slider_cur
                .eq(i)
                .html(values[i])
                .css(
                  "left",
                  Math.max(
                    0,
                    Math.min(
                      100,
                      ((values[i] - minimum) * 100) / (maximum - minimum)
                    )
                  ) + "%"
                );
            }
          },
        };
        if (range_slider_type === true) init_obj.values = values;
        else init_obj.value = values[0];
        range_slider.addClass("inited").slider(init_obj);
      });
    }
    if (jQuery.fn && jQuery.fn.select2) {
      container
        .find(".trx_addons_select2:not(.inited)")
        .addClass("inited")
        .select2();
    }
    jQuery(document).trigger("action.init_sliders", [container]);
    jQuery(document).trigger("action.init_shortcodes", [container]);
    if (
      container.find(
        ".trx_addons_video_player.with_cover .video_hover:not(.inited)"
      ).length > 0
    ) {
      container
        .find(".trx_addons_video_player.with_cover .video_hover:not(.inited)")
        .addClass("inited")
        .on("click", function (e) {
          if (jQuery(this).hasClass("trx_addons_popup_link")) return;
          jQuery(this)
            .parents(".trx_addons_video_player")
            .addClass("video_play")
            .find(".video_embed")
            .html(jQuery(this).data("video"));
          var slider = jQuery(this).parents(".slider_swiper");
          if (slider.length > 0) {
            var id = slider.attr("id");
            TRX_ADDONS_STORAGE["swipers"][id].stopAutoplay();
            id = slider.data("controller");
            if (id && TRX_ADDONS_STORAGE["swipers"][id + "_swiper"])
              TRX_ADDONS_STORAGE["swipers"][id + "_swiper"].stopAutoplay();
          }
          jQuery(document).trigger("action.init_hidden_elements", [
            jQuery(this).parents(".trx_addons_video_player"),
          ]);
          jQuery(window).trigger("resize");
          e.preventDefault();
          return false;
        });
    }
    if (TRX_ADDONS_STORAGE["popup_engine"] == "pretty") {
      container
        .find(
          "a[href$='jpg']:not(.inited),a[href$='jpeg']:not(.inited),a[href$='png']:not(.inited),a[href$='gif']:not(.inited)"
        )
        .each(function () {
          if (
            !jQuery(this)
              .parent()
              .hasClass("woocommerce-product-gallery__image")
          )
            jQuery(this).attr("rel", "prettyPhoto[slideshow]");
        });
      var images = container
        .find(
          "a[rel*='prettyPhoto']:not(.inited):not(.esgbox):not([data-rel*='pretty']):not([rel*='magnific']):not([data-rel*='magnific'])"
        )
        .addClass("inited");
      try {
        images.prettyPhoto({
          social_tools: "",
          theme: "facebook",
          deeplinking: false,
        });
      } catch (e) {}
    } else if (TRX_ADDONS_STORAGE["popup_engine"] == "magnific") {
      container
        .find(
          "a[href$='jpg']:not(.inited),a[href$='jpeg']:not(.inited),a[href$='png']:not(.inited),a[href$='gif']:not(.inited)"
        )
        .each(function () {
          if (jQuery(this).parents(".cq-dagallery").length == 0)
            jQuery(this).attr("rel", "magnific");
        });
      var images = container
        .find(
          "a[rel*='magnific']:not(.inited):not(.esgbox):not(.prettyphoto):not([rel*='pretty']):not([data-rel*='pretty'])"
        )
        .addClass("inited");
      setTimeout(function () {
        images.unbind("click.prettyphoto");
      }, 100);
      try {
        images.magnificPopup({
          type: "image",
          mainClass: "mfp-img-mobile",
          closeOnContentClick: true,
          closeBtnInside: true,
          fixedContentPos: true,
          midClick: true,
          preloader: true,
          tLoading: TRX_ADDONS_STORAGE["msg_magnific_loading"],
          gallery: { enabled: true },
          image: {
            tError: TRX_ADDONS_STORAGE["msg_magnific_error"],
            verticalFit: true,
          },
          zoom: {
            enabled: true,
            duration: 300,
            easing: "ease-in-out",
            opener: function (openerElement) {
              if (!openerElement.is("img")) {
                if (
                  openerElement.parents(".trx_addons_hover").find("img")
                    .length > 0
                )
                  openerElement = openerElement
                    .parents(".trx_addons_hover")
                    .find("img");
                else if (openerElement.find("img").length > 0)
                  openerElement = openerElement.find("img");
                else if (openerElement.siblings("img").length > 0)
                  openerElement = openerElement.siblings("img");
                else if (openerElement.parent().parent().find("img").length > 0)
                  openerElement = openerElement.parent().parent().find("img");
              }
              return openerElement;
            },
          },
          callbacks: {
            beforeClose: function () {
              jQuery(".mfp-figure figcaption").hide();
              jQuery(".mfp-figure .mfp-arrow").hide();
            },
          },
        });
      } catch (e) {}
      container
        .find(".trx_addons_popup_link:not(.popup_inited)")
        .addClass("popup_inited")
        .magnificPopup({
          type: "inline",
          focus: "input",
          closeBtnInside: true,
          callbacks: {
            open: function () {
              if (jQuery(this.content).data("popup-content") === undefined)
                jQuery(this.content).data(
                  "popup-content",
                  jQuery(this.content).html()
                );
              else
                jQuery(this.content).html(
                  jQuery(this.content).data("popup-content")
                );
              jQuery(document).trigger("action.init_hidden_elements", [
                jQuery(this.content),
              ]);
              jQuery(document).trigger("action.init_popup_elements", [
                jQuery(this.content),
              ]);
              var frame = jQuery(this.content).find(".video_frame");
              if (frame.length > 0) {
                frame.find("> iframe").each(function () {
                  var src = jQuery(this).attr("src");
                  if (
                    src.indexOf("youtube") >= 0 ||
                    src.indexOf("vimeo") >= 0
                  ) {
                    jQuery(this).attr(
                      "src",
                      trx_addons_add_to_url(src, { autoplay: 1 })
                    );
                  }
                });
              }
              var frame = jQuery(this.content).find(".esg-grid");
              if (frame.length > 0) {
                var wrappers = [
                  ".esg-tc.eec",
                  ".esg-lc.eec",
                  ".esg-rc.eec",
                  ".esg-cc.eec",
                  ".esg-bc.eec",
                ];
                for (var i = 0; i < wrappers.length; i++) {
                  frame.find(wrappers[i] + ">" + wrappers[i]).unwrap();
                }
              }
            },
            close: function () {
              jQuery(this.content).empty();
            },
            resize: function () {
              trx_addons_resize_actions();
            },
          },
        });
    }
    if (
      container.find(
        "a.post_counters_likes:not(.inited),a.comment_counters_likes:not(.inited)"
      ).length > 0
    ) {
      container
        .find(
          "a.post_counters_likes:not(.inited),a.comment_counters_likes:not(.inited)"
        )
        .addClass("inited")
        .on("click", function (e) {
          var button = jQuery(this);
          var inc = button.hasClass("enabled") ? 1 : -1;
          var post_id = button.hasClass("post_counters_likes")
            ? button.data("postid")
            : button.data("commentid");
          var cookie_likes = trx_addons_get_cookie(
            button.hasClass("post_counters_likes")
              ? "trx_addons_likes"
              : "trx_addons_comment_likes"
          );
          if (cookie_likes === undefined || cookie_likes === null)
            cookie_likes = "";
          jQuery
            .post(TRX_ADDONS_STORAGE["ajax_url"], {
              action: button.hasClass("post_counters_likes")
                ? "post_counter"
                : "comment_counter",
              nonce: TRX_ADDONS_STORAGE["ajax_nonce"],
              post_id: post_id,
              likes: inc,
            })
            .done(function (response) {
              var rez = {};
              try {
                rez = JSON.parse(response);
              } catch (e) {
                rez = { error: TRX_ADDONS_STORAGE["msg_ajax_error"] };
                console.log(response);
              }
              if (rez.error === "") {
                var counter = rez.counter;
                if (inc == 1) {
                  var title = button.data("title-dislike");
                  button
                    .removeClass("enabled trx_addons_icon-heart-empty")
                    .addClass("disabled trx_addons_icon-heart");
                  cookie_likes +=
                    (cookie_likes.substr(-1) != "," ? "," : "") + post_id + ",";
                } else {
                  var title = button.data("title-like");
                  button
                    .removeClass("disabled trx_addons_icon-heart")
                    .addClass("enabled trx_addons_icon-heart-empty");
                  cookie_likes = cookie_likes.replace("," + post_id + ",", ",");
                }
                button
                  .data("likes", counter)
                  .attr("title", title)
                  .find(
                    button.hasClass("post_counters_likes")
                      ? ".post_counters_number"
                      : ".comment_counters_number"
                  )
                  .html(counter);
                trx_addons_set_cookie(
                  button.hasClass("post_counters_likes")
                    ? "trx_addons_likes"
                    : "trx_addons_comment_likes",
                  cookie_likes,
                  365
                );
              } else {
                alert(TRX_ADDONS_STORAGE["msg_error_like"]);
              }
            });
          e.preventDefault();
          return false;
        });
    }
    if (container.find(".trx_addons_emotions:not(.inited)").length > 0) {
      container
        .find(".trx_addons_emotions:not(.inited)")
        .addClass("inited")
        .on("click", ".trx_addons_emotions_item", function (e) {
          var button = jQuery(this);
          var button_active = button
            .parent()
            .find(".trx_addons_emotions_active");
          var post_id = button.data("postid");
          jQuery
            .post(TRX_ADDONS_STORAGE["ajax_url"], {
              action: "post_counter",
              nonce: TRX_ADDONS_STORAGE["ajax_nonce"],
              post_id: post_id,
              emotion_inc: button.data("slug"),
              emotion_dec:
                button_active.length > 0 ? button_active.data("slug") : "",
            })
            .done(function (response) {
              var rez = {};
              try {
                rez = JSON.parse(response);
              } catch (e) {
                rez = { error: TRX_ADDONS_STORAGE["msg_ajax_error"] };
                console.log(response);
              }
              if (rez.error === "") {
                var cookie_likes = trx_addons_get_cookie("trx_addons_emotions"),
                  cookie_likes_new = ",";
                if (cookie_likes) {
                  cookie_likes = cookie_likes.split(",");
                  for (var i = 0; i < cookie_likes.length; i++) {
                    if (cookie_likes[i] == "") continue;
                    var tmp = cookie_likes[i].split("=");
                    if (tmp[0] != post_id)
                      cookie_likes_new += cookie_likes[i] + ",";
                  }
                }
                cookie_likes = cookie_likes_new;
                if (button_active.length > 0) {
                  button_active.removeClass("trx_addons_emotions_active");
                }
                if (
                  button_active.length == 0 ||
                  button.data("slug") != button_active.data("slug")
                ) {
                  button.addClass("trx_addons_emotions_active");
                  cookie_likes +=
                    (cookie_likes.substr(-1) != "," ? "," : "") +
                    post_id +
                    "=" +
                    button.data("slug") +
                    ",";
                }
                for (var i in rez.counter)
                  button
                    .parent()
                    .find(
                      '[data-slug="' + i + '"] .trx_addons_emotions_item_number'
                    )
                    .html(rez.counter[i]);
                trx_addons_set_cookie("trx_addons_emotions", cookie_likes, 365);
              } else {
                alert(TRX_ADDONS_STORAGE["msg_error_like"]);
              }
            });
          e.preventDefault();
          return false;
        });
    }
    if (
      container.find(".socials_share .socials_caption:not(.inited)").length > 0
    ) {
      container
        .find(".socials_share .socials_caption:not(.inited)")
        .each(function () {
          jQuery(this)
            .addClass("inited")
            .on("click", function (e) {
              jQuery(this).siblings(".social_items").slideToggle();
              e.preventDefault();
              return false;
            });
        });
    }
    if (
      container.find(".socials_share .social_items:not(.inited)").length > 0
    ) {
      container
        .find(".socials_share .social_items:not(.inited)")
        .each(function () {
          jQuery(this)
            .addClass("inited")
            .on("click", ".social_item_popup", function (e) {
              var url = jQuery(this).data("link");
              window.open(
                url,
                "_blank",
                "scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=480, height=400, toolbar=0, status=0"
              );
              e.preventDefault();
              return false;
            });
        });
    }
    container.find(".widget ul > li").each(function () {
      if (jQuery(this).find("ul").length > 0) {
        jQuery(this).addClass("has_children");
      }
    });
    container
      .find(".widget_archive a:not(.inited)")
      .addClass("inited")
      .each(function () {
        var val = jQuery(this).html().split(" ");
        if (val.length > 1) {
          val[val.length - 1] = "<span>" + val[val.length - 1] + "</span>";
          jQuery(this).html(val.join(" "));
        }
      });
    jQuery(".sc_layouts_menu_nav").each(function () {
      if (
        jQuery(this).find(".current-menu-item").length == 0 ||
        jQuery("body").hasClass("blog_template")
      ) {
        if (TRX_ADDONS_STORAGE["menu_cache"] === undefined)
          TRX_ADDONS_STORAGE["menu_cache"] = [];
        var id = jQuery(this).attr("id");
        if (id === undefined) {
          id = ("sc_layouts_menu_nav_" + Math.random()).replace(".", "");
          jQuery(this).attr("id", id);
        }
        TRX_ADDONS_STORAGE["menu_cache"].push("#" + id);
      }
    });
    if (
      TRX_ADDONS_STORAGE["menu_cache"] &&
      TRX_ADDONS_STORAGE["menu_cache"].length > 0
    ) {
      var href = window.location.href;
      if (href.substr(-1) == "/") href = href.substr(0, href.length - 1);
      var href2 = href + "/";
      for (var i = 0; i < TRX_ADDONS_STORAGE["menu_cache"].length; i++) {
        var menu = jQuery(
          TRX_ADDONS_STORAGE["menu_cache"][i] + ":not(.prepared)"
        );
        if (menu.length == 0) continue;
        menu.addClass("prepared");
        menu
          .find("li")
          .removeClass(
            "current-menu-ancestor current-menu-parent current-menu-item current_page_item"
          );
        menu
          .find('a[href="' + href + '"],a[href="' + href2 + '"]')
          .each(function (idx) {
            var li = jQuery(this).parent();
            li.addClass("current-menu-item");
            if (li.hasClass("menu-item-object-page"))
              li.addClass("current_page_item");
            var cnt = 0;
            while ((li = li.parents("li")).length > 0) {
              cnt++;
              li.addClass(
                "current-menu-ancestor" +
                  (cnt == 1 ? " current-menu-parent" : "")
              );
            }
          });
      }
    }
    container
      .find(".trx_addons_scroll_to_top:not(.inited)")
      .addClass("inited")
      .on("click", function (e) {
        jQuery("html,body").animate({ scrollTop: 0 }, "slow");
        e.preventDefault();
        return false;
      });
    jQuery(document).trigger("action.before_ready_trx_addons");
    jQuery(document).trigger("action.ready_trx_addons");
    jQuery(document).trigger("action.after_ready_trx_addons");
  }
  if (TRX_ADDONS_STORAGE["ajax_views"]) {
    jQuery(document).on("action.ready_trx_addons", function () {
      if (!TRX_ADDONS_STORAGE["post_views_counter_inited"]) {
        TRX_ADDONS_STORAGE["post_views_counter_inited"] = true;
        setTimeout(function () {
          jQuery
            .post(TRX_ADDONS_STORAGE["ajax_url"], {
              action: "post_counter",
              nonce: TRX_ADDONS_STORAGE["ajax_nonce"],
              post_id: TRX_ADDONS_STORAGE["post_id"],
              views: 1,
            })
            .done(function (response) {
              var rez = {};
              try {
                rez = JSON.parse(response);
              } catch (e) {
                rez = { error: TRX_ADDONS_STORAGE["ajax_error"] };
                console.log(response);
              }
              if (rez.error === "") {
                jQuery(
                  ".post_counters_single .post_counters_views .post_counters_number,.sc_layouts_title_meta .post_counters_views .post_counters_number"
                ).html(rez.counter);
              }
            });
        }, 10);
      }
    });
  }
  function trx_addons_scroll_actions() {
    var scroll_offset = jQuery(window).scrollTop();
    var scroll_to_top_button = jQuery(".trx_addons_scroll_to_top");
    var adminbar_height = Math.max(0, jQuery("#wpadminbar").height());
    if (scroll_to_top_button.length > 0) {
      if (scroll_offset > 100) scroll_to_top_button.addClass("show");
      else scroll_to_top_button.removeClass("show");
    }
    jQuery('[data-animation^="animated"]:not(.animated)').each(function () {
      if (jQuery(this).offset().top < scroll_offset + jQuery(window).height())
        jQuery(this).addClass(jQuery(this).data("animation"));
    });
    jQuery(document).trigger("action.scroll_trx_addons");
  }
  function trx_addons_resize_actions(cont) {
    if (cont === undefined) cont = jQuery("body");
    jQuery(document).trigger("action.resize_vc_row_start", [cont]);
    trx_addons_resize_video(cont);
    jQuery(document).trigger("action.resize_trx_addons", [cont]);
    jQuery(document).trigger("action.resize_vc_row_end", [cont]);
  }
  function trx_addons_resize_video(cont) {
    if (cont === undefined) cont = jQuery("body");
    cont.find("video").each(function () {
      if (
        jQuery(this)
          .addClass("trx_addons_resize")
          .parents("div:hidden,section:hidden,article:hidden").length > 0
      ) {
        return;
      }
      var video = jQuery(this).eq(0);
      var ratio =
        video.data("ratio") != undefined
          ? video.data("ratio").split(":")
          : [16, 9];
      ratio =
        ratio.length != 2 || ratio[0] == 0 || ratio[1] == 0
          ? 16 / 9
          : ratio[0] / ratio[1];
      var mejs_cont = video.parents(".mejs-video");
      var w_attr = video.data("width");
      var h_attr = video.data("height");
      if (!w_attr || !h_attr) {
        w_attr = video.attr("width");
        h_attr = video.attr("height");
        if (!w_attr || !h_attr) return;
        video.data({ width: w_attr, height: h_attr });
      }
      var percent = ("" + w_attr).substr(-1) == "%";
      w_attr = parseInt(w_attr, 10);
      h_attr = parseInt(h_attr, 10);
      var w_real = Math.round(
          mejs_cont.length > 0
            ? Math.min(
                percent ? 10000 : w_attr,
                mejs_cont.parents("div,article").width()
              )
            : Math.min(
                percent ? 10000 : w_attr,
                video.parents("div,article").width()
              )
        ),
        h_real = Math.round(
          percent ? w_real / ratio : (w_real / w_attr) * h_attr
        );
      if (parseInt(video.attr("data-last-width"), 10) == w_real) return;
      if (percent) {
        video.height(h_real);
      } else if (video.parents(".wp-video-playlist").length > 0) {
        if (mejs_cont.length === 0) {
          video.attr({ width: w_real, height: h_real });
        }
      } else {
        video
          .attr({ width: w_real, height: h_real })
          .css({ width: w_real + "px", height: h_real + "px" });
        if (mejs_cont.length > 0) {
          trx_addons_set_mejs_player_dimensions(video, w_real, h_real);
        }
      }
      video.attr("data-last-width", w_real);
    });
    cont.find(".video_frame iframe").each(function () {
      if (
        jQuery(this)
          .addClass("trx_addons_resize")
          .parents("div:hidden,section:hidden,article:hidden").length > 0
      ) {
        return;
      }
      var iframe = jQuery(this).eq(0);
      if (iframe.attr("src").indexOf("soundcloud") > 0) return;
      var ratio =
        iframe.data("ratio") != undefined
          ? iframe.data("ratio").split(":")
          : iframe.parent().data("ratio") != undefined
          ? iframe.parent().data("ratio").split(":")
          : iframe.find("[data-ratio]").length > 0
          ? iframe.find("[data-ratio]").data("ratio").split(":")
          : [16, 9];
      ratio =
        ratio.length != 2 || ratio[0] == 0 || ratio[1] == 0
          ? 16 / 9
          : ratio[0] / ratio[1];
      var w_attr = iframe.attr("width");
      var h_attr = iframe.attr("height");
      if (!w_attr || !h_attr) {
        return;
      }
      var percent = ("" + w_attr).substr(-1) == "%";
      w_attr = parseInt(w_attr, 10);
      h_attr = parseInt(h_attr, 10);
      var pw = iframe.parent().width(),
        ph = iframe.parent().height(),
        w_real = pw,
        h_real = Math.round(
          percent ? w_real / ratio : (w_real / w_attr) * h_attr
        );
      if (iframe.parent().css("position") == "absolute" && h_real > ph) {
        h_real = ph;
        w_real = Math.round(
          percent ? h_real * ratio : (h_real * w_attr) / h_attr
        );
      }
      if (parseInt(iframe.attr("data-last-width"), 10) == w_real) return;
      iframe.css({ width: w_real + "px", height: h_real + "px" });
      iframe.attr("data-last-width", w_real);
    });
  }
  function trx_addons_set_mejs_player_dimensions(video, w, h) {
    if (mejs) {
      for (var pl in mejs.players) {
        if (mejs.players[pl].media.src == video.attr("src")) {
          if (mejs.players[pl].media.setVideoSize) {
            mejs.players[pl].media.setVideoSize(w, h);
          } else if (mejs.players[pl].media.setSize) {
            mejs.players[pl].media.setSize(w, h);
          }
          mejs.players[pl].setPlayerSize(w, h);
          mejs.players[pl].setControlsSize();
        }
      }
    }
  }
});
jQuery(document).on("action.ready_trx_addons", function () {
  "use strict";
  jQuery("form.trx_addons_popup_form_login:not(.inited)")
    .addClass("inited")
    .submit(function (e) {
      var rez = trx_addons_login_validate(jQuery(this));
      if (!rez) e.preventDefault();
      return rez;
    });
  jQuery("form.trx_addons_popup_form_register:not(.inited)")
    .addClass("inited")
    .submit(function (e) {
      var rez = trx_addons_registration_validate(jQuery(this));
      if (!rez) e.preventDefault();
      return rez;
    });
  function trx_addons_login_validate(form) {
    form.find("input").removeClass("trx_addons_field_error");
    var error = trx_addons_form_validate(form, {
      error_message_time: 4000,
      exit_after_first_error: true,
      rules: [
        {
          field: "log",
          min_length: {
            value: 1,
            message: TRX_ADDONS_STORAGE["msg_login_empty"],
          },
          max_length: {
            value: 60,
            message: TRX_ADDONS_STORAGE["msg_login_long"],
          },
        },
        {
          field: "pwd",
          min_length: {
            value: 1,
            message: TRX_ADDONS_STORAGE["msg_password_empty"],
          },
          max_length: {
            value: 60,
            message: TRX_ADDONS_STORAGE["msg_password_long"],
          },
        },
      ],
    });
    if (TRX_ADDONS_STORAGE["login_via_ajax"] && !error) {
      jQuery
        .post(TRX_ADDONS_STORAGE["ajax_url"], {
          action: "trx_addons_login_user",
          nonce: TRX_ADDONS_STORAGE["ajax_nonce"],
          redirect_to:
            form.find('input[name="redirect_to"]').length == 1
              ? form.find('input[name="redirect_to"]').val()
              : "",
          remember: form.find('input[name="rememberme"]').val(),
          user_log: form.find('input[name="log"]').val(),
          user_pwd: form.find('input[name="pwd"]').val(),
        })
        .done(function (response) {
          var rez = {};
          try {
            rez = JSON.parse(response);
          } catch (e) {
            rez = { error: TRX_ADDONS_STORAGE["msg_ajax_error"] };
            console.log(response);
          }
          var result = form
            .find(".trx_addons_message_box")
            .toggleClass("trx_addons_message_box_error", false)
            .toggleClass("trx_addons_message_box_success", false);
          if (rez.error === "") {
            result
              .addClass("trx_addons_message_box_success")
              .html(TRX_ADDONS_STORAGE["msg_login_success"]);
            setTimeout(function () {
              if (rez.redirect_to != "") {
                location.href = rez.redirect_to;
              } else {
                location.reload();
              }
            }, 3000);
          } else {
            result
              .addClass("trx_addons_message_box_error")
              .html(
                TRX_ADDONS_STORAGE["msg_login_error"] +
                  (rez.error !== undefined ? "<br>" + rez.error : "")
              );
          }
          result.fadeIn().delay(3000).fadeOut();
        });
    }
    return !TRX_ADDONS_STORAGE["login_via_ajax"] && !error;
  }
  function trx_addons_registration_validate(form) {
    form.find("input").removeClass("trx_addons_field_error");
    var error = trx_addons_form_validate(form, {
      error_message_time: 4000,
      exit_after_first_error: true,
      rules: [
        {
          field: "agree",
          state: {
            value: "checked",
            message: TRX_ADDONS_STORAGE["msg_not_agree"],
          },
        },
        {
          field: "log",
          min_length: {
            value: 1,
            message: TRX_ADDONS_STORAGE["msg_login_empty"],
          },
          max_length: {
            value: 60,
            message: TRX_ADDONS_STORAGE["msg_login_long"],
          },
        },
        {
          field: "email",
          min_length: {
            value: 7,
            message: TRX_ADDONS_STORAGE["msg_email_not_valid"],
          },
          max_length: {
            value: 60,
            message: TRX_ADDONS_STORAGE["msg_email_long"],
          },
          mask: {
            value: TRX_ADDONS_STORAGE["email_mask"],
            message: TRX_ADDONS_STORAGE["msg_email_not_valid"],
          },
        },
        {
          field: "pwd",
          min_length: {
            value: 4,
            message: TRX_ADDONS_STORAGE["msg_password_empty"],
          },
          max_length: {
            value: 60,
            message: TRX_ADDONS_STORAGE["msg_password_long"],
          },
        },
        {
          field: "pwd2",
          equal_to: {
            value: "pwd",
            message: TRX_ADDONS_STORAGE["msg_password_not_equal"],
          },
        },
      ],
    });
    if (!error) {
      jQuery
        .post(TRX_ADDONS_STORAGE["ajax_url"], {
          action: "trx_addons_registration_user",
          nonce: TRX_ADDONS_STORAGE["ajax_nonce"],
          redirect_to:
            form.find('input[name="redirect_to"]').length == 1
              ? form.find('input[name="redirect_to"]').val()
              : "",
          user_name: form.find('input[name="log"]').val(),
          user_email: form.find('input[name="email"]').val(),
          user_pwd: form.find('input[name="pwd"]').val(),
        })
        .done(function (response) {
          var rez = {};
          try {
            rez = JSON.parse(response);
          } catch (e) {
            rez = { error: TRX_ADDONS_STORAGE["msg_ajax_error"] };
            console.log(response);
          }
          var result = form
            .find(".trx_addons_message_box")
            .toggleClass("trx_addons_message_box_error", false)
            .toggleClass("trx_addons_message_box_success", false);
          if (rez.error === "") {
            result
              .addClass("trx_addons_message_box_success")
              .html(TRX_ADDONS_STORAGE["msg_registration_success"]);
            setTimeout(function () {
              if (rez.redirect_to != "") {
                location.href = rez.redirect_to;
              } else {
                jQuery(
                  "#trx_addons_login_popup .trx_addons_tabs_title_login > a"
                ).trigger("click");
              }
            }, 3000);
          } else {
            result
              .addClass("trx_addons_message_box_error")
              .html(
                TRX_ADDONS_STORAGE["msg_registration_error"] +
                  (rez.error !== undefined ? "<br>" + rez.error : "")
              );
          }
          result.fadeIn().delay(3000).fadeOut();
        });
    }
    return false;
  }
});
(function () {
  "use strict";
  function trx_addons_sc_fullheight(e, container) {
    if (container === undefined) container = jQuery("body");
    if (
      container === undefined ||
      container.length === undefined ||
      container.length == 0
    )
      return;
    container.find(".trx_addons_stretch_height").each(function () {
      var fullheight_item = jQuery(this);
      if (jQuery(this).parents("div:hidden,article:hidden").length > 0) {
        return;
      }
      var wh = 0;
      var fullheight_row = jQuery(this).parents(".vc_row-o-full-height");
      if (fullheight_row.length > 0) {
        wh =
          fullheight_row.css("height") != "auto"
            ? fullheight_row.height()
            : "auto";
      } else {
        if (jQuery(window).height() > 1000) {
          var adminbar = jQuery("#wpadminbar");
          wh =
            jQuery(window).height() -
            (adminbar.length > 0 ? adminbar.height() : 0);
        } else wh = "auto";
      }
      if (wh == "auto" || wh > 0) fullheight_item.height(wh);
    });
  }
  jQuery(document).on("action.resize_trx_addons", trx_addons_sc_equalheight);
  function trx_addons_sc_equalheight(e, container) {
    if (container === undefined) container = jQuery("body");
    if (
      container === undefined ||
      container.length === undefined ||
      container.length == 0
    )
      return;
    container
      .find("[data-equal-height],.trx_addons_equal_height")
      .each(function () {
        var eh_wrap = jQuery(this);
        var eh_items_selector = eh_wrap.data("equal-height");
        if (eh_items_selector === undefined) eh_items_selector = ">*";
        var max_h = 0;
        var items = [];
        var row_y = 0;
        var i = 0;
        eh_wrap.find(eh_items_selector).each(function () {
          var el = jQuery(this);
          el.css("visibility", "hidden").height("auto");
          var el_height = el.height();
          var el_offset = el.offset().top;
          if (row_y == 0) row_y = el_offset;
          if (row_y < el_offset) {
            if (items.length > 0) {
              if (max_h > 0) {
                for (i = 0; i < items.length; i++)
                  items[i].css("visibility", "visible").height(max_h);
              }
              items = [];
              max_h = 0;
            }
            row_y = el_offset;
          }
          if (el_height > max_h) max_h = el_height;
          items.push(el);
        });
        if (items.length > 0 && max_h > 0) {
          for (i = 0; i < items.length; i++)
            items[i].css("visibility", "visible").height(max_h);
        }
      });
  }
  jQuery(document).on("action.ready_trx_addons", function () {
    "use strict";
    jQuery(".sc_post_details_popup:not(.inited)")
      .addClass("inited")
      .on("click", "a", function (e) {
        trx_addons_show_post_details(
          jQuery(this).parents("[data-post_id]"),
          true
        );
        e.preventDefault();
        return false;
      });
    if (jQuery(".sc_post_details_popup.inited").length > 0) {
      jQuery("body:not(.sc_post_details_popup_inited)")
        .addClass("sc_post_details_popup_inited")
        .on(
          "click",
          "#trx_addons_post_details_popup_overlay, .trx_addons_post_details_popup_close",
          function (e) {
            jQuery("#trx_addons_post_details_popup").fadeOut();
            jQuery("#trx_addons_post_details_popup_overlay").fadeOut();
          }
        )
        .on(
          "click",
          ".trx_addons_post_details_popup_prev,.trx_addons_post_details_popup_next",
          function (e) {
            var popup = jQuery("#trx_addons_post_details_popup");
            var post_item = popup.data("post_item");
            if (!post_item || post_item.length == 0) return;
            var posts_items = post_item
              .parents(".sc_item_columns,.sc_item_slider")
              .find("[data-post_id]");
            var cur_idx = -1;
            posts_items.each(function (idx) {
              if (jQuery(this).data("post_id") == post_item.data("post_id"))
                cur_idx = idx;
            });
            if (cur_idx == -1) return;
            post_item = jQuery(this).hasClass(
              "trx_addons_post_details_popup_prev"
            )
              ? cur_idx > 0
                ? posts_items.eq(cur_idx - 1)
                : false
              : cur_idx < posts_items.length - 1
              ? posts_items.eq(cur_idx + 1)
              : false;
            if (!post_item || post_item.length == 0) return;
            popup.fadeOut();
            trx_addons_show_post_details(post_item, false);
          }
        );
    }
    function trx_addons_show_post_details(post_item, show_overlay) {
      jQuery
        .post(TRX_ADDONS_STORAGE["ajax_url"], {
          action: "trx_addons_post_details_in_popup",
          nonce: TRX_ADDONS_STORAGE["ajax_nonce"],
          post_id: post_item.data("post_id"),
          post_type: post_item.data("post_type"),
        })
        .done(function (response) {
          var rez = {};
          if (response == "" || response == 0) {
            rez = { error: TRX_ADDONS_STORAGE["msg_ajax_error"] };
          } else {
            try {
              rez = JSON.parse(response);
            } catch (e) {
              rez = { error: TRX_ADDONS_STORAGE["msg_ajax_error"] };
              console.log(response);
            }
          }
          var msg = rez.error === "" ? rez.data : rez.error;
          var popup = jQuery("#trx_addons_post_details_popup");
          var overlay = jQuery("#trx_addons_post_details_popup_overlay");
          if (popup.length == 0) {
            jQuery("body").append(
              '<div id="trx_addons_post_details_popup_overlay"></div>' +
                '<div id="trx_addons_post_details_popup">' +
                '<div class="trx_addons_post_details_content"></div>' +
                '<span class="trx_addons_post_details_popup_close trx_addons_icon-cancel"></span>' +
                '<span class="trx_addons_post_details_popup_prev trx_addons_icon-left"></span>' +
                '<span class="trx_addons_post_details_popup_next trx_addons_icon-right"></span>' +
                "</div>"
            );
            popup = jQuery("#trx_addons_post_details_popup");
            overlay = jQuery("#trx_addons_post_details_popup_overlay");
          }
          popup
            .data("post_item", post_item)
            .find(".trx_addons_post_details_content")
            .html(msg);
          if (show_overlay) overlay.fadeIn();
          popup.fadeIn();
        });
    }
  });
})();
(function () {
  "use strict";
  jQuery(document).on("action.init_shortcodes", trx_addons_js_composer_init);
  jQuery(document).on(
    "action.init_hidden_elements",
    trx_addons_js_composer_init
  );
  function trx_addons_js_composer_init(e, container) {
    if (container === undefined) container = jQuery("body");
    if (container.length === undefined || container.length == 0) return;
    container
      .find(".vc_message_box_closeable:not(.inited)")
      .addClass("inited")
      .on("click", function (e) {
        jQuery(this).fadeOut();
        e.preventDefault();
        return false;
      });
  }
  jQuery(document).on(
    "action.resize_trx_addons",
    trx_addons_js_composer_fix_column
  );
  jQuery(document).on(
    "action.scroll_trx_addons",
    trx_addons_js_composer_fix_column
  );
  function trx_addons_js_composer_fix_column(e, cont) {
    if (cont === undefined) cont = jQuery("body");
    cont.find(".vc_column_fixed").each(function () {
      var col = jQuery(this),
        row = col.parent();
      if (
        col.attr("class").indexOf("vc_col-lg-") != -1 ||
        col.attr("class").indexOf("vc_col-md-") != -1
      ) {
        return;
      } else if (jQuery(window).width() < 768) {
        var old_style = col.data("old_style");
        if (old_style !== undefined)
          col.attr("style", old_style).removeAttr("data-old_style");
      } else {
        var col_height = col.outerHeight();
        var row_height = row.outerHeight();
        var row_top = row.offset().top;
        var scroll_offset = jQuery(window).scrollTop();
        var top_panel_fixed_height = trx_addons_fixed_rows_height();
        if (
          col_height < row_height &&
          scroll_offset + top_panel_fixed_height > row_top
        ) {
          var col_init = { position: "undefined", top: "auto", bottom: "auto" };
          if (typeof TRX_ADDONS_STORAGE["scroll_offset_last"] == "undefined") {
            TRX_ADDONS_STORAGE["col_top_last"] = row_top;
            TRX_ADDONS_STORAGE["scroll_offset_last"] = scroll_offset;
            TRX_ADDONS_STORAGE["scroll_dir_last"] = 1;
          }
          var scroll_dir =
            scroll_offset - TRX_ADDONS_STORAGE["scroll_offset_last"];
          if (scroll_dir == 0)
            scroll_dir = TRX_ADDONS_STORAGE["scroll_dir_last"];
          else scroll_dir = scroll_dir > 0 ? 1 : -1;
          var col_big =
              col_height + 30 >=
              jQuery(window).height() - top_panel_fixed_height,
            col_top = col.offset().top;
          if (col_top < 0) col_top = TRX_ADDONS_STORAGE["col_top_last"];
          if (col_big) {
            if (
              scroll_dir != TRX_ADDONS_STORAGE["scroll_dir_last"] &&
              col.css("position") == "fixed"
            ) {
              col_init.top = col_top - row_top;
              col_init.position = "absolute";
            } else if (scroll_dir > 0) {
              if (
                scroll_offset + jQuery(window).height() >=
                row_top + row_height + 30
              ) {
                col_init.bottom = 0;
                col_init.position = "absolute";
              } else if (
                scroll_offset + jQuery(window).height() >=
                (col.css("position") == "absolute" ? col_top : row_top) +
                  col_height +
                  30
              ) {
                col_init.bottom = 30;
                col_init.position = "fixed";
              }
            } else {
              if (scroll_offset + top_panel_fixed_height <= col_top) {
                col_init.top = top_panel_fixed_height;
                col_init.position = "fixed";
              }
            }
          } else {
            if (
              scroll_offset + top_panel_fixed_height >=
              row_top + row_height - col_height
            ) {
              col_init.bottom = 0;
              col_init.position = "absolute";
            } else {
              col_init.top = top_panel_fixed_height;
              col_init.position = "fixed";
            }
          }
          if (col_init.position != "undefined") {
            if (!col.prev().hasClass("trx_addons_fixed_column_placeholder")) {
              col.before(
                '<div class="trx_addons_fixed_column_placeholder ' +
                  col.attr("class") +
                  '"></div>'
              );
              col.prev().removeClass("vc_column_fixed");
            }
            col_init.left =
              col_init.position == "fixed"
                ? col.prev().offset().left
                : col.prev().position().left;
            col_init.width = col.prev().width();
            if (
              col.css("position") != col_init.position ||
              TRX_ADDONS_STORAGE["scroll_dir_last"] != scroll_dir ||
              col.width() != col_init.width
            ) {
              if (col.data("old_style") === undefined) {
                var style = col.attr("style");
                if (!style) style = "";
                col.attr("data-old_style", style);
              }
              col.css(col_init);
            }
          }
          TRX_ADDONS_STORAGE["col_top_last"] = col_top;
          TRX_ADDONS_STORAGE["scroll_offset_last"] = scroll_offset;
          TRX_ADDONS_STORAGE["scroll_dir_last"] = scroll_dir;
        } else {
          var old_style = col.data("old_style");
          if (old_style !== undefined) {
            col.attr("style", old_style).removeAttr("data-old_style");
            if (col.prev().hasClass("trx_addons_fixed_column_placeholder"))
              col.prev().remove();
          }
        }
      }
    });
  }
})();
jQuery(document).on("action.ready_trx_addons", function () {
  "use strict";
  var rows = jQuery(".sc_layouts_row_fixed"),
    rows_always = jQuery(".sc_layouts_row_fixed_always");
  if (rows.length > 0) {
    rows.each(function () {
      if (!jQuery(this).next().hasClass("sc_layouts_row_fixed_placeholder"))
        jQuery(this).after(
          '<div class="sc_layouts_row_fixed_placeholder" style="background-color:' +
            jQuery(this).css("background-color") +
            ';"></div>'
        );
    });
    jQuery(document).on("action.scroll_trx_addons", function () {
      trx_addons_cpt_layouts_fix_rows(rows, rows_always, false);
    });
    jQuery(document).on("action.resize_trx_addons", function () {
      trx_addons_cpt_layouts_fix_rows(rows, rows_always, true);
    });
  }
  function trx_addons_cpt_layouts_fix_rows(rows, rows_always, resize) {
    if (jQuery(window).width() < 768) {
      rows.each(function () {
        if (!jQuery(this).hasClass("sc_layouts_row_fixed_always"))
          jQuery(this)
            .removeClass("sc_layouts_row_fixed_on")
            .css({ top: "auto" });
      });
      if (rows_always.length == 0) return;
      else rows = rows_always;
    }
    var scroll_offset = jQuery(window).scrollTop();
    var rows_offset = trx_addons_fixed_rows_height(true, false);
    rows.each(function () {
      var placeholder = jQuery(this).next();
      var offset = parseInt(
        jQuery(this).hasClass("sc_layouts_row_fixed_on")
          ? placeholder.offset().top
          : jQuery(this).offset().top,
        10
      );
      if (isNaN(offset)) offset = 0;
      if (scroll_offset + rows_offset <= offset) {
        if (jQuery(this).hasClass("sc_layouts_row_fixed_on")) {
          jQuery(this)
            .removeClass("sc_layouts_row_fixed_on")
            .css({ top: "auto" });
          jQuery(document).trigger("action.sc_layouts_row_fixed_off");
        }
      } else {
        var h = jQuery(this).outerHeight();
        if (!jQuery(this).hasClass("sc_layouts_row_fixed_on")) {
          if (rows_offset + h < jQuery(window).height() * 0.33) {
            placeholder.height(h);
            jQuery(this)
              .addClass("sc_layouts_row_fixed_on")
              .css({ top: rows_offset + "px" });
            h = jQuery(this).outerHeight();
            jQuery(document).trigger("action.sc_layouts_row_fixed_on");
          }
        } else if (
          resize &&
          jQuery(this).hasClass("sc_layouts_row_fixed_on") &&
          jQuery(this).offset().top != rows_offset
        ) {
          jQuery(this).css({ top: rows_offset + "px" });
        }
        rows_offset += h;
      }
    });
  }
});
jQuery(document).on("action.ready_trx_addons", function () {
  "use strict";
  jQuery(".sc_services_tabs:not(.inited)")
    .addClass("inited")
    .on(
      "click",
      ".sc_services_tabs_list_item:not(.sc_services_tabs_list_item_active)",
      function (e) {
        jQuery(this)
          .siblings()
          .removeClass("sc_services_tabs_list_item_active");
        jQuery(this).addClass("sc_services_tabs_list_item_active");
        var content = jQuery(this)
          .parent()
          .siblings(".sc_services_tabs_content");
        var items = content.find(".sc_services_item");
        content
          .find(".sc_services_item_active")
          .addClass("sc_services_item_flip")
          .removeClass("sc_services_item_active");
        items.eq(jQuery(this).index()).addClass("sc_services_item_active");
        setTimeout(function () {
          content
            .find(".sc_services_item_flip")
            .addClass("trx_addons_hidden")
            .removeClass("sc_services_item_flip");
          items.removeClass("sc_services_item_flipping");
          setTimeout(function () {
            items.removeClass("trx_addons_hidden");
          }, 600);
        }, 600);
        if (
          true ||
          (/Chrome/.test(navigator.userAgent) &&
            /Google Inc/.test(navigator.vendor))
        ) {
          setTimeout(function () {
            content
              .find(".sc_services_item_active")
              .addClass("sc_services_item_flipping");
          }, 250);
        }
        e.preventDefault();
        return false;
      }
    );
  jQuery(".sc_services_tabs_simple:not(.inited)")
    .addClass("inited")
    .on(
      "click",
      ".sc_services_tabs_list_item:not(.sc_services_tabs_list_item_active)",
      function (e) {
        jQuery(this)
          .siblings()
          .removeClass("sc_services_tabs_list_item_active");
        jQuery(this).addClass("sc_services_tabs_list_item_active");
        var content = jQuery(this)
          .parent()
          .siblings(".sc_services_tabs_content");
        var items = content.find(".sc_services_tabs_content_item");
        content
          .find(".sc_services_tabs_content_item_active")
          .addClass("sc_services_item_flip")
          .removeClass("sc_services_tabs_content_item_active");
        items
          .eq(jQuery(this).index())
          .addClass("sc_services_tabs_content_item_active");
        setTimeout(function () {
          content
            .find("sc_services_item_flip")
            .removeClass("sc_services_item_flip");
        }, 600);
        e.preventDefault();
        return false;
      }
    );
});
(function () {
  var j = false;
  window.JQClass = function () {};
  JQClass.classes = {};
  JQClass.extend = function extender(f) {
    var g = this.prototype;
    j = true;
    var h = new this();
    j = false;
    for (var i in f) {
      h[i] =
        typeof f[i] == "function" && typeof g[i] == "function"
          ? (function (d, e) {
              return function () {
                var b = this._super;
                this._super = function (a) {
                  return g[d].apply(this, a || []);
                };
                var c = e.apply(this, arguments);
                this._super = b;
                return c;
              };
            })(i, f[i])
          : f[i];
    }
    function JQClass() {
      if (!j && this._init) {
        this._init.apply(this, arguments);
      }
    }
    JQClass.prototype = h;
    JQClass.prototype.constructor = JQClass;
    JQClass.extend = extender;
    return JQClass;
  };
})();
(function ($) {
  JQClass.classes.JQPlugin = JQClass.extend({
    name: "plugin",
    defaultOptions: {},
    regionalOptions: {},
    _getters: [],
    _getMarker: function () {
      return "is-" + this.name;
    },
    _init: function () {
      $.extend(
        this.defaultOptions,
        (this.regionalOptions && this.regionalOptions[""]) || {}
      );
      var c = camelCase(this.name);
      $[c] = this;
      $.fn[c] = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        if ($[c]._isNotChained(a, b)) {
          return $[c][a].apply($[c], [this[0]].concat(b));
        }
        return this.each(function () {
          if (typeof a === "string") {
            if (a[0] === "_" || !$[c][a]) {
              throw "Unknown method: " + a;
            }
            $[c][a].apply($[c], [this].concat(b));
          } else {
            $[c]._attach(this, a);
          }
        });
      };
    },
    setDefaults: function (a) {
      $.extend(this.defaultOptions, a || {});
    },
    _isNotChained: function (a, b) {
      if (
        a === "option" &&
        (b.length === 0 || (b.length === 1 && typeof b[0] === "string"))
      ) {
        return true;
      }
      return $.inArray(a, this._getters) > -1;
    },
    _attach: function (a, b) {
      a = $(a);
      if (a.hasClass(this._getMarker())) {
        return;
      }
      a.addClass(this._getMarker());
      b = $.extend({}, this.defaultOptions, this._getMetadata(a), b || {});
      var c = $.extend(
        { name: this.name, elem: a, options: b },
        this._instSettings(a, b)
      );
      a.data(this.name, c);
      this._postAttach(a, c);
      this.option(a, b);
    },
    _instSettings: function (a, b) {
      return {};
    },
    _postAttach: function (a, b) {},
    _getMetadata: function (d) {
      try {
        var f = d.data(this.name.toLowerCase()) || "";
        f = f.replace(/'/g, '"');
        f = f.replace(/([a-zA-Z0-9]+):/g, function (a, b, i) {
          var c = f.substring(0, i).match(/"/g);
          return !c || c.length % 2 === 0 ? '"' + b + '":' : b + ":";
        });
        f = $.parseJSON("{" + f + "}");
        for (var g in f) {
          var h = f[g];
          if (typeof h === "string" && h.match(/^new Date\((.*)\)$/)) {
            f[g] = eval(h);
          }
        }
        return f;
      } catch (e) {
        return {};
      }
    },
    _getInst: function (a) {
      return $(a).data(this.name) || {};
    },
    option: function (a, b, c) {
      a = $(a);
      var d = a.data(this.name);
      if (!b || (typeof b === "string" && c == null)) {
        var e = (d || {}).options;
        return e && b ? e[b] : e;
      }
      if (!a.hasClass(this._getMarker())) {
        return;
      }
      var e = b || {};
      if (typeof b === "string") {
        e = {};
        e[b] = c;
      }
      this._optionsChanged(a, d, e);
      $.extend(d.options, e);
    },
    _optionsChanged: function (a, b, c) {},
    destroy: function (a) {
      a = $(a);
      if (!a.hasClass(this._getMarker())) {
        return;
      }
      this._preDestroy(a, this._getInst(a));
      a.removeData(this.name).removeClass(this._getMarker());
    },
    _preDestroy: function (a, b) {},
  });
  function camelCase(c) {
    return c.replace(/-([a-z])/g, function (a, b) {
      return b.toUpperCase();
    });
  }
  $.JQPlugin = {
    createPlugin: function (a, b) {
      if (typeof a === "object") {
        b = a;
        a = "JQPlugin";
      }
      a = camelCase(a);
      var c = camelCase(b.name);
      JQClass.classes[c] = JQClass.classes[a].extend(b);
      new JQClass.classes[c]();
    },
  };
})(jQuery);
(function ($) {
  var w = "countdown";
  var Y = 0;
  var O = 1;
  var W = 2;
  var D = 3;
  var H = 4;
  var M = 5;
  var S = 6;
  $.JQPlugin.createPlugin({
    name: w,
    defaultOptions: {
      until: null,
      since: null,
      timezone: null,
      serverSync: null,
      format: "dHMS",
      layout: "",
      compact: false,
      padZeroes: false,
      significant: 0,
      description: "",
      expiryUrl: "",
      expiryText: "",
      alwaysExpire: false,
      onExpiry: null,
      onTick: null,
      tickInterval: 1,
    },
    regionalOptions: {
      "": {
        labels: [
          "Years",
          "Months",
          "Weeks",
          "Days",
          "Hours",
          "Minutes",
          "Seconds",
        ],
        labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"],
        compactLabels: ["y", "m", "w", "d"],
        whichLabels: null,
        digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        timeSeparator: ":",
        isRTL: false,
      },
    },
    _getters: ["getTimes"],
    _rtlClass: w + "-rtl",
    _sectionClass: w + "-section",
    _amountClass: w + "-amount",
    _periodClass: w + "-period",
    _rowClass: w + "-row",
    _holdingClass: w + "-holding",
    _showClass: w + "-show",
    _descrClass: w + "-descr",
    _timerElems: [],
    _init: function () {
      var c = this;
      this._super();
      this._serverSyncs = [];
      var d =
        typeof Date.now == "function"
          ? Date.now
          : function () {
              return new Date().getTime();
            };
      var e = window.performance && typeof window.performance.now == "function";
      function timerCallBack(a) {
        var b =
          a < 1e12
            ? e
              ? performance.now() + performance.timing.navigationStart
              : d()
            : a || d();
        if (b - g >= 1000) {
          c._updateElems();
          g = b;
        }
        f(timerCallBack);
      }
      var f =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        null;
      var g = 0;
      if (!f || $.noRequestAnimationFrame) {
        $.noRequestAnimationFrame = null;
        setInterval(function () {
          c._updateElems();
        }, 980);
      } else {
        g =
          window.animationStartTime ||
          window.webkitAnimationStartTime ||
          window.mozAnimationStartTime ||
          window.oAnimationStartTime ||
          window.msAnimationStartTime ||
          d();
        f(timerCallBack);
      }
    },
    UTCDate: function (a, b, c, e, f, g, h, i) {
      if (typeof b == "object" && b.constructor == Date) {
        i = b.getMilliseconds();
        h = b.getSeconds();
        g = b.getMinutes();
        f = b.getHours();
        e = b.getDate();
        c = b.getMonth();
        b = b.getFullYear();
      }
      var d = new Date();
      d.setUTCFullYear(b);
      d.setUTCDate(1);
      d.setUTCMonth(c || 0);
      d.setUTCDate(e || 1);
      d.setUTCHours(f || 0);
      d.setUTCMinutes((g || 0) - (Math.abs(a) < 30 ? a * 60 : a));
      d.setUTCSeconds(h || 0);
      d.setUTCMilliseconds(i || 0);
      return d;
    },
    periodsToSeconds: function (a) {
      return (
        a[0] * 31557600 +
        a[1] * 2629800 +
        a[2] * 604800 +
        a[3] * 86400 +
        a[4] * 3600 +
        a[5] * 60 +
        a[6]
      );
    },
    resync: function () {
      var d = this;
      $("." + this._getMarker()).each(function () {
        var a = $.data(this, d.name);
        if (a.options.serverSync) {
          var b = null;
          for (var i = 0; i < d._serverSyncs.length; i++) {
            if (d._serverSyncs[i][0] == a.options.serverSync) {
              b = d._serverSyncs[i];
              break;
            }
          }
          if (b[2] == null) {
            var c = $.isFunction(a.options.serverSync)
              ? a.options.serverSync.apply(this, [])
              : null;
            b[2] = (c ? new Date().getTime() - c.getTime() : 0) - b[1];
          }
          if (a._since) {
            a._since.setMilliseconds(a._since.getMilliseconds() + b[2]);
          }
          a._until.setMilliseconds(a._until.getMilliseconds() + b[2]);
        }
      });
      for (var i = 0; i < d._serverSyncs.length; i++) {
        if (d._serverSyncs[i][2] != null) {
          d._serverSyncs[i][1] += d._serverSyncs[i][2];
          delete d._serverSyncs[i][2];
        }
      }
    },
    _instSettings: function (a, b) {
      return { _periods: [0, 0, 0, 0, 0, 0, 0] };
    },
    _addElem: function (a) {
      if (!this._hasElem(a)) {
        this._timerElems.push(a);
      }
    },
    _hasElem: function (a) {
      return $.inArray(a, this._timerElems) > -1;
    },
    _removeElem: function (b) {
      this._timerElems = $.map(this._timerElems, function (a) {
        return a == b ? null : a;
      });
    },
    _updateElems: function () {
      for (var i = this._timerElems.length - 1; i >= 0; i--) {
        this._updateCountdown(this._timerElems[i]);
      }
    },
    _optionsChanged: function (a, b, c) {
      if (c.layout) {
        c.layout = c.layout.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      }
      this._resetExtraLabels(b.options, c);
      var d = b.options.timezone != c.timezone;
      $.extend(b.options, c);
      this._adjustSettings(a, b, c.until != null || c.since != null || d);
      var e = new Date();
      if ((b._since && b._since < e) || (b._until && b._until > e)) {
        this._addElem(a[0]);
      }
      this._updateCountdown(a, b);
    },
    _updateCountdown: function (a, b) {
      a = a.jquery ? a : $(a);
      b = b || this._getInst(a);
      if (!b) {
        return;
      }
      a.html(this._generateHTML(b)).toggleClass(
        this._rtlClass,
        b.options.isRTL
      );
      if ($.isFunction(b.options.onTick)) {
        var c =
          b._hold != "lap"
            ? b._periods
            : this._calculatePeriods(
                b,
                b._show,
                b.options.significant,
                new Date()
              );
        if (
          b.options.tickInterval == 1 ||
          this.periodsToSeconds(c) % b.options.tickInterval == 0
        ) {
          b.options.onTick.apply(a[0], [c]);
        }
      }
      var d =
        b._hold != "pause" &&
        (b._since
          ? b._now.getTime() < b._since.getTime()
          : b._now.getTime() >= b._until.getTime());
      if (d && !b._expiring) {
        b._expiring = true;
        if (this._hasElem(a[0]) || b.options.alwaysExpire) {
          this._removeElem(a[0]);
          if ($.isFunction(b.options.onExpiry)) {
            b.options.onExpiry.apply(a[0], []);
          }
          if (b.options.expiryText) {
            var e = b.options.layout;
            b.options.layout = b.options.expiryText;
            this._updateCountdown(a[0], b);
            b.options.layout = e;
          }
          if (b.options.expiryUrl) {
            window.location = b.options.expiryUrl;
          }
        }
        b._expiring = false;
      } else if (b._hold == "pause") {
        this._removeElem(a[0]);
      }
    },
    _resetExtraLabels: function (a, b) {
      for (var n in b) {
        if (n.match(/[Ll]abels[02-9]|compactLabels1/)) {
          a[n] = b[n];
        }
      }
      for (var n in a) {
        if (
          n.match(/[Ll]abels[02-9]|compactLabels1/) &&
          typeof b[n] === "undefined"
        ) {
          a[n] = null;
        }
      }
    },
    _adjustSettings: function (a, b, c) {
      var d = null;
      for (var i = 0; i < this._serverSyncs.length; i++) {
        if (this._serverSyncs[i][0] == b.options.serverSync) {
          d = this._serverSyncs[i][1];
          break;
        }
      }
      if (d != null) {
        var e = b.options.serverSync ? d : 0;
        var f = new Date();
      } else {
        var g = $.isFunction(b.options.serverSync)
          ? b.options.serverSync.apply(a[0], [])
          : null;
        var f = new Date();
        var e = g ? f.getTime() - g.getTime() : 0;
        this._serverSyncs.push([b.options.serverSync, e]);
      }
      var h = b.options.timezone;
      h = h == null ? -f.getTimezoneOffset() : h;
      if (c || (!c && b._until == null && b._since == null)) {
        b._since = b.options.since;
        if (b._since != null) {
          b._since = this.UTCDate(h, this._determineTime(b._since, null));
          if (b._since && e) {
            b._since.setMilliseconds(b._since.getMilliseconds() + e);
          }
        }
        b._until = this.UTCDate(h, this._determineTime(b.options.until, f));
        if (e) {
          b._until.setMilliseconds(b._until.getMilliseconds() + e);
        }
      }
      b._show = this._determineShow(b);
    },
    _preDestroy: function (a, b) {
      this._removeElem(a[0]);
      a.empty();
    },
    pause: function (a) {
      this._hold(a, "pause");
    },
    lap: function (a) {
      this._hold(a, "lap");
    },
    resume: function (a) {
      this._hold(a, null);
    },
    toggle: function (a) {
      var b = $.data(a, this.name) || {};
      this[!b._hold ? "pause" : "resume"](a);
    },
    toggleLap: function (a) {
      var b = $.data(a, this.name) || {};
      this[!b._hold ? "lap" : "resume"](a);
    },
    _hold: function (a, b) {
      var c = $.data(a, this.name);
      if (c) {
        if (c._hold == "pause" && !b) {
          c._periods = c._savePeriods;
          var d = c._since ? "-" : "+";
          c[c._since ? "_since" : "_until"] = this._determineTime(
            d +
              c._periods[0] +
              "y" +
              d +
              c._periods[1] +
              "o" +
              d +
              c._periods[2] +
              "w" +
              d +
              c._periods[3] +
              "d" +
              d +
              c._periods[4] +
              "h" +
              d +
              c._periods[5] +
              "m" +
              d +
              c._periods[6] +
              "s"
          );
          this._addElem(a);
        }
        c._hold = b;
        c._savePeriods = b == "pause" ? c._periods : null;
        $.data(a, this.name, c);
        this._updateCountdown(a, c);
      }
    },
    getTimes: function (a) {
      var b = $.data(a, this.name);
      return !b
        ? null
        : b._hold == "pause"
        ? b._savePeriods
        : !b._hold
        ? b._periods
        : this._calculatePeriods(b, b._show, b.options.significant, new Date());
    },
    _determineTime: function (k, l) {
      var m = this;
      var n = function (a) {
        var b = new Date();
        b.setTime(b.getTime() + a * 1000);
        return b;
      };
      var o = function (a) {
        a = a.toLowerCase();
        var b = new Date();
        var c = b.getFullYear();
        var d = b.getMonth();
        var e = b.getDate();
        var f = b.getHours();
        var g = b.getMinutes();
        var h = b.getSeconds();
        var i = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
        var j = i.exec(a);
        while (j) {
          switch (j[2] || "s") {
            case "s":
              h += parseInt(j[1], 10);
              break;
            case "m":
              g += parseInt(j[1], 10);
              break;
            case "h":
              f += parseInt(j[1], 10);
              break;
            case "d":
              e += parseInt(j[1], 10);
              break;
            case "w":
              e += parseInt(j[1], 10) * 7;
              break;
            case "o":
              d += parseInt(j[1], 10);
              e = Math.min(e, m._getDaysInMonth(c, d));
              break;
            case "y":
              c += parseInt(j[1], 10);
              e = Math.min(e, m._getDaysInMonth(c, d));
              break;
          }
          j = i.exec(a);
        }
        return new Date(c, d, e, f, g, h, 0);
      };
      var p =
        k == null
          ? l
          : typeof k == "string"
          ? o(k)
          : typeof k == "number"
          ? n(k)
          : k;
      if (p) p.setMilliseconds(0);
      return p;
    },
    _getDaysInMonth: function (a, b) {
      return 32 - new Date(a, b, 32).getDate();
    },
    _normalLabels: function (a) {
      return a;
    },
    _generateHTML: function (c) {
      var d = this;
      c._periods = c._hold
        ? c._periods
        : this._calculatePeriods(c, c._show, c.options.significant, new Date());
      var e = false;
      var f = 0;
      var g = c.options.significant;
      var h = $.extend({}, c._show);
      for (var i = Y; i <= S; i++) {
        e |= c._show[i] == "?" && c._periods[i] > 0;
        h[i] = c._show[i] == "?" && !e ? null : c._show[i];
        f += h[i] ? 1 : 0;
        g -= c._periods[i] > 0 ? 1 : 0;
      }
      var j = [false, false, false, false, false, false, false];
      for (var i = S; i >= Y; i--) {
        if (c._show[i]) {
          if (c._periods[i]) {
            j[i] = true;
          } else {
            j[i] = g > 0;
            g--;
          }
        }
      }
      var k = c.options.compact ? c.options.compactLabels : c.options.labels;
      var l = c.options.whichLabels || this._normalLabels;
      var m = function (a) {
        var b = c.options["compactLabels" + l(c._periods[a])];
        return h[a]
          ? d._translateDigits(c, c._periods[a]) + (b ? b[a] : k[a]) + " "
          : "";
      };
      var n = c.options.padZeroes ? 2 : 1;
      var o = function (a) {
        var b = c.options["labels" + l(c._periods[a])];
        return (!c.options.significant && h[a]) ||
          (c.options.significant && j[a])
          ? '<span class="' +
              d._sectionClass +
              '">' +
              '<span class="' +
              d._amountClass +
              '">' +
              d._minDigits(c, c._periods[a], n) +
              "</span>" +
              '<span class="' +
              d._periodClass +
              '">' +
              (b ? b[a] : k[a]) +
              "</span></span>"
          : "";
      };
      return c.options.layout
        ? this._buildLayout(
            c,
            h,
            c.options.layout,
            c.options.compact,
            c.options.significant,
            j
          )
        : (c.options.compact
            ? '<span class="' +
              this._rowClass +
              " " +
              this._amountClass +
              (c._hold ? " " + this._holdingClass : "") +
              '">' +
              m(Y) +
              m(O) +
              m(W) +
              m(D) +
              (h[H] ? this._minDigits(c, c._periods[H], 2) : "") +
              (h[M]
                ? (h[H] ? c.options.timeSeparator : "") +
                  this._minDigits(c, c._periods[M], 2)
                : "") +
              (h[S]
                ? (h[H] || h[M] ? c.options.timeSeparator : "") +
                  this._minDigits(c, c._periods[S], 2)
                : "")
            : '<span class="' +
              this._rowClass +
              " " +
              this._showClass +
              (c.options.significant || f) +
              (c._hold ? " " + this._holdingClass : "") +
              '">' +
              o(Y) +
              o(O) +
              o(W) +
              o(D) +
              o(H) +
              o(M) +
              o(S)) +
            "</span>" +
            (c.options.description
              ? '<span class="' +
                this._rowClass +
                " " +
                this._descrClass +
                '">' +
                c.options.description +
                "</span>"
              : "");
    },
    _buildLayout: function (c, d, e, f, g, h) {
      var j = c.options[f ? "compactLabels" : "labels"];
      var k = c.options.whichLabels || this._normalLabels;
      var l = function (a) {
        return (c.options[
          (f ? "compactLabels" : "labels") + k(c._periods[a])
        ] || j)[a];
      };
      var m = function (a, b) {
        return c.options.digits[Math.floor(a / b) % 10];
      };
      var o = {
        desc: c.options.description,
        sep: c.options.timeSeparator,
        yl: l(Y),
        yn: this._minDigits(c, c._periods[Y], 1),
        ynn: this._minDigits(c, c._periods[Y], 2),
        ynnn: this._minDigits(c, c._periods[Y], 3),
        y1: m(c._periods[Y], 1),
        y10: m(c._periods[Y], 10),
        y100: m(c._periods[Y], 100),
        y1000: m(c._periods[Y], 1000),
        ol: l(O),
        on: this._minDigits(c, c._periods[O], 1),
        onn: this._minDigits(c, c._periods[O], 2),
        onnn: this._minDigits(c, c._periods[O], 3),
        o1: m(c._periods[O], 1),
        o10: m(c._periods[O], 10),
        o100: m(c._periods[O], 100),
        o1000: m(c._periods[O], 1000),
        wl: l(W),
        wn: this._minDigits(c, c._periods[W], 1),
        wnn: this._minDigits(c, c._periods[W], 2),
        wnnn: this._minDigits(c, c._periods[W], 3),
        w1: m(c._periods[W], 1),
        w10: m(c._periods[W], 10),
        w100: m(c._periods[W], 100),
        w1000: m(c._periods[W], 1000),
        dl: l(D),
        dn: this._minDigits(c, c._periods[D], 1),
        dnn: this._minDigits(c, c._periods[D], 2),
        dnnn: this._minDigits(c, c._periods[D], 3),
        d1: m(c._periods[D], 1),
        d10: m(c._periods[D], 10),
        d100: m(c._periods[D], 100),
        d1000: m(c._periods[D], 1000),
        hl: l(H),
        hn: this._minDigits(c, c._periods[H], 1),
        hnn: this._minDigits(c, c._periods[H], 2),
        hnnn: this._minDigits(c, c._periods[H], 3),
        h1: m(c._periods[H], 1),
        h10: m(c._periods[H], 10),
        h100: m(c._periods[H], 100),
        h1000: m(c._periods[H], 1000),
        ml: l(M),
        mn: this._minDigits(c, c._periods[M], 1),
        mnn: this._minDigits(c, c._periods[M], 2),
        mnnn: this._minDigits(c, c._periods[M], 3),
        m1: m(c._periods[M], 1),
        m10: m(c._periods[M], 10),
        m100: m(c._periods[M], 100),
        m1000: m(c._periods[M], 1000),
        sl: l(S),
        sn: this._minDigits(c, c._periods[S], 1),
        snn: this._minDigits(c, c._periods[S], 2),
        snnn: this._minDigits(c, c._periods[S], 3),
        s1: m(c._periods[S], 1),
        s10: m(c._periods[S], 10),
        s100: m(c._periods[S], 100),
        s1000: m(c._periods[S], 1000),
      };
      var p = e;
      for (var i = Y; i <= S; i++) {
        var q = "yowdhms".charAt(i);
        var r = new RegExp("\\{" + q + "<\\}([\\s\\S]*)\\{" + q + ">\\}", "g");
        p = p.replace(r, (!g && d[i]) || (g && h[i]) ? "$1" : "");
      }
      $.each(o, function (n, v) {
        var a = new RegExp("\\{" + n + "\\}", "g");
        p = p.replace(a, v);
      });
      return p;
    },
    _minDigits: function (a, b, c) {
      b = "" + b;
      if (b.length >= c) {
        return this._translateDigits(a, b);
      }
      b = "0000000000" + b;
      return this._translateDigits(a, b.substr(b.length - c));
    },
    _translateDigits: function (b, c) {
      return ("" + c).replace(/[0-9]/g, function (a) {
        return b.options.digits[a];
      });
    },
    _determineShow: function (a) {
      var b = a.options.format;
      var c = [];
      c[Y] = b.match("y") ? "?" : b.match("Y") ? "!" : null;
      c[O] = b.match("o") ? "?" : b.match("O") ? "!" : null;
      c[W] = b.match("w") ? "?" : b.match("W") ? "!" : null;
      c[D] = b.match("d") ? "?" : b.match("D") ? "!" : null;
      c[H] = b.match("h") ? "?" : b.match("H") ? "!" : null;
      c[M] = b.match("m") ? "?" : b.match("M") ? "!" : null;
      c[S] = b.match("s") ? "?" : b.match("S") ? "!" : null;
      return c;
    },
    _calculatePeriods: function (c, d, e, f) {
      c._now = f;
      c._now.setMilliseconds(0);
      var g = new Date(c._now.getTime());
      if (c._since) {
        if (f.getTime() < c._since.getTime()) {
          c._now = f = g;
        } else {
          f = c._since;
        }
      } else {
        g.setTime(c._until.getTime());
        if (f.getTime() > c._until.getTime()) {
          c._now = f = g;
        }
      }
      var h = [0, 0, 0, 0, 0, 0, 0];
      if (d[Y] || d[O]) {
        var i = this._getDaysInMonth(f.getFullYear(), f.getMonth());
        var j = this._getDaysInMonth(g.getFullYear(), g.getMonth());
        var k =
          g.getDate() == f.getDate() ||
          (g.getDate() >= Math.min(i, j) && f.getDate() >= Math.min(i, j));
        var l = function (a) {
          return (a.getHours() * 60 + a.getMinutes()) * 60 + a.getSeconds();
        };
        var m = Math.max(
          0,
          (g.getFullYear() - f.getFullYear()) * 12 +
            g.getMonth() -
            f.getMonth() +
            ((g.getDate() < f.getDate() && !k) || (k && l(g) < l(f)) ? -1 : 0)
        );
        h[Y] = d[Y] ? Math.floor(m / 12) : 0;
        h[O] = d[O] ? m - h[Y] * 12 : 0;
        f = new Date(f.getTime());
        var n = f.getDate() == i;
        var o = this._getDaysInMonth(
          f.getFullYear() + h[Y],
          f.getMonth() + h[O]
        );
        if (f.getDate() > o) {
          f.setDate(o);
        }
        f.setFullYear(f.getFullYear() + h[Y]);
        f.setMonth(f.getMonth() + h[O]);
        if (n) {
          f.setDate(o);
        }
      }
      var p = Math.floor((g.getTime() - f.getTime()) / 1000);
      var q = function (a, b) {
        h[a] = d[a] ? Math.floor(p / b) : 0;
        p -= h[a] * b;
      };
      q(W, 604800);
      q(D, 86400);
      q(H, 3600);
      q(M, 60);
      q(S, 1);
      if (p > 0 && !c._since) {
        var r = [1, 12, 4.3482, 7, 24, 60, 60];
        var s = S;
        var t = 1;
        for (var u = S; u >= Y; u--) {
          if (d[u]) {
            if (h[s] >= t) {
              h[s] = 0;
              p = 1;
            }
            if (p > 0) {
              h[u]++;
              p = 0;
              s = u;
              t = 1;
            }
          }
          t *= r[u];
        }
      }
      if (e) {
        for (var u = Y; u <= S; u++) {
          if (e && h[u]) {
            e--;
          } else if (!e) {
            h[u] = 0;
          }
        }
      }
      return h;
    },
  });
})(jQuery);
(function () {
  "use strict";
  jQuery(document).on(
    "action.init_hidden_elements",
    trx_addons_sc_countdown_init
  );
  jQuery(document).on("action.init_shortcodes", trx_addons_sc_countdown_init);
  function trx_addons_sc_countdown_init(e, container) {
    if (container === undefined) container = jQuery("body");
    container.find(".sc_countdown:not(.inited)").each(function () {
      jQuery(this).addClass("inited");
      var id = jQuery(this).attr("id");
      var curDate = new Date();
      var curDateTimeStr =
        curDate.getFullYear() +
        "-" +
        (curDate.getMonth() < 9 ? "0" : "") +
        (curDate.getMonth() + 1) +
        "-" +
        (curDate.getDate() < 10 ? "0" : "") +
        curDate.getDate() +
        " " +
        (curDate.getHours() < 10 ? "0" : "") +
        curDate.getHours() +
        ":" +
        (curDate.getMinutes() < 10 ? "0" : "") +
        curDate.getMinutes() +
        ":" +
        (curDate.getSeconds() < 10 ? "0" : "") +
        curDate.getSeconds();
      var interval = 1;
      var endDateStr = jQuery(this).data("date");
      var endDateParts = endDateStr.split("-");
      var endTimeStr = jQuery(this).data("time");
      var endTimeParts = endTimeStr.split(":");
      if (endTimeParts.length < 3) endTimeParts[2] = "00";
      var endDateTimeStr = endDateStr + " " + endTimeStr;
      if (curDateTimeStr < endDateTimeStr) {
        jQuery(this)
          .find(".sc_countdown_placeholder")
          .countdown({
            until: new Date(
              endDateParts[0],
              endDateParts[1] - 1,
              endDateParts[2],
              endTimeParts[0],
              endTimeParts[1],
              endTimeParts[2]
            ),
            tickInterval: interval,
            onTick: trx_addons_sc_countdown,
          });
      } else {
        jQuery(this)
          .find(".sc_countdown_placeholder")
          .countdown({
            since: new Date(
              endDateParts[0],
              endDateParts[1] - 1,
              endDateParts[2],
              endTimeParts[0],
              endTimeParts[1],
              endTimeParts[2]
            ),
            tickInterval: interval,
            onTick: trx_addons_sc_countdown,
          });
      }
    });
  }
  function trx_addons_sc_countdown(dt) {
    var counter = jQuery(this).parent();
    for (var i = 3; i < dt.length; i++) {
      var v = (dt[i] < 10 ? "0" : "") + dt[i];
      var item = counter.find(".sc_countdown_item").eq(i - 3);
      var digits = item.find(".sc_countdown_digits span").addClass("hide");
      for (var ch = v.length - 1; ch >= 0; ch--) {
        digits
          .eq(ch + (i == 3 && v.length < 3 ? 1 : 0))
          .removeClass("hide")
          .text(v.substr(ch, 1));
      }
      trx_addons_sc_countdown_update_canvas(item, dt[i]);
    }
  }
  function trx_addons_sc_countdown_update_canvas(item, value) {
    var canvas = item.find("canvas");
    if (canvas.length == 0) return;
    var digits = canvas.next();
    var brd = parseInt(digits.css("border-top-width"), 10);
    var w = Math.ceil(digits.width() + 2 * brd);
    var needRepaint = false;
    if (canvas.attr("width") != w) {
      needRepaint = true;
      canvas.attr({ width: w, height: w });
    }
    if (item.data("old-value") == value && !needRepaint) return;
    item.data("old-value", value);
    var percent = (value * 100) / canvas.data("max-value");
    var angle = (360 * percent) / 100;
    var Ar = (angle * Math.PI) / 180;
    var canvas_dom = canvas.get(0);
    var context = canvas_dom.getContext("2d");
    var r = (w - brd) / 2;
    var cx = w / 2;
    var cy = w / 2;
    context.beginPath();
    context.clearRect(0, 0, w, w);
    context.arc(cx, cy, r, 0, Ar, false);
    context.imageSmoothingEnabled = true;
    context.lineWidth = brd;
    context.strokeStyle = canvas.data("color");
    context.stroke();
  }
})();
jQuery(document).on("action.init_shortcodes", function (e, container) {
  "use strict";
  if (
    container.find(".sc_form_form:not(.sc_form_custom):not(.inited)").length > 0
  ) {
    container
      .find(".sc_form_form:not(.sc_form_custom):not(.inited)")
      .addClass("inited")
      .submit(function (e) {
        sc_form_validate(jQuery(this));
        e.preventDefault();
        return false;
      });
  }
  jQuery(
    'input[type="text"]:not(.fill_inited),input[type="number"]:not(.fill_inited),input[type="search"]:not(.fill_inited),input[type="password"]:not(.fill_inited),input[type="email"]:not(.fill_inited),textarea:not(.fill_inited),select:not(.fill_inited)'
  ).each(function () {
    var fld = jQuery(this);
    sc_form_mark_filled(fld);
    fld.addClass("fill_inited").on("blur change", function () {
      sc_form_mark_filled(jQuery(this));
      if (jQuery(this).hasClass("filled"))
        jQuery(this).removeClass("trx_addons_field_error wpcf7-not-valid");
    });
  });
  function sc_form_mark_filled(field) {
    if (field.val() != "") field.addClass("filled");
    else field.removeClass("filled");
  }
  function sc_form_validate(form) {
    var url = form.attr("action");
    if (url == "") return false;
    form.find("input").removeClass("trx_addons_error_field");
    var error = trx_addons_form_validate(form, {
      rules: [
        {
          field: "name",
          min_length: {
            value: 1,
            message: TRX_ADDONS_STORAGE["msg_field_name_empty"],
          },
        },
        {
          field: "email",
          min_length: {
            value: 1,
            message: TRX_ADDONS_STORAGE["msg_field_email_empty"],
          },
          mask: {
            value: TRX_ADDONS_STORAGE["email_mask"],
            message: TRX_ADDONS_STORAGE["msg_field_email_not_valid"],
          },
        },
        {
          field: "message",
          min_length: {
            value: 1,
            message: TRX_ADDONS_STORAGE["msg_field_text_empty"],
          },
        },
      ],
    });
    if (!error && url != "#") {
      jQuery
        .post(url, {
          action: "send_sc_form",
          nonce: TRX_ADDONS_STORAGE["ajax_nonce"],
          data: form.serialize(),
        })
        .done(function (response) {
          var rez = {};
          try {
            rez = JSON.parse(response);
          } catch (e) {
            rez = { error: TRX_ADDONS_STORAGE["msg_ajax_error"] };
            console.log(response);
          }
          var result = form
            .find(".trx_addons_message_box")
            .toggleClass("trx_addons_message_box_error", false)
            .toggleClass("trx_addons_message_box_success", false);
          if (rez.error === "") {
            form.get(0).reset();
            result
              .addClass("trx_addons_message_box_success")
              .html(TRX_ADDONS_STORAGE["msg_send_complete"]);
          } else {
            result
              .addClass("trx_addons_message_box_error")
              .html(TRX_ADDONS_STORAGE["msg_send_error"] + " " + rez.error);
          }
          result.fadeIn().delay(3000).fadeOut();
        });
    }
    return !error;
  }
});
("use strict");
(function (window, document) {
  "use strict";
  function Pathformer(element) {
    if (typeof element === "undefined") {
      throw new Error(
        'Pathformer [constructor]: "element" parameter is required'
      );
    }
    if (element.constructor === String) {
      element = document.getElementById(element);
      if (!element) {
        throw new Error(
          'Pathformer [constructor]: "element" parameter is not related to an existing ID'
        );
      }
    }
    if (
      element.constructor instanceof window.SVGElement ||
      /^svg$/i.test(element.nodeName)
    ) {
      this.el = element;
    } else {
      throw new Error(
        'Pathformer [constructor]: "element" parameter must be a string or a SVGelement'
      );
    }
    this.scan(element);
  }
  Pathformer.prototype.TYPES = [
    "line",
    "ellipse",
    "circle",
    "polygon",
    "polyline",
    "rect",
  ];
  Pathformer.prototype.ATTR_WATCH = [
    "cx",
    "cy",
    "points",
    "r",
    "rx",
    "ry",
    "x",
    "x1",
    "x2",
    "y",
    "y1",
    "y2",
  ];
  Pathformer.prototype.scan = function (svg) {
    var fn,
      element,
      pathData,
      pathDom,
      elements = svg.querySelectorAll(this.TYPES.join(","));
    for (var i = 0; i < elements.length; i++) {
      element = elements[i];
      fn = this[element.tagName.toLowerCase() + "ToPath"];
      pathData = fn(this.parseAttr(element.attributes));
      pathDom = this.pathMaker(element, pathData);
      element.parentNode.replaceChild(pathDom, element);
    }
  };
  Pathformer.prototype.lineToPath = function (element) {
    var newElement = {};
    newElement.d =
      "M" + element.x1 + "," + element.y1 + "L" + element.x2 + "," + element.y2;
    return newElement;
  };
  Pathformer.prototype.rectToPath = function (element) {
    var newElement = {},
      x = parseFloat(element.x) || 0,
      y = parseFloat(element.y) || 0,
      width = parseFloat(element.width) || 0,
      height = parseFloat(element.height) || 0;
    newElement.d = "M" + x + " " + y + " ";
    newElement.d += "L" + (x + width) + " " + y + " ";
    newElement.d += "L" + (x + width) + " " + (y + height) + " ";
    newElement.d += "L" + x + " " + (y + height) + " Z";
    return newElement;
  };
  Pathformer.prototype.polylineToPath = function (element) {
    var i, path;
    var newElement = {};
    var points = element.points.trim().split(" ");
    if (element.points.indexOf(",") === -1) {
      var formattedPoints = [];
      for (i = 0; i < points.length; i += 2) {
        formattedPoints.push(points[i] + "," + points[i + 1]);
      }
      points = formattedPoints;
    }
    path = "M" + points[0];
    for (i = 1; i < points.length; i++) {
      if (points[i].indexOf(",") !== -1) {
        path += "L" + points[i];
      }
    }
    newElement.d = path;
    return newElement;
  };
  Pathformer.prototype.polygonToPath = function (element) {
    var newElement = Pathformer.prototype.polylineToPath(element);
    newElement.d += "Z";
    return newElement;
  };
  Pathformer.prototype.ellipseToPath = function (element) {
    var startX = element.cx - element.rx,
      startY = element.cy;
    var endX = parseFloat(element.cx) + parseFloat(element.rx),
      endY = element.cy;
    var newElement = {};
    newElement.d =
      "M" +
      startX +
      "," +
      startY +
      "A" +
      element.rx +
      "," +
      element.ry +
      " 0,1,1 " +
      endX +
      "," +
      endY +
      "A" +
      element.rx +
      "," +
      element.ry +
      " 0,1,1 " +
      startX +
      "," +
      endY;
    return newElement;
  };
  Pathformer.prototype.circleToPath = function (element) {
    var newElement = {};
    var startX = element.cx - element.r,
      startY = element.cy;
    var endX = parseFloat(element.cx) + parseFloat(element.r),
      endY = element.cy;
    newElement.d =
      "M" +
      startX +
      "," +
      startY +
      "A" +
      element.r +
      "," +
      element.r +
      " 0,1,1 " +
      endX +
      "," +
      endY +
      "A" +
      element.r +
      "," +
      element.r +
      " 0,1,1 " +
      startX +
      "," +
      endY;
    return newElement;
  };
  Pathformer.prototype.pathMaker = function (element, pathData) {
    var i,
      attr,
      pathTag = document.createElementNS("http://www.w3.org/2000/svg", "path");
    for (i = 0; i < element.attributes.length; i++) {
      attr = element.attributes[i];
      if (this.ATTR_WATCH.indexOf(attr.name) === -1) {
        pathTag.setAttribute(attr.name, attr.value);
      }
    }
    for (i in pathData) {
      pathTag.setAttribute(i, pathData[i]);
    }
    return pathTag;
  };
  Pathformer.prototype.parseAttr = function (element) {
    var attr,
      output = {};
    for (var i = 0; i < element.length; i++) {
      attr = element[i];
      if (
        this.ATTR_WATCH.indexOf(attr.name) !== -1 &&
        attr.value.indexOf("%") !== -1
      ) {
        throw new Error(
          "Pathformer [parseAttr]: a SVG shape got values in percentage. This cannot be transformed into 'path' tags. Please use 'viewBox'."
        );
      }
      output[attr.name] = attr.value;
    }
    return output;
  };
  ("use strict");
  var requestAnimFrame, cancelAnimFrame, parsePositiveInt;
  function Vivus(element, options, callback) {
    this.isReady = false;
    this.setElement(element, options);
    this.setOptions(options);
    this.setCallback(callback);
    if (this.isReady) {
      this.init();
    }
  }
  Vivus.LINEAR = function (x) {
    return x;
  };
  Vivus.EASE = function (x) {
    return -Math.cos(x * Math.PI) / 2 + 0.5;
  };
  Vivus.EASE_OUT = function (x) {
    return 1 - Math.pow(1 - x, 3);
  };
  Vivus.EASE_IN = function (x) {
    return Math.pow(x, 3);
  };
  Vivus.EASE_OUT_BOUNCE = function (x) {
    var base = -Math.cos(x * (0.5 * Math.PI)) + 1,
      rate = Math.pow(base, 1.5),
      rateR = Math.pow(1 - x, 2),
      progress = -Math.abs(Math.cos(rate * (2.5 * Math.PI))) + 1;
    return 1 - rateR + progress * rateR;
  };
  Vivus.prototype.setElement = function (element, options) {
    if (typeof element === "undefined") {
      throw new Error('Vivus [constructor]: "element" parameter is required');
    }
    if (element.constructor === String) {
      element = document.getElementById(element);
      if (!element) {
        throw new Error(
          'Vivus [constructor]: "element" parameter is not related to an existing ID'
        );
      }
    }
    this.parentEl = element;
    if (options && options.file) {
      var objElm = document.createElement("object");
      objElm.setAttribute("type", "image/svg+xml");
      objElm.setAttribute("data", options.file);
      objElm.setAttribute("built-by-vivus", "true");
      element.appendChild(objElm);
      element = objElm;
    }
    switch (element.constructor) {
      case window.SVGSVGElement:
      case window.SVGElement:
        this.el = element;
        this.isReady = true;
        break;
      case window.HTMLObjectElement:
        var onLoad, self;
        self = this;
        onLoad = function (e) {
          if (self.isReady) {
            return;
          }
          self.el =
            element.contentDocument &&
            element.contentDocument.querySelector("svg");
          if (!self.el && e) {
            throw new Error(
              "Vivus [constructor]: object loaded does not contain any SVG"
            );
          } else if (self.el) {
            if (element.getAttribute("built-by-vivus")) {
              self.parentEl.insertBefore(self.el, element);
              self.parentEl.removeChild(element);
              self.el.setAttribute("width", "100%");
              self.el.setAttribute("height", "100%");
            }
            self.isReady = true;
            self.init();
            return true;
          }
        };
        if (!onLoad()) {
          element.addEventListener("load", onLoad);
        }
        break;
      default:
        throw new Error(
          'Vivus [constructor]: "element" parameter is not valid (or miss the "file" attribute)'
        );
    }
  };
  Vivus.prototype.setOptions = function (options) {
    var allowedTypes = [
      "delayed",
      "async",
      "oneByOne",
      "scenario",
      "scenario-sync",
    ];
    var allowedStarts = ["inViewport", "manual", "autostart"];
    if (options !== undefined && options.constructor !== Object) {
      throw new Error(
        'Vivus [constructor]: "options" parameter must be an object'
      );
    } else {
      options = options || {};
    }
    if (options.type && allowedTypes.indexOf(options.type) === -1) {
      throw new Error(
        "Vivus [constructor]: " +
          options.type +
          " is not an existing animation `type`"
      );
    } else {
      this.type = options.type || allowedTypes[0];
    }
    if (options.start && allowedStarts.indexOf(options.start) === -1) {
      throw new Error(
        "Vivus [constructor]: " +
          options.start +
          " is not an existing `start` option"
      );
    } else {
      this.start = options.start || allowedStarts[0];
    }
    this.isIE =
      window.navigator.userAgent.indexOf("MSIE") !== -1 ||
      window.navigator.userAgent.indexOf("Trident/") !== -1 ||
      window.navigator.userAgent.indexOf("Edge/") !== -1;
    this.duration = parsePositiveInt(options.duration, 120);
    this.delay = parsePositiveInt(options.delay, null);
    this.dashGap = parsePositiveInt(options.dashGap, 1);
    this.forceRender = options.hasOwnProperty("forceRender")
      ? !!options.forceRender
      : this.isIE;
    this.selfDestroy = !!options.selfDestroy;
    this.onReady = options.onReady;
    this.frameLength =
      this.currentFrame =
      this.map =
      this.delayUnit =
      this.speed =
      this.handle =
        null;
    this.ignoreInvisible = options.hasOwnProperty("ignoreInvisible")
      ? !!options.ignoreInvisible
      : false;
    this.animTimingFunction = options.animTimingFunction || Vivus.LINEAR;
    this.pathTimingFunction = options.pathTimingFunction || Vivus.LINEAR;
    if (this.delay >= this.duration) {
      throw new Error(
        "Vivus [constructor]: delay must be shorter than duration"
      );
    }
  };
  Vivus.prototype.setCallback = function (callback) {
    if (!!callback && callback.constructor !== Function) {
      throw new Error(
        'Vivus [constructor]: "callback" parameter must be a function'
      );
    }
    this.callback = callback || function () {};
  };
  Vivus.prototype.mapping = function () {
    var i, paths, path, pAttrs, pathObj, totalLength, lengthMeter, timePoint;
    timePoint = totalLength = lengthMeter = 0;
    paths = this.el.querySelectorAll("path");
    for (i = 0; i < paths.length; i++) {
      path = paths[i];
      if (this.isInvisible(path)) {
        continue;
      }
      pathObj = { el: path, length: Math.ceil(path.getTotalLength()) };
      if (isNaN(pathObj.length)) {
        if (window.console && console.warn) {
          console.warn(
            "Vivus [mapping]: cannot retrieve a path element length",
            path
          );
        }
        continue;
      }
      this.map.push(pathObj);
      path.style.strokeDasharray =
        pathObj.length + " " + (pathObj.length + this.dashGap * 2);
      path.style.strokeDashoffset = pathObj.length + this.dashGap;
      pathObj.length += this.dashGap;
      totalLength += pathObj.length;
      this.renderPath(i);
    }
    totalLength = totalLength === 0 ? 1 : totalLength;
    this.delay = this.delay === null ? this.duration / 3 : this.delay;
    this.delayUnit = this.delay / (paths.length > 1 ? paths.length - 1 : 1);
    for (i = 0; i < this.map.length; i++) {
      pathObj = this.map[i];
      switch (this.type) {
        case "delayed":
          pathObj.startAt = this.delayUnit * i;
          pathObj.duration = this.duration - this.delay;
          break;
        case "oneByOne":
          pathObj.startAt = (lengthMeter / totalLength) * this.duration;
          pathObj.duration = (pathObj.length / totalLength) * this.duration;
          break;
        case "async":
          pathObj.startAt = 0;
          pathObj.duration = this.duration;
          break;
        case "scenario-sync":
          path = pathObj.el;
          pAttrs = this.parseAttr(path);
          pathObj.startAt =
            timePoint +
            (parsePositiveInt(pAttrs["data-delay"], this.delayUnit) || 0);
          pathObj.duration = parsePositiveInt(
            pAttrs["data-duration"],
            this.duration
          );
          timePoint =
            pAttrs["data-async"] !== undefined
              ? pathObj.startAt
              : pathObj.startAt + pathObj.duration;
          this.frameLength = Math.max(
            this.frameLength,
            pathObj.startAt + pathObj.duration
          );
          break;
        case "scenario":
          path = pathObj.el;
          pAttrs = this.parseAttr(path);
          pathObj.startAt =
            parsePositiveInt(pAttrs["data-start"], this.delayUnit) || 0;
          pathObj.duration = parsePositiveInt(
            pAttrs["data-duration"],
            this.duration
          );
          this.frameLength = Math.max(
            this.frameLength,
            pathObj.startAt + pathObj.duration
          );
          break;
      }
      lengthMeter += pathObj.length;
      this.frameLength = this.frameLength || this.duration;
    }
  };
  Vivus.prototype.drawer = function () {
    var self = this;
    this.currentFrame += this.speed;
    if (this.currentFrame <= 0) {
      this.stop();
      this.reset();
      this.callback(this);
    } else if (this.currentFrame >= this.frameLength) {
      this.stop();
      this.currentFrame = this.frameLength;
      this.trace();
      if (this.selfDestroy) {
        this.destroy();
      }
      this.callback(this);
    } else {
      this.trace();
      this.handle = requestAnimFrame(function () {
        self.drawer();
      });
    }
  };
  Vivus.prototype.trace = function () {
    var i, progress, path, currentFrame;
    currentFrame =
      this.animTimingFunction(this.currentFrame / this.frameLength) *
      this.frameLength;
    for (i = 0; i < this.map.length; i++) {
      path = this.map[i];
      progress = (currentFrame - path.startAt) / path.duration;
      progress = this.pathTimingFunction(Math.max(0, Math.min(1, progress)));
      if (path.progress !== progress) {
        path.progress = progress;
        path.el.style.strokeDashoffset = Math.floor(
          path.length * (1 - progress)
        );
        this.renderPath(i);
      }
    }
  };
  Vivus.prototype.renderPath = function (index) {
    if (this.forceRender && this.map && this.map[index]) {
      var pathObj = this.map[index],
        newPath = pathObj.el.cloneNode(true);
      pathObj.el.parentNode.replaceChild(newPath, pathObj.el);
      pathObj.el = newPath;
    }
  };
  Vivus.prototype.init = function () {
    this.frameLength = 0;
    this.currentFrame = 0;
    this.map = [];
    new Pathformer(this.el);
    this.mapping();
    this.starter();
    if (this.onReady) {
      this.onReady(this);
    }
  };
  Vivus.prototype.starter = function () {
    switch (this.start) {
      case "manual":
        return;
      case "autostart":
        this.play();
        break;
      case "inViewport":
        var self = this,
          listener = function () {
            if (self.isInViewport(self.parentEl, 1)) {
              self.play();
              window.removeEventListener("scroll", listener);
            }
          };
        window.addEventListener("scroll", listener);
        listener();
        break;
    }
  };
  Vivus.prototype.getStatus = function () {
    return this.currentFrame === 0
      ? "start"
      : this.currentFrame === this.frameLength
      ? "end"
      : "progress";
  };
  Vivus.prototype.reset = function () {
    return this.setFrameProgress(0);
  };
  Vivus.prototype.finish = function () {
    return this.setFrameProgress(1);
  };
  Vivus.prototype.setFrameProgress = function (progress) {
    progress = Math.min(1, Math.max(0, progress));
    this.currentFrame = Math.round(this.frameLength * progress);
    this.trace();
    return this;
  };
  Vivus.prototype.play = function (speed) {
    if (speed && typeof speed !== "number") {
      throw new Error("Vivus [play]: invalid speed");
    }
    this.speed = speed || 1;
    if (!this.handle) {
      this.drawer();
    }
    return this;
  };
  Vivus.prototype.stop = function () {
    if (this.handle) {
      cancelAnimFrame(this.handle);
      this.handle = null;
    }
    return this;
  };
  Vivus.prototype.destroy = function () {
    this.stop();
    var i, path;
    for (i = 0; i < this.map.length; i++) {
      path = this.map[i];
      path.el.style.strokeDashoffset = null;
      path.el.style.strokeDasharray = null;
      this.renderPath(i);
    }
  };
  Vivus.prototype.isInvisible = function (el) {
    var rect,
      ignoreAttr = el.getAttribute("data-ignore");
    if (ignoreAttr !== null) {
      return ignoreAttr !== "false";
    }
    if (this.ignoreInvisible) {
      rect = el.getBoundingClientRect();
      return !rect.width && !rect.height;
    } else {
      return false;
    }
  };
  Vivus.prototype.parseAttr = function (element) {
    var attr,
      output = {};
    if (element && element.attributes) {
      for (var i = 0; i < element.attributes.length; i++) {
        attr = element.attributes[i];
        output[attr.name] = attr.value;
      }
    }
    return output;
  };
  Vivus.prototype.isInViewport = function (el, h) {
    var scrolled = this.scrollY(),
      viewed = scrolled + this.getViewportH(),
      elBCR = el.getBoundingClientRect(),
      elHeight = elBCR.height,
      elTop = scrolled + elBCR.top,
      elBottom = elTop + elHeight;
    h = h || 0;
    return elTop + elHeight * h <= viewed && elBottom >= scrolled;
  };
  Vivus.prototype.docElem = window.document.documentElement;
  Vivus.prototype.getViewportH = function () {
    var client = this.docElem.clientHeight,
      inner = window.innerHeight;
    if (client < inner) {
      return inner;
    } else {
      return client;
    }
  };
  Vivus.prototype.scrollY = function () {
    return window.pageYOffset || this.docElem.scrollTop;
  };
  requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  cancelAnimFrame = (function () {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      window.msCancelAnimationFrame ||
      function (id) {
        return window.clearTimeout(id);
      }
    );
  })();
  parsePositiveInt = function (value, defaultValue) {
    var output = parseInt(value, 10);
    return output >= 0 ? output : defaultValue;
  };
  if (typeof define === "function" && define.amd) {
    define([], function () {
      return Vivus;
    });
  } else if (typeof exports === "object") {
    module.exports = Vivus;
  } else {
    window.Vivus = Vivus;
  }
})(window, document);
jQuery(document).on("action.init_shortcodes", function (e, container) {
  "use strict";
  var time = 50;
  container.find(".sc_icon_type_svg:not(.inited)").each(function (idx) {
    var cont = jQuery(this);
    var id = cont.addClass("inited").attr("id");
    if (id === undefined) {
      id = "sc_icons_" + Math.random();
      id = id.replace(".", "");
    } else id += "_" + idx;
    cont.find("svg").attr("id", id);
    setTimeout(function () {
      cont.css("visibility", "visible");
      var obj = new Vivus(id, { type: "async", duration: 20 });
      cont.data("svg_obj", obj);
      cont.parent().hover(
        function () {
          cont.data("svg_obj").reset().play();
        },
        function () {}
      );
    }, time);
    time += 300;
  });
});
(function () {
  "use strict";
  jQuery(document).on("action.init_hidden_elements", trx_addons_sc_skills_init);
  jQuery(document).on("action.init_shortcodes", trx_addons_sc_skills_init);
  jQuery(document).on("action.scroll_trx_addons", trx_addons_sc_skills_init);
  jQuery(document).on("action.resize_trx_addons", trx_addons_sc_skills_resize);
  function trx_addons_sc_skills_init(e, container) {
    if (container === undefined) container = jQuery("body");
    var scrollPosition = jQuery(window).scrollTop() + jQuery(window).height();
    container.find(".sc_skills_item:not(.inited)").each(function () {
      var skillsItem = jQuery(this);
      if (jQuery(this).parents("div:hidden,article:hidden").length > 0) {
        return;
      }
      var scrollSkills = skillsItem.offset().top;
      if (scrollPosition > scrollSkills) {
        var init_ok = true;
        var skills = skillsItem.parents(".sc_skills").eq(0);
        var type = skills.data("type");
        var total =
          type == "pie" && skills.hasClass("sc_skills_compact_on")
            ? skillsItem.find(".sc_skills_data .pie")
            : skillsItem.find(".sc_skills_total").eq(0);
        var start = parseFloat(total.data("start"));
        var stop = parseFloat(total.data("stop"));
        var maximum = parseInt(total.data("max"), 10);
        var startPercent = Math.round((start / maximum) * 100);
        var stopPercent = Math.round((stop / maximum) * 100);
        var ed = total.data("ed");
        var speed = parseInt(total.data("speed"), 10);
        var step =
          start != parseInt(start, 10) || stop != parseInt(stop, 10)
            ? parseFloat(total.data("step"))
            : parseInt(total.data("step"), 10);
        var duration = parseInt(total.data("duration"), 10);
        if (isNaN(duration)) duration = Math.ceil(maximum / step) * speed;
        if (type == "bar") {
          var dir = skills.data("dir");
          var count = skillsItem.find(".sc_skills_count").eq(0);
          if (dir == "horizontal")
            count
              .css("width", startPercent + "%")
              .animate({ width: stopPercent + "%" }, duration);
          else if (dir == "vertical")
            count
              .css("height", startPercent + "%")
              .animate({ height: stopPercent + "%" }, duration);
          trx_addons_sc_skills_animate_counter(
            start,
            stop,
            speed,
            step,
            ed,
            total
          );
        } else if (type == "counter") {
          trx_addons_sc_skills_animate_counter(
            start,
            stop,
            speed,
            step,
            ed,
            total
          );
        } else if (type == "pie") {
          if (window.Chart) {
            var steps = parseInt(total.data("steps"), 10);
            var bg_color = total.data("bg_color");
            var border_color = total.data("border_color");
            var cutout = parseInt(total.data("cutout"), 10);
            var easing = total.data("easing");
            var options = {
              segmentShowStroke: border_color != "",
              segmentStrokeColor: border_color,
              segmentStrokeWidth: border_color != "" ? 1 : 0,
              percentageInnerCutout: cutout,
              animation:
                skillsItem.parents('.vc_row[data-vc-full-width="true"]')
                  .length == 0,
              animationSteps: steps,
              animationEasing: easing,
              animateRotate: true,
              animateScale:
                skillsItem.parents('.vc_row[data-vc-full-width="true"]')
                  .length == 0,
            };
            var pieData = [];
            total.each(function () {
              var color = jQuery(this).data("color");
              var stop = parseInt(jQuery(this).data("stop"), 10);
              var stopPercent = Math.round((stop / maximum) * 100);
              pieData.push({ value: stopPercent, color: color });
            });
            if (total.length == 1) {
              trx_addons_sc_skills_animate_counter(
                start,
                stop,
                Math.round(1500 / steps),
                step,
                ed,
                total
              );
              pieData.push({ value: 100 - stopPercent, color: bg_color });
            }
            var canvas = skillsItem.find("canvas");
            canvas
              .data("pie-data", pieData)
              .data("pie-options", options)
              .attr({ width: skillsItem.width(), height: skillsItem.width() })
              .css({ width: skillsItem.width(), height: skillsItem.height() });
            new Chart(canvas.get(0).getContext("2d")).Doughnut(
              pieData,
              options
            );
          } else init_ok = false;
        }
        if (init_ok) skillsItem.addClass("inited");
      }
    });
  }
  function trx_addons_sc_skills_animate_counter(
    start,
    stop,
    speed,
    step,
    ed,
    total
  ) {
    start = Math.min(stop, start + step);
    total.text(start + ed);
    if (start < stop) {
      setTimeout(function () {
        trx_addons_sc_skills_animate_counter(
          start,
          stop,
          speed,
          step,
          ed,
          total
        );
      }, speed);
    }
  }
  function trx_addons_sc_skills_resize() {
    jQuery(".sc_skills_pie canvas").each(function () {
      var canvas = jQuery(this);
      if (canvas.parents("div:hidden,article:hidden").length > 0) {
        return;
      }
      var skillsItem = canvas.parent();
      if (skillsItem.width() != canvas.width()) {
        var data = canvas.data("pie-data");
        var opt = canvas.data("pie-options");
        if (data === undefined || opt === undefined) return;
        canvas
          .empty()
          .attr({ width: skillsItem.width(), height: skillsItem.width() })
          .css({ width: skillsItem.width(), height: skillsItem.height() });
        opt.animation = false;
        new Chart(canvas.get(0).getContext("2d")).Doughnut(data, opt);
      }
    });
  }
})();
(function () {
  "use strict";
  jQuery(document).on("action.init_sliders", trx_addons_init_sliders);
  jQuery(document).on(
    "action.init_hidden_elements",
    trx_addons_init_hidden_sliders
  );
  function trx_addons_init_sliders(e, container) {
    if (container.find(".sc_slider_controller:not(.inited)").length > 0) {
      container.find(".sc_slider_controller:not(.inited)").each(function () {
        var controller = jQuery(this).addClass("inited");
        var slider_id = controller.data("slider-id");
        if (!slider_id) return;
        var controller_id = controller.attr("id");
        if (controller_id == undefined) {
          controller_id = "sc_slider_controller_" + Math.random();
          controller_id = controller_id.replace(".", "");
          controller.attr("id", controller_id);
        }
        jQuery("#" + slider_id + " .slider_container").attr(
          "data-controller",
          controller_id
        );
        var controller_style = controller.data("style");
        var controller_effect = controller.data("effect");
        var controller_direction = controller.data("direction");
        var controller_interval = controller.data("interval");
        var controller_height = controller.data("height");
        var controller_per_view = controller.data("slides-per-view");
        var controller_space = controller.data("slides-space");
        var controller_controls = controller.data("controls");
        var controller_html = "";
        jQuery("#" + slider_id + " .swiper-slide").each(function (idx) {
          var slide = jQuery(this);
          var image = slide.data("image");
          var title = slide.data("title");
          var cats = slide.data("cats");
          var date = slide.data("date");
          controller_html +=
            '<div class="slider-slide swiper-slide"' +
            ' style="' +
            (image !== undefined
              ? "background-image: url(" + image + ");"
              : "") +
            '"' +
            ">" +
            '<div class="sc_slider_controller_info">' +
            '<span class="sc_slider_controller_info_number">' +
            (idx < 9 ? "0" : "") +
            (idx + 1) +
            "</span>" +
            '<span class="sc_slider_controller_info_title">' +
            title +
            "</span>" +
            "</div>" +
            "</div>";
        });
        controller.html(
          '<div id="' +
            controller_id +
            '_outer"' +
            ' class="slider_outer slider_swiper_outer slider_style_controller' +
            " slider_outer_" +
            (controller_controls == 1
              ? "controls slider_outer_controls_side"
              : "nocontrols") +
            " slider_outer_nopagination" +
            " slider_outer_" +
            (controller_per_view == 1 ? "one" : "multi") +
            " slider_outer_direction_" +
            (controller_direction == "vertical" ? "vertical" : "horizontal") +
            '"' +
            ">" +
            '<div id="' +
            controller_id +
            '_swiper"' +
            ' class="slider_container slider_swiper swiper-slider-container' +
            " slider_" +
            (controller_controls == 1
              ? "controls slider_controls_side"
              : "nocontrols") +
            " slider_nopagination" +
            " slider_notitles" +
            " slider_noresize" +
            " slider_" +
            (controller_per_view == 1 ? "one" : "multi") +
            " slider_direction_" +
            (controller_direction == "vertical" ? "vertical" : "horizontal") +
            '"' +
            ' data-slides-min-width="100"' +
            ' data-controlled-slider="' +
            slider_id +
            '"' +
            ' data-direction="' +
            (controller_direction == "vertical" ? "vertical" : "horizontal") +
            '"' +
            (controller_effect !== undefined
              ? ' data-effect="' + controller_effect + '"'
              : "") +
            (controller_interval !== undefined
              ? ' data-interval="' + controller_interval + '"'
              : "") +
            (controller_per_view !== undefined
              ? ' data-slides-per-view="' + controller_per_view + '"'
              : "") +
            (controller_space !== undefined
              ? ' data-slides-space="' + controller_space + '"'
              : "") +
            (controller_height !== undefined
              ? ' style="height:' + controller_height + '"'
              : "") +
            ">" +
            '<div class="slider-wrapper swiper-wrapper">' +
            controller_html +
            "</div>" +
            "</div>" +
            (controller_controls == 1
              ? '<div class="slider_controls_wrap"><a class="slider_prev swiper-button-prev" href="#"></a><a class="slider_next swiper-button-next" href="#"></a></div>'
              : "") +
            "</div>"
        );
      });
    }
    if (container.find(".sc_slider_controls:not(.inited)").length > 0) {
      container.find(".sc_slider_controls:not(.inited)").each(function () {
        var controls = jQuery(this).addClass("inited");
        var slider_id = controls.data("slider-id");
        if (!slider_id) return;
        slider_id += "_swiper";
        if (jQuery("#" + slider_id).length == 0) return;
        controls.on("click", "a", function (e) {
          if (jQuery(this).hasClass("slider_next"))
            TRX_ADDONS_STORAGE["swipers"][slider_id].slideNext();
          else TRX_ADDONS_STORAGE["swipers"][slider_id].slidePrev();
          e.preventDefault();
          return false;
        });
        if (controls.find(".slider_progress_bar").length > 0) {
          var bar = controls.find(".slider_progress_bar");
          jQuery("#" + slider_id).on(
            "slider_init slide_change_start",
            function (e) {
              if (TRX_ADDONS_STORAGE["swipers"][slider_id]) {
                var s = TRX_ADDONS_STORAGE["swipers"][slider_id];
                var current =
                    jQuery(s.slides[s.activeIndex]).data("slide-number") + 1,
                  total = s.params.loop
                    ? Math.ceil(
                        (s.slides.length - s.loopedSlides * 2) /
                          s.params.slidesPerGroup
                      )
                    : s.snapGrid.length;
                if (total > 0)
                  bar.width(Math.ceil((current / total) * 100) + "%");
              }
            }
          );
          bar.parent().on("click", function (e) {
            var s = TRX_ADDONS_STORAGE["swipers"][slider_id];
            var total = s.params.loop
              ? Math.ceil(
                  (s.slides.length - s.loopedSlides * 2) /
                    s.params.slidesPerGroup
                )
              : s.snapGrid.length;
            var slide_number = Math.max(
              0,
              Math.min(
                total - 1,
                Math.floor((total * e.offsetX) / jQuery(this).width())
              )
            );
            var slide_idx = jQuery("#" + slider_id)
              .find('[data-slide-number="' + slide_number + '"]')
              .index();
            s.slideTo(slide_idx);
            e.preventDefault();
            return false;
          });
        }
      });
    }
    if (container.find(".slider_swiper:not(.inited)").length > 0) {
      container.find(".slider_swiper:not(.inited)").each(function () {
        if (jQuery(this).parents("div:hidden,article:hidden").length > 0)
          return;
        var slider = jQuery(this);
        var id = slider.attr("id");
        if (id == undefined) {
          id = "swiper_" + Math.random();
          id = id.replace(".", "");
          slider.attr("id", id);
        }
        var cont = slider.parent().hasClass("slider_swiper_outer")
          ? slider.parent().attr("id", id + "_outer")
          : slider;
        var cont_id = cont.attr("id");
        var is_controller = slider.parents(".sc_slider_controller").length > 0;
        var controller_id = slider.data("controller");
        slider.find(".swiper-slide").each(function (idx) {
          jQuery(this).attr("data-slide-number", idx);
        });
        slider
          .css({ display: "block", opacity: 0 })
          .addClass(id)
          .addClass("inited")
          .data("settings", { mode: "horizontal" });
        var direction = slider.data("direction");
        if (direction != "vertical") direction = "horizontal";
        var smw = slider.data("slides-min-width");
        if (smw === undefined) {
          smw = 180;
          slider.attr("data-slides-min-width", smw);
        }
        var spv = slider.data("slides-per-view");
        if (spv == undefined || slider.parents(".widget_nav_menu").length > 0) {
          spv = 1;
          slider.attr("data-slides-per-view", spv);
        }
        var width = slider.width();
        if (width == 0) width = slider.parent().width();
        if (direction == "horizontal") {
          if (width / spv < smw) spv = Math.max(1, Math.floor(width / smw));
        }
        var space = slider.data("slides-space");
        if (space == undefined) space = 0;
        var interval = slider.data("interval");
        if (interval === undefined)
          interval = Math.round(5000 * (1 + Math.random()));
        if (isNaN(interval)) interval = 0;
        if (TRX_ADDONS_STORAGE["swipers"] === undefined)
          TRX_ADDONS_STORAGE["swipers"] = {};
        TRX_ADDONS_STORAGE["swipers"][id] = new Swiper("." + id, {
          direction: direction,
          calculateHeight: !slider.hasClass("slider_height_fixed"),
          resizeReInit: true,
          autoResize: true,
          effect: slider.data("effect") ? slider.data("effect") : "slide",
          pagination: slider.hasClass("slider_pagination")
            ? "#" + cont_id + " .slider_pagination_wrap"
            : false,
          paginationClickable: slider.hasClass("slider_pagination")
            ? "#" + cont_id + " .slider_pagination_wrap"
            : false,
          paginationType:
            slider.hasClass("slider_pagination") && slider.data("pagination")
              ? slider.data("pagination")
              : "bullets",
          nextButton: slider.hasClass("slider_controls")
            ? "#" + cont_id + " .slider_next"
            : false,
          prevButton: slider.hasClass("slider_controls")
            ? "#" + cont_id + " .slider_prev"
            : false,
          autoplay:
            slider.hasClass("slider_noautoplay") || interval == 0
              ? false
              : parseInt(interval, 10),
          autoplayDisableOnInteraction: true,
          initialSlide: 0,
          slidesPerView: spv,
          loopedSlides: spv,
          spaceBetween: space,
          speed: 600,
          centeredSlides: false,
          loop: true,
          grabCursor: !is_controller,
          slideToClickedSlide: is_controller,
          touchRatio: is_controller ? 0.2 : 1,
          onSlideChangeStart: function (swiper) {
            cont
              .find(".slider_titles_outside_wrap .active")
              .removeClass("active")
              .fadeOut();
            var controlled_slider = jQuery(
              "#" +
                slider.data(
                  is_controller ? "controlled-slider" : "controller"
                ) +
                " .slider_swiper"
            );
            var controlled_id = controlled_slider.attr("id");
            if (
              TRX_ADDONS_STORAGE["swipers"][controlled_id] &&
              jQuery("#" + controlled_id).attr("data-busy") != 1
            ) {
              slider.attr("data-busy", 1);
              setTimeout(function () {
                slider.attr("data-busy", 0);
              }, 300);
              var slide_number = jQuery(swiper.slides[swiper.activeIndex]).data(
                "slide-number"
              );
              var slide_idx = controlled_slider
                .find('[data-slide-number="' + slide_number + '"]')
                .index();
              TRX_ADDONS_STORAGE["swipers"][controlled_id].slideTo(slide_idx);
            }
            slider.trigger("slide_change_start");
          },
          onSlideChangeEnd: function (swiper) {
            var slide_number = jQuery(swiper.slides[swiper.activeIndex]).data(
              "slide-number"
            );
            var titles = cont.find(".slider_titles_outside_wrap .slide_info");
            if (titles.length > 0) {
              titles.eq(slide_number).addClass("active").fadeIn(300);
            }
            cont
              .find(".swiper-pagination-custom > span")
              .removeClass("swiper-pagination-button-active")
              .eq(slide_number)
              .addClass("swiper-pagination-button-active");
            cont
              .find(".trx_addons_video_player.with_cover.video_play")
              .removeClass("video_play")
              .find(".video_embed")
              .empty();
            slider.attr("data-busy", 0);
            slider.trigger("slide_change_end");
          },
        });
        slider.trigger("slider_init");
        cont
          .find(".swiper-pagination-custom")
          .on("click", ">span", function (e) {
            jQuery(this)
              .siblings()
              .removeClass("swiper-pagination-button-active");
            var t =
              jQuery(this).addClass("swiper-pagination-button-active").index() *
              TRX_ADDONS_STORAGE["swipers"][id].params.slidesPerGroup;
            TRX_ADDONS_STORAGE["swipers"][id].params.loop &&
              (t += TRX_ADDONS_STORAGE["swipers"][id].loopedSlides),
              TRX_ADDONS_STORAGE["swipers"][id].slideTo(t);
            e.preventDefault();
            return false;
          });
        slider.attr("data-busy", 1).animate({ opacity: 1 }, "fast");
        setTimeout(function () {
          slider.attr("data-busy", 0);
          trx_addons_set_controller_height(controller_id, slider);
        }, 300);
        jQuery(window).trigger("scroll");
      });
    }
    if (container.find(".slider_elastistack:not(.inited)").length > 0) {
      container.find(".slider_elastistack:not(.inited)").each(function () {
        if (jQuery(this).parents("div:hidden,article:hidden").length > 0)
          return;
        var slider = jQuery(this);
        var id = slider.attr("id");
        if (id == undefined) {
          id = "elastistack_" + Math.random();
          id = id.replace(".", "");
          slider.attr("id", id);
        }
        var cont = slider.parent().hasClass("slider_outer")
          ? slider.parent().attr("id", id + "_outer")
          : slider;
        var cont_id = cont.attr("id");
        var images = slider.find("ul.stack__images").attr("id", id + "_images");
        var images_id = images.attr("id");
        slider
          .css({ display: "block", opacity: 0 })
          .addClass(id)
          .addClass("inited")
          .data("settings", { mode: "horizontal" });
        trx_addons_resize_sliders(e, cont);
        var stack = new ElastiStack(images.get(0), {
          onUpdateStack: function (idx) {
            var titles = cont.find(".slider_titles_outside_wrap");
            if (titles.length > 0) {
              titles.find(".active").removeClass("active").hide();
              titles.find(".slide_info").eq(idx).addClass("active").fadeIn(300);
            }
            cont
              .find(".trx_addons_video_player.with_cover.video_play")
              .removeClass("video_play")
              .find(".video_embed")
              .empty();
            slider.trigger("slide_change_end");
          },
        });
        cont.find(".slider_next").on("click", function (e) {
          stack.nextItem({ transform: "translate3d(0, -60px, 400px)" });
          e.preventDefault();
          return false;
        });
        cont
          .find(".slider_titles_outside_wrap .slide_info")
          .eq(0)
          .addClass("active")
          .fadeIn(300);
        slider.animate({ opacity: 1 }, "fast", function () {
          stack._setStackStyle();
        });
      });
    }
  }
  function trx_addons_init_hidden_sliders(e, container) {
    trx_addons_init_sliders(e, container);
    trx_addons_resize_sliders(e, container);
  }
  jQuery(document).on("action.resize_trx_addons", trx_addons_resize_sliders);
  function trx_addons_resize_sliders(e, container) {
    if (container === undefined) container = jQuery("body");
    container.find(".slider_container.inited").each(function () {
      var slider = jQuery(this);
      if (slider.parents("div:hidden,article:hidden").length > 0) return;
      var id = slider.attr("id");
      var direction = slider.data("direction");
      if (direction != "vertical") direction = "horizontal";
      var slider_width = slider.width();
      var last_width = slider.data("last-width");
      if (isNaN(last_width)) last_width = 0;
      if (last_width == 0 || last_width != slider_width) {
        if (direction != "vertical") slider.data("last-width", slider_width);
        var on_resize = false;
        var spv = slider.data("slides-per-view");
        if (spv == undefined || slider.parents(".widget_nav_menu").length > 0) {
          spv = 1;
        }
        if (slider.hasClass("slider_swiper")) {
          if (
            TRX_ADDONS_STORAGE["swipers"][id].params.slidesPerView != "auto"
          ) {
            if (direction == "horizontal") {
              var smw = slider.data("slides-min-width");
              if (slider_width / spv < smw) {
                spv = Math.max(1, Math.floor(slider_width / smw));
              }
              if (
                TRX_ADDONS_STORAGE["swipers"][id].params.slidesPerView != spv
              ) {
                TRX_ADDONS_STORAGE["swipers"][id].params.slidesPerView = spv;
                TRX_ADDONS_STORAGE["swipers"][id].params.loopedSlides = spv;
              }
            }
            on_resize = true;
          }
        }
        if (!slider.hasClass("slider_noresize") || slider.height() == 0) {
          var slide = slider.find(".slider-slide").eq(0);
          var slide_width = slide.width();
          var slide_height = slide.height();
          var ratio = slider.data("ratio");
          if (ratio === undefined || ("" + ratio).indexOf(":") < 1) {
            ratio =
              slide_height > 0 ? slide_width + ":" + slide_height : "16:9";
            slider.attr("data-ratio", ratio);
          }
          ratio = ratio.split(":");
          var ratio_x = !isNaN(ratio[0]) ? Number(ratio[0]) : 16;
          var ratio_y = !isNaN(ratio[1]) ? Number(ratio[1]) : 9;
          var height = Math.floor(
            ((spv == 1 ? slider_width : slide_width) / ratio_x) * ratio_y
          );
          slider.height(height);
          on_resize = true;
          if (slider.hasClass("slider_elastistack")) {
            slider
              .find(".slider-wrapper,.stack__images,.slider-slide")
              .height(height);
          }
          trx_addons_set_controller_height(slider.data("controller"), slider);
        }
        if (on_resize && slider.hasClass("slider_swiper"))
          TRX_ADDONS_STORAGE["swipers"][id].onResize();
      }
    });
  }
  function trx_addons_set_controller_height(controller_id, slider) {
    var controller = controller_id ? jQuery("#" + controller_id) : false;
    if (
      controller &&
      controller.length > 0 &&
      controller.hasClass("sc_slider_controller_vertical") &&
      controller.hasClass("sc_slider_controller_height_auto")
    ) {
      if (jQuery(window).width() >= 768) {
        var paddings = parseFloat(controller.css("paddingTop"));
        if (isNaN(paddings)) paddings = 0;
        controller
          .find(".slider_container")
          .height(slider.height() - 2 * paddings);
      } else {
        var controller_spv = controller.data("slides-per-view");
        if (isNaN(controller_spv)) controller_spv = 1;
        controller.find(".slider_container").height(controller_spv * 100);
      }
    }
  }
})();
jQuery(document).on("action.ready_trx_addons", function () {
  "use strict";
  jQuery(".sc_layouts_logo,.custom-logo-link").on("click", function (e) {
    if (jQuery(this).attr("href") == "#") {
      trx_addons_document_animate_to(0);
      e.preventDefault();
      return false;
    }
  });
});
(function () {
  "use strict";
  jQuery(document).on("action.before_ready_trx_addons", function () {
    window.trx_addons_init_sfmenu = function (selector) {
      jQuery(selector)
        .show()
        .each(function () {
          var animation_in = jQuery(this).parent().data("animation-in");
          if (animation_in == undefined) animation_in = "none";
          var animation_out = jQuery(this).parent().data("animation-out");
          if (animation_out == undefined) animation_out = "none";
          jQuery(this)
            .addClass("inited")
            .superfish({
              delay: 500,
              animation: { opacity: "show" },
              animationOut: { opacity: "hide" },
              speed: animation_in != "none" ? 500 : 200,
              speedOut: animation_out != "none" ? 500 : 200,
              autoArrows: false,
              dropShadows: false,
              onBeforeShow: function (ul) {
                if (jQuery(this).parents("ul").length > 1) {
                  var w =
                    jQuery(".page_wrap").length > 0
                      ? jQuery(".page_wrap").width()
                      : jQuery(window).width();
                  var par_offset = jQuery(this).parents("ul").offset().left;
                  var par_width = jQuery(this).parents("ul").outerWidth();
                  var ul_width = jQuery(this).outerWidth();
                  if (
                    par_offset + par_width + ul_width > w - 20 &&
                    par_offset - ul_width > 0
                  )
                    jQuery(this).addClass("submenu_left");
                  else jQuery(this).removeClass("submenu_left");
                }
                if (
                  jQuery(this).parents('[class*="columns-"]').length == 0 &&
                  animation_in != "none"
                ) {
                  jQuery(this).removeClass("animated fast " + animation_out);
                  jQuery(this).addClass("animated fast " + animation_in);
                }
              },
              onBeforeHide: function (ul) {
                jQuery(this)
                  .find(".trx_addons_video_player.with_cover.video_play")
                  .removeClass("video_play")
                  .find(".video_embed")
                  .empty();
                if (
                  jQuery(this).parents('[class*="columns-"]').length == 0 &&
                  animation_out != "none"
                ) {
                  jQuery(this).removeClass("animated fast " + animation_in);
                  jQuery(this).addClass("animated fast " + animation_out);
                }
              },
              onShow: function (ul) {
                if (!jQuery(this).hasClass("layouts_inited")) {
                  jQuery(this).addClass("layouts_inited");
                  jQuery(document).trigger("action.init_hidden_elements", [
                    jQuery(this),
                  ]);
                }
              },
            });
        });
    };
    trx_addons_init_sfmenu(".sc_layouts_menu:not(.inited) > ul:not(.inited)");
    trx_addons_menu_collapse();
    jQuery(".sc_layouts_menu:not(.inited)").each(function () {
      if (jQuery(this).find(">ul.inited").length == 1)
        jQuery(this).addClass("inited");
    });
    jQuery(
      ".menu_hover_slide_line:not(.slide_inited),.menu_hover_slide_box:not(.slide_inited)"
    ).each(function () {
      var menu = jQuery(this).addClass("slide_inited");
      var style = menu.hasClass("menu_hover_slide_line") ? "line" : "box";
      setTimeout(function () {
        menu.find(">ul").spasticNav({ style: style, colorOverride: false });
      }, 500);
    });
    jQuery(".sc_layouts_menu_mobile_button_burger:not(.inited)").each(
      function () {
        var burger = jQuery(this);
        var popup = burger.find(".sc_layouts_menu_popup");
        if (popup.length == 1) {
          burger.addClass("inited").on("click", ">a", function (e) {
            popup.toggleClass("opened").slideToggle();
            e.preventDefault();
            return false;
          });
          jQuery(document).on("click", function (e) {
            jQuery(".sc_layouts_menu_popup.opened")
              .removeClass("opened")
              .slideUp();
          });
        }
      }
    );
  });
  jQuery(document).on("action.resize_trx_addons", function () {
    trx_addons_menu_collapse();
  });
  function trx_addons_menu_collapse() {
    if (TRX_ADDONS_STORAGE["menu_collapse"] == 0) return;
    jQuery(".sc_layouts_menu:not(.sc_layouts_menu_dir_vertical)").each(
      function () {
        if (
          jQuery(this).parents("div:hidden,section:hidden,article:hidden")
            .length > 0
        )
          return;
        var ul = jQuery(this).find(
          ">ul:not(.sc_layouts_menu_no_collapse).inited"
        );
        if (ul.length == 0 || ul.find("> li").length < 2) return;
        var sc_layouts_item = ul.parents(".sc_layouts_item");
        if (
          !sc_layouts_item.parent().hasClass("wpb_wrapper") &&
          !sc_layouts_item.parent().hasClass("sc_layouts_column")
        )
          return;
        var w_max =
          sc_layouts_item.parent().width() -
          (Math.ceil(parseFloat(sc_layouts_item.css("marginLeft"))) +
            Math.ceil(parseFloat(sc_layouts_item.css("marginRight")))) -
          2;
        var w_siblings = 0,
          in_group = 0,
          ul_id = ul.attr("id");
        sc_layouts_item
          .parent()
          .find(">div")
          .each(function () {
            if (in_group > 1) return;
            if (
              jQuery(this).hasClass("vc_empty_space") ||
              jQuery(this).hasClass("vc_separator")
            ) {
              if (in_group == 1) in_group = 2;
              else w_siblings = 0;
            } else {
              if (jQuery(this).find("#" + ul_id).length > 0) in_group = 1;
              else
                w_siblings +=
                  jQuery(this).outerWidth() +
                  Math.ceil(parseFloat(jQuery(this).css("marginLeft"))) +
                  Math.ceil(parseFloat(jQuery(this).css("marginRight")));
            }
          });
        w_max -= w_siblings;
        var w_all = 0;
        var move = false;
        var li_collapse = ul.find("li.menu-item.menu-collapse");
        if (li_collapse.length == 0) {
          ul.append(
            '<li class="menu-item menu-collapse"><a href="#" class="sf-with-ul ' +
              TRX_ADDONS_STORAGE["menu_collapse_icon"] +
              '"></a><ul class="submenu"></ul></li>'
          );
          li_collapse = ul.find("li.menu-item.menu-collapse");
        }
        var li_collapse_ul = li_collapse.find("> ul");
        ul.find("> li").each(function (idx) {
          var cur_item = jQuery(this);
          cur_item.data("index", idx);
          if (move || cur_item.attr("id") == "blob") return;
          w_all +=
            !cur_item.hasClass("menu-collapse") ||
            cur_item.css("display") != "none"
              ? cur_item.outerWidth() +
                Math.ceil(parseFloat(cur_item.css("marginLeft"))) +
                Math.ceil(parseFloat(cur_item.css("marginRight")))
              : 0;
          if (w_all > w_max) move = true;
        });
        if (move) {
          w_all =
            li_collapse.outerWidth() +
            Math.ceil(parseFloat(li_collapse.css("marginLeft"))) +
            Math.ceil(parseFloat(li_collapse.css("marginRight")));
          ul.find("> li:not('.menu-collapse')").each(function (idx) {
            var cur_item = jQuery(this);
            var cur_width =
              cur_item.outerWidth() +
              Math.ceil(parseFloat(cur_item.css("marginLeft"))) +
              Math.ceil(parseFloat(cur_item.css("marginRight")));
            if (w_all <= w_max) w_all += cur_width;
            if (w_all > w_max) {
              var moved = false;
              li_collapse_ul.find(">li").each(function () {
                if (!moved && Number(jQuery(this).data("index")) > idx) {
                  cur_item
                    .attr("data-width", cur_width)
                    .insertBefore(jQuery(this));
                  moved = true;
                }
              });
              if (!moved)
                cur_item.attr("data-width", cur_width).appendTo(li_collapse_ul);
            }
          });
          li_collapse.show();
        } else {
          var items = li_collapse_ul.find(">li");
          var cnt = 0;
          move = true;
          items.each(function () {
            if (!move) return;
            if (items.length - cnt == 1)
              w_all -=
                li_collapse.outerWidth() +
                Math.ceil(parseFloat(li_collapse.css("marginLeft"))) +
                Math.ceil(parseFloat(li_collapse.css("marginRight")));
            w_all += parseFloat(jQuery(this).data("width"));
            if (w_all < w_max) {
              jQuery(this).insertBefore(li_collapse);
              cnt++;
            } else move = false;
          });
          if (items.length - cnt == 0) li_collapse.hide();
        }
      }
    );
  }
})();
(function ($) {
  "use strict";
  $.fn.spasticNav = function (options) {
    options = $.extend(
      {
        overlap: 0,
        style: "box",
        reset: 50,
        color: "#00c6ff",
        colorOverride: true,
      },
      options
    );
    return this.each(function () {
      var nav = $(this),
        currentPageItem = nav.find(
          ">.current-menu-item,>.current-menu-parent,>.current-menu-ancestor"
        ),
        hidden = false,
        blob,
        reset;
      if (currentPageItem.length === 0) {
        currentPageItem = nav.find("li").eq(0);
        hidden = true;
      }
      var a = currentPageItem.find(">a");
      var pl = parseInt(a.css("paddingLeft"), 10);
      if (isNaN(pl)) pl = 0;
      $('<li id="blob"></li>')
        .css({
          width: options.style == "box" ? a.outerWidth() : a.width(),
          left:
            currentPageItem.position().left + (options.style == "box" ? 0 : pl),
          top: currentPageItem.position().top - options.overlap / 2,
          opacity: hidden ? 0 : 1,
        })
        .appendTo(this);
      blob = $("#blob", nav);
      if (options.style == "box")
        blob.css({ height: currentPageItem.outerHeight() + options.overlap });
      if (options.colorOverride) {
        var bg = a.css("backgroundColor");
        blob.css({
          backgroundColor: hidden || bg == "transparent" ? options.color : bg,
        });
      }
      nav.find(">li:not(#blob)").hover(
        function () {
          clearTimeout(reset);
          var a = $(this).find(">a");
          var pl = parseInt(a.css("paddingLeft"), 10);
          if (isNaN(pl)) pl = 0;
          if (options.colorOverride) {
            var bg = a.css("backgroundColor");
            if (bg != "transparent") blob.css({ backgroundColor: bg });
          }
          $(this).addClass("blob_over");
          blob.css({
            left: $(this).position().left + (options.style == "box" ? 0 : pl),
            top: $(this).position().top - options.overlap / 2,
            width: options.style == "box" ? a.outerWidth() : a.width(),
            opacity: 1,
          });
        },
        function () {
          reset = setTimeout(function () {
            var a = currentPageItem.find(">a");
            var pl = parseInt(a.css("paddingLeft"), 10);
            if (isNaN(pl)) pl = 0;
            if (options.colorOverride) {
              var bg = a.css("backgroundColor");
              if (bg != "transparent") blob.css({ backgroundColor: bg });
            }
            blob.css({
              width: options.style == "box" ? a.outerWidth() : a.width(),
              left:
                currentPageItem.position().left +
                (options.style == "box" ? 0 : pl),
              opacity: hidden ? 0 : 1,
            });
          }, options.reset);
          $(this).removeClass("blob_over");
        }
      );
    });
  };
})(jQuery);
jQuery(document).on("action.ready_trx_addons", function () {
  "use strict";
  if (jQuery(".search_wrap:not(.inited)").length > 0) {
    jQuery(".search_wrap:not(.inited)").each(function () {
      var search_wrap = jQuery(this).addClass("inited");
      var search_field = search_wrap.find(".search_field");
      var ajax_timer = null;
      search_field.on("keyup", function (e) {
        if (e.keyCode == 27) {
          search_field.val("");
          trx_addons_search_close(search_wrap);
          e.preventDefault();
          return;
        }
        if (search_wrap.hasClass("search_ajax")) {
          var s = search_field.val();
          if (ajax_timer) {
            clearTimeout(ajax_timer);
            ajax_timer = null;
          }
          if (s.length >= 4) {
            ajax_timer = setTimeout(function () {
              jQuery
                .post(TRX_ADDONS_STORAGE["ajax_url"], {
                  action: "ajax_search",
                  nonce: TRX_ADDONS_STORAGE["ajax_nonce"],
                  text: s,
                })
                .done(function (response) {
                  clearTimeout(ajax_timer);
                  ajax_timer = null;
                  var rez = {};
                  if (response == "" || response == 0) {
                    rez = { error: TRX_ADDONS_STORAGE["msg_search_error"] };
                  } else {
                    try {
                      rez = JSON.parse(response);
                    } catch (e) {
                      rez = { error: TRX_ADDONS_STORAGE["msg_search_error"] };
                      console.log(response);
                    }
                  }
                  var msg = rez.error === "" ? rez.data : rez.error;
                  search_field
                    .parents(".search_ajax")
                    .find(".search_results_content")
                    .empty()
                    .append(msg);
                  search_field
                    .parents(".search_ajax")
                    .find(".search_results")
                    .fadeIn();
                });
            }, 500);
          }
        }
      });
      search_wrap.find(".search_submit").on("click", function (e) {
        if (
          (search_wrap.hasClass("search_style_expand") ||
            search_wrap.hasClass("search_style_fullscreen")) &&
          !search_wrap.hasClass("search_opened")
        ) {
          search_wrap.addClass("search_opened");
          setTimeout(function () {
            search_field.get(0).focus();
          }, 500);
        } else if (search_field.val() == "") {
          if (search_wrap.hasClass("search_opened"))
            trx_addons_search_close(search_wrap);
          else search_field.get(0).focus();
        } else {
          search_wrap.find("form").get(0).submit();
        }
        e.preventDefault();
        return false;
      });
      search_wrap.find(".search_close").on("click", function (e) {
        trx_addons_search_close(search_wrap);
        e.preventDefault();
        return false;
      });
      search_wrap.find(".search_results_close").on("click", function (e) {
        jQuery(this).parent().fadeOut();
        e.preventDefault();
        return false;
      });
      search_wrap.on("click", ".search_more", function (e) {
        if (search_field.val() != "") search_wrap.find("form").get(0).submit();
        e.preventDefault();
        return false;
      });
    });
  }
  function trx_addons_search_close(search_wrap) {
    search_wrap.removeClass("search_opened");
    search_wrap.find(".search_results").fadeOut();
  }
});
