package com.mycom.ussum.controller;

import com.mycom.ussum.service.ChatService;
import com.mycom.ussum.vo.ChatMessage;
import com.mycom.ussum.vo.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/chatList")
    public List<ChatRoom> chatList(){
        return chatService.findAllRoom();
    }

    @PostMapping("/createRoom")
    public Map<String, Object> createRoom(@RequestParam String name, String username){
        ChatRoom room = chatService.createRoom(name);
        Map<String, Object> map = new HashMap<>();
        map.put("room", room);
        map.put("username", username);
        return map;
    }

    @GetMapping("/chatRoom")
    public Map<String, Object> chatRoom(@RequestParam String roomId){
        Map<String, Object> map = new HashMap<>();
        ChatRoom room = chatService.findRoomById(roomId);
        map.put("room", room);
        return map;
    }

    @GetMapping("/getMessages/{roomId}")
    public List<ChatMessage> getMessages(@PathVariable("roomId") String roomId){
        return chatService.getMsg(roomId);
    }
}
