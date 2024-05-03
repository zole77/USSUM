package com.mycom.ussum.service;

import com.mycom.ussum.repository.Repository;
import com.mycom.ussum.vo.BoardVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
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
            log.error(e.getMessage());
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

    @Override
    public void updatePost(BoardVO board) {
        repository.updatePost(board);
    }

    @Override
    public void deletePost(String post_no) {
        repository.deletePost(post_no);
    }

    @Override
    public int addClap(String post_no, String mem_id) {
        if (repository.getMemberClapInBoard(post_no, mem_id) == 50){
            return 50;
        } else {
            repository.addClap(post_no, mem_id);
            repository.addTotalClap(post_no);
            return repository.getTotalClap(post_no);
        }
    }
}
