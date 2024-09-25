package org.alextraza.consumer

interface TopicListener {
    fun onMessage(topicId: String, message: String?)
}
