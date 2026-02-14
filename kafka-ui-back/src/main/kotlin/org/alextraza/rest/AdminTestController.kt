package org.alextraza.rest

import org.alextraza.services.TopicService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestParam

@RestController
@RequestMapping("/kafka-ui/admin")
class AdminTestController(private val topicService: TopicService) {

    @GetMapping("/error")
    fun generateError() {
        throw RuntimeException("An error has occurred")
    }

    @DeleteMapping("/topic")
    fun deleteTopic(@RequestParam serverAddress: String, @RequestParam topic: String) {
        topicService.deleteTopics(serverAddress, topic)
    }

}