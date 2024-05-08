package com.mycom.ussum.signup.dao;

import com.mycom.ussum.signup.vo.SignupVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SignupDAO {

    void signUp(SignupVO signupVO);

    int checkById(String Id);

    int checkByNickname(String nickname);
}
