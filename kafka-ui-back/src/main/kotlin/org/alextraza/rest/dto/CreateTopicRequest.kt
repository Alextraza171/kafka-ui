package org.alextraza.rest.dto

class CreateTopicRequest(val bootstrapServer: String, val topic: String, val partitionsNumber: Int, val replicasNumber: Short) {
}