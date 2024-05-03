package com.mycom.ussum.repository;

import com.mycom.ussum.vo.BoardVO;
import com.mycom.ussum.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Repository {
    List<MemberVO> selectAllMember();
    MemberVO selectOneMember(String mem_id);
    void savePost(BoardVO boardVO);
    int getAllPostNumber();
    BoardVO getPost(String post_no);
    List<BoardVO> getPagePosts(int page);
    void updatePost(BoardVO boardVO);
    void deletePost(String post_no);
}
