import { NextRequest } from 'next/server'
import { LRUCache } from 'lru-cache'
import { RATE_LIMIT } from './constants'
import { ApiError } from './errors'

// ========================================================================
// SISTEMA DE RATE LIMITING PARA PROTEGER NUESTRAS APIs
// ========================================================================
// Este módulo previene que los usuarios hagan demasiadas peticiones
// y protejan nuestros recursos (servidor, APIs externas como OpenAI, etc.)

/**
 * Cache LRU (Least Recently Used) para almacenar contadores de peticiones por IP
 * 
 * ¿Por qué LRU? 
 * - Automáticamente elimina las IPs más antiguas cuando se llena
 * - Mantiene en memoria solo las IPs más activas
 * - Evita consumo excesivo de memoria
 * 
 * Estructura del cache: 
 * {
 *   "192.168.1.1": 5,  // Esta IP ha hecho 5 peticiones
 *   "10.0.0.1": 2,     // Esta IP ha hecho 2 peticiones
 * }
 */
const rateLimitCache = new LRUCache<string, number>({
  max: RATE_LIMIT.CACHE_MAX_SIZE,  // Máximo número de IPs que recordamos
  ttl: RATE_LIMIT.CACHE_TTL_MS     // Tiempo de vida: después de este tiempo, el contador se resetea automáticamente
})

/**
 * Función principal de rate limiting
 * 
 * ¿Cómo funciona?
 * 1. Identifica al usuario por su IP
 * 2. Cuenta cuántas peticiones ha hecho en el período actual
 * 3. Si excede el límite -> ERROR 429
 * 4. Si no -> incrementa contador y permite continuar
 * 
 * @param req - Request de Next.js con headers y metadata
 * @throws ApiError(429) si se excede el límite de peticiones
 */
export const rateLimiter = async (req: NextRequest) => {
  // ========================================================================
  // PASO 1: IDENTIFICAR AL USUARIO
  // ========================================================================
  
  /**
   * Obtener la IP real del usuario
   * 
   * ¿Por qué 'x-forwarded-for'?
   * - Cuando usas Vercel, Cloudflare, o cualquier proxy/load balancer
   * - La IP real está en este header, no en req.ip
   * - Sin esto, todas las peticiones aparecerían como la IP del servidor
   * 
   * Fallback '127.0.0.1':
   * - Para desarrollo local donde no hay proxy
   * - Evita que el código falle si no encuentra IP
   */
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
  
  // ========================================================================
  // PASO 2: VERIFICAR LÍMITES
  // ========================================================================
  
  // Límite configurado en constants.ts (ej: 10 peticiones por minuto)
  const limit = RATE_LIMIT.REQUESTS_PER_MINUTE
  
  /**
   * Obtener contador actual para esta IP
   * 
   * rateLimitCache.get(ip) puede retornar:
   * - undefined (primera vez que vemos esta IP)
   * - number (número de peticiones anteriores)
   * 
   * || 0 convierte undefined a 0
   * as number es para TypeScript (sabemos que será un número)
   */
  const currentCount = (rateLimitCache.get(ip) || 0) as number
  
  // ========================================================================
  // PASO 3: DECIDIR SI BLOQUEAR O PERMITIR
  // ========================================================================
  
  if (currentCount >= limit) {
    /**
     * ¡LÍMITE EXCEDIDO! - Bloquear petición
     * 
     * Error 429: "Too Many Requests" - Estándar HTTP
     * 
     * Información adicional útil:
     * - limitResetTime: Cuándo podrá hacer peticiones de nuevo
     * - Ayuda al cliente a saber cuándo reintentar
     */
    throw new ApiError(
      429,
      'Rate limit exceeded. Please try again later.',
      { 
        limitResetTime: new Date(Date.now() + RATE_LIMIT.CACHE_TTL_MS).toISOString()
      }
    )
  }
  
  /**
   * TODO OK - Permitir petición e incrementar contador
   * 
   * Guardamos currentCount + 1 en el cache
   * El TTL (tiempo de vida) se resetea automáticamente
   * 
   * Ejemplo:
   * - Primera petición: currentCount = 0, guardamos 1
   * - Segunda petición: currentCount = 1, guardamos 2
   * - etc...
   */
  rateLimitCache.set(ip, currentCount + 1)
  
  // Si llegamos aquí, la petición está permitida ✅
  // La función termina sin error = petición puede continuar
}

// ========================================================================
// NOTAS PARA EL FUTURO:
// ========================================================================
// 
// 🔧 CONFIGURACIÓN:
// - Ajusta RATE_LIMIT.REQUESTS_PER_MINUTE según tus necesidades
// - APIs costosas (OpenAI) = límite bajo (5-10/min)
// - APIs simples = límite alto (100/min)
//
// 🚀 PRODUCCIÓN:
// - Considera usar Redis en lugar de memoria para múltiples servidores
// - Monitorea métricas: cuántas peticiones se bloquean
//
// 🛡️ SEGURIDAD:
// - Este sistema previene ataques de fuerza bruta simples
// - Para ataques sofisticados, considera Cloudflare o similar
//
// 🐛 DEBUG:
// - Si los límites parecen no funcionar, verifica que el IP se obtiene bien
// - En desarrollo local, todas las peticiones vendrán de 127.0.0.1