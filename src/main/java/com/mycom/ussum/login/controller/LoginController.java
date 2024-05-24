package com.mycom.ussum.login.controller;

import com.mycom.ussum.login.service.LoginService;
import com.mycom.ussum.login.vo.LoginVO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
    private final LoginService loginService;

    @PostMapping("/login")
    public Map<String, Object> doLogin(
            @RequestParam("mem_id") String mem_id,
            @RequestParam("mem_pwd") String mem_pwd,
            HttpSession session) {
        Map<String, Object> map = new HashMap<>();
        try {
            LoginVO loginVO = loginService.login(mem_id, mem_pwd);

            if (loginVO == null) {
                logger.info("로그인 실패: 사용자 정보가 존재하지 않습니다.");
                map.put("message", "LOGIN FAILED");
            } else {
                logger.info("로그인 성공: " + loginVO.getMem_id());
                map.put("member", loginVO);
                map.put("message", "LOGIN SUCCESS");
                session.setAttribute("mem_id", loginVO.getMem_id());
            }
        } catch (Exception e) {
            logger.error("로그인 중 오류 발생: ", e);
            map.put("message", "LOGIN ERROR");
        }
        return map;
    }
}
