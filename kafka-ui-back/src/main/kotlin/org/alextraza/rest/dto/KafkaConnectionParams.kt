package org.alextraza.rest.dto

data class KafkaConnectionParams(val topicId: String, val bootstrapServer: String, val topic: String) {
}
