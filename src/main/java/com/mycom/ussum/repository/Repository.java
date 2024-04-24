package com.mycom.ussum.repository;

import com.mycom.ussum.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Repository {
    List<MemberVO> selectAllMember();
    MemberVO selectOneMember(MemberVO memberVO);
}
