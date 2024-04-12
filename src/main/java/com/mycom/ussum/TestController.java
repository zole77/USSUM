package com.mycom.ussum;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController    //전역 ResponseBody
@RequestMapping("/api")
@Tag(name = "User API", description = "User API입니다.")
public class TestController {
    private static final Logger logger = LoggerFactory.getLogger(TestController.class);

    @GetMapping("/test")
    @Tag(name = "User API")
    @Operation(summary = "test", description = "프론트로 정해진 문구와 boolean값 전달")
    public Map<String, Object> testHandler() {
        logger.info("TEST RestAPI / Test 핸들러 실행");

        Map<String, Object> res = new HashMap<>();
        res.put("SUCCESS", true);
        res.put("SUCCESS_TEXT", "Hello SpringBoot/React");

        return res;
    }
}