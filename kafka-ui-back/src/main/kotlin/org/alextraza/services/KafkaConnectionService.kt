package org.alextraza.services

interface KafkaConnectionService {

    fun testConnection(bootstrapServer: String) : Boolean

}