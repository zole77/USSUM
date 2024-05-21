package com.mycom.ussum.signup.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupVO {
    private String mem_id;
    private String mem_pwd;
    private String mem_phone;
    private String mem_birth;
    private String mem_address;
    private String mem_regdate;
    private String mem_type;
    private String mem_hot;
    private String mem_nickname;
    private String mem_name;


}
