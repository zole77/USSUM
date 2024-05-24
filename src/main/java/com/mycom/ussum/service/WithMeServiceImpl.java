package com.mycom.ussum.service;

import com.mycom.ussum.repository.WithMeRepository;
import com.mycom.ussum.vo.WithMeVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WithMeServiceImpl implements WithMeService {

    private final WithMeRepository repo;

    private final String uploadDir = Paths.get("C:", "withmeimage").toAbsolutePath().toString();

    @Override
    public void createWithMe(WithMeVO withMeVO, MultipartFile image) throws IOException {
        if(image.isEmpty()){
            repo.createWithMe(withMeVO);
        } else {
            String originalFilename = image.getOriginalFilename();
            String uuid = UUID.randomUUID().toString().replaceAll("-", "");
            String imageName = uuid + originalFilename.substring(originalFilename.lastIndexOf("."));
            String fullFilePath = Paths.get(uploadDir, imageName).toAbsolutePath().toString();

            File dir = new File(uploadDir);
            if(!dir.exists()){
                dir.mkdirs();
            }

            try {
                File uploadFile = new File(fullFilePath);
                image.transferTo(uploadFile);
                withMeVO.setWithMe_thumbnail(fullFilePath);
                repo.createWithMe(withMeVO);
            } catch (Exception e){
                throw new IOException(e);
            }
        }
    }

    @Override
    public WithMeVO getWithMe(int id) {
        return repo.getWithMe(id);
    }

    @Override
    public List<WithMeVO> getAllWithMe() {
        return repo.getAllWithMe();
    }
}
