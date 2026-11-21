# SYNAPSE · P4H Bionics

App web (PWA) para señales y sensores, bitácora de prototipos, biomecánica, circuitos y pilotos.
Funciona en laptop, Android e iPhone, sin conexión, y guarda los datos **solo en el dispositivo** (IndexedDB).

Estado: **etapa 0 (núcleo)** lista. Los módulos se agregan por etapas.

## Publicar en GitHub Pages (una sola vez)

1. Crea un repositorio nuevo en GitHub, por ejemplo `synapse` (puede ser público: solo se publica el código, nunca tus datos).
2. Sube **el contenido** de esta carpeta (no la carpeta en sí) a la raíz del repositorio:
   - Desde la web: *Add file → Upload files*, arrastra todos los archivos y carpetas, y luego *Commit changes*.
   - O con git: `git init && git add . && git commit -m "SYNAPSE etapa 0" && git branch -M main && git remote add origin https://github.com/TU_USUARIO/synapse.git && git push -u origin main`
3. En el repositorio: *Settings → Pages → Build and deployment → Source: Deploy from a branch*, rama `main`, carpeta `/ (root)`, *Save*.
4. En uno o dos minutos la app queda en `https://TU_USUARIO.github.io/synapse/`.
5. Ábrela en cada dispositivo e **instálala**:
   - Android / Chrome / Edge: menú → *Instalar app* (o el botón en *Datos y respaldo*).
   - iPhone: Safari → *Compartir* → *Agregar a pantalla de inicio* (esto también evita que Safari borre los datos).

## Actualizar la app

1. Reemplaza los archivos en el repositorio.
2. **Sube el número en `version.js`** (por ejemplo `0.1.0` → `0.2.0`). Así los dispositivos detectan la nueva versión y muestran el aviso *Actualizar*.

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
