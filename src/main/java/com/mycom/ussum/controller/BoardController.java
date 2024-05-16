package com.mycom.ussum.controller;

import com.mycom.ussum.service.BoardService;
import com.mycom.ussum.vo.BoardVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

    @GetMapping("/allposts")
    @Operation(summary = "전체 게시글 조회")
    public List<BoardVO> getAllPosts(){
        return boardService.getAllPosts();
    }

    @PostMapping("/update")
    @Operation(summary = "수정", description = "기존의 글을 수정합니다.")
    public void updatePost(@RequestBody BoardVO boardVO){
        boardService.updatePost(boardVO);
    }

    @GetMapping("/post/{post_no}")
    @Operation(summary = "조회", description = "특정 게시물을 조회합니다. GET방식을 사용하며 인자로 게시글 번호를 받습니다. " +
            "{post_no} 자리에 게시글 번호를 넣어서 서버로 요청을 보내면 됩니다.")
    public BoardVO getPost(@Parameter(description = "게시글 번호") @PathVariable("post_no") String post_no){
        return boardService.getPost(post_no);
    }

    @GetMapping("/posts")
    @Operation(summary = "게시글 숫자 조회",
            description = "등록되어 있는 게시물이 얼마나 있는지 확인힙니다. 페이징을 위해 마련된 기능입니다.")
    public int getAllPostNumber(){
        return boardService.getAllPostNumber();
    }

    @GetMapping("/page/{page}")
    @Operation(summary = "일정 개수만큼 게시글 조회",
    description = "페이징 기능을 위한 API입니다. 페이지 번호를 지정하면 10개씩 잘라서 프론트로 넘깁니다. " +
            "예를 들어 2를 인자로 넘기면 11번째 게시물과 20번째 게시물까지 가져옵니다. " +
            "{page} 자리에 페이지 번호를 넣어서 서버로 넘겨주면 됩니다.")
    public List<BoardVO> getPagePosts(@Parameter(description = "페이지 번호") @PathVariable("page") int page){
        return boardService.getPagePosts(page);
    }

    @GetMapping("/delete/{post_no}")
    @Operation(summary = "삭제", description = "글을 삭제합니다.")
    public void deletePost(@Parameter(description = "게시글 번호") @PathVariable("post_no") String post_no){
        boardService.deletePost(post_no);
    }

    @PostMapping("/addClap")
    @Operation(summary = "좋아요 추가", description = "좋아요 추가. 한 사람당 한 게시글에 최대 50번까지 가능. "+
            "결과값으로 현재 게시글의 총 박수 수와 개인 박수 수를 반환한다.",
    responses = {
            @ApiResponse(
                    responseCode = "200",
                    description = "게시물의 총 박수 수와 좋아요를 누른 사람이 해당 게시물에서 박수를 몇 번 눌렀는지 반환한다.",
                    content = @Content(
                            schemaProperties = {
                                    @SchemaProperty(name = "personalClap", schema = @Schema(type = "integer", example = "49")),
                                    @SchemaProperty(name = "toalClap", schema = @Schema(type = "integer", example = "2948"))
                            }
                    )
            )
    })
    public Map<String, Integer> addClap(@RequestParam("post_no") String post_no, @RequestParam("mem_id") String mem_id){
        return boardService.addClap(post_no, mem_id);
    }

    @GetMapping("/hot")
    @Operation(summary = "인기 게시글 불러오기", description = "전체 게시글을 불러오되 추천 수가 많은 순으로 정렬합니다.")
    public List<BoardVO> getHotPosts(){
        return boardService.getHotPosts();
    }
}