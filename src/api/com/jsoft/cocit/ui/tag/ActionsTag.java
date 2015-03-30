package com.jsoft.cocit.ui.tag;

import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.BodyTagSupport;

import com.jsoft.cocit.Cocit;
import com.jsoft.cocit.action.OpContext;
import com.jsoft.cocit.constant.ViewKeys;
import com.jsoft.cocit.ui.model.control.UIActions;
import com.jsoft.cocit.ui.model.control.UIEntity;
import com.jsoft.cocit.util.StringUtil;

public class ActionsTag extends BodyTagSupport {

	private static final long serialVersionUID = 3902335085986034089L;

	protected String keys = null;
	protected String funcExpr = null;
	protected String resultUI = null;

	public int doStartTag() throws JspException {

		UIActions model = null;

		UIEntity mainModel = (UIEntity) pageContext.getAttribute(ViewKeys.UI_MODEL_KEY, PageContext.REQUEST_SCOPE);

		List<String> actionsList = StringUtil.toList(keys);

		if (mainModel == null && StringUtil.hasContent(funcExpr)) {

			OpContext opContext = OpContext.make(funcExpr, null, null);
			if (opContext.getException() != null) {
				throw new JspException(opContext.getException());
			}

			if (actionsList != null && actionsList.size() > 0) {
				model = opContext.getUiModelFactory().getActions(opContext.getSystemMenu(), opContext.getCocEntity(), actionsList);
			} else {
				model = opContext.getUiModelFactory().getActions(opContext.getSystemMenu(), opContext.getCocEntity());
			}
		} else {
			if (actionsList != null && actionsList.size() > 0) {

				OpContext opContext = (OpContext) pageContext.getAttribute(OpContext.OPCONTEXT_REQUEST_KEY, PageContext.REQUEST_SCOPE);
				model = Cocit.me().getUiModelFactory().getActions(opContext.getSystemMenu(), opContext.getCocEntity(), actionsList);

			} else {
				model = mainModel.getActions();
			}
		}

		if (model != null) {
			if (StringUtil.hasContent(id)) {
				model.setId(id);
			}

			/*
			 * 处理vRESULT UI
			 */
			if (StringUtil.hasContent(resultUI)) {
				model.getResultUI().clear();

				List<String> list = StringUtil.toList(resultUI);
				for (String str : list) {
					model.addResultUI(str);
				}
			} else if (model.getResultUI().size() == 0) {
				model.addResultUI(mainModel.getGrid().getId());
			}

			try {
				model.render(pageContext.getOut());
			} catch (Exception e) {
				throw new JspException(e);
			}
		}

		return EVAL_BODY_INCLUDE;
	}

	public void release() {
		super.release();
		funcExpr = null;
		resultUI = null;
	}

	public String getFuncExpr() {
		return funcExpr;
	}

	public void setFuncExpr(String funcExpr) {
		this.funcExpr = funcExpr;
	}

	public String getResultUI() {
		return resultUI;
	}

	public void setResultUI(String resultUI) {
		this.resultUI = resultUI;
	}

	public String getKeys() {
		return keys;
	}

	public void setKeys(String actions) {
		this.keys = actions;
	}
}
