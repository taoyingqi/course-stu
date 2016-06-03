package com.qed.course.stu.kit;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by lonel on 2016/5/2.
 */
public class TimeKit {


    public static Timestamp getTimestamp() {
        return Timestamp.valueOf(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Timestamp((new Date()).getTime())));
    }

}
