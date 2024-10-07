package org.alextraza.rest

class CreateTopicRequest(val bootstrapServer: String, val topic: String, val partitionsNumber: Int, val replicasNumber: Short) {
}