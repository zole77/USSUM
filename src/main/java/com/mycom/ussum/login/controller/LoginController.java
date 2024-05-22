package com.mycom.ussum.login.controller;

import com.mycom.ussum.login.service.LoginService;
import com.mycom.ussum.login.vo.LoginVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @GetMapping(value = "/login")
    public String showLoginForm(){
        System.out.println("로그인 페이지 실행");
        return "login";
    }

    @PostMapping("/login")
    public Map<String, Object> doLogin(
                          @RequestParam("mem_id") String mem_id,
                          @RequestParam("mem_pwd") String mem_pwd,
                          RedirectAttributes redirectAttributes,
                          HttpSession session){
        Map<String, Object> map = new HashMap<>();
        LoginVO LoginVO = loginService.login(mem_id, mem_pwd);

        if (LoginVO == null) {
            System.out.println("로그인이 안됨");
            redirectAttributes.addFlashAttribute("error", "회원 정보를 다시 확인바랍니다.");


            return map;
        } else {

            map.put("member", LoginVO);
            map.put("message", "LOGIN SUCCESS");
            session.setAttribute("mem_id", LoginVO.getMem_id());
            return map;
        }
    }
    @GetMapping("/logout")
    public String doLogout(HttpSession session){
        session.removeAttribute("mem_no");

        session.invalidate();
        System.out.println("세션삭제완료");
        return "redirect:/";
    }
}
