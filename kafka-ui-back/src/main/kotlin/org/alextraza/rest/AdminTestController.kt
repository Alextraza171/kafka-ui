package org.alextraza.rest

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/admin")
class AdminTestController {

    @GetMapping("/error")
    fun generateError() {
        throw RuntimeException("An error has occurred")
    }

}