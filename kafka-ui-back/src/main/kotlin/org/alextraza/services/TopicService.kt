package org.alextraza.services

import org.alextraza.rest.CreateTopicRequest

interface TopicService {

    fun createTopic(createTopicRequest: CreateTopicRequest)

    fun getTopics(bootstrapServer: String): List<String>

    fun deleteTopics(bootstrapServer: String, topic: String)

}