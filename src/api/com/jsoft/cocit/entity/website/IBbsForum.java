package com.jsoft.cocit.entity.website;

public interface IBbsForum {
	public static final String SYS_CODE = "LybbsDb";

	public Number getId();

	public byte getCheckPostStatus();

	public String getAdminUsers();
}
