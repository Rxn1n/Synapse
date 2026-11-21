# SYNAPSE

**Cuaderno de laboratorio digital para prototipos biónicos y biomecánicos.**

SYNAPSE reúne en una sola app web lo que normalmente queda repartido entre hojas de cálculo, libretas, fotos del celular y archivos sueltos: las señales de los sensores, la bitácora de pruebas de cada versión del prototipo, los cálculos de torque, la documentación de los circuitos y las fichas de los pilotos de prueba. Todo queda conectado, así que siempre puedes responder *con qué versión, con qué circuito y con quién se hizo cada prueba*.

👉 **Abrir la app:** https://rxn1n.github.io/Synapse/

- Funciona en **laptop, Android e iPhone**, desde el navegador.
- Se puede **instalar** como app y funciona **sin internet**.
- Tus datos se guardan **solo en tu dispositivo**: no hay cuentas, servidores ni nube.

---

## ¿Para qué sirve?

Cuando desarrollas una prótesis, una órtesis o un exoesqueleto, cada prueba depende de muchas piezas que cambian todo el tiempo: la versión mecánica, la revisión de la placa, la calibración, la persona que lo usa. SYNAPSE te ayuda a:

- **No perder el rastro**: cada registro queda vinculado al prototipo (`v1.0`, `v1.1`…), a la revisión del circuito (`Rev A`, `Rev B`…) y al piloto.
- **Probar con seguridad**: un checklist de banco antes de energizar o de probar con una persona.
- **Ver y comparar señales**: EMG, IMU, ángulos o fuerza, con comparación lado izquierdo / derecho.
- **Calcular rápido y con fórmulas visibles**: torques, palancas, ángulos, divisores, resistencias, ganancias.
- **Compartir y respaldar**: exportar todo en JSON o CSV para analizar en Python, MATLAB o Excel.

## Módulos

| Módulo | Qué hace | Estado |
|---|---|---|
| **Inicio** | Contexto activo, resumen de datos, conversor de unidades | ✅ Disponible |
| **Datos y respaldo** | Exportar, importar, auto-respaldo, almacenamiento, instalación | ✅ Disponible |
| **Bitácora** | Experimentos, ajustes, calibraciones y fallos por versión de prototipo, con checklist de seguridad de banco | 🔜 Etapa 1 |
| **Circuitos** | Revisiones, pinouts, conexiones, cambios y calculadoras de electrónica básica | 🔜 Etapa 2 |
| **Pilotos** | Fichas anónimas por código: ajustes, calibración base, comodidad y fatiga | 🔜 Etapa 3 |
| **Torque** | Torques, momentos, palancas, transmisiones y rangos articulares | 🔜 Etapa 4 |
| **Señales** | Gráficas en vivo o desde archivo (simulador, CSV, USB, Bluetooth, WiFi, IMU del celular), simetría L/R | 🔜 Etapa 5 |

La app se construye por etapas; los módulos marcados 🔜 ya aparecen en el menú con la descripción de lo que harán.

---

## Cómo empezar

### 1. Abrir e instalar

Abre **https://rxn1n.github.io/Synapse/** y, si la vas a usar seguido, instálala:

- **Android / Chrome / Edge**: menú del navegador → *Instalar app* (o el botón en **Datos y respaldo**).
- **iPhone**: en **Safari** → botón *Compartir* → *Agregar a pantalla de inicio*.
  Instalarla en iPhone es importante: si no, Safari puede borrar los datos de una web que no usas en 7 días.

Después de la primera carga, SYNAPSE funciona aunque no tengas internet.

### 2. Probar con datos de ejemplo

En **Inicio** pulsa **Cargar datos de ejemplo**. Se crean un exoesqueleto de rodilla (`v1.0` → `v1.1`), una mano mioeléctrica, dos revisiones de una placa de control EMG y dos pilotos. Puedes borrarlos cuando quieras desde **Datos y respaldo → Borrar datos de ejemplo**, sin tocar tus datos reales.

### 3. Elegir el contexto activo

La barra superior tiene tres selectores: **Piloto · Prototipo · Circuito**. Lo que elijas ahí se vincula automáticamente a cada registro nuevo (pruebas, sesiones de señal, cálculos), así no tienes que escribirlo cada vez.

- Al elegir un prototipo, los circuitos vinculados a él aparecen primero.
- Si combinas un circuito que **no** está vinculado a ese prototipo, **Inicio** te avisa para que confirmes que es la combinación correcta antes de probar.

### 4. Convertir unidades

En **Inicio** está el conversor: 19 magnitudes (fuerza, torque, ángulo, velocidad angular, tensión, corriente, carga de batería…). Útil para pasar especificaciones de servos en `kgf·cm` u `oz·in` a `N·m`, o `rpm` a `rad/s`.

---

## Tus datos

### Dónde se guardan

Todo se guarda en el navegador del dispositivo que estás usando (IndexedDB). Eso significa que:

- **Nadie más los ve**: no se suben a ningún servidor, ni siquiera a GitHub.
- **Cada dispositivo tiene sus propios datos**: lo que registras en la laptop no aparece solo en el celular. Para pasarlos usa exportar / importar.
- **Si borras los datos del navegador, se pierden**. Por eso existen los respaldos.

### Respaldos (hazlos seguido)

En **Datos y respaldo**:

- **Descargar JSON**: un archivo con todo. Guárdalo fuera del dispositivo.
- **Compartir** (celular): envía el respaldo a Drive, Archivos, correo, etc.
- **Auto-respaldo en carpeta** (Chrome o Edge de escritorio): eliges una carpeta (idealmente sincronizada con Drive, OneDrive o Dropbox) y SYNAPSE guarda ahí un respaldo unos segundos después de cada cambio, más una copia por día.
- **Recordatorio**: si pasan 7 días sin respaldo, **Inicio** te avisa.
- **Almacenamiento persistente**: pídelo una vez para que el navegador no borre los datos por falta de espacio.

### Pasar datos entre dispositivos

1. En el dispositivo de origen: **Descargar JSON** (o **Compartir**).
2. En el destino: **Importar → Elegir archivo JSON**. Antes de aplicar nada verás qué contiene.
3. Elige:
   - **Fusionar**: agrega lo nuevo y, si un registro existe en ambos lados, conserva la versión editada más recientemente. Tus datos actuales se mantienen.
   - **Reemplazar todo**: deja solo lo que trae el archivo.

### Pilotos anónimos

SYNAPSE identifica a los pilotos solo con un **código** (por ejemplo `P-003`) y datos mínimos como rango de edad, lateralidad, masa y estatura. No guarda nombres, fechas de nacimiento ni contactos. Mantén la relación código ↔ persona fuera de la app, según el protocolo que corresponda.

---

## Preguntas frecuentes

**Se queda en “Cargando” o dice “SYNAPSE no pudo iniciar”.**
Recarga forzando con `Ctrl + Shift + R`. Si abriste un archivo desde una carpeta de tu computadora, usa `synapse.html` (funciona con doble clic) o el enlace publicado.

**Apareció el aviso “Hay una nueva versión”.**
Pulsa **Actualizar**. Tus datos no se tocan.

**Cambié de celular o de navegador y no veo mis datos.**
Los datos están en el dispositivo anterior. Exporta desde allí e importa en el nuevo.

**¿Puedo usarla sin internet?**
Sí, después de abrirla una vez con conexión (o tras instalarla).

**¿Funciona en iPhone la lectura de sensores por USB o Bluetooth?**
Safari no permite USB ni Bluetooth desde la web. En iPhone podrás usar el simulador, archivos CSV, WiFi (MQTT) y el sensor de movimiento del propio teléfono; para Bluetooth existe el navegador Bluefy. En laptop (Chrome/Edge) y Android funcionan todas las opciones.

---

## Para desarrolladores

SYNAPSE es una PWA en JavaScript puro (módulos ES), sin frameworks ni dependencias externas: IndexedDB para los datos, Canvas para las gráficas y un service worker para el modo sin conexión.

**Publicar o actualizar en GitHub Pages:** se sube el contenido de la carpeta `dist/` (archivos planos, sin subcarpetas), generada a partir del código fuente con:

```bash
python3 tools/build.py      # genera synapse.html y dist/
```

Antes de cada publicación sube el número en `version.js` (por ejemplo `0.1.0` → `0.2.0`); así las apps instaladas muestran el aviso de actualización.

**Probar en local:**

```bash
python3 -m http.server 8000         # abre http://localhost:8000
python3 tests/e2e_core.py           # prueba automática (Python + Playwright + Chrome)
```

**Estructura del código fuente:**

```
index.html · version.js · sw.js · manifest.webmanifest · icons/ · css/app.css
js/app.js        arranque, rutas, service worker
js/core/         base de datos, modelo de datos, contexto activo, respaldo, unidades, catálogos
js/ui/           estructura de pantallas, diálogos, iconos
js/modules/      un archivo por módulo
tools/build.py   empaquetador (archivo único y dist/)
tests/           pruebas de extremo a extremo
```

---

*Versión actual: 0.1.0 · etapa 0 (núcleo).*
