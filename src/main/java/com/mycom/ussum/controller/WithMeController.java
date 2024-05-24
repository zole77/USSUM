package com.mycom.ussum.controller;

import com.mycom.ussum.service.WithMeService;
import com.mycom.ussum.vo.WithMeVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/withme", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
@RequiredArgsConstructor
@Tag(name = "WithMe API")
public class WithMeController {

    private final WithMeService service;

    @PostMapping("/new")
    @Operation(summary = "같이 가요 추가", description = """
            post라는 이름으로 json 형태의 입력값을 받는다. image라는 이름으로 이미지 파일을 받는다.\

            이후 데이터베이스에 저장한다.\

            이미지는 C:/withmeimage 폴더에 저장된다.""")
    public void createWithMe(@RequestPart(value = "post") WithMeVO withMeVO,
                             @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        service.createWithMe(withMeVO, image);
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
}
