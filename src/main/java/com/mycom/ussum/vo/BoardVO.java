package com.mycom.ussum.vo;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class BoardVO {
    private String post_no;
    private Date post_date;
    private String post_title;
    private String mem_id;
    private String post_content;
}
