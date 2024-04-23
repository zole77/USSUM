package com.mycom.ussum.controller;

import com.mycom.ussum.service.MemberService;
import com.mycom.ussum.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/member")
    public List<MemberVO> getAllMembers(){
        return memberService.getAllMember();
    }
}
