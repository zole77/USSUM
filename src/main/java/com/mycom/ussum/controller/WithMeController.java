package com.mycom.ussum.controller;

import com.mycom.ussum.service.WithMeService;
import com.mycom.ussum.vo.WithMeVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping(value = "/withme")
@RequiredArgsConstructor
@Tag(name = "WithMe API")
public class WithMeController {

    private static final Logger logger = Logger.getLogger(WithMeController.class.getName());
    private final WithMeService service;

    @PostMapping(value = "/new", consumes = { "multipart/form-data" })
    @Operation(summary = "같이 가요 추가", description = """
            post라는 이름으로 json 형태의 입력값을 받는다. image라는 이름으로 이미지 파일을 받는다.\

            이후 데이터베이스에 저장한다.

            이미지는 C:/withmeimage 폴더에 저장된다.""")
    public void createWithMe(@RequestPart(value = "post") WithMeVO withMeVO,
                             @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        try {
            if (withMeVO.getWithMe_thumbnail() == null) {
                withMeVO.setWithMe_thumbnail(" ");
            }
            logger.log(Level.INFO, "Received withMeVO: {0}", withMeVO);
            if (image != null) {
                logger.log(Level.INFO, "Received image: {0}", image.getOriginalFilename());
            }
            service.createWithMe(withMeVO, image);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error creating withMe: ", e);
            throw e;
        }
    }

    @GetMapping("/get/{id}")
    @Operation(summary = "id를 통한 같이 가요 조회")
    public WithMeVO getWithMe(@PathVariable int id) {
        return service.getWithMe(id);
    }

    @GetMapping("/getall")
    public List<WithMeVO> getAllWithMe() {
        return service.getAllWithMe();
    }

    @GetMapping("/drop/{id}")
    public void drop(@PathVariable int id) {
        service.dropWithMe(id);
    }

    @PostMapping("/modify")
    public void updateWithMe(@RequestPart(value = "post") WithMeVO withMeVO,
                             @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        service.updateWithMe(withMeVO, image);
    }

    @GetMapping("/image/{image}")
    @Operation(summary = "이미지 불러오기")
    public ResponseEntity<?> returnImage(@PathVariable String image) {
        String fullFilePath = Paths.get("C:", "withmeimage", image).toFile().getAbsolutePath();
        Resource resource = new FileSystemResource(fullFilePath);
        return new ResponseEntity<>(resource, HttpStatus.OK) ;
    }
}
