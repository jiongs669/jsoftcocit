package com.jsoft.cocit.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;

import org.nutz.lang.Lang;

import com.jsoft.cocit.exception.CocException;

/**
 * 
 * @author Ji Yongshan
 * @preserve public
 * 
 */
public abstract class FileUtil extends org.nutz.lang.Files {

	public static void write(String filename, String content) {
		Reader contentReader = null;
		Writer targetWriter = null;
		try {
			File targetFile = new File(filename);
			if (targetFile.exists()) {
				targetFile.delete();
			} else {
				targetFile.getParentFile().mkdirs();
				targetFile.createNewFile();
			}
			contentReader = new java.io.StringReader(content);
			OutputStream os = new FileOutputStream(targetFile);
			targetWriter = new java.io.OutputStreamWriter(os, "UTF-8");
			int bytesRead = 0;
			char[] buffer = new char[8192];
			while ((bytesRead = contentReader.read(buffer, 0, 8192)) != -1) {
				targetWriter.write(buffer, 0, bytesRead);
			}
			targetWriter.flush();
		} catch (Throwable e) {
			throw new CocException(e);
		} finally {
			if (contentReader != null) {
				try {
					contentReader.close();
				} catch (IOException e) {
				}
			}
			if (targetWriter != null) {
				try {
					targetWriter.close();
				} catch (IOException e) {
				}
			}
		}
	}

	public static final int BUFFER_SIZE = 4096;

	// ---------------------------------------------------------------------
	// Copy methods for java.io.File
	// ---------------------------------------------------------------------

	/**
	 * Copy the contents of the given input File to the given output File.
	 * 
	 * @param in
	 *            the file to copy from
	 * @param out
	 *            the file to copy to
	 * @return the number of bytes copied
	 * @throws IOException
	 *             in case of I/O errors
	 */
	public static int copy(File in, File out) throws IOException {

		int ret = copy(new BufferedInputStream(new FileInputStream(in)), new BufferedOutputStream(new FileOutputStream(out)));

		out.setLastModified(in.lastModified());

		return ret;
	}

	/**
	 * Copy the contents of the given byte array to the given output File.
	 * 
	 * @param in
	 *            the byte array to copy from
	 * @param out
	 *            the file to copy to
	 * @throws IOException
	 *             in case of I/O errors
	 */
	public static void copy(byte[] in, File out) throws IOException {
		ByteArrayInputStream inStream = new ByteArrayInputStream(in);
		OutputStream outStream = new BufferedOutputStream(new FileOutputStream(out));
		copy(inStream, outStream);
	}

	/**
	 * Copy the contents of the given input File into a new byte array.
	 * 
	 * @param in
	 *            the file to copy from
	 * @return the new byte array that has been copied to
	 * @throws IOException
	 *             in case of I/O errors
	 */
	public static byte[] copyToByteArray(File in) throws IOException {
		return copyToByteArray(new BufferedInputStream(new FileInputStream(in)));
	}

	// ---------------------------------------------------------------------
	// Copy methods for java.io.InputStream / java.io.OutputStream
	// ---------------------------------------------------------------------

	/**
	 * Copy the contents of the given InputStream to the given OutputStream. Closes both streams when done.
	 * 
	 * @param in
	 *            the stream to copy from
	 * @param out
	 *            the stream to copy to
	 * @return the number of bytes copied
	 * @throws IOException
	 *             in case of I/O errors
	 */
	public static int copy(InputStream in, OutputStream out) throws IOException {
		try {
			int byteCount = 0;
			byte[] buffer = new byte[BUFFER_SIZE];
			int bytesRead = -1;
			while ((bytesRead = in.read(buffer)) != -1) {
				out.write(buffer, 0, bytesRead);
				byteCount += bytesRead;
			}
			out.flush();
			return byteCount;
		} finally {
			try {
				in.close();
			} catch (IOException ex) {
			}
			try {
				out.close();
			} catch (IOException ex) {
			}
		}
	}

	/**
	 * Copy the contents of the given byte array to the given OutputStream. Closes the stream when done.
	 * 
	 * @param in
	 *            the byte array to copy from
	 * @param out
	 *            the OutputStream to copy to
	 * @throws IOException
	 *             in case of I/O errors
	 */
	public static void copy(byte[] in, OutputStream out) throws IOException {
		try {
			out.write(in);
		} finally {
			try {
				out.close();
			} catch (IOException ex) {
			}
		}
	}

	/**
	 * Copy the contents of the given InputStream into a new byte array. Closes the stream when done.
	 * 
	 * @param in
	 *            the stream to copy from
	 * @return the new byte array that has been copied to
	 * @throws IOException
	 *             in case of I/O errors
	 */
	public static byte[] copyToByteArray(InputStream in) throws IOException {
		ByteArrayOutputStream out = new ByteArrayOutputStream(BUFFER_SIZE);
		copy(in, out);
		return out.toByteArray();
	}

	// ---------------------------------------------------------------------
	// Copy methods for java.io.Reader / java.io.Writer
	// ---------------------------------------------------------------------

	/**
	 * Copy the contents of the given Reader to the given Writer. Closes both when done.
	 * 
	 * @param in
	 *            the Reader to copy from
	 * @param out
	 *            the Writer to copy to
	 * @return the number of characters copied
	 * @throws IOException
	 *             in case of I/O errors
	 */
	public static int copy(Reader in, Writer out) throws IOException {
		try {
			int byteCount = 0;
			char[] buffer = new char[BUFFER_SIZE];
			int bytesRead = -1;
			while ((bytesRead = in.read(buffer)) != -1) {
				out.write(buffer, 0, bytesRead);
				byteCount += bytesRead;
			}
			out.flush();
			return byteCount;
		} finally {
			try {
				in.close();
			} catch (IOException ex) {
			}
			try {
				out.close();
			} catch (IOException ex) {
			}
		}
	}

	/**
	 * Copy the contents of the given String to the given output Writer. Closes the write when done.
	 * 
	 * @param in
	 *            the String to copy from
	 * @param out
	 *            the Writer to copy to
	 * @throws IOException
	 *             in case of I/O errors
	 */
	public static void copy(String in, Writer out) throws IOException {
		try {
			out.write(in);
		} finally {
			try {
				out.close();
			} catch (IOException ex) {
			}
		}
	}

	/**
	 * Copy the contents of the given Reader into a String. Closes the reader when done.
	 * 
	 * @param in
	 *            the reader to copy from
	 * @return the String that has been copied to
	 * @throws IOException
	 *             in case of I/O errors
	 */
	public static String copyToString(Reader in) throws IOException {
		StringWriter out = new StringWriter();
		copy(in, out);
		return out.toString();
	}

	public static String readAll(InputStream reader, String encode) throws UnsupportedEncodingException {
		return Lang.readAll(new InputStreamReader(reader, encode));
	}

	public static void deleteAll(File file) {
		if (file == null)
			return;

		if (!file.exists())
			return;

		if (file.isDirectory()) {
			File[] files = file.listFiles();
			if (files != null) {
				for (File f : files) {
					deleteAll(f);
				}
			}
		}

		file.delete();
	}
}
