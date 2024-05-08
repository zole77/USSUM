package com.mycom.ussum.service;

import com.mycom.ussum.repository.Repository;
import com.mycom.ussum.vo.CommentVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final Repository repository;

    @Override
    public void createComment(CommentVO commentVO) {
        repository.createComment(commentVO);
    }

    @Override
    public List<CommentVO> getComments(int post_no) {
        return repository.getComments(post_no);
    }

    @Override
    public void deleteComment(String post_no, String com_no) {
        repository.deleteComment(post_no, com_no);
    }
}
