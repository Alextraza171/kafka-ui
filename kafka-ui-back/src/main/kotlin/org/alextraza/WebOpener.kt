package org.alextraza

import jakarta.annotation.PostConstruct
import org.springframework.stereotype.Component
import java.io.IOException
import java.util.*

@Component
class WebOpener {

    private val url = "http://localhost:8080"

    @PostConstruct
    fun init() {
        openBrowser(url)
    }

    private fun openBrowser(url: String) {
        val os = System.getProperty("os.name").lowercase(Locale.getDefault())
        try {
            when {
                os.contains("win") -> Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler $url")
                os.contains("mac") -> Runtime.getRuntime().exec("open $url")
                os.contains("nix") || os.contains("nux") -> Runtime.getRuntime().exec("xdg-open $url")
                else -> println("Не удалось определить операционную систему для открытия браузера.")
            }
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

}