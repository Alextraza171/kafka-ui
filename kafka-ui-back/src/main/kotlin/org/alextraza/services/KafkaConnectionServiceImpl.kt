package org.alextraza.services

import org.apache.kafka.clients.admin.AdminClient
import org.apache.kafka.clients.admin.AdminClientConfig
import org.springframework.stereotype.Service
import java.util.Properties

@Service
class KafkaConnectionServiceImpl : KafkaConnectionService {

    override fun testConnection(bootstrapServer: String): Boolean {
        val props = Properties()
        props[AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG] = bootstrapServer

        try {
            AdminClient.create(props).use { adminClient ->
                adminClient.listTopics().names().get()
            }
            return true
        } catch (e: Exception) {
            return false
        }
    }

}