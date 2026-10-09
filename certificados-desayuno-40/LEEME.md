# Reconocimientos – Desayuno Empresarial con Propósito #40

Dos diseños, mismo contenido (logo original de Oleda, código EC0217.01):

| Diseño | Plantilla | PDF con las 3 ponentes |
|---|---|---|
| Clásico (marco con grabado y sello con listón) | `certificado.html` | `Clasico_TODAS.pdf` |
| Moderno (panel lateral azul) | `certificado-moderno.html` | `Moderno_TODAS.pdf` |

También hay un PDF por ponente (`Clasico_<Nombre>.pdf`, `Moderno_<Nombre>.pdf`) y uno con el nombre `EN_BLANCO`.

Impresión: tamaño **Carta**, orientación **horizontal**, escala **100 % / tamaño real**.
El diseño moderno llega hasta la orilla del papel: para que no quede una franja blanca, imprímelo en una imprenta "a sangre / sin bordes".

## Cambiar nombres
1. Edita la lista en `nombres.js` (sirve para los dos diseños).
2. Abre el `.html` en Chrome → Imprimir → Guardar como PDF (Carta, horizontal, márgenes "Ninguno", activar "Gráficos de fondo").
   O con Node + Playwright: `node generar.js certificado.html Clasico` / `node generar.js certificado-moderno.html Moderno`.
