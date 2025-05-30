package org.alextraza.rest

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class WebController {

    @RequestMapping(value = ["/{path:[^\\.]*}"])
    fun redirect(): String {
        return "forward:/index.html"
    }
}