# SYNAPSE

App web (PWA) para señales y sensores, bitácora de prototipos, biomecánica, circuitos y pilotos.
Funciona en laptop, Android e iPhone, sin conexión, y guarda los datos **solo en el dispositivo** (IndexedDB).

Estado: **etapa 0 (núcleo)** lista. Los módulos se agregan por etapas.

## Abrir sin publicar: `synapse.html`

**No abras `index.html` con doble clic**: el navegador bloquea los módulos y se queda cargando (ahora muestra un aviso).
Para usarla localmente abre **`synapse.html`**, la versión de archivo único, que sí funciona con doble clic en Chrome, Edge o Firefox de la laptop.
Sus datos quedan en ese navegador y son independientes de la versión publicada; para moverlos usa *Exportar → Importar (Fusionar)*.
Si cambias el código, regenera el archivo único con `python3 tools/build.py`.

## Publicar en GitHub Pages

Lo que se publica es la carpeta **`dist/`**: la app completa en archivos planos, **sin subcarpetas**, para que la subida por la web de GitHub no deje nada fuera.

1. Genera `dist/` con `python3 tools/build.py` (el zip `synapse-github-pages.zip` ya la trae lista).
2. En el repositorio: *Add file → Upload files*, selecciona **todos** los archivos de `dist/` (Ctrl+A), arrástralos y *Commit changes*.
3. Solo la primera vez: *Settings → Pages → Source: Deploy from a branch*, rama `main`, carpeta `/ (root)`, *Save*.
4. En 1–2 minutos la app queda en `https://TU_USUARIO.github.io/REPO/`.
5. Instálala en cada dispositivo:
   - Android / Chrome / Edge: menú → *Instalar app* (o el botón en *Datos y respaldo*).
   - iPhone: Safari → *Compartir* → *Agregar a pantalla de inicio* (esto también evita que Safari borre los datos).

Si prefieres publicar el código fuente modular (carpetas `js/`, `css/`, `icons/`), súbelo con git o arrastrando las carpetas completas; con el selector de archivos de la web las carpetas no se suben.

## Actualizar la app

1. Sube el número en `version.js` del código fuente, ejecuta `python3 tools/build.py` y reemplaza los archivos de `dist/` en el repositorio.
2. **El número de `version.js`** (por ejemplo `0.1.0` → `0.2.0`). Así los dispositivos detectan la nueva versión y muestran el aviso *Actualizar*.

Tus datos no se tocan al actualizar.

## Respaldos

- *Datos y respaldo → Descargar JSON* guarda todo en un archivo; en el celular usa *Compartir* para mandarlo a Drive o Archivos.
- En Chrome o Edge de escritorio puedes activar el **auto-respaldo en una carpeta** (idealmente sincronizada con la nube).
- *Importar → Fusionar* combina datos de otro dispositivo (si un registro existe en ambos lados, gana la versión editada más recientemente). *Reemplazar todo* deja solo lo del archivo.
- La app te recuerda respaldar si pasan 7 días.

## Probar en tu computadora

```bash
cd synapse
python3 -m http.server 8000
# abre http://localhost:8000
```

Prueba automática del núcleo (requiere Python + Playwright + Chrome): `python3 tests/e2e_core.py`.

## Estructura

```
index.html · version.js · sw.js · manifest.webmanifest · icons/ · css/app.css
js/app.js                 arranque, rutas, service worker
js/core/                  db (IndexedDB) · store · schema · context · backup · units · catalogs · storage · install · demo
js/ui/                    dom · shell (barra de contexto y navegación) · dialogs · icons
js/modules/               home · data · placeholder (módulos en construcción)
tests/e2e_core.py         prueba de extremo a extremo
```

Al agregar archivos nuevos, añádelos también a la lista `ASSETS` de `sw.js` para que funcionen sin conexión.
