package com.mycom.ussum.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Repository {
    List<Repository> selectAll();
}
