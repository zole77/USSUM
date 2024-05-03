package com.mycom.ussum.controller;

import com.mycom.ussum.service.BoardService;
import com.mycom.ussum.vo.BoardVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/save")
    public Map<String, Boolean> savePost(@RequestBody BoardVO boardVO){
        Map<String, Boolean> map = new HashMap<String, Boolean>();

        boolean isSuccess = boardService.savePost(boardVO);
        map.put("success", isSuccess);

        return map;
    }

    @GetMapping("/{post_no}")
    public BoardVO getPost(@PathVariable("post_no") String post_no){
        return boardService.getPost(post_no);
    }

    @GetMapping("/posts")
    public int getAllPostNumber(){
        return boardService.getAllPostNumber();
    }

    @GetMapping("/")
    public List<BoardVO> getPagePosts(@RequestParam(name = "page", required = false, defaultValue = "1") int page){
        return boardService.getPagePosts(page);
    }
}
