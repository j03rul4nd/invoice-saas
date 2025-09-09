# 🚀 Clear Invoices AI - Plantilla SaaS con Next.js

Una plantilla SaaS completa construida con Next.js que permite a los usuarios subir PDFs (por ejemplo, recibos, órdenes de compra, datos contables) y generar / procesar facturas inteligentes usando IA.

## ✨ Características principales

- 🏠 **Landing Page** – Página de presentación atractiva.
- 💼 **Generación de Facturas con IA** – Extracción automática de datos y creación/normalización de facturas desde PDFs usando Google Gemini AI.
- 🧾 **Procesamiento de PDFs** – OCR, validación de campos, deduplicación y detección de anomalías.
- 📊 **Panel de Control (Dashboard)** – Gestión de facturas, historial y estado.
- 💰 **Planes y Facturación** – Suscripciones y cobros con Stripe.
- 🔐 **Autenticación** – Sistema completo con Clerk.
- 📤 **Envío / Exportación** – Exporta facturas a PDF, envía por correo o intégralas con software contable.
- 🗄️ **Base de Datos** – Prisma + Supabase.
- 🚀 **Listo para Desplegar** – Configurado para Vercel.

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14  
- **Autenticación**: Clerk  
- **Base de Datos**: Supabase + Prisma ORM  
- **Pagos**: Stripe  
- **IA**: Google Gemini AI (para análisis y generación de facturas)  
- **Estilos**: Tailwind CSS  
- **Despliegue**: Vercel  

## 🚀 Inicio Rápido

### 1. Clona el repositorio

```bash
git clone [tu-repositorio]
cd clear-invoices-ai
````

### 2. Instala dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configura variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Clerk (Autenticación)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_tu_clerck_publica
CLERK_SECRET_KEY=sk_test_tu_clerck_secreta
WEBHOOK_SECRET=tu_clerck_webhook_secret

# Google Gemini AI (o la IA que uses para procesar facturas)
GEMINI_API_KEY=tu_api_key_de_gemini

# Stripe (Pagos / Suscripciones)
STRIPE_SECRET_KEY=sk_test_tu_stripe_secreta
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_stripe_publica
STRIPE_PRICE_ID=price_tu_price_id
STRIPE_WEBHOOK_SECRET=tu_stripe_webhook_secret

# Supabase (Base de datos)
DATABASE_URL="postgresql://usuario:password@host:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://usuario:password@host:5432/postgres"

# Configuración adicional de facturación
INVOICE_DEFAULT_CURRENCY=EUR
INVOICE_TAX_RATE=0.21             # Ejemplo: IVA 21%
EMAIL_SMTP_HOST=smtp.tuservidor.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=usuario@ejemplo.com
EMAIL_SMTP_PASS=tu_contraseña
INVOICE_SEQUENCE_PREFIX=INV
```

### 4. Prepara la base de datos

```bash
# Genera el cliente de Prisma
npx prisma generate

# Sincroniza el esquema (desarrollo)
npx prisma db push
```

### 5. Ejecuta el proyecto

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre `http://localhost:3000` en tu navegador.

## 🔧 Configuración de Servicios

### Clerk (Autenticación)

1. Crea una cuenta en Clerk.
2. Crea una nueva aplicación.
3. Copia las claves pública y secreta.
4. Configura webhooks para sincronizar usuarios.

### Supabase (Base de datos)

1. Crea un proyecto en Supabase.
2. Ve a Settings > Database y copia las cadenas de conexión.
3. Habilita Row Level Security si lo necesitas y configura políticas.

### Stripe (Pagos)

1. Crea una cuenta en Stripe.
2. Ve a Developers > API Keys y copia claves.
3. Crea productos y precios (por ejemplo, suscripciones por volumen de facturas).
4. Configura webhooks para eventos de pago.

### Google Gemini AI (IA de facturas)

1. Accede a Google AI Studio.
2. Crea una API Key gratuita o de pago según tu uso.
3. Ajusta límites y permisos para llamadas de extracción y generación.

### Email / Envío

Configura SMTP con las credenciales para permitir envío de facturas por correo (PDF adjunto, notificaciones, recordatorios).

### Vercel (Despliegue)

1. Conecta tu repositorio a Vercel.
2. Configura todas las variables de entorno.
3. Cada push dispara una nueva build automática.

## 📁 Estructura del Proyecto

```
├── app/
│   ├── (auth)/         # Rutas y componentes de autenticación
│   ├── dashboard/      # Panel de usuario (gestión de facturas)
│   ├── pricing/        # Página de planes y precios
│   ├── api/            # Endpoints internos (webhooks, procesamiento)
│   └── globals.css     # Estilos globales
├── components/
│   ├── ui/             # Componentes UI reutilizables
│   ├── auth/           # Componentes de autenticación
│   └── invoices/        # Componentes específicos de facturas
├── lib/
│   ├── prisma.ts       # Configuración de Prisma
│   ├── stripe.ts       # Integración con Stripe
│   ├── gemini.ts       # Lógica de IA para extracción/generación de facturas
│   └── invoices.ts     # Normalización, secuencias, validaciones
├── prisma/
│   └── schema.prisma   # Esquema de base de datos
├── utils/
│   └── pdf.ts          # Helpers para generación/parseo de PDFs
└── middleware.ts       # Middleware global (protección de rutas)
```

## 🎯 Funcionalidades Implementadas

### Panel (Dashboard)

* Subida de archivos PDF (facturas, recibos, órdenes).
* Procesamiento automático con IA (extracción de datos).
* Listado y estado de facturas.
* Visualización y exportación.

### Sistema de Pagos

* Planes por suscripción.
* Checkout con Stripe.
* Webhooks para sincronización de estado.
* Portal de cliente.

### Integración de IA

* Extracción de campos de facturas (montos, fechas, proveedores, impuestos).
* Generación / normalización de facturas.
* Reglas de validación (duplicados, inconsistencias).
* Límites por suscripción.

### Autenticación

* Registro/Login con Clerk.
* Middleware de protección de rutas.
* Sincronización con base de datos.

## 🔒 Seguridad y Middleware

* Protección de rutas sensibles.
* Validación de sesión y tokens.
* Verificación de webhooks (Stripe / Clerk).
* Sanitización y validación del input de facturas.

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción (incluye prisma generate)
npm run build

# Iniciar en producción
npm run start

# Linting
npm run lint

# Herramientas de base de datos
npx prisma studio      # Interfaz visual
npx prisma db push     # Sincroniza el esquema
npx prisma generate    # Genera cliente (se ejecuta en postinstall)
```

## ⚙️ Configuración de Vercel

```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install"
}
```

Esto garantiza que:

* Prisma se genera antes del build.
* Las dependencias se instalan correctamente.
* El despliegue es reproducible.

## 📝 Buenas Prácticas

1. **No subir claves reales**: Usa `.env.local` y añade `.env*` al `.gitignore`.
2. **Verifica webhooks**: Asegúrate de validar firmas de Stripe y Clerk.
3. **Usa URL de pooling para operaciones normales** y `DIRECT_URL` solo para migraciones o tareas que lo requieran.
4. **Monitorea límites de Gemini AI** y prepara fallback si se agota.
5. **Normaliza facturas**: Prefija, controla secuencias y evita duplicados.

## 🤝 Contribuir

1. Haz fork del repositorio.
2. Crea una rama de feature: `git checkout -b feature/NombreFeature`
3. Haz commits claros: `git commit -m "Agrega generación de facturas IA"`
4. Push: `git push origin feature/NombreFeature`
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Revisa el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas:

1. Revisa la documentación de cada servicio (Clerk, Stripe, Supabase, Gemini).
2. Verifica que las variables de entorno estén definidas.
3. Consulta los logs de Vercel.
4. Asegúrate de que los webhooks se reciben y validan correctamente.

---
