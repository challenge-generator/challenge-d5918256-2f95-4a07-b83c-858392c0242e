# Guía de Buenas Prácticas Git - Equipo de Desarrollo

## Introducción

Este documento establece las convenciones y mejores prácticas para el uso de Git en el equipo de desarrollo del proyecto de gestión de inventario. El objetivo es mantener un historial de código limpio, facilitar la colaboración entre desarrolladores y reducir los conflictos de integración.

---

## 1. Configuración Inicial

### 1.1 Configuración Obligatoria

Todo desarrollador debe configurar su entorno Git antes de comenzar a trabajar:

```bash
git config --global user.name "Nombre Apellido"
git config --global user.email "nombre.apellido@company.com"
git config --global init.defaultBranch main
git config --global pull.rebase true
git config --global rebase.autoStash true
git config --global core.editor "code --wait"
git config --global fetch.prune true
```

### 1.2 Configuración Recomendada

```bash
git config --global push.default current
git config --global merge.ff false
git config --global commit.template ~/.gitmessage.txt
```

### 1.3 Archivo de Mensaje de Commit

Crear `~/.gitmessage.txt` con la siguiente plantilla:

```
# Título: tipo(aspecto): descripción corta
#
# Cuerpo: descripción más detallada (opcional)
# - Detalle 1
# - Detalle 2
#
# Footer: referencias a tickets (CLOSE #123)

# Tipos válidos: feat, fix, docs, style, refactor, test, chore, perf, ci, build
# Ámbitos válidos: inventory, products, categories, suppliers, reports, ui, api
```

---

## 2. Convenciones de Commits

### 2.1 Formato de Commits Semánticos

Cada commit debe seguir el formato:

```
<tipo>(<ámbito>): <descripción corta>

[Cuerpo opcional]

[Footer opcional]
```

### 2.2 Tipos de Commits

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat(inventory): añadir filtro por categoría` |
| `fix` | Corrección de bug | `fix(products): corregir validación de stock` |
| `docs` | Cambios en documentación | `docs: actualizar README` |
| `style` | Formateo sin cambio de lógica | `style: aplicar prettier` |
| `refactor` | Refactorización | `refactor(api): extraer servicio de inventario` |
| `test` | Añadir o modificar tests | `test: añadir tests unitarios para ProductService` |
| `chore` | Tareas de mantenimiento | `chore: actualizar dependencias` |
| `perf` | Mejora de rendimiento | `perf(inventory): optimizar consulta de productos` |
| `ci` | Cambios en pipeline | `ci: añadir stage de lint` |
| `build` | Cambios en build | `build: configurar webpack para producción` |

### 2.3 Ámbitos (Scopes)

Usar los siguientes ámbitos según el componente afectado:

- `inventory` - Módulo de inventario
- `products` - Gestión de productos
- `categories` - Categorías
- `suppliers` - Proveedores
- `reports` - Informes y métricas
- `ui` - Componentes de interfaz
- `api` - Servicios y endpoints
- `auth` - Autenticación
- `config` - Configuración

### 2.4 Reglas de Descripción

- Usar tiempo imperativo: "add" no "added" ni "adds"
- Máximo 50 caracteres en el título
- No terminar con punto
- Ser específico: "fix bug en validación" no "fix stuff"
- Usar mayúscula inicial solo en la primera palabra

### 2.5 Ejemplos de Commits Buenos y Malos

**Malos:**
```
git commit -m "fixed it"
git commit -m "Update file.ts"
git commit -m "WIP: working on stuff"
git commit -m "feat: add new feature"
```

**Buenos:**
```
git commit -m "feat(inventory): add bulk update for stock levels"
git commit -m "fix(validation): correct email regex pattern"
git commit -m "refactor(api): extract inventory service from component"
git commit -m "docs(readme): add installation instructions"
```

---

## 3. Flujo de Trabajo Diario

### 3.1 Inicio de Sesión de Trabajo

```bash
# Actualizar develop local
git fetch origin
git checkout develop
git pull origin develop

# Crear rama de trabajo
git checkout -b feature/TICKET-123-descripcion
```

### 3.2 Durante el Desarrollo

```bash
# Guardar cambios pequeños y frecuentes
git add .
git commit -m "feat(inventory): add initial implementation"

# Rebase antes de hacer push si hay cambios en develop
git fetch origin
git rebase origin/develop

# Forzar push solo si es rama personal
git push -u origin feature/TICKET-123-descripcion --force-with-lease
```

### 3.3 Antes de Crear PR

```bash
# Rebase interactivo para limpiar historial
git rebase -i origin/develop

# Verificar que todo compila
npm run build

# Ejecutar tests
npm test

# Verificar código
npm run lint
```

### 3.4 Creación de Pull Request

1. Push de la rama: `git push -u origin feature/TICKET-123`
2. Abrir PR desde GitHub/GitLab
3. Completar plantilla de PR:
   - Descripción del cambio
   - Pasos para probar
   - Screenshots si aplica
   - Links a tickets relacionados
4. Solicitar revisores
5. Esperar CI y revisiones

---

## 4. Manejo de Pull Requests

### 4.1 Requisitos para Merge

- Todas las verificaciones automáticas pasando
- Al menos 1 aprobación (2 para código crítico)
- Sin conflictos con la rama destino
- Documentación actualizada si aplica
- Tests añadidos o actualizados

### 4.2 Proceso de Revisión

**Para el autor:**
- Responder todos los comentarios
- No tomar críticas de forma personal
- Explicar decisiones de diseño si es necesario
- Actualizar el PR según feedback

**Para el revisor:**
- Revisar dentro de 24 horas
- Ser específico en comentarios
- Sugerir soluciones, no solo problemas
- Aprobar si los cambios son menores
- Usar solicitudes de cambio para cambios mayores

### 4.3 Tipos de Merge

| Tipo | Cuándo Usar | Comando |
|------|-------------|---------|
| Squash Merge | Features (mantiene historial limpio) | GitHub merge button |
| Merge Commit | Bugfixes y releases | GitHub merge button |
| Rebase + Fast-forward | Actualizar rama personal | `git rebase && git push` |

### 4.4 Manejo de Conflictos

```bash
# Traer cambios del destino
git fetch origin
git merge origin/develop

# Resolver conflictos manualmente
# Editar archivos en conflicto
git add <archivos resueltos>
git commit

# O usar rebase
git rebase origin/develop
# Resolver conflictos
git add .
git rebase --continue
```

---

## 5. Ramas Especiales

### 5.1 Hotfixes

Para correcciones críticas en producción:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/TICKET-999-descripcion
# Implementar fix
git push -u origin hotfix/TICKET-999
# Crear PR a main Y develop
```

### 5.2 Releases

```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0
# Ajustar version, actualizar changelog
# Crear PR a main
```

### 5.3 Ramas de Soporte

Para mantener versiones anteriores:

```bash
git checkout -b support/v1.1.x main
# Aplicar solo cherry-picks de hotfixes
```

---

## 6. Resolución de Conflictos Comunes

### 6.1 Conflicto en package.json

Si hay conflictos en dependencias:

```bash
# Preferir la versión más reciente
git checkout --ours package.json
npm install
# Verificar que funciona
git add package.json package-lock.json
git commit
```

### 6.2 Conflicto en Archivos de Configuración

```bash
# Abrir editor para resolución manual
git mergetool
# Revisar cada sección
# Eliminar marcadores de conflicto
```

### 6.3 Conflicto por Rebase

```bash
# Durante rebase, resolver y continuar
# Editar archivo en conflicto
git add <archivo>
git rebase --continue
# Si quieres abortar
git rebase --abort
```

---

## 7. Scripts de Validación

### 7.1 Validación de Rama

El proyecto incluye un script de validación que se ejecuta automáticamente:

```bash
# Validar nombre de rama
npm run validate-branch
# o
bash scripts/validate-branch.sh
```

El script verifica:
- Formato correcto (feature/, bugfix/, hotfix/, release/, support/)
- Formato de ticket (TICKET-número)
- Longitud máxima del nombre
- Caracteres válidos

### 7.2 Setup de Ramas

```bash
# Configurar ramas base
npm run setup-branches
# o
bash scripts/setup-branches.sh
```

---

## 8. Recursos Adicionales

- [Pro Git Book](https://git-scm.com/book/es/v2)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Angular Git Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)

---

## 9. Preguntas Frecuentes

### ¿Qué hago si mi PR tiene conflictos?

1. No hacer force push a ramas compartidas
2. Actualizar su rama desde la rama destino
3. Resolver conflictos localmente
4. Ejecutar tests y lint
5. Push los cambios resueltos

### ¿Puedo hacer rebase de una rama compartida?

No. Solo rebase en ramas personales que nadie más haya clonado. Para ramas compartidas, usar merge.

### ¿Cómo deshago un commit?</n

```bash
# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer completamente
git reset --hard HEAD~1

# Deshacer commit ya publicado
git revert <commit-hash>
```

### ¿Qué hacer si rompo algo en main?

1. No hacer push de la rotura
2. Crear un hotfix inmediatamente
3. Notificar al equipo
4. Priorizar la corrección

---

*Documento vivo - Actualizar según necesidades del equipo*
*Última revisión: 2024*