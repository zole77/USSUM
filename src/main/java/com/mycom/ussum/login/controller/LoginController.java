package com.mycom.ussum.login.controller;

import com.mycom.ussum.login.service.LoginService;
import com.mycom.ussum.login.vo.LoginVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@RestController

public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping(value = "/login")
    public String showLoginForm(){
        System.out.println("로그인 페이지 실행");
        return "login";
    }

    @PostMapping("/login")
    public String doLogin(@RequestParam("mem_id") String mem_id,
                          @RequestParam("mem_password") String mem_password,
                          RedirectAttributes redirectAttributes,
                          HttpSession session){
        List<LoginVO> result = loginService.login(mem_id, mem_password);

        if (result.isEmpty()) {
            System.out.println("로그인이 안됨");
            redirectAttributes.addFlashAttribute("error", "회원 정보를 다시 확인바랍니다.");
            return "redirect:/login";
        } else {
            System.out.println(result.toString());
            // 로그인 성공 시 세션에 사용자 정보 저장
            int mem_no = result.get(0).getMem_no();
            session.setAttribute("member_no", mem_no);

            return "redirect:/";
        }
    }
    @GetMapping("/logout")
    public String doLogout(HttpSession session){
        session.removeAttribute("mem_no");

        session.invalidate();
        System.out.print("세션삭제완료");
        return "redirect:/";
    }
}
