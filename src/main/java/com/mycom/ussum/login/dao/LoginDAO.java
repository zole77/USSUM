package com.mycom.ussum.login.dao;

import com.mycom.ussum.login.vo.LoginVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface LoginDAO {
    LoginVO findByIdAndPassword(@Param("mem_id") String mem_id, @Param("mem_pwd") String mem_pwd);
}
