package com.mycom.ussum.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/tui-editor")
@Tag(name = "File API", description = "Toast 에디터와 관련된 기능입니다.")
public class FileApiController {
    private final String uploadDir = Paths.get("C:", "tui-editor", "upload").toAbsolutePath().toString();

    @PostMapping("/imgupload")
    @Tag(name = "File API")
    @Operation(summary = "이미지 업로드", description = "사용자가 Toast Editor에서 업로드한 이미지를 저장합니다.")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "";
        }
        String originalFilename = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        String saveFilename = uuid + "." + extension;
        String fileFullPath = Paths.get(uploadDir, saveFilename).toString();

        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        try {
            File uploadFile = new File(fileFullPath);
            file.transferTo(uploadFile);
            return saveFilename;
        } catch (IOException e){
            throw new RuntimeException(e);
        }
    }
    @GetMapping(value = "/image-print", produces = {MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    @Operation(summary = "이미지 뿌리기", description = "서버에 사용자가 업로드한 이미지를 사용자가 볼 수 있도록 뿌려줍니다.")
    public byte[] printEditorImage(@RequestParam final String filename){
        String fileFullPath = Paths.get(uploadDir, filename).toString();

        File uploadedFile = new File(fileFullPath);
        if(!uploadedFile.exists()){
            throw new RuntimeException();
        }

        try {
            return Files.readAllBytes(uploadedFile.toPath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
