package com.mycom.ussum.controller;

import com.mycom.ussum.service.BoardService;
import com.mycom.ussum.vo.BoardVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@Tag(name = "Board API", description = "커뮤니티 기능에 쓰이는 API입니다")
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/save")
    @Tag(name = "Board API")
    @Operation(summary = "등록", description = "새로운 글을 등록합니다.")
    public Map<String, Boolean> savePost(@RequestBody BoardVO boardVO){
        Map<String, Boolean> map = new HashMap<>();

        boolean isSuccess = boardService.savePost(boardVO);
        map.put("success", isSuccess);

        return map;
    }

    @PostMapping("/update")
    @Tag(name = "Board API")
    @Operation(summary = "수정", description = "기존의 글을 수정합니다.")
    public void updatePost(@RequestBody BoardVO boardVO){
        boardService.updatePost(boardVO);
    }

    @GetMapping("/post/{post_no}")
    @Tag(name = "Board API")
    @Operation(summary = "조회", description = "특정 게시물을 조회합니다. GET방식을 사용하며 인자로 게시글 번호를 받습니다. " +
            "{post_no} 자리에 게시글 번호를 넣어서 서버로 요청을 보내면 됩니다.")
    public BoardVO getPost(@Parameter(description = "게시글 번호") @PathVariable("post_no") String post_no){
        return boardService.getPost(post_no);
    }

    @GetMapping("/posts")
    @Tag(name = "Board API")
    @Operation(summary = "게시글 숫자 조회",
            description = "등록되어 있는 게시물이 얼마나 있는지 확인힙니다. 페이징을 위해 마련된 기능입니다.")
    public int getAllPostNumber(){
        return boardService.getAllPostNumber();
    }

    @GetMapping("/page/{page}")
    @Tag(name = "Board API")
    @Operation(summary = "일정 개수만큼 게시글 조회",
    description = "페이징 기능을 위한 API입니다. 페이지 번호를 지정하면 10개씩 잘라서 프론트로 넘깁니다. " +
            "예를 들어 2를 인자로 넘기면 11번째 게시물과 20번째 게시물까지 가져옵니다. " +
            "{page} 자리에 페이지 번호를 넣어서 서버로 넘겨주면 됩니다.")
    public List<BoardVO> getPagePosts(@Parameter(description = "페이지 번호") @PathVariable("page") int page){
        return boardService.getPagePosts(page);
    }

    @GetMapping("/delete/{post_no}")
    @Tag(name = "Board API")
    @Operation(summary = "삭제", description = "글을 삭제합니다.")
    public void deletePost(@Parameter(description = "게시글 번호") @PathVariable("post_no") String post_no){
        boardService.deletePost(post_no);
    }
}
