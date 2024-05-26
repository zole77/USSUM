package com.mycom.ussum.login.service;

import com.mycom.ussum.login.dao.LoginDAO;
import com.mycom.ussum.login.vo.LoginVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private static final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);
    private final LoginDAO loginDAO;

    @Override
    public LoginVO login(String mem_id, String mem_pwd) {
        try {
            LoginVO result = loginDAO.findByIdAndPassword(mem_id, mem_pwd);
            if (result != null) {
                logger.info("로그인 성공: " + result.getMem_id());
            } else {
                logger.info("로그인 실패: 사용자 정보가 존재하지 않습니다.");
            }
            return result;
        } catch (Exception e) {
            logger.error("로그인 중 오류 발생: ", e);
            throw e;
        }
    }
}
