package com.demo.controller;


import com.alibaba.fastjson.JSONObject;
import com.demo.utils.JsonResult;
import com.gitee.freakchicken.DBAPI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * @author yuge
 */
@Slf4j
@RequestMapping("/status")
@RestController
public class StatusController {

    @Autowired
    DBAPI dbapi;

    private JsonResult buildResult(List list) {
        JsonResult result = new JsonResult();
        result.buildTrueNew(list.size(), list);
        return result;
    }

    @RequestMapping("/getStatus")
    public JsonResult getStatus(@RequestParam("group") String group) {
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

    @RequestMapping("/getNodeFlowData")
    public JsonResult getNodeFlowData(@RequestParam(value = "nodeId") String nodeId) {
        Map<String, Object> map = new HashMap<>(3);
        //notify etc..

        List<JSONObject> jsonObjects = dbapi.executeQuery("status", "getNodeFlowData");

        return buildResult(jsonObjects);
    }
}

