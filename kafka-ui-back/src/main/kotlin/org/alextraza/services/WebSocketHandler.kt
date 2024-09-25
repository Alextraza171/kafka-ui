package org.alextraza.services

interface WebSocketHandler {

    fun sendMessage(topicId: String, message: String?)

}