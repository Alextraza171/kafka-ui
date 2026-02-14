package org.alextraza

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class KafkaUIApplication {

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            runApplication<KafkaUIApplication>(*args)
        }
    }

}