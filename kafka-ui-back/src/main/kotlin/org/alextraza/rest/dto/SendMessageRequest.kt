package org.alextraza.rest.dto

class SendMessageRequest(val topicId: String, val message: String, val headers: Map<String, String>) {
}