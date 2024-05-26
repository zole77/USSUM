package com.mycom.ussum.controller;

import com.mycom.ussum.service.MemberService;
import com.mycom.ussum.vo.MemberVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Member API", description = "Member API입니다.")
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/all")
    @Operation(summary = "get all member information", description = "모든 회원의 정보를 불러옵니다.")
    public List<MemberVO> getAllMembers() {
        return memberService.getAllMember();
    }

    @PostMapping("/one")
    @Operation(summary = "회원 한 명의 정보를 불러옴", description = "정보 조회는 회원 id를 통해 이루어진다")
    public MemberVO getOneMember(@Parameter @RequestBody String mem_id) {
        return memberService.getOneMember(mem_id);
    }

    @PostMapping("/modify")
    @Operation(summary = "회원정보 수정")
    public ResponseEntity<String> updateMember(@RequestBody MemberVO member) {
        try {
            System.out.println("Updating member: " + member);
            System.out.println(member.getMem_address());
            System.out.println(member.getMem_name());
            System.out.println(member.getMem_id());
            System.out.println(member.getMem_birth());
            System.out.println(member.getMem_birth().getClass().getName());
            memberService.updateMember(member);
            return ResponseEntity.ok("회원 정보가 성공적으로 수정되었습니다.");
        } catch (Exception e) {
            // 디버깅 정보를 콘솔에 출력
            e.printStackTrace();
            return ResponseEntity.status(500).body("회원 정보 수정 중 오류가 발생했습니다. 상세 오류: " + e.getMessage());
        }
    }

    @PostMapping("/drop")
    @Operation(summary = "회원탈퇴")
    public ResponseEntity<String> dropMember(@Parameter @RequestBody String mem_id) {
        try {
            memberService.deleteMember(mem_id);
            return ResponseEntity.ok("회원 탈퇴가 성공적으로 완료되었습니다.");
        } catch (Exception e) {
            // 디버깅 정보를 콘솔에 출력
            e.printStackTrace();
            return ResponseEntity.status(500).body("회원 탈퇴 중 오류가 발생했습니다. 상세 오류: " + e.getMessage());
        }
    }
}
