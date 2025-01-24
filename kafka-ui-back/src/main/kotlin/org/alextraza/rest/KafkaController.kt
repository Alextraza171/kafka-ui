package org.alextraza.rest

import org.alextraza.producer.KafkaSender
import org.alextraza.services.KafkaConfigurationService
import org.alextraza.services.TopicService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/kafka-ui")
class KafkaController(
    private val kafkaConfigurationService: KafkaConfigurationService,
    private val kafkaSender: KafkaSender,
    private val topicService: TopicService) {

    @PostMapping("/connect")
    fun connectToServer(@RequestBody params: KafkaConnectionParams) {
        kafkaConfigurationService.addConnection(params)
    }

    @PostMapping("/test-connection")
    fun testConnection(@RequestBody testConnectionRequest: TestConnectionRequest) : Boolean {
        try {
            topicService.getTopics(testConnectionRequest.serverAddress)
            return true
        } catch (e: Exception) {
            return false
        }
    }

    @PostMapping("/send")
    fun sendMessage(@RequestBody sendMessageRequest: SendMessageRequest) {
        kafkaSender.send(sendMessageRequest.topicId, sendMessageRequest.message, sendMessageRequest.headers)
    }

    @PostMapping("/topic")
    fun createTopic(@RequestBody createTopicRequest: CreateTopicRequest) {
        topicService.createTopic(createTopicRequest)
    }

    @GetMapping("/topic")
    fun getTopics(@RequestParam serverAddress: String): List<String> {
        return topicService.getTopics(serverAddress)
    }

    @GetMapping("/active-connections")
    fun getActiveConnections(): List<KafkaConnectionParams> {
        return kafkaConfigurationService.getConnections()
    }

}
