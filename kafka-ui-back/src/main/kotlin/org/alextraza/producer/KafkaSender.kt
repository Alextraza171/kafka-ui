package org.alextraza.producer

import org.alextraza.rest.KafkaConnectionParams
import org.springframework.kafka.core.KafkaTemplate

interface KafkaSender {

    fun send(topicId: String, message: String)

    fun addTopic(kafkaConnectionParams: KafkaConnectionParams, kafkaTemplate: KafkaTemplate<String, String>)

    fun isServerActive(bootstrapServer: String) : Boolean

    fun addTopic(kafkaConnectionParams: KafkaConnectionParams)

    fun removeTopic(topicId: String)

}
