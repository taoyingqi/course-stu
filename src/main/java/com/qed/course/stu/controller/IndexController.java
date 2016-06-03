package com.qed.course.stu.controller;

import com.jfinal.core.Controller;
import com.qed.course.stu.common.Result;
import com.qed.course.stu.common.View;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by lonel on 2016/5/30.
 */
public class IndexController extends Controller {

    Logger logger = LoggerFactory.getLogger(this.getClass().getName());
    Result result = new Result();

    public void index() {
        render(View.index);
    }
}
