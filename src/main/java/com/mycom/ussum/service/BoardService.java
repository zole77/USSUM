package com.mycom.ussum.service;

import com.mycom.ussum.vo.BoardVO;

import java.util.List;
import java.util.Map;

public interface BoardService {
    boolean savePost(BoardVO board);
    int getAllPostNumber();
    BoardVO getPost(String post_no);
    List<BoardVO> getPagePosts(int page);
    void updatePost(BoardVO board);
    void deletePost(String post_no);
    Map<String, Integer> addClap(String post_no, String mem_id);
    List<BoardVO> getHotPosts();
}
