package com.mycom.ussum.signup.service;

import com.mycom.ussum.signup.dao.SignupDAO;
import com.mycom.ussum.signup.vo.SignupVO;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupServiceImpl implements SignupService{

    private final SignupDAO signupDAO;

    @Autowired
    public SignupServiceImpl(SignupDAO signupDAO){
        this.signupDAO = signupDAO;
    }

    @Override
    public boolean signUp(SignupVO signupVO){
        int checkById = signupDAO.checkById(signupVO.getMem_id());

        int checkByNickname = signupDAO.checkByNickname(signupVO.getMem_nickname());

        if (checkById == 0) {
            signupDAO.signUp(signupVO);
            return true;  //ㅇㅋ
        } else {
            return false; // x
        }
    }

    @Override
    public int checkById(String mem_id) {

        return signupDAO.checkById(mem_id);
    }
    @Override
    public int checkByNickname(String mem_nickname) {

        return signupDAO.checkByNickname(mem_nickname);
    }
}
