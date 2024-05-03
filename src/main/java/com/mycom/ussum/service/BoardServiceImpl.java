package com.mycom.ussum.service;

import com.mycom.ussum.repository.Repository;
import com.mycom.ussum.vo.BoardVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final Repository repository;

    @Override
    public boolean savePost(BoardVO board) {
        boolean result = true;
        try {
            repository.savePost(board);
        } catch (Exception e) {
            e.printStackTrace();
            result = false;
        }
        return result;
    }

    @Override
    public BoardVO getPost(String post_no) {
        return repository.getPost(post_no);
    }

    @Override
    public int getAllPostNumber() {
        return repository.getAllPostNumber();
    }

    @Override
    public List<BoardVO> getPagePosts(int page) {
        return repository.getPagePosts(page);
    }
}
