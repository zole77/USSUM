package com.mycom.ussum.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    public enum MessageType {
        ENTER, QUIT, TALK
    }
    private MessageType type;
    private String roomId;
    private String memId;
    private String sender;
    private String message;
}
