package org.alextraza.rest

data class KafkaConnectionParams(val topicId: String, val bootstrapServer: String, val topic: String) {
}
