export const PDF_PROCESSING = {
    MAX_TEXT_LENGTH: 10000,
    WORKER_SRC: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs',
}


// https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent

export const API = {
    GEMINI_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
}

// ========================================================================
// CONFIGURACIÓN DEL SISTEMA DE RATE LIMITING
// ========================================================================
// Estos valores controlan qué tan estricto será el control de peticiones
// Ajústalos según el tipo de API y recursos disponibles

export const RATE_LIMIT = {
  /**
   * REQUESTS_PER_MINUTE: Número máximo de peticiones que una IP puede hacer por minuto
   * 
   * ¿Cómo elegir el valor?
   * - APIs costosas (OpenAI, Claude): 5-10 peticiones/min
   * - APIs normales (CRUD básico): 60-100 peticiones/min  
   * - APIs muy simples (health check): 200+ peticiones/min
   * 
   * Valor actual: 5 peticiones/min
   * ✅ Bueno para: APIs de IA, procesamiento pesado, APIs externas costosas
   * ⚠️  Quizás bajo para: Aplicaciones con mucha interacción del usuario
   */
  REQUESTS_PER_MINUTE: 5,

  /**
   * CACHE_MAX_SIZE: Cuántas IPs diferentes recordamos simultáneamente
   * 
   * ¿Qué pasa cuando se llena?
   * - Las IPs menos usadas se eliminan automáticamente (LRU = Least Recently Used)
   * - Solo afecta el rendimiento si tienes MUCHOS usuarios únicos por minuto
   * 
   * Guía de dimensionamiento:
   * - 100 IPs = ~400KB memoria (muy pequeño)
   * - 1,000 IPs = ~4MB memoria (aplicaciones medianas)  
   * - 10,000 IPs = ~40MB memoria (aplicaciones grandes)
   * 
   * Valor actual: 1000 IPs
   * ✅ Adecuado para: La mayoría de aplicaciones (hasta ~1K usuarios únicos/hora)
   */
  CACHE_MAX_SIZE: 1000,

  /**
   * CACHE_TTL_MS: Cada cuánto tiempo se resetea el contador de peticiones
   * 
   * ¿Cómo funciona?
   * - Una IP hace 5 peticiones -> se bloquea
   * - Después de TTL_MS milisegundos -> su contador vuelve a 0
   * - Puede hacer peticiones de nuevo
   * 
   * Conversiones útiles:
   * - 30 * 1000 = 30 segundos
   * - 60 * 1000 = 1 minuto
   * - 5 * 60 * 1000 = 5 minutos
   * - 60 * 60 * 1000 = 1 hora
   * 
   * Valor actual: 60,000ms = 1 minuto
   * ✅ Coincide con REQUESTS_PER_MINUTE (5 peticiones por minuto)
   * ⚠️  Importante: TTL debería coincidir con el período de "PER_MINUTE"
   */
  CACHE_TTL_MS: 60 * 1000,
}

// ========================================================================
// EJEMPLOS DE CONFIGURACIONES TÍPICAS:
// ========================================================================
//
// 🤖 API DE IA (OpenAI/Claude):
// REQUESTS_PER_MINUTE: 10, CACHE_TTL_MS: 60 * 1000
//
// 📊 API de datos (consultas DB):  
// REQUESTS_PER_MINUTE: 50, CACHE_TTL_MS: 60 * 1000
//
// 🚀 API simple (validaciones):
// REQUESTS_PER_MINUTE: 200, CACHE_TTL_MS: 60 * 1000
//
// 🛡️ API muy restrictiva (recursos caros):
// REQUESTS_PER_MINUTE: 3, CACHE_TTL_MS: 5 * 60 * 1000 (5 min)
//
// ========================================================================
// MONITOREO RECOMENDADO:
// ========================================================================
// 
// 📈 Métricas a seguir:
// - Cuántas peticiones se bloquean por día/hora
// - Qué IPs se bloquean más frecuentemente
// - Si los usuarios legítimos se ven afectados
//
// 🔧 Ajustes dinámicos:
// - Aumenta REQUESTS_PER_MINUTE si muchos usuarios se quejan
// - Disminúyelo si el servidor se sobrecarga
// - Considera diferentes límites para diferentes endpoints