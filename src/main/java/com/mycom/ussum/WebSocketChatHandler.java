package com.mycom.ussum;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycom.ussum.service.ChatService;
import com.mycom.ussum.vo.ChatMessage;
import com.mycom.ussum.vo.ChatRoom;
import jakarta.websocket.OnMessage;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketChatHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final ChatService chatService;
    private final List<WebSocketSession> sessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws IOException {
        sessions.add(session);
    }

    @OnMessage
    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);


        if (chatMessage.getMem_id() == null || chatMessage.getMem_id().isEmpty()) {
            log.error("Invalid mem_id: {}", chatMessage.getMem_id());
            return; // 처리를 중단하거나 적절히 처리합니다.
        }

        // 방 ID가 존재하지 않는 경우 처리
        if (chatMessage.getRoomId() == null) {
            log.error("Room ID is null for message: {}", chatMessage);
            sendErrorMessage(session, "Room ID cannot be null.");
            return;
        }

        ChatRoom room = chatService.findRoomById(chatMessage.getRoomId());
        if (room == null) {
            // 방을 찾을 수 없는 경우 처리
            log.error("Room not found with ID: {}", chatMessage.getRoomId());
            sendErrorMessage(session, "Room not found with ID: " + chatMessage.getRoomId());
            return;
        }

        Set<WebSocketSession> roomSessions = room.getSessions();

        if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
            // TYPE: ENTER
            roomSessions.add(session);
            chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
            sendToEachSocket(roomSessions, new TextMessage(objectMapper.writeValueAsString(chatMessage)));
            chatService.enterRoom(room.getRoomId(), chatMessage.getMem_id());
        } else if (chatMessage.getType().equals(ChatMessage.MessageType.QUIT)) {
            // TYPE: QUIT
            roomSessions.remove(session);
            chatMessage.setMessage(chatMessage.getSender() + "님이 퇴장했습니다.");
            sendToEachSocket(roomSessions, new TextMessage(objectMapper.writeValueAsString(chatMessage)));
            chatService.quitRoom(room.getRoomId(), chatMessage.getMem_id());
        } else {
            // TYPE: TALK
            sendToEachSocket(roomSessions, message);
        }

        // 예: 모든 클라이언트에게 메시지 브로드캐스트
        for (WebSocketSession s : sessions) {
            if (s.isOpen()) { // 세션이 열려 있는 경우에만 메시지 전송
                s.sendMessage(message);
            }
        }

        chatService.saveMsg(chatMessage.getMessage(), room.getRoomId(), chatMessage.getMem_id(),
                chatMessage.getSender(), chatMessage.getType().toString());
    }

    private void sendToEachSocket(Set<WebSocketSession> sessions, TextMessage message) {
        sessions.parallelStream().forEach(roomSession -> {
            try {
                if (roomSession.isOpen()) { // 세션이 열려 있는 경우에만 메시지 전송
                    roomSession.sendMessage(message);
                }
            } catch (IOException e) {
                log.error("Failed to send message", e);
            }
        });
    }

    private void sendErrorMessage(WebSocketSession session, String errorMessage) {
        try {
            // 오류 메시지를 JSON 형식으로 포장합니다.
            String jsonErrorMessage = objectMapper.writeValueAsString(Collections.singletonMap("error", errorMessage));
            if (session.isOpen()) { // 세션이 열려 있는 경우에만 메시지 전송
                session.sendMessage(new TextMessage(jsonErrorMessage));
            }
        } catch (IOException e) {
            log.error("Failed to send error message", e);
        }
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) {

        log.info("WebSocket Connection Closed: {}", status.toString());
        if (status.getCode() >= 1000 && status.getCode() <= 2999) {
            log.error("WebSocket Connection Closed with Error: {}", status.getCode());
            // 클라이언트와의 연결이 오류로 인해 종료된 경우, 적절히 처리합니다.
        }
        chatService.removeSessionFromRooms(session);
    }
}
