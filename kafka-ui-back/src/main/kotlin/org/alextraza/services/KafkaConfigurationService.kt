package org.alextraza.services

import org.alextraza.rest.KafkaConnectionParams

interface KafkaConfigurationService {

    fun addConnection(params: KafkaConnectionParams)

    fun removeConnection(topicId: String)

    fun getConnections(): List<KafkaConnectionParams>

}
