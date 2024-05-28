package com.mycom.ussum.repository;

import com.mycom.ussum.vo.WithMeVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WithMeRepository {
    void createWithMe(WithMeVO withMeVO);
    WithMeVO getWithMe(int id);
    List<WithMeVO> getAllWithMe();
    void dropWithMe(int id);
    void updateWithMe(WithMeVO withMeVO);
}
