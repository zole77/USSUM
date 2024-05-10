package com.mycom.ussum.service;

import com.mycom.ussum.repository.ChatRepository;
import com.mycom.ussum.vo.ChatMessage;
import com.mycom.ussum.vo.ChatRoom;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {
    private Map<String, ChatRoom> chatRooms;
    private final ChatRepository chatRepository;

    @PostConstruct
    public void init() {
        chatRooms = new LinkedHashMap<>();
    }

    public List<ChatRoom> findAllRoom() {
        return new ArrayList<>(chatRooms.values());
    }

    public ChatRoom findRoomById(String roomId) {
        return chatRooms.get(roomId);
    }

    public ChatRoom createRoom(String name) {
        String randomId = UUID.randomUUID().toString();
        ChatRoom chatRoom = ChatRoom.builder().roomId(randomId).name(name).build();
        chatRooms.put(randomId, chatRoom);
        chatRepository.createRoom(randomId, name);
        return chatRoom;
    }

    public void saveMsg(String msg, String roomId, String mem_id, String type){
        chatRepository.saveMsg(msg, roomId, mem_id, type);
    }

    public List<ChatMessage> getMsg(String roomId){
        return chatRepository.getMsg(roomId);
    }
}
