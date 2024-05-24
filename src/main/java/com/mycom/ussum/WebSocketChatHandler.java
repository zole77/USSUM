package com.mycom.ussum;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycom.ussum.service.ChatService;
import com.mycom.ussum.vo.ChatMessage;
import com.mycom.ussum.vo.ChatRoom;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketChatHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) {
        // 연결이 수립된 후의 로직을 여기에 추가할 수 있습니다.
    }

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

        Set<WebSocketSession> sessions = room.getSessions();
        if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
            sessions.add(session);
            chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
            sendToEachSocket(sessions, new TextMessage(objectMapper.writeValueAsString(chatMessage)));
            chatService.enterRoom(room.getRoomId(), chatMessage.getMem_id());
        } else if (chatMessage.getType().equals(ChatMessage.MessageType.QUIT)) {
            sessions.remove(session);
            chatMessage.setMessage(chatMessage.getSender() + "님이 퇴장했습니다.");
            sendToEachSocket(sessions, new TextMessage(objectMapper.writeValueAsString(chatMessage)));
            chatService.quitRoom(room.getRoomId(), chatMessage.getMem_id());
        } else {
            sendToEachSocket(sessions, message);
        }
        chatService.saveMsg(message.toString(), room.getRoomId(), chatMessage.getMem_id(),
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
        // 클라이언트가 세션을 닫으면 해당 세션을 방의 세션 목록에서 제거합니다.
        chatService.removeSessionFromRooms(session);
    }
}
