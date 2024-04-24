package com.mycom.ussum.controller;

import com.mycom.ussum.service.MemberService;
import com.mycom.ussum.vo.MemberVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Member API", description = "Member API입니다.")
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/all")
    @Tag(name = "Member API")
    @Operation(summary = "get all member information", description = "모든 회원의 정보를 불러옵니다.")
    public List<MemberVO> getAllMembers(){
        return memberService.getAllMember();
    }

    @PostMapping("/one")
    @Tag(name = "Member API")
    public MemberVO getOneMember(@RequestBody MemberVO memberVO){
        return memberService.getOneMember(memberVO);
    }
}
