package org.alextraza.services

import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Service

@Service
class WebSocketHandlerImpl(private val messagingTemplate: SimpMessagingTemplate) : WebSocketHandler {

    override fun sendMessage(topicId: String, message: String?) {
        messagingTemplate.convertAndSend("/topic/$topicId", message ?: "null")
    }

}