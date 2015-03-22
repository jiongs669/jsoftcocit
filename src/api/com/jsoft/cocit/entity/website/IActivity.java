package com.jsoft.cocit.entity.website;

import java.util.Date;

public interface IActivity {
	/**
	 * 摄影大赛
	 */
	public static byte TYPE_PHOTO = 1;

	/**
	 * 征文大赛
	 */
	public static byte TYPE_ARTICLE = 2;

	/**
	 * 股价竞猜
	 */
	public static byte TYPE_STOCK = 3;

	/**
	 * 网络任务
	 */
	public static byte TYPE_WEBTASK = 4;

	/**
	 * 产品促销
	 */
	public static byte TYPE_SALE = 5;

	Byte getType();

	String getImage();

	Date getExpiredFrom();

	Date getExpiredTo();

	public boolean isLimitLogin();

	public byte getLimitTimes();
}
