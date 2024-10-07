package org.alextraza.producer

import org.alextraza.rest.KafkaConnectionParams
import org.apache.kafka.clients.producer.ProducerRecord
import org.slf4j.LoggerFactory
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.stereotype.Service

@Service
class KafkaSenderImpl : KafkaSender {

    private val logger = LoggerFactory.getLogger(KafkaSenderImpl::class.java)

    private var kafkaTemplates: MutableMap<String, KafkaTemplate<String, String>> = HashMap()
    private var connectionInfos: MutableMap<String, ConnectionInfo> = HashMap()

    override fun send(topicId: String, message: String, headers: Map<String, String>) {
        val connectionInfo = connectionInfos[topicId]
        val kafkaTemplate = kafkaTemplates[connectionInfo!!.bootstrapServer]

        val producerRecord = ProducerRecord<String, String>(connectionInfo.topic, message)

        headers.forEach { (key, value) ->
            producerRecord.headers().add(key, value.toByteArray())
        }

        kafkaTemplate?.send(producerRecord)
        logger.info("Message sent")
    }

    override fun addTopic(kafkaConnectionParams: KafkaConnectionParams, kafkaTemplate: KafkaTemplate<String, String>) {
        kafkaTemplates[kafkaConnectionParams.bootstrapServer] = kafkaTemplate
        connectionInfos[kafkaConnectionParams.topicId] = ConnectionInfo(kafkaConnectionParams.topic, kafkaConnectionParams.bootstrapServer)
    }

    override fun isServerActive(bootstrapServer: String) : Boolean {
        return kafkaTemplates.containsKey(bootstrapServer)
    }

    override fun removeTopic(topicId: String) {
        val bootstrapServer = connectionInfos[topicId]!!.bootstrapServer
        connectionInfos.remove(topicId)
        val needRemoveServer = !connectionInfos.values.any { connectionInfo -> connectionInfo.bootstrapServer == bootstrapServer }
        if (needRemoveServer) {
            kafkaTemplates.remove(bootstrapServer)
        }
    }

    override fun addTopic(kafkaConnectionParams: KafkaConnectionParams) {
        connectionInfos[kafkaConnectionParams.topicId] = ConnectionInfo(kafkaConnectionParams.topic, kafkaConnectionParams.bootstrapServer)
    }

    class ConnectionInfo (val topic: String, val bootstrapServer: String) {}

}
