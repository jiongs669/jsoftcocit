;
(function($) {
	$.fn.KandyTabs = function(n) {
		var o = {
			classes : "kandyTabs",
			id : "",
			btn : "",
			cont : "",
			type : "tab",
			trigger : "mouseover",
			action : "toggle",
			custom : {},
			delay : 200,
			last : 400,
			current : 1,
			direct : "top",
			column : 0,
			except : "",
			child : [],
			ready : {},
			done : {},
			auto : false,
			stall : 5000,
			play : true,
			process : false,
			ctrl : false,
			nav : false,
			loop : false,
			resize : true,
			lang : {
				first : [ "\u5DF2\u662F\u9996\u4E2A", "&lt;" ],
				prev : [ "\u524D\u4E00\u4E2A", "&lt;" ],
				next : [ "\u540E\u4E00\u4E2A", "&gt;" ],
				last : [ "\u5DF2\u662F\u672B\u4E2A", "&gt;" ],
				empty : "\u6682\u65E0\u5185\u5BB9",
				play : [ "\u64AD\u653E", "&lt;&lt;" ],
				pause : [ "\u6682\u505C", "&#124;&#124;" ]
			}
		};
		var p = document.URL.toLowerCase() + "&", $tab, $title, $body, $btn, $cont, $roll, $process, $except, $tmpbtn, $tmpcont, _tmpb, _tmpc, $ctrl, $pause, $play, $nav, $prev, $next, $now, $tabprev, $tabnext, $autostop, _auto = null, setAuto = null, _isAuto = true, _isProcess = true, i, n = $
				.extend(o, n);
		if (typeof n.ready == "function")
			n.ready();
		this
				.each(function() {
					if ($(this).data("KandyTabs") == true)
						return false;
					var c = n.current - 1, _except = n.except, _child = n.child[0], _childOptions = n.child[1], _stall = n.stall, _last = n.last, _col = n.column, $this = $(this).data("KandyTabs",
							true), $child = $this.children(), _childlen = $child.length, _process = false, _tagname = this.tagName, _tag = "div";
					if (n.process && n.auto)
						_process = true;
					if (_tagname == "DL") {
						$title = $("<dt/>");
						$body = $("<dd/>");
						_tag = "dd"
					} else if (_tagname == "UL" || _tagname == "OL") {
						$title = $("<li/>");
						$body = $("<li/>");
						_tag = "li"
					} else {
						$title = $("<div/>");
						$body = $("<div/>")
					}
					$tab = $this.addClass(n.classes);
					if (n.id)
						$tab.attr("id", n.id);
					$tab.data("html", this.innerHTML);
					c = ($tab.attr("id") && p.indexOf($tab.attr("id") + ":") > -1 ? parseInt(p.split($tab.attr("id") + ":")[1].split("&")[0]) - 1 : c);
					if (n.btn == "" && n.cont == "") {
						if (n.type != "fold")
							$tab.append($title.addClass("tabtitle"), $body.addClass("tabbody"))
					}
					if (_process)
						$tab.append($process = $('<' + _tag + ' class="tabprocess"/>'));
					if (_except != "") {
						var d = $this.find(_except);
						_childlen = _childlen - d.length;
						for (i = 0; i < d.length; i++) {
							var e = d[i].tagName, _eclass = d[i].className, _eid = d[i].id;
							if (_eid != "")
								_eid = " id='" + _eid + "'";
							if (_eclass != "")
								_eclass = " " + _eclass;
							if (e.indexOf("H") > -1 || _eclass.toLowerCase().indexOf("title") > -1) {
								$title.before("<" + e + " class='tabexcept" + _eclass + "'" + _eid + ">" + d[i].innerHTML + "</" + e + ">")
							} else {
								$tab.append("<" + e + " class='tabexcept" + _eclass + "'" + _eid + ">" + d[i].innerHTML + "</" + e + ">")
							}
							d.eq(i).remove()
						}
						$child = $this.children()
					}
					if (_col > 0) {
						_childlen = _childlen / _col;
						if (_childlen.toString().indexOf(".") > -1)
							_childlen = parseInt(_childlen) + 1;
						for (i = 0; i < _childlen; i++) {
							$child.not(".tabtitle,.tabbody,.tabexcept,.tabprocess").slice(i * _col, i * _col + _col).wrapAll("<" + _tagname + "/>")
						}
						$child = $this.children()
					}
					if (n.btn == "" && n.cont == "") {
						if (n.type == "slide") {
							for (i = 0; i < _childlen; i++) {
								$tmpcont = $child.eq(i);
								_tmpc = $child[i];
								if (_tmpc.tagName == "A" || _tmpc.tagName == "IMG" || _tmpc.tagName == "IFRAME") {
									$tmpcont = $tmpcont.wrap('<div class="tabcont"/>').parent()
								} else if (_tmpc.tagName == "LI" || _tmpc.tagName == "DD") {
									$tmpcont = $tmpcont.wrap('<div class="tabcont"/>').parent().html($tmpcont.html())
								} else {
									$tmpcont.addClass("tabcont")
								}
								$title.append('<span class="tabbtn">' + (i + 1) + '</span>');
								$body.append($tmpcont)
							}
						} else if (n.type == "fold") {
							_childlen = _childlen / 2;
							if (_childlen.toString().indexOf(".") > -1)
								_childlen = parseInt(_childlen) + 1;
							for (i = 0; i < _childlen; i++) {
								$child.eq(i * 2).addClass("tabbtn").next().addClass("tabcont")
							}
							if ($tab.find(".tabbtn").length > $tab.find(".tabcont").length)
								$tab.append('<' + _tag + ' class="tabcont">' + n.lang.empty + '</' + _tag + '>')
						} else {
							_childlen = _childlen / 2;
							if (_childlen.toString().indexOf(".") > -1)
								_childlen = parseInt(_childlen) + 1;
							for (i = 0; i < _childlen; i++) {
								$tmpbtn = $child.eq(i * 2);
								_tmpb = $child[(i * 2)];
								if (_tmpb.tagName == "A" || _tmpb.tagName == "IMG") {
									$tmpbtn = $tmpbtn.wrap('<span class="tabbtn"/>').parent()
								} else {
									$tmpbtn = $('<span class="tabbtn' + (_tmpb.className ? ' ' + _tmpb.className + '' : '') + '"' + (_tmpb.id ? ' id="' + _tmpb.id + '"' : '') + '>' + _tmpb.innerHTML
											+ '</span>');
									if (n.type != "fold")
										$child.eq(i * 2).remove()
								}
								$tmpcont = $child.eq(i * 2 + 1);
								_tmpc = $child[(i * 2 + 1)];
								if (_tmpc) {
									if (_tmpc.tagName == "A" || _tmpc.tagName == "IMG" || _tmpc.tagName == "UL" || _tmpc.tagName == "OL" || _tmpc.tagName == "DL" || _tmpc.tagName == "IFRAME") {
										$tmpcont = $tmpcont.wrap('<div class="tabcont"/>').parent()
									} else if (_tmpc.tagName == "LI" || _tmpc.tagName == "DD") {
										$tmpcont = $tmpcont.wrap('<div class="tabcont' + (_tmpc.className ? ' ' + _tmpc.className + '' : '') + '"' + (_tmpc.id ? ' id="' + _tmpc.id + '"' : '') + '/>')
												.parent().html($tmpcont.html())
									} else {
										$tmpcont.addClass("tabcont")
									}
								} else {
									$tmpcont = $('<div class="tabcont">' + n.lang.empty + '</div>')
								}
								$title.append($tmpbtn);
								$body.append($tmpcont)
							}
						}
					} else {
						$tab.find(n.btn).addClass("tabbtn");
						$tab.find(n.cont).addClass("tabcont");
						$title = $tab.find(".tabbtn").parent().addClass("tabtitle");
						$body = $tab.find(".tabcont").parent().addClass("tabbody")
					}
					$btn = $tab.find(".tabbtn");
					$cont = $tab.find(".tabcont").hide();
					if (n.type != "fold") {
						$btn.eq(c).addClass("tabcur").siblings(".tabcur").removeClass("tabcur");
						$cont.eq(c).show();
						if (n.direct == "left")
							$cont.css("float", "left")
					} else {
						if (n.direct == "left") {
							var f = $cont.width();
							$tab.css({
								overflow : "hidden",
								height : $cont.outerHeight()
							});
							$cont.css("float", "left").css({
								overflow : "auto"
							}).show();
							$btn.css("float", "left").css({
								overflow : "auto"
							}).eq(c).addClass("tabcur").next(".tabcont").width(f).siblings(".tabcont:visible").width(0).addClass("tabfold");
						} else {
							$cont.hide();
							$btn.eq(c).addClass("tabcur").next(".tabcont").show()
						}
						if (n.action == "roll")
							n.action = "slide";
						if (n.action == "slifade")
							n.action = "fade"
					}
					var g = function(a, b) {
						if (!n.resize)
							return false;
						b && b * 2 > _stall ? b = _stall - 200 : b = b * 2;
						$body.stop(false, true).animate({
							height : $cont.eq(a).height(),
							width : $cont.eq(a).width()
						}, b)
					};
					var h = function(a) {
						var b = b || "", _tabprev = _tabprev || "", _tabindex = "";
						if ($tabnext)
							b = $tabnext.index();
						if ($tabprev)
							_tabprev = $tabprev.index();
						if (b != _tabprev && b == (a == 0 ? -1 : a)) {
							if (a == 0)
								_tabindex = 1
						}
						if (b != _tabprev && _tabprev == (a == (_childlen - 1) ? -1 : a)) {
							if (a == (_childlen - 1))
								_tabindex = -1
						}
						switch (n.direct) {
						case "left":
							if (_tabindex == 1 && n.loop) {
								$roll.stop(false, true).animate({
									left : -$roll.width() / 2
								}, _last, function() {
									g(a, _last);
									$roll.css("left", 0)
								})
							} else if (_tabindex == -1 && n.loop) {
								$roll.find(".tabcont:last").prependTo($roll);
								$roll.css("left", -$roll.find(".tabcont:first").width());
								$roll.stop(false, true).animate({
									left : 0
								}, _last, function() {
									$roll.find(".tabcont:first").appendTo($roll);
									g(a, _last);
									$roll.css("left", -$cont.eq(a).position().left)
								})
							} else {
								$roll.stop(false, true).animate({
									left : -$cont.eq(a).position().left
								}, _last, g(a, _last))
							}
							break;
						default:
							if (_tabindex == 1 && n.loop) {
								$roll.stop(false, true).animate({
									top : -$roll.height() / 2
								}, _last, function() {
									g(a, _last);
									$roll.css("top", 0)
								})
							} else if (_tabindex == -1 && n.loop) {
								$roll.find(".tabcont:last").prependTo($roll);
								$roll.css("top", -$roll.find(".tabcont:first").height());
								$roll.stop(false, true).animate({
									top : 0
								}, _last, function() {
									$roll.find(".tabcont:first").appendTo($roll);
									g(a, _last);
									$roll.css("top", -$cont.eq(a).position().top)
								})
							} else {
								$roll.stop(false, true).animate({
									top : -$cont.eq(a).position().top
								}, _last, g(a, _last))
							}
						}
					};
					var j = function(a) {
						$cont.eq(a).stop(false, true).fadeIn(0, function() {
							$(this).siblings().fadeOut(_last, g(a, _last)).css("z-index", _childlen)
						}).css("z-index", 0)
					};
					if (n.action == "roll") {
						$body.css({
							position : "relative",
							overflow : "hidden"
						}).height($cont.eq(c).height()).width($cont.eq(c).width());
						$body.wrapInner("<div class='tabroll' style='position:absolute;width:" + $body.width() + "px'/>");
						$cont.show();
						$roll = $body.find(".tabroll");
						if (n.loop)
							$roll.append($roll.html());
						if (n.direct == "left") {
							var k = 0;
							for (i = 0; i < $cont.length; i++) {
								k += $cont.eq(i).outerWidth(true)
							}
							$roll.width(n.loop ? k * 2 : k)
						}
						setTimeout(function() {
							h(c)
						}, 100)
					}
					;
					if (n.action == "slifade") {
						$body.css({
							position : "relative",
							overflow : "hidden"
						}).height($cont.eq(c).height());
						$cont.css({
							position : "absolute",
							width : $body.width()
						});
						setTimeout(function() {
							j(c)
						}, 100)
					}
					;
					var l = function(a) {
						$btn.eq(a).stop(false, true).addClass("tabcur").siblings(".tabbtn").removeClass("tabcur");
						if (_process && _isProcess)
							$process.stop().width("").animate({
								width : 0
							}, _stall, function() {
								_isProcess = false
							});
						switch (n.action) {
						case "fade":
							$cont.eq(a).stop(false, true).fadeIn(_last).siblings(".tabcont").hide();
							break;
						case "slide":
							if (n.type == "fold" && n.direct == "left") {
								$cont.eq(a).stop(false, true).animate({
									width : f
								}, _last, function() {
									$(this).removeClass("tabfold")
								}).siblings(".tabcont").animate({
									width : 0
								}, _last, function() {
									$(this).addClass("tabfold")
								})
							} else {
								$cont.eq(a).stop(false, true).slideDown(_last).siblings(".tabcont").slideUp(_last)
							}
							break;
						case "roll":
							h(a);
							break;
						case "slifade":
							j(a);
							break;
						default:
							$cont.eq(a).stop(false, true).show().siblings(".tabcont").hide()
						}
						if (typeof n.custom == "function")
							n.custom($btn, $cont, a, $this);
						if ($prev)
							a == 0 ? $prev.addClass("tabprevno").attr("title", n.lang.first[0]) : $prev.removeClass("tabprevno").attr("title", n.lang.prev[0]);
						if ($next)
							a == (_childlen - 1) ? $next.addClass("tabnextno").attr("title", n.lang.last[0]) : $next.removeClass("tabnextno").attr("title", n.lang.next[0]);
						if ($now)
							$now.text(a + 1);
						if (n.loop && n.nav)
							$prev.removeClass("tabprevno").attr("title", n.lang.prev[0]), $next.removeClass("tabnextno").attr("title", n.lang.next[0])
					};
					_auto = function() {
						setAuto && clearTimeout(setAuto);
						setAuto = null;
						window.CollectGarbage && CollectGarbage();
						if (n.process)
							_isProcess = true;
						n.type != "fold" ? $tabnext = $title.find(".tabcur").next() : $tabnext = $this.find(".tabcur").next().next();
						$tabnext.html() == null ? $btn.first().trigger(n.trigger) : $tabnext.trigger(n.trigger);
						if (n.trigger == "mouseover")
							if (n.process)
								$process.stop().width("").animate({
									width : 0
								}, _stall);
						setAuto = setTimeout(_auto, _stall)
					};
					if (n.auto) {
						if (n.process)
							$process.animate({
								width : 0
							}, _stall), _isProcess = true;
						setTimeout(_auto, _stall);
						n.type != "fold" ? $autostop = $tab.find(".tabtitle,.tabcont") : $autostop = $this;
						$autostop.mouseover(function() {
							if (n.process)
								$process.stop().width(""), _isProcess = false;
							clearTimeout(setAuto)
						}).mouseout(function() {
							if (n.process)
								$process.stop().width("").animate({
									width : 0
								}, _stall), _isProcess = true;
							if (_isAuto)
								setAuto = setTimeout(_auto, _stall)
						});
						if (n.ctrl) {
							$tab.append($ctrl = $('<' + _tag + ' class="tabctrl"/>'));
							$ctrl.append($pause = $('<b class="tabpause" title="' + n.lang.pause[0] + '">' + n.lang.pause[1] + '</b>'), $play = $('<b class="tabplay" title="' + n.lang.play[0]
									+ '" style="display:none">' + n.lang.play[1] + '</b>'));
							$pause.click(function() {
								$(this).hide();
								if (n.process)
									$process.stop().hide();
								clearTimeout(setAuto);
								$play.show();
								_isAuto = false
							});
							$play.click(function() {
								$(this).hide();
								if (n.process)
									$process.show().stop().width("").animate({
										width : 0
									}, _stall);
								setAuto = setTimeout(_auto, _stall);
								$pause.show();
								_isAuto = true
							});
							if (!n.play) {
								$pause.trigger("click")
							}
						}
					}
					if (n.nav) {
						$tab.append($nav = $('<' + _tag + ' class="tabnav"/>'));
						$nav.append($prev = $('<em class="tabprev" title="' + n.lang.prev[0] + '">' + n.lang.prev[1] + '</em>'), '<span class="tabpage"/>', $next = $('<em class="tabnext" title="'
								+ n.lang.next[0] + '">' + n.lang.next[1] + '</em>'));
						$nav.find("span.tabpage").append($now = $('<b class="tabnow">' + (c + 1) + '</b>'), '<i>&nbsp;/&nbsp;</i>', '<b class="taball">' + _childlen + '</b>');
						if (c == 0 && !n.loop)
							$prev.addClass("tabprevno");
						if (c == (_childlen - 1) && !n.loop)
							$next.addClass("tabnextno");
						$prev.mouseover(function() {
							if (_process)
								$process.stop().width(""), _isProcess = false;
							if (n.auto)
								clearTimeout(setAuto)
						}).mousedown(function() {
							if ($(this).hasClass("tabprevno"))
								return false;
							$tabprev = $title.find(".tabcur").prev();
							$tabprev.html() == null ? $btn.last().trigger(n.trigger) : $tabprev.trigger(n.trigger);
							if (n.auto)
								setAuto = setTimeout(_auto, _stall)
						}).mouseup(function() {
							if (n.auto)
								clearTimeout(setAuto)
						}).mouseout(function() {
							if (_process)
								$process.animate({
									width : 0
								}, _stall), _isProcess = true;
							if (n.auto)
								setAuto = setTimeout(_auto, _stall)
						});
						$next.mouseover(function() {
							if (_process)
								$process.stop().width(""), _isProcess = false;
							if (n.auto)
								clearTimeout(setAuto)
						}).mousedown(function() {
							if ($(this).hasClass("tabnextno"))
								return false;
							$tabnext = $title.find(".tabcur").next();
							$tabnext.html() == null ? $btn.first().trigger(n.trigger) : $tabnext.trigger(n.trigger);
							if (n.auto)
								setAuto = setTimeout(_auto, _stall)
						}).mouseup(function() {
							if (n.auto)
								clearTimeout(setAuto)
						}).mouseout(function() {
							if (_process)
								$process.animate({
									width : 0
								}, _stall), _isProcess = true;
							if (n.auto)
								setAuto = setTimeout(_auto, _stall)
						})
					}
					var m = null;
					if (n.trigger != "mouseover")
						n.delay = 0;
					$btn.bind(n.trigger, function() {
						var a = $btn.index($(this));
						clearTimeout(m);
						m = setTimeout(function() {
							l(a)
						}, n.delay)
					});
					if (n.trigger == "mouseover") {
						$btn.mouseout(function() {
							clearTimeout(m)
						})
					}
					if (n.type == "fold") {
						$btn.hover(function() {
							$(this).addClass("tabon")
						}, function() {
							$(this).removeClass("tabon")
						})
					}
					if (n.child != "" && $tab.find(_child).length) {
						$(_child).KandyTabs(_childOptions)
					}
					if (typeof n.done == "function")
						n.done($btn, $cont, $this)
				})
	}
})(jQuery);