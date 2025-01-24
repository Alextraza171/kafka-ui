package org.alextraza.consumer

import org.apache.kafka.clients.consumer.ConsumerRecord

interface TopicListener {
    fun onMessage(topicId: String, message: ConsumerRecord<String?, String?>)
}
