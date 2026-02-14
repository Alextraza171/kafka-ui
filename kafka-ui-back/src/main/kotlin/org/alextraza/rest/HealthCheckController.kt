package org.alextraza.rest

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/kafka-ui/health-check")
class HealthCheckController {

    @GetMapping
    fun checkHealth() :Boolean {
        return true
    }

}