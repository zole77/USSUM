package com.mycom.ussum.signup.controller;

import com.mycom.ussum.signup.service.SignupService;
import com.mycom.ussum.signup.vo.SignupVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class SignupController {

    private final SignupService signupService;

    @Autowired
    public SignupController(SignupService signupService) {
        this.signupService = signupService;
    }
    @RequestMapping("/signup")
    public String doSignup(){
        System.out.println("회원가입 페이지 실행");
        return "signup";
    }
    @PostMapping("/signup/어디")
    public String signUp(SignupVO signupVO, RedirectAttributes redirectAttributes){
        boolean isSuccess = signupService.signUp(signupVO);
        if(isSuccess){
            return "redirect:/login";
        } else{
            //에러 메시지 주고 회원가입으로 돌아감
            redirectAttributes.addFlashAttribute("error",true);
            return "redirect:/signup";
        }
    }

    @PostMapping("/signup/url")
    @ResponseBody
    public int checkById(@RequestParam String mem_id){
        return signupService.checkById((mem_id));
    }
    @PostMapping("/signup/url2")
    @ResponseBody
    public int checkByNickname(@RequestParam String mem_nickname){
        return signupService.checkByNickname(mem_nickname);

    }

}