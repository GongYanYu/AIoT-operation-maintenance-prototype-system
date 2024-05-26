package com.demo.controller;


import com.alibaba.fastjson.JSONObject;
import com.demo.utils.JsonResult;
import com.gitee.freakchicken.DBAPI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author yuge
 */
@Slf4j
@RequestMapping("/detail")
@RestController
public class DetailController {

    @Autowired
    DBAPI dbapi;

    private JsonResult buildResult(List list) {
        JsonResult result = new JsonResult();
        result.buildTrueNew(list.size(), list);
        return result;
    }

    @RequestMapping("/getAIoTValue")
    public JsonResult getAIoTValue(@RequestParam("group") String group) {
        Map<String, Object> map = new HashMap<>(1);
        //notify etc..
        map.put("group", group);

        List<JSONObject> jsonObjects = dbapi.executeQuery("status", "getStatus", map);

        return buildResult(jsonObjects);
    }

    @RequestMapping("/updateStatus")
    public JsonResult updateStatus(@RequestParam("id") Integer id, @RequestParam("value") String value) {
        Map<String, Object> map = new HashMap<>(2);
        map.put("id", id);
        map.put("value", value);

        dbapi.executeUpdate("status", "updateStatus", map);

        JsonResult jsonResult = new JsonResult();
        jsonResult.buildTrueNew();
        return jsonResult;
    }
}

