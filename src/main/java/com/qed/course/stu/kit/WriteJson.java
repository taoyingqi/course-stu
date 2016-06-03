package com.qed.course.stu.kit;

import com.alibaba.fastjson.JSON;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class WriteJson {
	
	private static final long serialVersionUID = 1L;
	
	static private WriteJson writeJson = null;
	
	protected WriteJson() {
	}
	
	public static synchronized WriteJson getInstance () {
		if (writeJson == null) {
			writeJson = new WriteJson();
		}
		return writeJson;
	}
	
	public void write(HttpServletResponse response, Object object) {
		try {
			//SerializerFeature feature = SerializerFeature.DisableCircularReferenceDetect;
			String json = JSON.toJSONStringWithDateFormat(object, "yyyy-MM-dd HH:mm:ss");
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write(json);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
