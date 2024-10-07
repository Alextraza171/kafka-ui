package org.alextraza.services

import org.alextraza.rest.CreateTopicRequest
import org.apache.kafka.clients.admin.AdminClient
import org.apache.kafka.clients.admin.AdminClientConfig
import org.apache.kafka.clients.admin.NewTopic
import org.springframework.stereotype.Service
import java.util.*
import java.util.concurrent.ExecutionException
import java.util.concurrent.TimeUnit

@Service
class TopicServiceImpl: TopicService {

    override fun createTopic(createTopicRequest: CreateTopicRequest) {

        val configs = mapOf(
            AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG to createTopicRequest.bootstrapServer
        )

        AdminClient.create(configs).use { adminClient ->
            val newTopic = NewTopic(createTopicRequest.topic, createTopicRequest.partitionsNumber, createTopicRequest.replicasNumber)
            val result = adminClient.createTopics(listOf(newTopic))

            try {
                result.all().get()
                println("Topic ${createTopicRequest.topic} was created on server ${createTopicRequest.bootstrapServer}")
            } catch (e: ExecutionException) {
                println("Error while creating topic: ${e.message}")
            } catch (e: InterruptedException) {
                Thread.currentThread().interrupt()
            }
        }
    }

    override fun getTopics(bootstrapServer: String): List<String> {
        val props = Properties()
        props[AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG] = bootstrapServer

        AdminClient.create(props).use { adminClient ->
            return adminClient.listTopics().names().get(10, TimeUnit.SECONDS).toList()
        }
    }

}