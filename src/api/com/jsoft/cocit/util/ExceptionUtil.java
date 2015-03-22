package com.jsoft.cocit.util;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.nutz.lang.Lang;

/**
 * 
 * @author Ji Yongshan
 * @preserve public
 * 
 */
public abstract class ExceptionUtil {
	// public static String info(Throwable e, boolean logNullPointer) {
	// StringBuffer sb = new StringBuffer();
	// info(sb, e, logNullPointer);
	// return sb.toString();
	// }

	public static String msg(Throwable e) {
		e = root(e);
		if (e.getClass().equals(NullPointerException.class)) {
			StringWriter str = new StringWriter();
			PrintWriter writer = new PrintWriter(str);
			e.printStackTrace(writer);
			return str.getBuffer().toString();
		} else {
			// if (e instanceof CocException || e instanceof RuntimeException)
			// return e.getMessage();
			// else
			return e.getMessage();
		}
	}

	public static Throwable root(Throwable t) {
		while (true) {
			if (t.getCause() == null)
				break;
			t = t.getCause();
		}

		return t;
	}

	public static RuntimeException throwEx(Throwable e) {
		return (RuntimeException) Lang.wrapThrow(e);
	}

	public static RuntimeException throwEx(String format, Object... args) {
		return (RuntimeException) Lang.makeThrow(format, args);
	}

	public static RuntimeException throwEx(Throwable e, Class wrapper) {
		return (RuntimeException) Lang.wrapThrow(e, wrapper);
	}
}
