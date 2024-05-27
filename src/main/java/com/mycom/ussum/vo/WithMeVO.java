package com.mycom.ussum.vo;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;


@Getter
@Setter
public class WithMeVO {
    private String withMe_id;
    private String mem_id;
    private double withMe_x;
    private double withMe_y;
    private int withMe_pnum;
    private String withMe_gender;
    private String withMe_title;
    private String withMe_content;
    private Date withMe_sdate;
    private Date withMe_edate;
    private String withMe_thumbnail;
    private String room_id;
}
