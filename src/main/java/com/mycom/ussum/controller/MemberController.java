package com.mycom.ussum.controller;

import com.mycom.ussum.service.MemberService;
import com.mycom.ussum.vo.MemberVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Member API", description = "Member API입니다.")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/member")
    @Tag(name = "Member API")
    @Operation(summary = "get all member information", description = "모든 회원의 정보를 불러옵니다.")
    public List<MemberVO> getAllMembers(){
        return memberService.getAllMember();
    }
}
