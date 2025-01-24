package org.alextraza.consumer

import org.alextraza.services.WebSocketHandler
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class TopicListenerImpl(private val webSocketHandler: WebSocketHandler) : TopicListener {

    private val logger = LoggerFactory.getLogger(TopicListenerImpl::class.java)

    override fun onMessage(topicId: String, message: ConsumerRecord<String?, String?>) {
        logger.info("Message received")
        val headers = message.headers()
        headers.forEach { header ->
            println("Header key: ${header.key()}, value: ${String(header.value() ?: ByteArray(0))}")
        }
        webSocketHandler.sendMessage(topicId, message.value())
    }

}
