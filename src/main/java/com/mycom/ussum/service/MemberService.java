package com.mycom.ussum.service;

import com.mycom.ussum.vo.MemberVO;

import java.util.List;

public interface MemberService {
    List<MemberVO> getAllMember();
    MemberVO getOneMember(String mem_id);
    void updateMember(MemberVO member);
    void deleteMember(String mem_id);
}
