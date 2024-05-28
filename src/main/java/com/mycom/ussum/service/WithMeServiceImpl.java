package com.mycom.ussum.service;

import com.mycom.ussum.repository.WithMeRepository;
import com.mycom.ussum.vo.WithMeVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class WithMeServiceImpl implements WithMeService {

    private final WithMeRepository repo;

    private final String uploadDir = Paths.get("C:", "withmeimage").toAbsolutePath().toString();

    @Override
    public void createWithMe(WithMeVO withMeVO, MultipartFile image) throws IOException {
        if(image == null){
            repo.createWithMe(withMeVO);
        } else {
            String imageName = saveImage(image);
            withMeVO.setWithMe_thumbnail(imageName);
            repo.createWithMe(withMeVO);
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

    @Override
    public void dropWithMe(int id) {
        repo.dropWithMe(id);
    }

    @Override
    public void updateWithMe(WithMeVO withMeVO, MultipartFile image) throws IOException {
        boolean isSuccess;
        if(image == null){
            File deleteFile = new File(repo.getWithMe(Integer.parseInt(withMeVO.getWithMe_id())).getWithMe_thumbnail());
            isSuccess = deleteFile.delete();
        } else {
            String imageName = saveImage(image);
            withMeVO.setWithMe_thumbnail(imageName);
            File deleteFile = new File(repo.getWithMe(Integer.parseInt(withMeVO.getWithMe_id())).getWithMe_thumbnail());
            isSuccess = deleteFile.delete();
        }
        if(isSuccess){
            log.info("파일 삭제 완료");
        }
//        repo.updateWithMe(withMeVO);
    }

    private String saveImage(MultipartFile image) throws IOException {

        String originalFilename = image.getOriginalFilename();
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        String imageName = uuid + originalFilename.substring(originalFilename.lastIndexOf("."));
        String fullFilePath = Paths.get(uploadDir, imageName).toAbsolutePath().toString();

        File dir = new File(uploadDir);
        if(!dir.exists()){
            boolean isSuccess = dir.mkdirs();
            if(isSuccess){
                log.info("폴더 생성 완료");
            }
        }

        try {
            File uploadFile = new File(fullFilePath);
            image.transferTo(uploadFile);
        } catch (IOException e){
            log.error("이미지 저장 중 오류 발생", e);
            throw new IOException(e);
        }
        return imageName;
    }
}
