# IN Dental Care · Prototipo web

**Vista previa para el cliente:** https://jdakira11.github.io/IN-Dental-Care/

> Prototipo visual estático. Los formularios funcionan en modo demostración: no envían datos.

## Brief
- Negocio: consulta odontológica particular del Dr. Ignacio Núñez (20 años de experiencia), Vitacura, Región Metropolitana · **Proyecto ficticio de portafolio**: dirección, teléfonos, credenciales, cifras y opiniones son verosímiles pero inventados.
- Objetivo de la web: agendar hora (formulario demo + WhatsApp).
- Referencias: ninguna; pedido «moderno y limpio».
- Idioma / moneda: es-CL / CLP (no se muestran precios).

## Dirección de arte
- Paleta blanco + verde salvia (tokens en `src/app/globals.css`): fondo `#f8f9f6`, alterno `#eff3ec`, salvia `#dbe5d6`, acento salvia profunda `#4a6753` (CTA, 6:1 con blanco), secciones oscuras verde grafito `#24332c`.
- Tipografías (2): Instrument Serif (títulos) + Manrope (texto).
- Logo del cliente (IN + diente, azul marino y turquesa): versión horizontal en la cabecera y apilada sobre tarjeta blanca en el pie; favicon con el símbolo.
- Motivo gráfico: esquinas muy redondeadas, tarjetas con borde fino.
- Tono: cercano y tranquilo, primera persona del doctor en su presentación.
- Fotografía: portada y retrato del doctor entregadas por el cliente; el resto de Unsplash, marcadas como «Imagen ilustrativa». Opiniones sin caras (solo iniciales).

## Secciones
Portada · El doctor · Tratamientos (6) · Banda de imagen fija · Primera consulta (4 pasos) · Opiniones · Previsión y pagos · Preguntas frecuentes · Agenda (formulario demo) · Ubicación y contacto · Pie · WhatsApp flotante y barra móvil «Agendar hora» · Páginas `/privacidad` y `/creditos`.

## Desarrollo
```bash
npm install
npm run dev              # http://localhost:3000
npm run deploy:pages     # publica la vista previa en GitHub Pages
```
- Datos del negocio: `src/config/site.ts`
- Textos: `src/content/copy.ts` · tratamientos: `src/content/treatments.ts` · opiniones: `src/content/testimonials.ts`
- Imágenes: `src/assets/images/` (registro y créditos en `src/content/images.ts`)

## Pendiente
- [ ] Si pasa a cliente real: sustituir datos ficticios (dirección, teléfono, WhatsApp, correo, credenciales, cifras, opiniones) y fotos ilustrativas de Unsplash (box)
- [ ] Revisión profesional del texto de privacidad y de las normas de publicidad sanitaria

## Historial de entregas
| Fecha | Cambios |
|---|---|
| 2026-11-01 | Primera versión publicada en GitHub Pages |
| 2026-11-01 | Logo del cliente, fotos propias en portada y sección del doctor, nombre «IN Dental Care» |
| 2026-11-01 | «Primera consulta» rediseñada como línea de tiempo con columna fija y aparición al hacer scroll (estructura de dentalrx.ca); 5 pasos |
| 2026-11-01 | Tratamientos: fotos sustituidas por iconos planos propios, uno por servicio |
| 2026-11-01 | Tratamientos desplegables: icono + nombre; clic para abrir y cerrar el detalle |
