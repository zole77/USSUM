package com.mycom.ussum.signup.controller;

import com.mycom.ussum.signup.service.SignupService;
import com.mycom.ussum.signup.vo.SignupVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

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

    @PostMapping("/signup/register")
    @ResponseBody
    public Map<String, Boolean> signUp(@RequestBody SignupVO signupVO, RedirectAttributes redirectAttributes){
        System.out.println(signupVO.getMem_id());
        boolean isSuccess = signupService.signUp(signupVO);
        Map<String, Boolean> map = new HashMap<>();
        map.put("isSuccess", isSuccess);
        return map;
    }

    @PostMapping("/signup/checkDuplicate")
    @ResponseBody
    public int checkById(@RequestParam String mem_id){
        return signupService.checkById(mem_id);
    }

    @PostMapping("/signup/checkNickname")
    @ResponseBody
    public int checkByNickname(@RequestParam String mem_nickname){
        return signupService.checkByNickname(mem_nickname);

    }

}