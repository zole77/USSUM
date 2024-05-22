package com.mycom.ussum.login.service;

import com.mycom.ussum.login.dao.LoginDAO;
import com.mycom.ussum.login.vo.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginServiceImpl implements LoginService{

    private final LoginDAO loginDAO;
    @Autowired
    public LoginServiceImpl(LoginDAO loginDAO) {
        this.loginDAO = loginDAO;
    }

    @Override
    public List<LoginVO> login(String mem_id, String mem_pwd){
        List<LoginVO> areaList = loginDAO.findByIdAndPassword(mem_id, mem_pwd);
        if(areaList == null){
            throw new NullPointerException("LoginDAO에서 null 반환");
        }
        return areaList;
    }


}
