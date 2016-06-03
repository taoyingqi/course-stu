package com.qed.course.stu.kit;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.UUID;

public class Identify {

	private static int seqNum = 0;
	private static int MAX = 999;
	private final static NumberFormat numberFormat = new DecimalFormat("000");

	public static String increase() {
		if (seqNum >= MAX) {
			seqNum = 0;
		} else {
			seqNum++;
		}
		return numberFormat.format(seqNum);
	}

	public static String numberOnly() {
		if (seqNum >= MAX) {
			seqNum = 0;
		} else {
			seqNum++;
		}
		String seqStr = numberFormat.format(seqNum);
		String timeStr = String.valueOf(System.currentTimeMillis());
		return timeStr + seqStr;
	}

	public static String createRandom(boolean flag, int length) {
		String retStr = "";
		String strTable = flag ? "1234567890" : "1234567890abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ_";
		int len = strTable.length();
		boolean bDone = true;
		do {
			retStr = "";
			int count = 0;
			for (int i = 0; i < length; i++) {
				double dblR = Math.random() * len;
				int intR = (int) Math.floor(dblR);
				char c = strTable.charAt(intR);
				if (('0' <= c) && (c <= '9')) {
					count++;
				}
				retStr += strTable.charAt(intR);
			}
			if (count >= 2) {
				bDone = false;
			}
		} while (bDone);

		return retStr;
	}


	public static String UUID() {
		return UUID.randomUUID().toString().replaceAll("\\-", "");
	}


	public static String timeTag() {
		return String.valueOf(System.nanoTime());
	}
}
