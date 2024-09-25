package org.alextraza.consumer

import org.alextraza.services.WebSocketHandler
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.kotlin.mock
import org.mockito.kotlin.verify

class TopicListenerTest {

    private lateinit var webSocketHandler: WebSocketHandler
    private lateinit var topicListener: TopicListener

    @BeforeEach
    fun setUp() {
        webSocketHandler = mock()
        topicListener = TopicListenerImpl(webSocketHandler)
    }

    @Test
    fun `should call webSocketHandler when message is received`() {
        val message = "Test message"
        val topicId = "topicID"

        topicListener.onMessage(topicId, message)

        verify(webSocketHandler).sendMessage(topicId, message)
    }
}
