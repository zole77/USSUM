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

//    @Autowired
//    public LoginController(LoginService loginService) {
//        this.loginService = loginService;
//    }

    @GetMapping(value = "/login")
    public String showLoginForm(){
        System.out.println("로그인 페이지 실행");
        return "login";
    }

    @PostMapping("/login")
    public Map<String, String> doLogin(
                          @RequestParam("mem_id") String mem_id,
                          @RequestParam("mem_pwd") String mem_pwd,
                          RedirectAttributes redirectAttributes,
                          HttpSession session){
        Map<String, String> map = new HashMap<>();
        String result = loginService.login(mem_id, mem_pwd).getMem_id();

        if (result == null) {
            System.out.println("로그인이 안됨");
            redirectAttributes.addFlashAttribute("error", "회원 정보를 다시 확인바랍니다.");
//            return "redirect:/login";

            return map;
        } else {
//            System.out.println(result.getFirst().toString());
            // 로그인 성공 시 세션에 사용자 정보 저장
            map.put("mem_id", result);
            map.put("message", "LOGIN SUCCESS");
            session.setAttribute("mem_id", result);
            return map;

//            return "redirect:/";
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
