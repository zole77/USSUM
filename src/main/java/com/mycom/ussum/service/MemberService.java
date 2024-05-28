package com.mycom.ussum.service;

import com.mycom.ussum.vo.MemberVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MemberService {
    List<MemberVO> getAllMember();
    MemberVO getOneMember(String mem_id);
    ResponseEntity<String> updateMember(MultipartFile image , MemberVO member);
    void deleteMember(String mem_id);
}
