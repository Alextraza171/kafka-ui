package org.alextraza.rest

class SendMessageRequest(val topicId: String, val message: String, val headers: Map<String, String>) {
}