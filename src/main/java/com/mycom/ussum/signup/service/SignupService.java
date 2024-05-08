package com.mycom.ussum.signup.service;

import com.mycom.ussum.signup.vo.SignupVO;

public interface SignupService {

    boolean signUp(SignupVO signupVO);
    int checkById(String mem_id);
    int checkByNickname(String mem_nickname);
}
