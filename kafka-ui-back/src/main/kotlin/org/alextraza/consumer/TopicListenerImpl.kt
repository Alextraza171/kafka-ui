package org.alextraza.consumer

import org.alextraza.services.WebSocketHandler
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class TopicListenerImpl(private val webSocketHandler: WebSocketHandler) : TopicListener {

    private val logger = LoggerFactory.getLogger(TopicListenerImpl::class.java)

    override fun onMessage(topicId: String, message: String?) {
        logger.info("Message received")
        webSocketHandler.sendMessage(topicId, message);
    }

}
