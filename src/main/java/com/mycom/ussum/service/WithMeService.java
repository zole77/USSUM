package com.mycom.ussum.service;

import com.mycom.ussum.vo.WithMeVO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface WithMeService {
    void createWithMe(WithMeVO withMeVO, MultipartFile image) throws IOException;
    WithMeVO getWithMe(int id);
    List<WithMeVO> getAllWithMe();
    void dropWithMe(int id);
    void updateWithMe(WithMeVO withMeVO, MultipartFile image) throws IOException;
}
