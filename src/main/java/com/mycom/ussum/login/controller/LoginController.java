package com.mycom.ussum.login.controller;

import com.mycom.ussum.login.service.LoginService;
import com.mycom.ussum.login.vo.LoginVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    public void  doLogin(//@RequestParam("mem_id") String mem_id,
                          //@RequestParam("mem_pwd") String mem_pwd,
                          @RequestBody LoginVO loginVO,
                          RedirectAttributes redirectAttributes,
                          HttpSession session){
        List<LoginVO> result = loginService.login(loginVO.getMem_id(), loginVO.getMem_pwd());

        if (result == null || result.isEmpty()) {
            System.out.println("로그인이 안됨");
            redirectAttributes.addFlashAttribute("error", "회원 정보를 다시 확인바랍니다.");

        } else {
            for(LoginVO login : result){
                if(login == null){
                    System.out.println("결과 목록에서 Null LoginVO 발견");
                    continue;
                }
            }
            System.out.println(result.toString());
            // 로그인 성공 시 세션에 사용자 정보 저장
            String sessionMemId = result.get(0).getMem_id();
            session.setAttribute("mem_id", sessionMemId);


        }
    }
    @GetMapping("/logout")
    public String doLogout(HttpSession session){
        session.removeAttribute("mem_id");
        session.invalidate();
        System.out.println("세션삭제완료");
        return "redirect:/";
    }
}
