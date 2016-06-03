package com.qed.course.stu.controller;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;
import com.qed.course.stu.common.Result;
import com.qed.course.stu.kit.Encrypt;
import com.qed.course.stu.kit.Identify;
import com.qed.course.stu.model.Stu;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lonel on 2016/6/1.
 */
public class StuController extends Controller {

    Logger logger = LoggerFactory.getLogger(this.getClass().getName());
    Result result = new Result();

    public void getStu() {
        Stu stu = Stu.dao.findById(getPara("no"));
        result.setCode(200);
        Map<String, Object> map = new HashMap<>();
        map.put("stu", stu);
        result.setData(map);
        renderJson(result);
    }

    public void getStuList() {
        Map<String, Object> map = new HashMap<>();
        //setAttr(BUSI_REC_PAGE, Recruit.dao.paginate(getParaToInt(1, 1), BUSI_REC_PAGE_SIZE, "select r.*, b.busiUn", "from recruit r, business b where r.busiId = b.busiId and r.ownType = " + ownType));
        logger.debug("--pageNumber->>" + getParaToInt("pageNumber", 1));
        map.put("stuPage", Stu.dao.paginate(getParaToInt("pageNumber", 1), 5, "SELECT *", "FROM stu"));
        result.setCode(200);
        result.setData(map);
        renderJson(result);
    }

    public void save() {
        Stu stu = getModel(Stu.class, "stu");
        stu.setNo(Identify.numberOnly());
        stu.setPwd(Encrypt.md5(stu.getPwd()));
        stu.save();
        result.setCode(200);
        renderJson(result);
    }

    public void unIsExisted() {
        String un = getPara("un");
        boolean isExisted = Stu.dao.unIsExisted(un);
        if (isExisted) {
            result.setCode(506);
            result.setMessage("用户 " + un + " 已存在");
        } else {
            result.setCode(200);
        }
        renderJson(result);
    }

    public void modify() {
        Stu stu = getModel(Stu.class, "stu");
        logger.debug("--stu->>" + stu);
        stu.update();
        result.setCode(200);
        renderJson(result);
    }


    public void delete() {
        String no = getPara("no");
        if (Stu.dao.findById(no) != null) {
            Stu.dao.deleteById(no);
            result.setCode(200);
        } else {
            result.setCode(410);
            result.setMessage("该学生信息不存在");
        }
        renderJson(result);
    }
}
