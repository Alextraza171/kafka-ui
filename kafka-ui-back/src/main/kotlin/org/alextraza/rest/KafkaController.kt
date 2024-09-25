package org.alextraza.rest

import org.alextraza.producer.KafkaSender
import org.alextraza.services.KafkaConfigurationService
import org.alextraza.services.KafkaConnectionService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/kafka-ui")
class KafkaController(

    private val kafkaConfigurationService: KafkaConfigurationService,
    private val kafkaConnectionService: KafkaConnectionService,
    private val kafkaSender: KafkaSender) {

    @PostMapping("/connect")
    fun connectToServer(@RequestBody params: KafkaConnectionParams) {
        kafkaConfigurationService.addConnection(params)
    }

    @PostMapping("/test-connection")
    fun testConnection(@RequestBody testConnectionRequest: TestConnectionRequest) : Boolean {
        return kafkaConnectionService.testConnection(testConnectionRequest.serverAddress)
    }

    @PostMapping("/send")
    fun sendMessage(@RequestBody sendMessageRequest: SendMessageRequest) {
        kafkaSender.send(sendMessageRequest.topicId, sendMessageRequest.message)
    }

}
