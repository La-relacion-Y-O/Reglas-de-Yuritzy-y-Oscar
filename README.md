# Reglas de la Relación 💕

Una hermosa aplicación web que muestra las 31 reglas de una relación especial entre Oscar y Yuritzy, con un sistema de seguimiento privado para verificar el cumplimiento diario.

## 🌟 Características

### Página Principal (index.html)
- **Diseño Romántico**: Fondo animado con gradientes dinámicos
- **Efectos Visuales**: Corazones flotantes y efectos de brillo
- **Navegación Intuitiva**: Botones para navegar entre reglas
- **Responsive**: Se adapta a todos los tamaños de pantalla
- **Interactivo**: Grid de reglas clickeable
- **Animaciones**: Múltiples animaciones CSS para una experiencia visual atractiva

### Sistema de Control (tracking.html)
- **Control Privado**: Oscar y Yuritzy pueden marcar individualmente si cumplieron cada regla
- **Registro Diario**: Guarda el progreso por fecha
- **Vista de Resultados**: Una vez completado, el otro puede ver los resultados
- **Base de Datos**: Integrado con Supabase para persistencia de datos
- **Interfaz Intuitiva**: Fácil de usar con checkboxes visuales

## 🚀 Cómo usar

### Ver las Reglas
1. Abre `index.html` en tu navegador web
2. Navega entre las reglas usando los botones o el grid
3. ¡Disfruta explorando las 31 reglas del amor! 💕

### Sistema de Control
1. Haz clic en "Control de Cumplimiento" desde la página principal
2. Selecciona tu nombre (Oscar o Yuritzy)
3. Elige una opción:
   - **Marcar Reglas**: Registra si cumpliste cada regla hoy
   - **Ver Resultados**: Revisa los resultados del otro (solo disponible cuando hayan completado su registro)

## 🔧 Configuración para GitHub Pages

**IMPORTANTE**: Como GitHub Pages no puede usar archivos `.env`, debes configurar las credenciales de Supabase directamente en los archivos JavaScript.

### Paso 1: Obtén tus credenciales de Supabase
Las credenciales ya están en el proyecto (URL y Anon Key), pero si necesitas cambiarlas:

1. Ve a tu proyecto en [Supabase](https://supabase.com)
2. Ve a Settings > API
3. Copia:
   - Project URL (ejemplo: `https://xxxxx.supabase.co`)
   - Anon/Public Key (un token JWT largo)

### Paso 2: Configura las credenciales

Las credenciales están configuradas en **tracking.js** (líneas 32-33):

```javascript
const SUPABASE_URL = 'https://mskwsfqwmmchnwnddssc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

**NOTA IMPORTANTE**:
- El **Anon Key es seguro para uso público** - es la clave diseñada para usarse en el frontend
- La seguridad real está en las **Row Level Security (RLS) policies** de Supabase
- **NO uses el Service Role Key** en archivos públicos

### Paso 3: Despliega en GitHub Pages

1. Sube todos los archivos a tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "Update tracking system"
   git push origin main
   ```

2. Ve a tu repositorio en GitHub
3. Click en **Settings**
4. En el menú lateral, click en **Pages**
5. En "Source", selecciona **Deploy from a branch**
6. En "Branch", selecciona **main** y la carpeta **/ (root)**
7. Click en **Save**
8. Espera unos minutos y tu sitio estará disponible en: `https://tu-usuario.github.io/nombre-repositorio`

### Configuración de Supabase (Ya está hecha)

La base de datos ya tiene las siguientes tablas:

#### `rule_checks`
- Almacena el registro diario de cada regla por usuario
- Campos: user_name, rule_number, is_completed, check_date

#### `daily_sessions`
- Registra cuando un usuario completa todas las reglas de un día
- Campos: user_name, session_date, is_completed, completed_at

**Las políticas RLS están configuradas para acceso público** (ya que es una app privada solo para Oscar y Yuritzy).

## 📂 Estructura del Proyecto

```
├── index.html              # Página principal de reglas
├── tracking.html           # Sistema de control de cumplimiento
├── styles.css              # Estilos de la página principal
├── tracking-styles.css     # Estilos del sistema de control
├── script.js               # Lógica de la página principal
├── tracking.js             # Lógica del sistema de control
├── .env                    # Variables de entorno (NO se usa en GitHub Pages)
├── README.md               # Este archivo
└── public/                 # Imágenes de los avatares
    ├── Imagen de WhatsApp 2025-09-06 a las 00.43.59_37264b21.jpg
    └── Imagen de WhatsApp 2025-09-06 a las 14.10.18_f47c6f3b.jpg
```

## 📱 Características Responsive

- Diseño adaptable para móviles, tablets y desktop
- Navegación optimizada para pantallas táctiles
- Texto y elementos escalables
- Sistema de control completamente responsive

## 🎨 Efectos Visuales

- Fondo con gradiente animado
- Corazones flotantes con animación de rebote
- Efectos de brillo (sparkles) pulsantes
- Barra de progreso animada
- Transiciones suaves en todos los elementos
- Checkboxes interactivos con animaciones

## 🔒 Seguridad

- Las credenciales de Supabase Anon Key son seguras para uso público
- La seguridad está implementada mediante Row Level Security (RLS) en Supabase
- Solo Oscar y Yuritzy pueden ver los resultados completos del otro
- Los datos están almacenados de forma segura en Supabase

## 💝 Regla de Oro

**Regla #30**: Amarnos por siempre 💗🤍

---

Hecho con 💕 para Oscar y Yuritzy