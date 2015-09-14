(function($, jCocit) {
	function viewPiDiagram(options) {

		var _defaults = {
			srcEle : this,
			pid : $(this).attr('pid'),
			pdid : $(this).attr('pdid')
		};
		var opts = $.extend(true, _defaults, options);
		var ctx = jCocit.contextPath + "/cocspring";

		// 获取图片资源
		var imageUrl = ctx + "/workflow/resource/process-instance?pid=" + opts.pid + "&type=image";
		$.getJSON(ctx + '/workflow/process/trace?pid=' + opts.pid, function(infos) {

			var positionHtml = "";

			// 生成图片
			var varsArray = new Array();
			$.each(infos, function(i, v) {
				var $positionDiv = $('<div/>', {
					'class' : 'activity-attr'
				}).css({
					position : 'absolute',
					left : (v.x - 1),
					top : (v.y - 1),
					width : (v.width - 2),
					height : (v.height - 2),
					backgroundColor : 'black',
					opacity : 0,
					zIndex : $.fn.qtip.zindex - 1
				});

				// 节点边框
				var $border = $('<div/>', {
					'class' : 'activity-attr-border'
				}).css({
					position : 'absolute',
					left : (v.x - 1),
					top : (v.y - 1),
					width : (v.width - 4),
					height : (v.height - 3),
					zIndex : $.fn.qtip.zindex - 2
				});

				if (v.currentActiviti) {
					$border.addClass('ui-corner-all-12').css({
						border : '3px solid red'
					});
				}
				positionHtml += $positionDiv.outerHTML() + $border.outerHTML();
				varsArray[varsArray.length] = v.vars;
			});

			var positionHtml = "<div style='position: relative; left: 0; top: 0;'><img src='" + imageUrl + "' style='position:absolute; left:0px; top:0px;' />" + "<div id='processImageBorder'>" + positionHtml + "</div>" + "</div>";

			jCocit.dialog.open(null, "workflowTraceDialog", {
				title : "查看流程",
				width : document.documentElement.clientWidth * 0.95,
				height : document.documentElement.clientHeight * 0.95,
				modal : true,
				shadow : false,
				maxable : false,
				draggable : true,
				content : positionHtml
			});

			// 设置每个节点的data
			$('#workflowTraceDialog .activity-attr').each(function(i, v) {
				$(this).data('vars', varsArray[i]);
			});

			// 此处用于显示每个节点的信息，如果不需要可以删除
			$('.activity-attr').qtip({
				content : function() {
					var vars = $(this).data('vars');
					var tipContent = "<table class='need-border'>";
					$.each(vars, function(varKey, varValue) {
						if (varValue) {
							tipContent += "<tr><td class='label'>" + varKey + "</td><td>" + varValue + "<td/></tr>";
						}
					});
					tipContent += "</table>";
					return tipContent;
				},
				position : {
					at : 'bottom left',
					adjust : {
						x : 3
					}
				}
			});

		});
	}

	$.fn.pidiagram = function(options, args) {
		if (typeof options == "string") {
			var fn = $.fn.button.methods[options]
			if (fn)
				return fn(this, args);
			else
				$.error('The method ' + options + ' does not exist in $.fn.pidiagram');
		}
		options = options || {};

		return this.click(viewPiDiagram);
	};

})(jQuery, jCocit);