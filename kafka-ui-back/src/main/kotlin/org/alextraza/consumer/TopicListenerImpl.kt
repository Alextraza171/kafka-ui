package org.alextraza.consumer

import org.alextraza.services.WebSocketHandler
import org.springframework.stereotype.Service

@Service
class TopicListenerImpl(private val webSocketHandler: WebSocketHandler) : TopicListener {

    override fun onMessage(topicId: String, message: String?) {
        webSocketHandler.sendMessage(topicId, message);
    }

}
