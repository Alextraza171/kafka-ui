package org.alextraza.rest

import org.alextraza.services.TopicService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/admin")
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