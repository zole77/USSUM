package com.mycom.ussum.service;


import com.mycom.ussum.vo.CommentVO;

import java.util.List;

public interface CommentService {
    void createComment(CommentVO commentVO);
    List<CommentVO> getComments(int post_no);
    void deleteComment(String post_no, String com_no);
}
