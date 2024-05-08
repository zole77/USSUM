package com.mycom.ussum.vo;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Getter
@Setter
public class CommentVO {
    private String com_no;
    private String post_no;
    private String com_field;
    private String mem_id;
    private Time create_date;
    private String use;
}
