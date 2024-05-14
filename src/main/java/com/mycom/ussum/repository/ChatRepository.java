package com.mycom.ussum.repository;

import com.mycom.ussum.vo.ChatMessage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ChatRepository {
    void createRoom(@Param("room_id") String room_id, @Param("room_name") String room_name);
    void saveMsg(@Param("message") String message ,@Param("room_id") String room_id, @Param("mem_id") String mem_id,
                 @Param("type") String type);
    List<ChatMessage> getMsg(String room_id);
}
