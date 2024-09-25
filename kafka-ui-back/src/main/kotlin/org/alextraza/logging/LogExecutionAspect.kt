package org.alextraza.logging

import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

@Aspect
@Component
class LogExecutionAspect {

    private val logger = LoggerFactory.getLogger(LogExecutionAspect::class.java)

    @Around("@annotation(logExecution")
    @kotlin.Throws(Throwable::class)
    fun logExecution(joinPoint: ProceedingJoinPoint, logExecution: LogExecution?): Any {
        logger.info("Started processing {}", joinPoint.signature.name)
        val res = joinPoint.proceed()
        logger.info("Finished processing {}", joinPoint.signature.name)
        return res
    }

}
