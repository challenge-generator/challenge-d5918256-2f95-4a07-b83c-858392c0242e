# Implementación y gestión de estrategias de branching en un proyecto Angular

El proyecto consiste en un sistema de gestión de inventario para una tienda en línea, desarrollado en Angular. El equipo de desarrollo utiliza Git para el control de versiones. El objetivo es revisar y aprobar 'pull requests', y guiar a otros desarrolladores en la creación de estrategias de branching efectivas. Los actores involucrados son el 'líder de proyecto', 'desarrolladores frontend' y'revisores de código'. El sistema debe manejar un volumen de 100 solicitudes de cambio por semana, con una latencia de revisión de menos de 24 horas. La estrategia de branching debe asegurar la consistencia del código y minimizar conflictos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Control de versionamiento de software |
| **Nivel** | senior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 3 semanas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Evaluación de la estrategia de branching actual

**Objetivo:** Identificar fortalezas y debilidades de la estrategia de branching existente

**Tiempo estimado:** 1 semana

**Instrucciones:**

- Analiza la estrategia de branching actual del proyecto. Identifica las ramas existentes, su propósito y cómo se integran. Evalúa la eficiencia del flujo de trabajo y los posibles puntos de mejora.

**Entregable:** Informe de evaluación de la estrategia de branching actual, incluyendo fortalezas, debilidades y recomendaciones.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el impacto de la estrategia en la colaboración del equipo y la calidad del código.
- Evalúa la claridad y documentación de las ramas.

</details>

### Fase 2: Propuesta de una nueva estrategia de branching

**Objetivo:** Diseñar una estrategia de branching que mejore la colaboración y la calidad del código

**Tiempo estimado:** 1 semana

**Instrucciones:**

- Basándote en la evaluación de la fase anterior, propone una nueva estrategia de branching. Debes considerar las necesidades del proyecto, el flujo de trabajo del equipo y las mejores prácticas de Git. Asegúrate de que la estrategia minimice conflictos y maximice la colaboración.

**Entregable:** Propuesta de una nueva estrategia de branching, incluyendo un diagrama de las ramas y su propósito, y un plan de implementación.

<details>
<summary>Pistas de conocimiento</summary>

- Investiga diferentes estrategias de branching como Git Flow, GitHub Flow y Trunk-Based Development.
- Considera cómo la nueva estrategia impactará en la revisión de código y la integración continua.

</details>

### Fase 3: Implementación y comunicación de la nueva estrategia

**Objetivo:** Implementar la nueva estrategia de branching y comunicarla al equipo

**Tiempo estimado:** 1 semana

**Instrucciones:**

- Implementa la nueva estrategia de branching en el proyecto. Crea las ramas necesarias y actualiza la documentación. Comunica la nueva estrategia al equipo y proporciona guías y entrenamiento si es necesario.

**Entregable:** Implementación de la nueva estrategia de branching, documentación actualizada y presentación al equipo.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza herramientas de comunicación efectiva para asegurar que todo el equipo entienda la nueva estrategia.
- Proporciona ejemplos prácticos de cómo utilizar la nueva estrategia en el día a día.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una estrategia de branching y por qué es importante en un proyecto de desarrollo?
- **paraQueSirve**: ¿Para qué sirve la nueva estrategia de branching propuesta en el proyecto de gestión de inventario?
- **comoSeUsa**: ¿Cómo se utiliza la nueva estrategia de branching en el día a día del equipo de desarrollo?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar una nueva estrategia de branching y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de una nueva estrategia de branching en términos de colaboración y calidad del código?

## Criterios de Evaluacion

- Evaluación detallada de la estrategia de branching actual.
- Propuesta de una nueva estrategia de branching efectiva.
- Implementación exitosa de la nueva estrategia y comunicación clara al equipo.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
