package com.mycom.ussum.service;

import com.mycom.ussum.repository.Repository;
import com.mycom.ussum.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
public class MemberServiceImpl implements MemberService {

    private final Repository repository;
    private final String uploadDir = Paths.get("C:","profileimage").toAbsolutePath().toString();

    @Override
    public List<MemberVO> getAllMember() {
        return repository.selectAllMember();
    }

    @Override
    public MemberVO getOneMember(String mem_id) {
        return repository.selectOneMember(mem_id);
    }

    @Override
    public ResponseEntity<String> updateMember(MultipartFile image, MemberVO member) {
        if (image != null) {
            String originalFilename = image.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String fileName = UUID.randomUUID() + extension;
            String filePath = Paths.get(uploadDir, fileName).toAbsolutePath().toString();

            File dir = new File(uploadDir);
            if (!dir.exists()) {
                boolean isSuccess = dir.mkdirs();
                if (isSuccess) {
                    log.info("새 디렉토리 생성 완료");
                }

            }
            try {
                File file = new File(filePath);
                image.transferTo(file);
                member.setMem_image(filePath);
//                System.out.println(filePath);
            } catch (IOException e) {
                log.error("파일 저장 중 오류 발생", e);
                return ResponseEntity.status(500).body("파일 저장 중 오류가 발생했습니다." + e);
            }

        } else {
            String memImage = repository.getMemImage(member.getMem_id());
            if (!memImage.equals("없음")){
                File deleteFile = new File(memImage);
                boolean isSuccess = deleteFile.delete();
                if (isSuccess) {
                    log.info("성공적으로 파일 삭제됨");
                }
            }
        }

        try {
//            System.out.println(member.getMem_pwd());
//            System.out.println(member.getMem_phone());
//            System.out.println(member.getMem_birth());
//            System.out.println(member.getMem_address());
//            System.out.println(member.getMem_id());
//            System.out.println(member.getMem_type());
//            System.out.println(member.getMem_nickname());
//            System.out.println(member.getMem_image());
            repository.updateMember(member);
        } catch (Exception e) {
            log.error("DB 저장 중 오류 발생", e);
            return ResponseEntity.status(500).body("DB에 저장 중 오류가 발생했습니다." + e);
        }
        return ResponseEntity.ok("회원정보가 성공적으로 수정되었습니다.");
    }

    @Override
    public void deleteMember(String mem_id) {
        repository.deleteMember(mem_id);
    }

}
