package com.demo.controller;


import com.alibaba.fastjson.JSONObject;
import com.demo.utils.JsonResult;
import com.gitee.freakchicken.DBAPI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author yuge
 */
@Slf4j
@RequestMapping("/home")
@RestController
public class HomeController {

    @Autowired
    DBAPI dbapi;

    private JsonResult buildResult(List list){
        JsonResult result = new JsonResult();
        result.buildTrueNew(list.size(),list);
        return result;
    }

    @RequestMapping("/getAbnormalInfo")
    public JsonResult getAbnormalInfo() {
        List<JSONObject> jsonObjects = dbapi.executeQuery("home", "getAbnormalInfo");
        return buildResult(jsonObjects);
    }

    @RequestMapping("/getAIoTInfo")
    public JsonResult getAIoTInfo() {
        List<JSONObject> jsonObjects = dbapi.executeQuery("home", "getAIoTInfo");
        return buildResult(jsonObjects);
    }
    @RequestMapping("/getNodeList")
    public JsonResult getNodeList() {
        List<JSONObject> jsonObjects = dbapi.executeQuery("home", "getNodeList");
        return buildResult(jsonObjects);
    }
    @RequestMapping("/getEdgeList")
    public JsonResult getEdgeList() {
        List<JSONObject> jsonObjects = dbapi.executeQuery("home", "getEdgeList");
        return buildResult(jsonObjects);
    }

    @RequestMapping("/getNodeResources")
    public JsonResult getNodeResources() {
        List<String> res=new ArrayList<>();
        res.add("56");
        res.add("40");res.add("48.9");
        res.add("75.7");res.add("133");
        res.add("8.1");res.add("60.9");res.add("178.9");
        res.add("6");res.add("119");res.add("660");
        res.add("61.3");res.add("29.9");res.add("46.4");
        return buildResult(res);
    }

    @RequestMapping("/abnormalQuantityStatistics")
    public JsonResult abnormalQuantityStatistics() {
        JsonResult result = new JsonResult();
        Map<String, Object> map = new HashMap<>(3);
        map.put("gzData", new double[]{12.6, 25.9, 9.0, 62.4, 28.7, 70.7, 45.6, 82.2, 48.7, 18.8, 26.0, 22.3});
        map.put("bjData", new double[]{13.9, 15.9, 11.1, 18.27, 48.3, 69.2, 31.6, 46.6, 55.4, 28.4, 20.23, 10.7});
        map.put("XData",new String[]{"2023-01","2023-02","2023-03","2023-04","2023-05","2023-06",
                "2023-07","2023-08","2023-09","2023-10","2023-11","2023-11","2023-12"});

        result.buildTrueNew(map);
        return result;
    }

    @RequestMapping("/comprehensiveEquipmentIssues")
    public JsonResult comprehensiveEquipmentIssues() {
        List<String> res=new ArrayList<>();
        res.add("113");res.add("47");
        res.add("42");res.add("23");res.add("48");
        return buildResult(res);
    }

    private Map<String,String> createMap(String name,Object value){
        Map<String,String> map=new HashMap<>(2);
        map.put("name",name);
        map.put("value",value.toString());
        return map;
    }

    @RequestMapping("/highFrequencyWarningIssues")
    public JsonResult highFrequencyWarningIssues() {
        List<Map<String,String>> res=new ArrayList<>();
        res.add(createMap("Shuffle失败",31));
        res.add(createMap("任务超时",42));
        res.add(createMap("资源竞争",12));
        res.add(createMap("内存不足",4));
        res.add(createMap("任务失败",24));

        return buildResult(res);
    }


    @RequestMapping("/bigDataMonitoring")
    public JsonResult bigDataMonitoring() {
        List<String> res=new ArrayList<>();
        res.add("86");res.add("297");
        res.add("199");res.add("97");
        res.add("3");res.add("32");
        return buildResult(res);
    }

}

