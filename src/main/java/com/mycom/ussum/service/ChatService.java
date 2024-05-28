package com.mycom.ussum.service;

import com.mycom.ussum.repository.ChatRepository;
import com.mycom.ussum.vo.ChatMessage;
import com.mycom.ussum.vo.ChatRoom;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

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
        initList();
    }

    public List<ChatRoom> findAllRoom() {
        try {
            return new ArrayList<>(chatRooms.values());
        } catch (Exception e) {
            log.error("Error while fetching chat rooms", e);
            throw e;
        }
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

    public boolean isJoined(String roomId, String mem_id) {
        return chatRepository.isJoined(roomId, mem_id);
    }

    public void saveMsg(String msg, String roomId, String mem_id, String nickname, String type){
        chatRepository.saveMsg(msg, roomId, mem_id, nickname, type);
    }

    public List<ChatMessage> getMsg(String roomId){
        return chatRepository.getMsg(roomId);
    }

    public void enterRoom(String roomId, String mem_id){
        chatRepository.enterRoom(roomId, mem_id);
    }

    public void quitRoom(String roomId, String mem_id){
        chatRepository.quitRoom(roomId, mem_id);
    }

    public List<ChatRoom> getRooms(String mem_id){
        List<ChatRoom> rooms = new ArrayList<>();
        for (String roomId : chatRepository.getRooms(mem_id)){
            rooms.add(findRoomById(roomId));
        }
        return rooms;
    }

    private void initList() {
        List<ChatRoom> rooms = chatRepository.loadAllRooms();
        for (ChatRoom room : rooms) {
            chatRooms.put(room.getRoomId(), room);
        }
    }

    public void removeSessionFromRooms(WebSocketSession session) {
        // 모든 채팅 방을 반복하면서 해당 세션을 제거합니다.
        for (ChatRoom room : chatRooms.values()) {
            Set<WebSocketSession> sessions = room.getSessions();
            sessions.remove(session);
        }
    }
}
