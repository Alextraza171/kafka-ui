package org.alextraza.services

import jakarta.annotation.PreDestroy
import org.alextraza.consumer.TopicListener
import org.alextraza.producer.KafkaSender
import org.alextraza.rest.KafkaConnectionParams
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.apache.kafka.clients.producer.ProducerConfig
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.kafka.common.serialization.StringSerializer
import org.springframework.kafka.core.ConsumerFactory
import org.springframework.kafka.core.DefaultKafkaConsumerFactory
import org.springframework.kafka.core.DefaultKafkaProducerFactory
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.kafka.listener.ContainerProperties
import org.springframework.kafka.listener.KafkaMessageListenerContainer
import org.springframework.kafka.listener.MessageListener
import org.springframework.kafka.listener.MessageListenerContainer
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class KafkaConfigurationServiceImpl(private val kafkaSender: KafkaSender, private val topicListener: TopicListener) : KafkaConfigurationService {

    private var listenerContainers: MutableMap<String, MessageListenerContainer> = HashMap()

    private fun startListener(params: KafkaConnectionParams) {

        // Конфигурация Kafka Consumer'а
        val consumerProps: MutableMap<String, Any> = HashMap()
        consumerProps[ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG] = params.bootstrapServer
        consumerProps[ConsumerConfig.GROUP_ID_CONFIG] = UUID.randomUUID()
        consumerProps[ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG] = StringDeserializer::class.java
        consumerProps[ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG] = StringDeserializer::class.java

        val consumerFactory: ConsumerFactory<String, String> = DefaultKafkaConsumerFactory(consumerProps)

        // Настройки контейнера с указанным топиком
        val containerProps = ContainerProperties(params.topic)
        // Setting listener
        containerProps.messageListener =
            MessageListener { record: ConsumerRecord<String?, String?> ->
                topicListener.onMessage(params.topicId, record.value())
            }

        // Создаем новый контейнер для слушателя
        val listenerContainer = KafkaMessageListenerContainer(consumerFactory, containerProps)
        listenerContainers[params.topicId] = listenerContainer
        listenerContainer.start()
    }

    override fun addConnection(params: KafkaConnectionParams) {
        startListener(params)

        if (kafkaSender.isServerActive(params.bootstrapServer)) {
            kafkaSender.addTopic(params)
            return
        }

        val configProps: MutableMap<String, Any> = HashMap()
        configProps[ProducerConfig.BOOTSTRAP_SERVERS_CONFIG] = params.bootstrapServer
        configProps[ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG] = StringSerializer::class.java.getName()
        configProps[ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG] = StringSerializer::class.java.getName()

        val kafkaTemplate = KafkaTemplate(DefaultKafkaProducerFactory<String, String>(configProps))
        kafkaSender.addTopic(params, kafkaTemplate)
    }

    override fun removeConnection(topicId: String) {
        listenerContainers[topicId]!!.stop()
        kafkaSender.removeTopic(topicId)
    }

    @PreDestroy
    fun stopListener() {
        listenerContainers.values.forEach { listenerContainer -> listenerContainer.stop() }
    }

}
