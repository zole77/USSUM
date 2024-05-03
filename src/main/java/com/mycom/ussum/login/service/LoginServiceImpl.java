package com.mycom.ussum.login.service;

import com.mycom.ussum.login.dao.LoginDAO;
import com.mycom.ussum.login.vo.LoginVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService{

    private final LoginDAO loginDAO;

    @Override
    public List<LoginVO> login(String mem_id, String mem_password){
        return loginDAO.findByIdAndPassword(mem_id, mem_password);
    }
}
