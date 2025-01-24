package org.alextraza.consumer

import org.alextraza.services.WebSocketHandler
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.apache.kafka.common.record.TimestampType
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
        val topicId = "topicID"
        val record = createConsumerRecord()

        topicListener.onMessage(topicId, record)

        verify(webSocketHandler).sendMessage(topicId, record.value())
    }

    fun createConsumerRecord(): ConsumerRecord<String?, String?> {
        val topic = "test-topic"
        val partition = 0
        val offset = 0L
        val timestamp = System.currentTimeMillis()
        val timestampType = TimestampType.CREATE_TIME
        val checksum = 0L
        val serializedKeySize = 0
        val serializedValueSize = 0
        val key: String? = "key"
        val value: String? = "value"

        return ConsumerRecord(
            topic,
            partition,
            offset,
            timestamp,
            timestampType,
            checksum,
            serializedKeySize,
            serializedValueSize,
            key,
            value
        )
    }
}
