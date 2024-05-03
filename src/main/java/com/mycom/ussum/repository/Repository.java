package com.mycom.ussum.repository;

import com.mycom.ussum.vo.BoardVO;
import com.mycom.ussum.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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
    int getMemberClapInBoard(@Param("post_no") String post_no, @Param("mem_id") String mem_id);
    void addClap(@Param("post_no") String post_no, @Param("mem_id") String mem_id);
    void addTotalClap(String post_no);
    int getTotalClap(String post_no);
}
