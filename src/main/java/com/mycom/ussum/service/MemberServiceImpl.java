package com.mycom.ussum.service;

import com.mycom.ussum.repository.Repository;
import com.mycom.ussum.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final Repository repository;

    @Override
    public List<MemberVO> getAllMember() {
        return repository.selectAllMember();
    }
}
