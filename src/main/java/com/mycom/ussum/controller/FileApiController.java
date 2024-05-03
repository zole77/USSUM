package com.mycom.ussum.controller;

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
public class FileApiController {
    private final String uploadDir = Paths.get("C:", "tui-editor", "upload").toAbsolutePath().toString();

    @PostMapping("/imgupload")
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
