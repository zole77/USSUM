package com.mycom.ussum.controller;

import com.mycom.ussum.service.MemberService;
import com.mycom.ussum.vo.MemberVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Member API", description = "Member API입니다.")
@RequestMapping("/member")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/all")
    @Operation(summary = "get all member information", description = "모든 회원의 정보를 불러옵니다.")
    public List<MemberVO> getAllMembers() {
        return memberService.getAllMember();
    }

    @GetMapping("/one")
    @Operation(summary = "회원 한 명의 정보를 불러옴", description = "정보 조회는 회원 id를 통해 이루어진다")
    public MemberVO getOneMember(@Parameter @RequestParam String mem_id) {
        return memberService.getOneMember(mem_id);
    }

    @PostMapping("/modify")
    @Operation(summary = "회원정보 수정")
    public ResponseEntity<String> updateMember(@RequestPart(value = "image", required = false) MultipartFile image,
                                               @RequestPart("data") MemberVO member) {
        return memberService.updateMember(image, member);
    }

    @PostMapping("/drop")
    @Operation(summary = "회원탈퇴")
    public ResponseEntity<String> dropMember(@Parameter @RequestBody String mem_id) {
        try {
            memberService.deleteMember(mem_id);
            return ResponseEntity.ok("회원 탈퇴가 성공적으로 완료되었습니다.");
        } catch (Exception e) {
            // 디버깅 정보를 콘솔에 출력
            log.error("오류가 발생하였습니다.",e);
            return ResponseEntity.status(500).body("회원 탈퇴 중 오류가 발생했습니다. 상세 오류: " + e.getMessage());
        }
    }
}
