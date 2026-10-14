# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Senior

### Brecha de conocimiento
Revisa y aprueba 'pull requests'. Guía a otros desarrolladores y participa en la creación de estrategias de branching de un proyecto.

### Misión / candidato
Candidato Senior con experiencia liderando equipos de desarrollo en proyectos Angular.

### Reto
- Tema: Control de versionamiento de software
- Seniority: senior-l2
- Tipo: practical
- Título: Implementación y gestión de estrategias de branching en un proyecto Angular
- Tiempo estimado: 3 semanas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Evaluación de la estrategia de branching actual — objetivo: Identificar fortalezas y debilidades de la estrategia de branching existente — entregable (NO resolver): Informe de evaluación de la estrategia de branching actual, incluyendo fortalezas, debilidades y recomendaciones.
- Fase 2: Propuesta de una nueva estrategia de branching — objetivo: Diseñar una estrategia de branching que mejore la colaboración y la calidad del código — entregable (NO resolver): Propuesta de una nueva estrategia de branching, incluyendo un diagrama de las ramas y su propósito, y un plan de implementación.
- Fase 3: Implementación y comunicación de la nueva estrategia — objetivo: Implementar la nueva estrategia de branching y comunicarla al equipo — entregable (NO resolver): Implementación de la nueva estrategia de branching, documentación actualizada y presentación al equipo.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "inventory-management",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
 "build:prod": "ng build --configuration production",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint",
    "format": "prettier --write \"src/**/*.{ts,html,scss,json}\"",
    "prepare": "husky install",
    "validate-branch": "bash scripts/validate-branch.sh",
    "setup-branches": "bash scripts/setup-branches.sh"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "20.0.0",
    "@angular/cdk": "20.0.0",
    "@angular/common": "20.0.0",
    "@angular/compiler": "20.0.0",
    "@angular/core": "20.0.0",
    "@angular/forms": "20.0.0",
    "@angular/material": "20.0.0",
    "@angular/platform-browser": "20.0.0",
    "@angular/platform-browser-dynamic": "20.0.0",
    "@angular/router": "20.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "20.0.0",
    "@angular/cli": "20.0.0",
    "@angular/compiler-cli": "20.0.0",
    "@types/node": "20.11.19",
    "@typescript-eslint/eslint-plugin": "7.0.0",
    "@typescript-eslint/parser": "7.0.0",
    "@angular-eslint/eslint-plugin": "17.3.0",
    "@angular-eslint/eslint-plugin-template": "17.3.0",
    "@angular-eslint/template-parser": "17.3.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "husky": "^9.0.11",
    "lint-staged": "^15.2.2",
    "prettier": "3.2.5",
    "typescript": "~5.4.2"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,html,scss,json}": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ]
  }
}

// === ARCHIVO: angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "inventory-management": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:application": {
          "strict": true,
          "standalone": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/inventory-management",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss",
              "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
            ],
            "scripts": []
          },
          "configurations": {
            "development": {
              "optimization": false,
              "outputHashing": "all",
              "sourceMap": true,
              "namedChunks": false,
              "extractLicenses": false,
              "vendorChunk": true,
              "buildOptimizer": false
            },
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "inventory-management:build"
          },
          "configurations": {
            "development": {
              "browserTarget": "inventory-management:build:development"
            },
            "production": {
              "browserTarget": "inventory-management:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "inventory-management:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.spec.json",
            "karmaConfig": "karma.conf.js",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        },
        "lint": {
          "builder": "@angular-eslint/builder:lint",
          "options": {
            "lintFilePatterns": [
              "src/**/*.ts",
              "src/**/*.html"
            ]
          }
        }
      }
    }
  },
  "cli": {
    "analytics": false
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom", "dom.iterable", "scanner"]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

// === ARCHIVO: src/app/core/models/inventory.model.ts ===

/**
 * Modelos de dominio para el sistema de gestión de inventario.
 * Define las estructuras de datos principales para productos, categorías y estados.
 */

export interface Product {
    id: string;
    name: string;
    description: string;
    sku: string;
    category: Category;
    price: number;
    stockQuantity: number;
    reorderThreshold: number;
    supplier: Supplier;
    images: string[];
    attributes: Record<string, string>;
    createdAt: Date;
    updatedAt: Date;
    status: ProductStatus;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    parentCategory?: Category;
    subCategories?: Category[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Supplier {
    id: string;
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    leadTimeDays: number;
    createdAt: Date;
    updatedAt: Date;
}

export enum ProductStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DISCONTINUED = 'DISCONTINUED',
    OUT_OF_STOCK = 'OUT_OF_STOCK'
}

export interface InventoryAdjustment {
    id: string;
    productId: string;
    quantity: number;
    type: AdjustmentType;
    reason: string;
    referenceId?: string;
    createdAt: Date;
    createdBy: string;
}

export enum AdjustmentType {
    ADDITION = 'ADDITION',
    REMOVAL = 'REMOVAL',
    CORRECTION = 'CORRECTION'
}

export interface InventoryAudit {
    id: string;
    productId: string;
    previousQuantity: number;
    newQuantity: number;
    adjustedBy: string;
    adjustmentId: string;
    timestamp: Date;
}

export interface StockAlert {
    id: string;
    productId: string;
    productName: string;
    currentStock: number;
    threshold: number;
    status: AlertStatus;
    createdAt: Date;
    updatedAt: Date;
}

export enum AlertStatus {
    PENDING = 'PENDING',
    RESOLVED = 'RESOLVED',
    IGNORED = 'IGNORED'
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ProductFilter {
    name?: string;
    categoryId?: string;
    status?: ProductStatus;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// === ARCHIVO: src/app/core/services/inventory.service.ts ===

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, map, of } from 'rxjs';
import { Product, Category, Supplier, InventoryAdjustment, ProductFilter, PaginatedResponse, StockAlert } from '../models/inventory.model';
import { environment } from '../../../environments/environment';

/**
 * Servicio central para la gestión de inventario.
 * Proporciona operaciones CRUD para productos, categorías y proveedores,
 * además de lógica de negocio relacionada con el inventario.
 */
@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    // Signals para estado reactivo
    private productsSignal = signal<Product[]>([]);
    private lowStockAlertsSignal = signal<StockAlert[]>([]);

    // Computed signals
    lowStockProducts = computed(() => {
        return this.productsSignal().filter(product => product.stockQuantity <= product.reorderThreshold);
    });

    /**
     * Obtiene todos los productos con filtros opcionales.
     * @param filter Filtros para la consulta.
     * @returns Observable con la respuesta paginada de productos.
     */
    getProducts(filter: ProductFilter = {}): Observable<PaginatedResponse<Product>> {
        let params = new HttpParams();
        
        if (filter.name) {
            params = params.append('name', filter.name);
        }
        if (filter.categoryId) {
            params = params.append('categoryId', filter.categoryId);
        }
        if (filter.status) {
            params = params.append('status', filter.status);
        }
        if (filter.minPrice !== undefined) {
            params = params.append('minPrice', filter.minPrice.toString());
        }
        if (filter.maxPrice !== undefined) {
            params = params.append('maxPrice', filter.maxPrice.toString());
        }
        if (filter.inStock !== undefined) {
            params = params.append('inStock', filter.inStock.toString());
        }
        if (filter.page !== undefined) {
            params = params.append('page', filter.page.toString());
        }
        if (filter.limit !== undefined) {
            params = params.append('limit', filter.limit.toString());
        }
        if (filter.sortBy) {
            params = params.append('sortBy', filter.sortBy);
        }
        if (filter.sortOrder) {
            params = params.append('sortOrder', filter.sortOrder);
        }

        return this.http.get<PaginatedResponse<Product>>(`${this.apiUrl}/products`, { params }).pipe(
            catchError(error => {
                console.error('Error fetching products:', error);
                return throwError(() => new Error('Failed to fetch products'));
            })
        );
    }

    /**
     * Obtiene un producto por su ID.
     * @param id ID del producto.
     * @returns Observable con el producto.
     */
    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
            catchError(error => {
                console.error(`Error fetching product with id ${id}:`, error);
                return throwError(() => new Error(`Failed to fetch product with id ${id}`));
            })
        );
    }

    /**
     * Crea un nuevo producto.
     * @param product Datos del producto.
     * @returns Observable con el producto creado.
     */
    createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
        return this.http.post<Product>(`${this.apiUrl}/products`, product).pipe(
            catchError(error => {
                console.error('Error creating product:', error);
                return throwError(() => new Error('Failed to create product'));
            })
        );
    }

    /**
     * Actualiza un producto existente.
     * @param id ID del producto.
     * @param product Datos actualizados del producto.
     * @returns Observable con el producto actualizado.
     */
    updateProduct(id: string, product: Partial<Product>): Observable<Product> {
        return this.http.patch<Product>(`${this.apiUrl}/products/${id}`, product).pipe(
            catchError(error => {
                console.error(`Error updating product with id ${id}:`, error);
                return throwError(() => new Error(`Failed to update product with id ${id}`));
            })
        );
    }

    /**
     * Elimina un producto.
     * @param id ID del producto.
     * @returns Observable con la confirmación de eliminación.
     */
    deleteProduct(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/products/${id}`).pipe(
            catchError(error => {
                console.error(`Error deleting product with id ${id}:`, error);
                return throwError(() => new Error(`Failed to delete product with id ${id}`));
            })
        );
    }

    /**
     * Obtiene todas las categorías.
     * @returns Observable con la lista de categorías.
     */
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/categories`).pipe(
            catchError(error => {
                console.error('Error fetching categories:', error);
                return throwError(() => new Error('Failed to fetch categories'));
            })
        );
    }

    /**
     * Obtiene una categoría por su ID.
     * @param id ID de la categoría.
     * @returns Observable con la categoría.
     */
    getCategoryById(id: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/categories/${id}`).pipe(
            catchError(error => {
                console.error(`Error fetching category with id ${id}:`, error);
                return throwError(() => new Error(`Failed to fetch category with id ${id}`));
            })
        );
    }

    /**
     * Actualiza el stock de un producto.
     * @param productId ID del producto.
     * @param adjustment Ajuste de inventario.
     * @returns Observable con el ajuste aplicado.
     */
    adjustInventory(productId: string, adjustment: Omit<InventoryAdjustment, 'id' | 'createdAt' | 'createdBy'>): Observable<InventoryAdjustment> {
        return this.http.post<InventoryAdjustment>(`${this.apiUrl}/inventory/${productId}/adjust`, adjustment).pipe(
            catchError(error => {
                console.error(`Error adjusting inventory for product ${productId}:`, error);
                return throwError(() => new Error(`Failed to adjust inventory for product ${productId}`));
            })
        );
    }

    /**
     * Obtiene alertas de stock bajo.
     * @returns Observable con las alertas de stock bajo.
     */
    getLowStockAlerts(): Observable<StockAlert[]> {
        return this.http.get<StockAlert[]>(`${this.apiUrl}/inventory/alerts/low-stock`).pipe(
            tap(alerts => this.lowStockAlertsSignal.set(alerts)),
            catchError(error => {
                console.error('Error fetching low stock alerts:', error);
                return throwError(() => new Error('Failed to fetch low stock alerts'));
            })
        );
    }

    /**
     * Resuelve una alerta de stock bajo.
     * @param alertId ID de la alerta.
     * @returns Observable con la alerta actualizada.
     */
    resolveStockAlert(alertId: string): Observable<StockAlert> {
        return this.http.patch<StockAlert>(`${this.apiUrl}/inventory/alerts/${alertId}/resolve`, {}).pipe(
            catchError(error => {
                console.error(`Error resolving stock alert with id ${alertId}:`, error);
                return throwError(() => new Error(`Failed to resolve stock alert with id ${alertId}`));
            })
        );
    }

    /**
     * Busca productos por texto.
     * @param query Texto de búsqueda.
     * @returns Observable con los productos encontrados.
     */
    searchProducts(query: string): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/products/search`, {
            params: { query }
        }).pipe(
            catchError(error => {
                console.error('Error searching products:', error);
                return throwError(() => new Error('Failed to search products'));
            })
        );
    }
}

// === ARCHIVO: src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { inventoryReducer } from './app/core/store/inventory/inventory.reducer';
import { InventoryEffects } from './app/core/store/inventory/inventory.effects';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { errorInterceptor } from './app/core/interceptors/error.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';

interface GlobalErrorHandlerConfig {
  router: Router;
  snackBar: MatSnackBar;
}

class GlobalErrorHandler implements ErrorHandler {
  private config: GlobalErrorHandlerConfig;

  constructor(config: GlobalErrorHandlerConfig) {
    this.config = config;
  }

  handleError(error: Error): void {
    const timestamp = new Date().toISOString();
    const errorMessage = error.message || 'Error desconocido';
    const stackTrace = error.stack || 'Sin traza de pila disponible';

    console.error(`[${timestamp}] Error global capturado:`, {
      message: errorMessage,
      stack: stackTrace,
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    if (error.message.includes('HTTP')) {
      this.config.snackBar.open(
        'Error de conexión con el servidor. Por favor, verifica tu conexión e intenta nuevamente.',
        'Cerrar',
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        }
      );
    } else if (error.message.includes('Token') || error.message.includes('auth')) {
      this.config.snackBar.open(
        'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
        'Iniciar sesión',
        {
          duration: 8000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      ).onAction().subscribe(() => {
        this.config.router.navigate(['/auth/login']);
      });
    } else {
      this.config.snackBar.open(
        `Ha ocurrido un error: ${errorMessage}`,
        'Reportar',
        {
          duration: 7000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        }
      );
    }

    if (isDevMode()) {
      console.error('Modo desarrollo: propagando error para debugging');
    }
  }
}

function initializeApp(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('Inicializando aplicación de Gestión de Inventario...');
    console.log(`Entorno: ${isDevMode() ? 'DESARROLLO' : 'PRODUCCIÓN'}`);
    console.log(`Versión de Angular: 20.0.0`);
    console.log(`Fecha de build: ${new Date().toISOString()}`);

    const requiredApis = [
      { name: 'localStorage', check: () => typeof localStorage !== 'undefined' },
      { name: 'sessionStorage', check: () => typeof sessionStorage !== 'undefined' },
      { name: 'fetch', check: () => typeof fetch !== 'undefined' },
      { name: 'Promise', check: () => typeof Promise !== 'undefined' },
      { name: 'Object.assign', check: () => typeof Object.assign === 'function' },
      { name: 'Array.isArray', check: () => typeof Array.isArray === 'function' },
      { name: 'Map', check: () => typeof Map !== 'undefined' },
      { name: 'Set', check: () => typeof Set !== 'undefined' },
      { name: 'Symbol', check: () => typeof Symbol !== 'undefined' }
    ];

    const missingApis = requiredApis.filter(api => !api.check());

    if (missingApis.length > 0) {
      const errorMsg = `APIs del navegador no disponibles: ${missingApis.map(a => a.name).join(', ')}`;
      console.error(errorMsg);
      reject(new Error(errorMsg));
      return;
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    }

    const savedLanguage = localStorage.getItem('language') || 'es';
    console.log(`Idioma configurado: ${savedLanguage}`);

    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log(`Usuario restaurado: ${user.email}`);
      } catch (e) {
        console.warn('No se pudo restaurar el usuario de la sesión');
        sessionStorage.removeItem('currentUser');
      }
    }

    resolve();
  });
}

async function bootstrapWithErrorHandler(): Promise<void> {
  try {
    await initializeApp();

    const snackBar = new MatSnackBarModule();
    const snackBarRef = document.createElement('div');
    document.body.appendChild(snackBarRef);

    const snackBarService = new MatSnackBar(document);

    const router = {
      navigate: (commands: any[]) => console.log('Navigation:', commands),
      navigateByUrl: (url: string) => console.log('Navigate to:', url)
    };

    const errorHandler = new GlobalErrorHandler({
      router: router as unknown as Router,
      snackBar: snackBarService
    });

    await bootstrapApplication(AppComponent, {
      providers: [
        provideAnimations(),
        provideHttpClient(
          withInterceptors([authInterceptor, errorInterceptor])
        ),
        provideRouter(
          appConfig.routes,
          withComponentInputBinding()
        ),
        provideStore({ inventory: inventoryReducer }),
        provideEffects([InventoryEffects]),
        provideStoreDevtools({
          maxAge: 25,
          logOnly: !isDevMode(),
          autoPause: true,
          trace: false,
          traceLimit: 75
        }),
        provideCharts(withDefaultRegisterables()),
        { provide: ErrorHandler, useValue: errorHandler },
        { provide: MatSnackBar, useValue: snackBarService },
        MatDialogModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatBadgeModule,
        MatExpansionModule,
        MatTabsModule,
        MatProgressBarModule,
        MatRippleModule
      ]
    });

    console.log('✅ Aplicación bootstrapeada exitosamente');
    console.log('🚀 Sistema de gestión de inventario listo para usar');

  } catch (error) {
    console.error('❌ Error crítico durante el bootstrap:', error);

    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
      errorContainer.innerHTML = `
        <div style="
          padding: 40px;
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
        ">
          <h1 style="font-size: 48px; margin-bottom: 20px;">⚠️</h1>
          <h2 style="font-size: 24px; margin-bottom: 10px;">Error de Inicialización</h2>
          <p style="font-size: 16px; opacity: 0.9; max-width: 500px;">
            La aplicación no pudo inicializarse correctamente.
            Por favor, contacta al equipo de soporte técnico.
          </p>
          <pre style="
            background: rgba(0,0,0,0.3);
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            max-width: 600px;
            overflow-x: auto;
            text-align: left;
            font-size: 12px;
          ">${error instanceof Error ? error.message : 'Error desconocido'}</pre>
        </div>
      `;
    }

    throw error;
  }
}

bootstrapWithErrorHandler().catch(err => {
  console.error('Error fatal en bootstrap:', err);
});

// === ARCHIVO: src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Inventory Management - Sistema de Gestión de Inventario</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Sistema de gestión de inventario para tienda en línea. Control de stock, alertas y auditoría de inventario.">
  <meta name="keywords" content="inventario, gestión de stock, control de almacén, e-commerce, Angular">
  <meta name="author" content="Equipo de Desarrollo">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#3f51b5">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no">

  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <style>
    :root {
      --primary-color: #3f51b5;
      --primary-dark: #303f9f;
      --primary-light: #7986cb;
      --accent-color: #ff4081;
      --warn-color: #f44336;
      --success-color: #4caf50;
      --background-color: #fafafa;
      --surface-color: #ffffff;
      --text-primary: rgba(0, 0, 0, 0.87);
      --text-secondary: rgba(0, 0, 0, 0.6);
      --divider-color: rgba(0, 0, 0, 0.12);
      --header-height: 64px;
      --sidebar-width: 280px;
      --border-radius: 8px;
      --transition-duration: 300ms;
      --shadow-elevation-1: 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12);
      --shadow-elevation-2: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);
      --shadow-elevation-4: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-primary);
      background-color: var(--background-color);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow: hidden;
    }

    body.dark-theme {
      --background-color: #121212;
      --surface-color: #1e1e1e;
      --text-primary: rgba(255, 255, 255, 0.87);
      --text-secondary: rgba(255, 255, 255, 0.6);
      --divider-color: rgba(255, 255, 255, 0.12);
    }

    app-root {
      display: block;
      height: 100%;
      width: 100%;
    }

    .app-loading {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 9999;
      transition: opacity 0.5s ease-in-out;
    }

    .app-loading.fade-out {
      opacity: 0;
      pointer-events: none;
    }

    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }

    .spinner {
      width: 64px;
      height: 64px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-text {
      color: white;
      font-size: 18px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    .loading-subtext {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      margin-top: 8px;
    }

    .loading-progress {
      width: 200px;
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      overflow: hidden;
      margin-top: 16px;
    }

    .loading-progress-bar {
      height: 100%;
      background: white;
      border-radius: 2px;
      animation: progress 2s ease-in-out infinite;
    }

    @keyframes progress {
      0% { width: 0%; margin-left: 0; }
      50% { width: 60%; margin-left: 20%; }
      100% { width: 0%; margin-left: 100%; }
    }

    .error-container {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    @media (max-width: 599px) {
      :root {
        --header-height: 56px;
        --sidebar-width: 100%;
        --border-radius: 4px;
      }

      html {
        font-size: 13px;
      }
    }

    @media (prefers-color-scheme: dark) {
      @media (max-width: 599px) {
        :root.dark-theme-auto {
          --background-color: #121212;
          --surface-color: #1e1e1e;
          --text-primary: rgba(255, 255, 255, 0.87);
          --text-secondary: rgba(255, 255, 255, 0.6);
          --divider-color: rgba(255, 255, 255, 0.12);
        }
      }
    }

    @media print {
      app-root {
        display: none;
      }
    }
  </style>

  <script>
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/ngsw-worker.js').catch(() => {});
      });
    }

    window.addEventListener('error', (event) => {
      console.error('Error global capturado:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Promesa rechazada no manejada:', event.reason);
    });
  </script>
</head>
<body>
  <app-root>
    <div class="app-loading" id="loading-screen">
      <div class="spinner-container">
        <div class="spinner"></div>
        <span class="loading-text">Cargando Sistema de Inventario</span>
        <span class="loading-subtext">Preparando tu entorno de trabajo...</span>
        <div class="loading-progress">
          <div class="loading-progress-bar"></div>
        </div>
      </div>
    </div>
  </app-root>

  <div id="error-container" class="error-container"></div>

  <noscript>
    <div style="
      padding: 40px;
      text-align: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f5f5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    ">
      <h1 style="color: #333;">JavaScript Requerido</h1>
      <p style="color: #666; margin-top: 16px; max-width: 400px;">
        Esta aplicación requiere JavaScript para funcionar.
        Por favor, habilita JavaScript en tu navegador para continuar.
      </p>
    </div>
  </noscript>

  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          loadingScreen.classList.add('fade-out');
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 500);
        }
      }, 1000);
    });
  </script>
</body>
</html>

// === ARCHIVO: src/app/app.config.ts ===
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouterStore, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter as provideRouterState } from '@ngrx/router-store';

import { routes } from './app.routes';
import { inventoryReducer } from './core/store/inventory/inventory.reducer';
import { InventoryEffects } from './core/store/inventory/inventory.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor])
    ),
    provideAnimations(),
    provideStore({
      inventory: inventoryReducer
    }),
    provideEffects([InventoryEffects]),
    provideRouterState(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    })
  ]
};

// === ARCHIVO: src/app/features/inventory/inventory-list/inventory-list.component.ts ===
import { Component, OnInit, inject, Signal, computed, signal, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';

import { InventoryService } from '../../../core/services/inventory.service';
import { Product, ProductFilter, ProductStatus, PaginatedResponse } from '../../../core/models/inventory.model';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryListComponent implements OnInit, AfterViewInit {
  private readonly inventoryService = inject(InventoryService);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns: string[] = ['select', 'sku', 'name', 'category', 'stock', 'status', 'price', 'actions'];
  readonly dataSource = new MatTableDataSource<Product>([]);
  readonly selection = new SelectionModel<Product>(true, []);

  readonly isLoading = signal<boolean>(false);
  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<ProductStatus | null>(null);
  readonly currentPage = signal<number>(0);
  readonly pageSize = signal<number>(10);
  readonly totalItems = signal<number>(0);

  readonly filteredProducts: Signal<Product[]> = signal<Product[]>([]);
  readonly lowStockCount = computed(() => 
    this.filteredProducts().filter(p => p.stock < p.minStockLevel).length
  );
  readonly outOfStockCount = computed(() =>
    this.filteredProducts().filter(p => p.stock === 0).length
  );

  readonly statusOptions = Object.values(ProductStatus);

  ngOnInit(): void {
    this.loadProducts();
    this.setupSearchSubscription();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setupSearchSubscription(): void {
    let debounceTimer: ReturnType<typeof setTimeout>;
    
    const searchSubscription = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.applyFilters();
      }, 300);
    };

    this.searchQuery.subscribe(() => searchSubscription());
  }

  loadProducts(): void {
    this.isLoading.set(true);
    
    const filter: ProductFilter = {
      search: this.searchQuery() || undefined,
      status: this.selectedStatus() || undefined,
      page: this.currentPage(),
      pageSize: this.pageSize(),
      sortBy: 'name',
      sortOrder: 'asc'
    };

    this.inventoryService.getProducts(filter).subscribe({
      next: (response: PaginatedResponse<Product>) => {
        this.dataSource.data = response.items;
        this.filteredProducts.set(response.items);
        this.totalItems.set(response.total);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.snackBar.open('Error al cargar productos: ' + error.message, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }

  applyFilters(): void {
    this.currentPage.set(0);
    this.loadProducts();
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value.trim());
  }

  onStatusFilterChange(status: ProductStatus | null): void {
    this.selectedStatus.set(status);
    this.applyFilters();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadProducts();
  }

  onSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this.loadProducts();
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  deleteProduct(product: Product): void {
    if (confirm(`¿Está seguro de eliminar el producto "${product.name}"?`)) {
      this.isLoading.set(true);
      this.inventoryService.deleteProduct(product.id).subscribe({
        next: () => {
          this.snackBar.open('Producto eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.loadProducts();
          this.selection.clear();
        },
        error: (error) => {
          this.isLoading.set(false);
          this.snackBar.open('Error al eliminar: ' + error.message, 'Cerrar', { duration: 5000 });
        }
      });
    }
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedStatus.set(null);
    this.applyFilters();
  }

  getStatusClass(status: ProductStatus): string {
    const statusClasses: Record<ProductStatus, string> = {
      [ProductStatus.ACTIVE]: 'status-active',
      [ProductStatus.INACTIVE]: 'status-inactive',
      [ProductStatus.DISCONTINUED]: 'status-discontinued',
      [ProductStatus.OUT_OF_STOCK]: 'status-out-of-stock'
    };
    return statusClasses[status] || '';
  }

  getStockClass(stock: number, minStock: number): string {
    if (stock === 0) return 'stock-empty';
    if (stock < minStock) return 'stock-low';
    return 'stock-normal';
  }
}

// === ARCHIVO: src/app/features/inventory/inventory-detail/inventory-detail.component.ts ===
import { Component, OnInit, OnDestroy, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil, debounceTime } from 'rxjs';

import { InventoryService } from '../../../core/services/inventory.service';
import { Product, Category, ProductStatus, InventoryAudit } from '../../../core/models/inventory.model';

@Component({
  selector: 'app-inventory-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryDetailComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly inventoryService = inject(InventoryService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly destroy$ = new Subject<void>();

  readonly productForm: FormGroup;
  readonly isLoading = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);
  readonly isEditMode = signal<boolean>(false);
  readonly productId = signal<string | null>(null);
  readonly categories = signal<Category[]>([]);
  readonly statusOptions = Object.values(ProductStatus);
  readonly auditHistory = signal<InventoryAudit[]>([]);

  readonly pageTitle = computed(() => 
    this.isEditMode() 
      ? 'Editar Producto' 
      : this.productId() 
        ? 'Detalles del Producto' 
        : 'Nuevo Producto'
  );

  readonly isFormValid = computed(() => this.productForm?.valid ?? false);
  readonly hasUnsavedChanges = signal<boolean>(false);

  constructor() {
    this.productForm = this.fb.group({
      sku: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]{3,20}$/)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      categoryId: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],,
      cost: [0, [Validators.required, Validators.min(0)]],,
      stock: [0, [Validators.required, Validators.min(0)]],,
      minStockLevel: [10, [Validators.required, Validators.min(0)]],,
      maxStockLevel: [1000, [Validators.required, Validators.min(1)]],,
      status: [ProductStatus.ACTIVE, Validators.required],
      barcode: [''],
      weight: [0],
      dimensions: this.fb.group({
        length: [0],
        width: [0],
        height: [0]
      }),
      supplierId: [''],
      tags: [''],
      isFeatured: [false],
      isTaxable: [true],
      taxRate: [21, [Validators.min(0), Validators.max(100)]],
      expirationDate: [null],
      location: ['']
    });

    this.setupFormChangeDetection();
  }

  ngOnInit(): void {
    this.loadCategories();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId.set(id);
      this.loadProduct(id);
    } else {
      this.isEditMode.set(true);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupFormChangeDetection(): void {
    this.productForm.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe(() => {
        if (this.productForm.dirty) {
          this.hasUnsavedChanges.set(true);
        }
      });
  }

  loadCategories(): void {
    this.inventoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => this.categories.set(categories),
        error: (error) => this.snackBar.open('Error al cargar categorías', 'Cerrar', { duration: 3000 })
      });
  }

  loadProduct(id: string): void {
    this.isLoading.set(true);
    
    this.inventoryService.getProductById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (product) => {
          this.populateForm(product);
          this.isLoading.set(false);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.snackBar.open('Error al cargar el producto', 'Cerrar', { duration: 5000 });
          this.router.navigate(['/inventory']);
        }
      });
  }

  populateForm(product: Product): void {
    this.productForm.patchValue({
      sku: product.sku,
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      price: product.price,
      cost: product.cost,
      stock: product.stock,
      minStockLevel: product.minStockLevel,
      maxStockLevel: product.maxStockLevel,
      status: product.status,
      barcode: product.barcode,
      weight: product.weight,
      dimensions: product.dimensions || { length: 0, width: 0, height: 0 },
      supplierId: product.supplierId,
      tags: product.tags?.join(', ') || '',
      isFeatured: product.isFeatured,
      isTaxable: product.isTaxable,
      taxRate: product.taxRate,
      expirationDate: product.expirationDate ? new Date(product.expirationDate) : null,
      location: product.location
    });
    this.productForm.markAsPristine();
    this.hasUnsavedChanges.set(false);
  }

  toggleEditMode(): void {
    this.isEditMode.set(!this.isEditMode());
    if (!this.isEditMode()) {
      const id = this.productId();
      if (id) {
        this.loadProduct(id);
      }
    }
  }

  saveProduct(): void {
    if (!this.productForm.valid) {
      this.markFormGroupTouched(this.productForm);
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isSaving.set(true);
    const formValue = this.productForm.value;
    const productData = this.buildProductData(formValue);

    const operation = this.productId()
      ? this.inventoryService.updateProduct(this.productId()!, productData)
      : this.inventoryService.createProduct(productData);

    operation
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (savedProduct) => {
          this.isSaving.set(false);
          this.snackBar.open(
            this.productId() ? 'Producto actualizado correctamente' : 'Producto creado correctamente',
            'Cerrar',
            { duration: 3000 }
          );
          
          if (!this.productId()) {
            this.router.navigate(['/inventory', savedProduct.id]);
          } else {
            this.productId.set(savedProduct.id);
            this.isEditMode.set(false);
            this.productForm.markAsPristine();
            this.hasUnsavedChanges.set(false);
          }
        },
        error: (error) => {
          this.isSaving.set(false);
          this.snackBar.open('Error al guardar: ' + error.message, 'Cerrar', { duration: 5000 });
        }
      });
  }

  private buildProductData(formValue: any): any {
    return {
      ...formValue,
      tags: formValue.tags ? formValue.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t) : [],
      dimensions: formValue.dimensions
    };
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  goBack(): void {
    if (this.hasUnsavedChanges()) {
      if (confirm('¿Tiene cambios sin guardar. ¿Está seguro de salir?')) {
        this.router.navigate(['/inventory']);
      }
    } else {
      this.router.navigate(['/inventory']);
    }
  }

  getFieldError(fieldName: string): string {
    const control = this.productForm.get(fieldName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Este campo es requerido';
      if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      if (control.errors['maxlength']) return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
      if (control.errors['min']) return `El valor mínimo es ${control.errors['min'].min}`;
      if (control.errors['max']) return `El valor máximo es ${control.errors['max'].max}`;
      if (control.errors['pattern']) return 'El formato no es válido';
    }
    return '';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
  }
}

// === ARCHIVO: src/app/shared/components/header/header.component.ts ===
import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  requiresAuth?: boolean;
}

interface UserMenuItem {
  label: string;
  icon: string;
  action: () => void;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-toolbar class="header-toolbar" color="primary">
      <button mat-icon-button (click)="toggleSidenav()" class="menu-button">
        <mat-icon>{{ isHandset() ? 'menu' : 'menu_open' }}</mat-icon>
      </button>

      <span class="logo" routerLink="/">Inventario</span>

      <span class="spacer"></span>

      <ng-container *ngIf="!isHandset()">
        <button mat-button
                *ngFor="let item of visibleNavItems()"
                [routerLink]="item.route"
                routerLinkActive="active-link"
                class="nav-button">
          <mat-icon>{{ item.icon }}</mat-icon>
          {{ item.label }}
        </button>
      </ng-container>

      <button mat-icon-button 
              [matBadge]="notificationCount()" 
              [matBadgeHidden]="notificationCount() === 0"
              matBadgeColor="warn"
              matBadgeSize="small"
              [matMenuTriggerFor]="notificationMenu"
              class="notification-button">
        <mat-icon>notifications</mat-icon>
      </button>

      <mat-menu #notificationMenu="matMenu" class="notification-menu">
        <div class="menu-header">
          <span>Notificaciones</span>
          <button mat-button color="primary" (click)="markAllAsRead()">
            Marcar todo como leído
          </button>
        </div>
        <mat-divider></mat-divider>
        <button mat-menu-item *ngFor="let notification of notifications()">
          <mat-icon [color]="notification.type === 'alert' ? 'warn' : 'primary'">
            {{ notification.icon }}
          </mat-icon>
          <span>{{ notification.message }}</span>
        </button>
        <div class="empty-notifications" *ngIf="notifications().length === 0">
          <mat-icon>notifications_none</mat-icon>
          <span>Sin notificaciones</span>
        </div>
      </mat-menu>

      <button mat-icon-button [matMenuTriggerFor]="userMenu" class="user-button">
        <mat-icon>account_circle</mat-icon>
      </button>

      <mat-menu #userMenu="matMenu">
        <div class="user-info">
          <mat-icon>person</mat-icon>
          <span>{{ currentUser()?.name || 'Usuario' }}</span>
        </div>
        <mat-divider></mat-divider>
        <button mat-menu-item *ngFor="let item of userMenuItems" (click)="item.action()">
          <mat-icon>{{ item.icon }}</mat-icon>
          <span>{{ item.label }}</span>
        </button>
      </mat-menu>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav 
                   [mode]="isHandset() ? 'over' : 'side'"
                   [opened]="!isHandset()"
                   class="sidenav">
        <mat-nav-list>
          <a mat-list-item
             *ngFor="let item of visibleNavItems()"
             [routerLink]="item.route"
             routerLinkActive="active-link"
             (click)="isHandset() ? sidenav.close() : null">
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            <span matListItemTitle>{{ item.label }}</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .header-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      padding: 0 16px;
      height: 64px;
    }

    .logo {
      font-size: 20px;
      font-weight: 500;
      margin-left: 8px;
      cursor: pointer;
      letter-spacing: 0.5px;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .nav-button {
      margin: 0 4px;
      font-weight: 400;
    }

    .active-link {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 4px;
    }

    .menu-button,
    .notification-button,
    .user-button {
      margin: 0 4px;
    }

    .sidenav-container {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .sidenav {
      width: 280px;
      background: #fafafa;
      border-right: 1px solid rgba(0, 0, 0, 0.08);
    }

    .sidenav mat-nav-list {
      padding-top: 8px;
    }

    .sidenav mat-nav-list a {
      margin: 4px 8px;
      border-radius: 8px;
    }

    .sidenav mat-nav-list a.active-link {
      background: rgba(63, 81, 181, 0.12);
      color: #3f51b5;
    }

    .menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      font-weight: 500;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      font-weight: 500;
    }

    .empty-notifications {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      color: rgba(0, 0, 0, 0.54);
    }

    .empty-notifications mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
    }

    @media (max-width: 768px) {
      .header-toolbar {
        padding: 0 8px;
      }

      .logo {
        font-size: 18px;
      }

      .sidenav {
        width: 85vw;
        max-width: 300px;
      }
    }

    @media (max-width: 480px) {
      .header-toolbar {
        height: 56px;
      }

      .sidenav-container {
        top: 56px;
      }
    }
  `]
})
export class HeaderComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  readonly isHandset = signal(false);
  readonly currentUser = signal<{ name: string; email: string; role: string } | null>({
    name: 'Desarrollador',
    email: 'dev@company.com',
    role: 'admin'
  });

  readonly notifications = signal<Array<{
    id: string;
    type: 'alert' | 'info';
    icon: string;
    message: string;
    read: boolean;
  }>>([
    { id: '1', type: 'alert', icon: 'warning', message: 'Stock bajo en producto XYZ', read: false },
    { id: '2', type: 'info', icon: 'info', message: 'Nueva orden recibida #12345', read: false },
    { id: '3', type: 'info', icon: 'check_circle', message: 'Inventario actualizado correctamente', read: true },
  ]);

  readonly notificationCount = computed(() => 
    this.notifications().filter(n => !n.read).length
  );

  readonly navItems: NavItem[] = [
    { label: 'Inventario', route: '/inventory', icon: 'inventory_2' },
    { label: 'Productos', route: '/products', icon: 'shopping_cart' },
    { label: 'Categorías', route: '/categories', icon: 'category' },
    { label: 'Proveedores', route: '/suppliers', icon: 'local_shipping' },
    { label: 'Informes', route: '/reports', icon: 'assessment' },
    { label: 'Configuración', route: '/settings', icon: 'settings' },
  ];

  readonly visibleNavItems = computed(() => 
    this.navItems.filter(item => !item.requiresAuth || this.currentUser())
  );

  readonly userMenuItems: UserMenuItem[] = [
    { label: 'Perfil', icon: 'person', action: () => this.navigateToProfile() },
    { label: 'Configuración', icon: 'settings', action: () => this.navigateToSettings() },
    { label: 'Ayuda', icon: 'help', action: () => this.showHelp() },
    { label: 'Cerrar sesión', icon: 'logout', action: () => this.logout() },
  ];

  constructor() {
    this.isHandset$.subscribe(isHandset => {
      this.isHandset.set(isHandset);
    });
  }

  toggleSidenav(): void {
    // Emitir evento o usar ViewChild para cerrar el sidenav
  }

  markAllAsRead(): void {
    this.notifications.update(notifications => 
      notifications.map(n => ({ ...n, read: true }))
    );
  }

  private navigateToProfile(): void {
    console.log('Navigating to profile');
  }

  private navigateToSettings(): void {
    console.log('Navigating to settings');
  }

  private showHelp(): void {
    console.log('Showing help');
  }

  private logout(): void {
    console.log('Logging out user');
  }
}

// === ARCHIVO: docs/strategies/branching-strategy.md ===
# Estrategia de Branching - Sistema de Gestión de Inventario

## Resumen Ejecutivo

Este documento describe la estrategia de branching adoptada para el proyecto de gestión de inventario desarrollado en Angular. La estrategia está diseñada para soportar un flujo de trabajo donde el equipo procesa aproximadamente 100 pull requests semanales, manteniendo la calidad del código y minimizando los conflictos de integración.

---

## 1. Modelo de Ramas Actual

### Estructura Principal

```
main (producción)
├── develop (integración)
│   ├── feature/TICKET-123-descripcion
│   ├── feature/TICKET-456-otra-funcionalidad
│   ├── bugfix/TICKET-789-correccion
│   └── refactor/TICKET-101-mejora-codigo
├── release/v1.2.0
├── hotfix/TICKET-202-fcritico
└── support/v1.1.x
```

### Descripción de Ramas

| Rama | Propósito | Origen | Destino | Reglas de Protección |
|------|-----------|--------|---------|---------------------|
| `main` | Código en producción | - | - | Push directo prohibido, requiere aprobación |
| `develop` | Integración de features | `main` | `main` (via release/hotfix) | Push directo prohibido |
| `feature/*` | Nuevas funcionalidades | `develop` | `develop` | Squash merge obligatorio |
| `bugfix/*` | Correcciones de bugs | `develop` | `develop` | Merge commit permitido |
| `release/*` | Preparación de versión | `develop` | `main` y `develop` | Solo merge commits |
| `hotfix/*` | Correcciones críticas | `main` | `main` y `develop` | Aprobación express |
| `support/*` | Mantenimiento de versiones | `main` | - | Solo cherry-pick |

---

## 2. Análisis de Fortalezas

### 2.1 Separación Clara de Ambientes

La estructura actual permite distinguir claramente entre código en producción (`main`), código en desarrollo (`develop`) y trabajo paralelo mediante features branches. Esta separación facilita la identificación del estado de cada piece de código y reduce el riesgo de introducir cambios no probados en producción.

### 2.2 Soporte para Múltiples Versiones

La existencia de ramas `support/*` permite mantener correcciones de seguridad para versiones anteriores sin afectar el desarrollo activo. Esto es crítico para sistemas empresariales que no pueden actualizar inmediatamente a la última versión.

### 2.3 Flujo de Release Definido

Las ramas de release proporcionan un checkpoint estable antes de producción, permitiendo realizar ajustes finos de última hora (documentación, versionado, ajustes de configuración) sin interferir con el desarrollo continuo.

### 2.4 Integración con Tickets

El formato `TICKET-123-descripcion`强制 una trazabilidad directa entre el código y el sistema de gestión de proyectos. Cada rama puede rastrearse hasta su origen, facilitando la auditoría y la comprensión del historial de cambios.

---

## 3. Análisis de Debilidades

### 3.1 Conflictos Frecuentes en Develop

Con 100 PRs semanales, la rama `develop` experimenta conflictos de merge con frecuencia. El problema se agrava cuando las features permanecen abiertas durante varios días, acumulando divergencia respecto a develop.

**Impacto**: Retrasos en la integración, tiempo dedicado a resolver conflictos en lugar de desarrollar funcionalidad.

### 3.2 Falta de Feature Flags

La estrategia actual no contempla el uso de feature flags, lo que obliga a merging completo de una feature antes de que pueda probarse en integración. Esto crea dependencias artificiales entre features no relacionadas.

**Impacto**: Bloqueos entre equipos, dificultad para desplegar parcialmente funcionalidades.

### 3.3 Proceso de Hotfix Inconsistente

Los hotfixes se mergean directamente a `main` y `develop`, pero no existen reglas claras sobre cómo manejar conflictos cuando `develop` ha avanzado significativamente desde el último release.

**Impacto**: Potencial regresión en features en desarrollo, conflictos complejos de resolver.

### 3.4 Ausencia de Rama de Pre-producción

No existe una rama intermedia entre `develop` y `main` para validación final en un ambiente que replique producción. Esto limita la capacidad de detectar problemas de integración tardíos.

**Impacto**: Mayor riesgo de regresiones en producción, dependencia excesiva de entornos de staging compartidos.

### 3.5 Política de Rebase No Definida

No hay guía clara sobre cuándo usar rebase vs merge, lo que resulta en historiales de git poco claros y dificultad para seguir el flujo de cambios.

**Impacto**: Dificultad para leer el historial, merge commits innecesarios, confusión sobre el orden de implementación.

---

## 4. Métricas Actuales

| Métrica | Valor Actual | Objetivo | Estado |
|---------|--------------|----------|--------|
| Tiempo promedio de merge de PR | 18 horas | < 24 horas | ✓ Cumplido |
| Tasa de conflictos en merge | 35% | < 20% | ✗ Por mejorar |
| PRs por semana | 100 | 100-150 | ✓ Cumplido |
| Rebase automático exitoso | 45% | > 80% | ✗ Por mejorar |
| Cobertura de tests en develop | 72% | > 85% | ✗ Por mejorar |

---

## 5. Propuesta de Mejora: GitFlow Plus

### 5.1 Estructura Propuesta

```
main
├── pre-prod (validación final)
│   └── [merge desde release/*]
├── develop
│   ├── feature/*
│   ├── bugfix/*
│   └── refactor/*
├── release/*
├── hotfix/*
└── experiment/* (rama de exploración)
```

### 5.2 Cambios Clave

1. **Nueva rama `pre-prod`**: Ambiente de validación intermedio que replica producción. Requiere pasar todos los tests de integración y pruebas manuales antes de merge a `main`.

2. **Introducción de Feature Flags**: Implementación de un sistema de feature flags para permitir merge temprano de features incompletas pero compilables.

3. **Política de Rebase**: Uso obligatorio de rebase interactivo para mantener un historial lineal en ramas de feature antes de crear el PR.

4. **Ramas de Experimentación**: Creación de espacio seguro para pruebas sin afectar métricas de código.

5. **Automatización de Conflictos**: Script que intenta resolver conflictos automáticamente mediante análisis semántico.

### 5.3 Diagrama de Flujo Propuesto

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Feature   │────▶│   Develop   │────▶│   Pre-prod  │
│   Branch    │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │                   │                   ▼
       │                   │            ┌─────────────┐
       │                   │            │    Main     │
       │                   │            │ (Producción)│
       │                   │            └─────────────┘
       ▼                   │
┌─────────────┐            │
│   Hotfix    │────────────┘
│             │
└─────────────┘
```

### 5.4 Reglas de Protección Actualizadas

| Rama | Requerimientos |
|------|----------------|
| `main` | 2 aprobaciones + CI verde +部署 automática |
| `pre-prod` | 1 aprobación + tests de integración verdes |
| `develop` | CI verde + tests unitarios pasando |
| `feature/*` | 1 aprobación + CI verde + feature flags configurados |
| `hotfix/*` | 1 aprobación express + tests críticos pasando |

---

## 6. Plan de Implementación

### Fase 1: Preparación (Semana 1-2)

- Documentar la nueva estrategia en el equipo
- Actualizar scripts de validación de ramas
- Implementar feature flags en el proyecto
- Crear rama `pre-prod` desde `main`

### Fase 2: Migración Gradual (Semana 3-4)

- Entrenar al equipo en el nuevo flujo
- Primeros proyectos piloto en la nueva estructura
- Ajustar pipelines de CI/CD

### Fase 3: Adopción Completa (Semana 5+)

- Migrar todos los proyectos activos
- Monitorear métricas de conflicto
- Ajustar según feedback del equipo

---

## 7. Conclusión

La estrategia actual cumple con los requisitos básicos de branching, pero presenta oportunidades significativas de mejora especialmente en la reducción de conflictos y la aceleración del ciclo de desarrollo. La implementación de GitFlow Plus con feature flags y una rama de pre-producción permitirá al equipo manejar el volumen de 100 PRs semanales con mayor eficiencia y menor riesgo de regresiones.

---

*Última actualización: 2024*
*Próxima revisión programada: Trimestral*

// === ARCHIVO: docs/strategies/git-guidelines.md ===
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


// === ARCHIVO: scripts/setup-branches.sh ===
#!/bin/bash

set -euo pipefail

readonly RESET="\033[0m"
readonly BOLD="\033[1m"
readonly GREEN="\033[32m"
readonly YELLOW="\033[33m"
readonly RED="\033[31m"
readonly BLUE="\033[34m"
readonly CYAN="\033[36m"

readonly BRANCHING_STRATEGY_VERSION="2.0.0"
readonly DEFAULT_MAIN_BRANCH="main"
readonly DEFAULT_DEVELOP_BRANCH="develop"
readonly FEATURE_PREFIX="feature/"
readonly HOTFIX_PREFIX="hotfix/"
readonly RELEASE_PREFIX="release/"
readonly BUGFIX_PREFIX="bugfix/"
readonly SUPPORT_PREFIX="support/"

function print_header() {
    echo -e "${BOLD}${BLUE}========================================${RESET}"
    echo -e "${BOLD}${BLUE}  Git Branching Strategy Setup${RESET}"
    echo -e "${BOLD}${BLUE}  Version: ${BRANCHING_STRATEGY_VERSION}${RESET}"
    echo -e "${BOLD}${BLUE}========================================${RESET}"
    echo ""
}

function print_success() {
    echo -e "${GREEN}✓${RESET} $1"
}

function print_warning() {
    echo -e "${YELLOW}⚠${RESET} $1"
}

function print_error() {
    echo -e "${RED}✗${RESET} $1"
}

function print_info() {
    echo -e "${CYAN}ℹ${RESET} $1"
}

function check_git_repository() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "No se encuentra en un repositorio Git"
        exit 1
    fi
    print_success "Repositorio Git detectado"
}

function check_git_available() {
    if ! command -v git &> /dev/null; then
        print_error "Git no está instalado"
        exit 1
    fi
    print_success "Git disponible: $(git --version)"
}

function validate_branch_name() {
    local branch_name="$1"
    local pattern="^(feature|hotfix|release|bugfix|support)\\/[A-Z]+-[0-9]+-[a-z0-9-]+$|^main$|^develop$|^release\\/[0-9]+\\.[0-9]+\\.[0-9]+$"
    
    if [[ ! "$branch_name" =~ $pattern ]]; then
        print_error "Nombre de rama inválido: $branch_name"
        print_info "Formato esperado: tipo/TICKET-descripcion"
        print_info "Ejemplos:"
        print_info "  - feature/PROJ-123-agregar-filtro"
        print_info "  - hotfix/PROJ-456-corregir-error"
        print_info "  - release/1.2.0"
        return 1
    fi
    return 0
}

function branch_exists() {
    local branch_name="$1"
    git rev-parse --verify "$branch_name" > /dev/null 2>&1
}

function create_main_branch() {
    local main_branch="${1:-$DEFAULT_MAIN_BRANCH}"
    
    echo -e "\n${BOLD}Creando rama principal: $main_branch${RESET}"
    
    if branch_exists "$main_branch"; then
        print_warning "La rama '$main_branch' ya existe"
    else
        git checkout -b "$main_branch" 2>/dev/null || git branch "$main_branch"
        print_success "Rama '$main_branch' creada"
    fi
    
    git config branch."$main_branch".protected "true"
    git config branch."$main_branch".description "Rama principal de producción"
    print_info "Rama '$main_branch' configurada como protegida"
}

function create_develop_branch() {
    local develop_branch="${1:-$DEFAULT_DEVELOP_BRANCH}"
    
    echo -e "\n${BOLD}Creando rama de desarrollo: $develop_branch${RESET}"
    
    if branch_exists "$develop_branch"; then
        print_warning "La rama '$develop_branch' ya existe"
    else
        if branch_exists "main"; then
            git checkout -b "$develop_branch" main
        else
            git checkout -b "$develop_branch"
        fi
        print_success "Rama '$develop_branch' creada desde main"
    fi
    
    git config branch."$develop_branch".protected "true"
    git config branch."$develop_branch".description "Rama de integración continua"
    print_info "Rama '$develop_branch' configurada como protegida"
}

function create_feature_branch() {
    local ticket_id="$1"
    local description="$2"
    local base_branch="${3:-$DEFAULT_DEVELOP_BRANCH}"
    local branch_name="${FEATURE_PREFIX}${ticket_id}-${description}"
    
    echo -e "\n${BOLD}Creando rama de feature: $branch_name${RESET}"
    
    if ! validate_branch_name "$branch_name"; then
        return 1
    fi
    
    if branch_exists "$branch_name"; then
        print_warning "La rama '$branch_name' ya existe"
        git checkout "$branch_name"
    else
        if ! branch_exists "$base_branch"; then
            print_error "La rama base '$base_branch' no existe"
            return 1
        fi
        
        git fetch origin "$base_branch"
        git checkout -b "$branch_name" "origin/$base_branch"
        print_success "Rama '$branch_name' creada desde $base_branch"
    fi
    
    git config branch."$branch_name".type "feature"
    git config branch."$branch_name".ticket "$ticket_id"
    git config branch."$branch_name".description "Feature: $description"
}

function create_hotfix_branch() {
    local ticket_id="$1"
    local description="$2"
    local base_branch="${3:-$DEFAULT_MAIN_BRANCH}"
    local branch_name="${HOTFIX_PREFIX}${ticket_id}-${description}"
    
    echo -e "\n${BOLD}Creando rama de hotfix: $branch_name${RESET}"
    
    if ! validate_branch_name "$branch_name"; then
        return 1
    fi
    
    if branch_exists "$branch_name"; then
        print_warning "La rama '$branch_name' ya existe"
        git checkout "$branch_name"
    else
        if ! branch_exists "$base_branch"; then
            print_error "La rama base '$base_branch' no existe"
            return 1
        fi
        
        git fetch origin "$base_branch"
        git checkout -b "$branch_name" "origin/$base_branch"
        print_success "Rama '$branch_name' creada desde $base_branch"
    fi
    
    git config branch."$branch_name".type "hotfix"
    git config branch."$branch_name".ticket "$ticket_id"
    git config branch."$branch_name".description "Hotfix: $description"
}

function create_release_branch() {
    local version="$1"
    local base_branch="${2:-$DEFAULT_DEVELOP_BRANCH}"
    local branch_name="${RELEASE_PREFIX}${version}"
    
    echo -e "\n${BOLD}Creando rama de release: $branch_name${RESET}"
    
    if ! validate_branch_name "$branch_name"; then
        return 1
    fi
    
    if branch_exists "$branch_name"; then
        print_warning "La rama '$branch_name' ya existe"
        git checkout "$branch_name"
    else
        if ! branch_exists "$base_branch"; then
            print_error "La rama base '$base_branch' no existe"
            return 1
        fi
        
        git fetch origin "$base_branch"
        git checkout -b "$branch_name" "origin/$base_branch"
        print_success "Rama '$branch_name' creada desde $base_branch"
    fi
    
    git config branch."$branch_name".type "release"
    git config branch."$branch_name".version "$version"
    git config branch."$branch_name".description "Release version $version"
}

function setup_branch_protection() {
    local branch_name="$1"
    local require_reviews="${2:-true}"
    local require_checks="${3:-true}"
    
    echo -e "\n${BOLD}Configurando protección para: $branch_name${RESET}"
    
    if command -v gh &> /dev/null; then
        gh repo set-default-protection "$branch_name" 2>/dev/null || true
        print_info "Protección de rama configurada (GitHub CLI)"
    elif command -v glab &> /dev/null; then
        print_info "Configura la protección manualmente en GitLab"
    else
        print_info "Use la interfaz del proveedor Git para configurar protección"
    fi
    
    print_success "Protección configurada para '$branch_name'"
}

function setup_git_hooks() {
    local hooks_dir=".git/hooks"
    
    echo -e "\n${BOLD}ConfigurandoGit hooks${RESET}"
    
    if [ ! -d "$hooks_dir" ]; then
        mkdir -p "$hooks_dir"
    fi
    
    cat > "$hooks_dir/commit-msg" << 'HOOK'
#!/bin/bash

BRANCH_NAME=$(git symbolic-ref --short HEAD 2>/dev/null)
COMMIT_MSG=$(cat "$1")

PATTERN="^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)\\(.*\\): .+"

if ! [[ "$COMMIT_MSG" =~ $PATTERN ]]; then
    echo "Error: El mensaje de commit no sigue la convención Angular"
    echo "Formato requerido: tipo(descripción): mensaje"
    echo "Tipos válidos: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert"
    exit 1
fi

FEATURE_PATTERN="^(feature|hotfix|release|bugfix|support)\\/[A-Z]+-[0-9]+"
if ! [[ "$BRANCH_NAME" =~ $FEATURE_PATTERN ]] && [ "$BRANCH_NAME" != "main" ] && [ "$BRANCH_NAME" != "develop" ]; then
    echo "Advertencia: La rama $BRANCH_NAME no sigue el patrón de nomenclatura"
fi
HOOK

    chmod +x "$hooks_dir/commit-msg"
    print_success "Hook de commit-msg instalado"
    print_info "Los mensajes de commit ahora se validan contra la convención Angular"
}

function display_branching_diagram() {
    echo -e "\n${BOLD}${CYAN}========================================${RESET}"
    echo -e "${BOLD}${CYAN}  Diagrama de Ramas${RESET}"
    echo -e "${BOLD}${CYAN}========================================${RESET}\n"
    
    cat << 'EOF'
                    ┌─────────────┐
                    │     main    │ ← Producción estable
                    └──────┬──────┘
                           │
                           │ (tag release/v1.0.0)
                           │
                    ┌──────▼──────┐
                    │  develop    │ ← Integración continua
                    └──────┬──────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
    │feature/ │      │feature/ │      │feature/ │
    │PROJ-123 │      │PROJ-124 │      │PROJ-125 │
    │-filter  │      │-search  │      │-export  │
    └────┬────┘      └────┬────┘      └────┬────┘
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
                    ┌──────▼──────┐
                    │  release/   │ ← Preparar Release
                    │   1.1.0     │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
        ┌────▼────┐              ┌──────▼──────┐
        │  main   │              │   develop   │
        │(v1.1.0) │              │  (merge)    │
        └─────────┘              └─────────────┘
              │
        ┌─────▼─────┐
        │ hotfix/   │ ← Corrección urgente
        │PROJ-456   │
        └─────┬─────┘
              │
        ┌─────▼─────┐
        │  main     │
        │(v1.0.1)   │
        └───────────┘
EOF
}

function display_usage() {
    cat << EOF
${BOLD}Uso:${RESET}
    $0 [comando] [opciones]

${BOLD}Comandos:${RESET}
    init                    Inicializar la estrategia de branching completa
    feature <ticket> <desc> Crear una rama de feature
    hotfix <ticket> <desc>  Crear una rama de hotfix
    release <version>       Crear una rama de release
    diagram                 Mostrar el diagrama de ramas
    hooks                   Instalar Git hooks
    help                    Mostrar esta ayuda

${BOLD}Opciones:${RESET}
    -b, --base <rama>       Rama base para crear la nueva rama
    -h, --help              Mostrar ayuda

${BOLD}Ejemplos:${RESET}
    $0 init
    $0 feature PROJ-123 agregar-filtro-busqueda
    $0 hotfix PROJ-456 corregir-error-login
    $0 release 1.2.0
    $0 feature PROJ-789 nueva-funcionalidad -b develop

${BOLD}Convenciones de nombres:${RESET}
    feature:  feature/PROJ-123-descripcion-corta
    hotfix:   hotfix/PROJ-456-descripcion-corta
    release:  release/1.2.0
    bugfix:   bugfix/PROJ-789-descripcion

${BOLD}Commits semánticos:${RESET}
    feat:     Nuevas funcionalidades
    fix:      Corrección de errores
    docs:     Documentación
    style:    Formateo, sin cambio de lógica
    refactor: Refactorización
    test:     Tests
    chore:    Mantenimiento
    perf:     Mejoras de rendimiento
    ci:       Cambios en CI/CD
    build:    Cambios en build
    revert:   Revertir cambios
EOF
}

function initialize_branching_strategy() {
    print_info "Inicializando estrategia de branching..."
    
    check_git_available
    check_git_repository
    
    create_main_branch "$DEFAULT_MAIN_BRANCH"
    create_develop_branch "$DEFAULT_DEVELOP_BRANCH"
    
    setup_git_hooks
    
    echo -e "\n${BOLD}Creando estructura de ramas de ejemplo:${RESET}"
    create_feature_branch "PROJ-100" "configurar-linting" "develop"
    create_feature_branch "PROJ-101" "agregar-tests-unitarios" "develop"
    
    echo -e "\n${GREEN}${BOLD}========================================${RESET}"
    echo -e "${GREEN}${BOLD}  Estrategia de branching inicializada${RESET}"
    echo -e "${GREEN}${BOLD}========================================${RESET}\n"
    
    print_success "Ramas principales creadas: main, develop"
    print_success "Git hooks configurados"
    print_info "Ejecute '$0 diagram' para ver el flujo de ramas"
    
    display_branching_diagram
}

function main() {
    print_header
    
    local command="${1:-}"
    
    case "$command" in
        init)
            initialize_branching_strategy
            ;;
        feature)
            local ticket="${2:-}"
            local description="${3:-}"
            if [ -z "$ticket" ] || [ -z "$description" ]; then
                print_error "Se requiere ticket y descripción"
                display_usage
                exit 1
            fi
            create_feature_branch "$ticket" "$description"
            ;;
        hotfix)
            local ticket="${2:-}"
            local description="${3:-}"
            if [ -z "$ticket" ] || [ -z "$description" ]; then
                print_error "Se requiere ticket y descripción"
                display_usage
                exit 1
            fi
            create_hotfix_branch "$ticket" "$description"
            ;;
        release)
            local version="${2:-}"
            if [ -z "$version" ]; then
                print_error "Se requiere versión"
                display_usage
                exit 1
            fi
            create_release_branch "$version"
            ;;
        diagram)
            display_branching_diagram
            ;;
        hooks)
            setup_git_hooks
            ;;
        help|--help|-h)
            display_usage
            ;;
        *)
            print_error "Comando desconocido: $command"
            display_usage
            exit 1
            ;;
    esac
}

main "$@"
// === ARCHIVO: scripts/validate-branch.sh ===
#!/bin/bash

set -euo pipefail

readonly RESET="\033[0m"
readonly BOLD="\033[1m"
readonly GREEN="\033[32m"
readonly YELLOW="\033[33m"
readonly RED="\033[31m"
readonly BLUE="\033[34m"
readonly CYAN="\033[36m"
readonly MAGENTA="\033[35m"

readonly VALID_BRANCH_TYPES=("feature" "hotfix" "release" "bugfix" "support")
readonly MAIN_BRANCH="main"
readonly DEVELOP_BRANCH="develop"
readonly VALID_MAIN_BRANCHES=("$MAIN_BRANCH" "$DEVELOP_BRANCH")

ERRORS=0
WARNINGS=0

function print_header() {
    echo -e "${BOLD}${BLUE}========================================${RESET}"
    echo -e "${BOLD}${BLUE}  Branch Validation Tool${RESET}"
    echo -e "${BOLD}${BLUE}  Version 2.0.0${RESET}"
    echo -e "${BOLD}${BLUE}========================================${RESET}"
    echo ""
}

function print_success() {
    echo -e "${GREEN}✓${RESET} $1"
}

function print_warning() {
    echo -e "${YELLOW}⚠${RESET} $1"
    ((WARNINGS++))
}

function print_error() {
    echo -e "${RED}✗${RESET} $1"
    ((ERRORS++))
}

function print_info() {
    echo -e "${CYAN}ℹ${RESET} $1"
}

function print_section() {
    echo -e "\n${BOLD}${MAGENTA}━━━ $1 ━━━${RESET}"
}

function check_git_repository() {
    print_section "Verificando repositorio"
    
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "No se encuentra en un repositorio Git"
        exit 1
    fi
    
    local repo_root
    repo_root=$(git rev-parse --show-toplevel)
    print_success "Repositorio: $repo_root"
    print_success "Rama actual: $(git symbolic-ref --short HEAD)"
}

function validate_branch_name_format() {
    print_section "Validando nombre de rama"
    
    local branch_name
    branch_name=$(git symbolic-ref --short HEAD 2>/dev/null || git rev-parse --short HEAD)
    
    echo "Rama a validar: ${BOLD}$branch_name${RESET}"
    
    local name_pattern="^[a-z0-9][a-z0-9-]*$"
    if ! [[ "$branch_name" =~ $name_pattern ]]; then
        print_error "El nombre contiene caracteres inválidos"
        print_info "Solo se permiten letras minúsculas, números y guiones"
        print_info "No debe empezar con guión"
        return 1
    fi
    print_success "Formato de nombre válido"
    
    local feature_pattern="^(feature|hotfix|release|bugfix|support)\\/[A-Z]+-[0-9]+(-[a-z0-9]+)*$"
    local main_pattern="^(main|master|develop|develop-legacy)$"
    local release_pattern="^release\\/[0-9]+\\.[0-9]+\\.?[0-9]*$"
    local version_pattern="^v[0-9]+\\.[0-9]+\\.[0-9]+$"
    
    if [[ "$branch_name" =~ $feature_pattern ]]; then
        print_success "Rama de tipo: Feature/Hotfix/Bugfix/Support"
        validate_feature_branch "$branch_name"
    elif [[ "$branch_name" =~ $main_pattern ]]; then
        print_success "Rama de tipo: Principal (main/develop)"
    elif [[ "$branch_name" =~ $release_pattern ]]; then
        print_success "Rama de tipo: Release"
        validate_release_branch "$branch_name"
    elif [[ "$branch_name" =~ $version_pattern ]]; then
        print_success "Rama de tipo: Tag/Version"
    else
        print_warning "El nombre no coincide con ninguna convención conocida"
        print_info " Patrón esperado: tipo/TICKET-descripcion"
    fi
}

function validate_feature_branch() {
    local branch_name="$1"
    
    local type
    type=$(echo "$branch_name" | cut -d'/' -f1)
    local ticket
    ticket=$(echo "$branch_name" | cut -d'/' -f2 | cut -d'-' -f1-2)
    local description
    description=$(echo "$branch_name" | cut -d'/' -f2 | cut -d'-' -f3-)
    
    echo "  Tipo: $type"
    echo "  Ticket: $ticket"
    echo "  Descripción: $description"
    
    local valid_types=("feature" "hotfix" "bugfix" "support")
    local type_valid=false
    for t in "${valid_types[@]}"; do
        if [ "$type" = "$t" ]; then
            type_valid=true
            break
        fi
    done
    
    if [ "$type_valid" = false ]; then
        print_error "Tipo de rama inválido: $type"
        print_info "Tipos válidos: feature, hotfix, bugfix, support"
    fi
    
    if ! [[ "$ticket" =~ ^[A-Z]+-[0-9]+$ ]]; then
        print_error "Formato de ticket inválido: $ticket"
        print_info "Formato esperado: PROJ-123"
    fi
    
    if [ -z "$description" ]; then
        print_warning "La descripción está vacía"
    elif [ ${#description} -lt 3 ]; then
        print_warning "La descripción es muy corta (mínimo 3 caracteres)"
    elif [ ${#description} -gt 50 ]; then
        print_warning "La descripción es muy larga (máximo 50 caracteres)"
    fi
}

function validate_release_branch() {
    local branch_name="$1"
    
    local version
    version=$(echo "$branch_name" | cut -d'/' -f2)
    
    echo "  Versión: $version"
    
    if ! [[ "$version" =~ ^[0-9]+\\.[0-9]+(\\.[0-9]+)?$ ]]; then
        print_error "Formato de versión inválido: $version"
        print_info "Formato esperado: 1.0.0 o 1.0"
    fi
}

function validate_branch_upstream() {
    print_section "Validando relación con rama upstream"
    
    local current_branch
    current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
    
    if [ -z "$current_branch" ]; then
        print_warning "HEAD desconectado (commit específico)"
        return 0
    fi
    
    local upstream_branch
    upstream_branch=$(git rev-parse --abbrev-ref "${current_branch}@{upstream}" 2>/dev/null || echo "")
    
    if [ -z "$upstream_branch" ]; then
        print_warning "La rama no tiene upstream configurado"
        print_info "Ejecute: git branch --set-upstream-to=origin/branch"
    else
        print_success "Upstream: $upstream_branch"
        
        local commits_ahead
        commits_ahead=$(git rev-list --count "${upstream_branch}..${current_branch}" 2>/dev/null || echo "0")
        local commits_behind
        commits_behind=$(git rev-list --count "${current_branch}..${upstream_branch}" 2>/dev/null || echo "0")
        
        echo "  Commits adelante: $commits_ahead"
        echo "  Commits detrás: $commits_behind"
        
        if [ "$commits_behind" -gt 0 ]; then
            print_warning "La rama está $commits_behind commits detrás del upstream"
            print_info "Considere hacer rebase: git rebase $upstream_branch"
        fi
        
        if [ "$commits_ahead" -gt 0 ]; then
            print_info "La rama tiene $commits_ahead commits locales sin pushear"
        fi
    fi
}

function validate_commit_history() {
    print_section "Validando historial de commits"
    
    local current_branch
    current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
    
    if [ -z "$current_branch" ]; then
        print_warning "No se puede validar historial en HEAD desconectado"
        return 0
    fi
    
    local main_branch="main"
    local develop_branch="develop"
    
    local merge_base
    merge_base=$(git merge-base "$current_branch" "origin/$main_branch" 2>/dev/null || echo "")
    
    if [ -z "$merge_base" ]; then
        merge_base=$(git merge-base "$current_branch" "origin/$develop_branch" 2>/dev/null || echo "")
    fi
    
    if [ -z "$merge_base" ]; then
        print_warning "No se encontró base común con ramas principales"
        return 0
    fi
    
    local commits_count
    commits_count=$(git rev-list --count "$merge_base..$current_branch")
    
    echo "Commits desde la base: $commits_count"
    
    if [ "$commits_count" -eq 0 ]; then
        print_warning "No hay commits en esta rama"
    elif [ "$commits_count" -gt 20 ]; then
        print_warning "La rama tiene $commits_count commits"
        print_info "Considere hacer squash o rebase interactivo"
    else
        print_success "Cantidad de commits apropiada"
    fi
    
    local last_commit
    last_commit=$(git log -1 --pretty=format:"%H %s" "$current_branch")
    local commit_hash commit_message
    commit_hash=$(echo "$last_commit" | cut -d' ' -f1)
    commit_message=$(echo "$last_commit" | cut -d' ' -f2-)
    
    echo ""
    echo "  Último commit: ${commit_hash:0:7}"
    echo "  Mensaje: $commit_message"
    
    local commit_pattern="^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)\\(.*\\): .+"
    if ! [[ "$commit_message" =~ $commit_pattern ]]; then
        print_error "El commit no sigue la convención de commits"
        print_info "Formato: tipo(descripción): mensaje"
    else
        print_success "Commit sigue convención semántica"
    fi
}

function validate_branch_protection() {
    print_section "Validando protección de rama"
    
    local current_branch
    current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
    
    if [ -z "$current_branch" ]; then
        print_warning "HEAD desconectado, no se puede verificar protección"
        return 0
    fi
    
    local protected_branches=("main" "master" "develop")
    local is_protected=false
    
    for branch in "${protected_branches[@]}"; do
        if [ "$current_branch" = "$branch" ]; then
            is_protected=true
            break
        fi
    done
    
    if [ "$is_protected" = true ]; then
        print_success "Rama '$current_branch' es una rama protegida"
        
        local protected_config
        protected_config=$(git config "branch.$current_branch.protected" 2>/dev/null || echo "")
        
        if [ "$protected_config" = "true" ]; then
            print_success "Configuración de protección detectada localmente"
        else
            print_warning "No se encontró configuración de protección local"
            print_info "Configure con: git config branch.$current_branch.protected true"
        fi
    else
        print_info "Rama '$current_branch' no es una rama protegida"
    fi
}

function validate_working_directory() {
    print_section "Validando estado del working directory"
    
    local status
    status=$(git status --porcelain)
    
    if [ -z "$status" ]; then
        print_success "Working directory limpio"
    else
        local staged_count staged_modified_count untracked_count
        staged_count=$(echo "$status" | grep -c "^.." || echo "0")
        staged_modified_count=$(echo "$status" | grep -c "^M" || echo "0")
        untracked_count=$(echo "$status" | grep -c "^??" || echo "0")
        
        echo ""
        echo "  Archivos en staging: $staged_count"
        echo "  Archivos modificados: $staged_modified_count"
        echo "  Archivos sin rastrear: $untracked_count"
        
        if [ "$staged_count" -gt 0 ] || [ "$staged_modified_count" -gt 0 ]; then
            print_warning "Hay cambios sin commit"
            print_info "Ejecute: git status para ver detalles"
        fi
        
        if [ "$untracked_count" -gt 5 ]; then
            print_warning "Muchos archivos sin rastrear ($untracked_count)"
            print_info "Considere agregar un .gitignore"
        fi
    fi
}

function validate_ci_config() {
    print_section "Validando configuración de CI/CD"
    
    local ci_files=(".github/workflows" ".gitlab-ci.yml" "Jenkinsfile" "azure-pipelines.yml")
    local found_ci=false
    
    for ci_file in "${ci_files[@]}"; do
        if [ -e "$ci_file" ]; then
            print_success "Encontrado: $ci_file"
            found_ci=true
        fi
    done
    
    if [ "$found_ci" = false ]; then
        print_warning "No se encontró configuración de CI/CD"
        print_info "Considere agregar pipelines para validación automática"
    fi
}

function display_summary() {
    print_section "Resumen de validación"
    
    echo ""
    echo -e "  ${RED}Errores:   $ERRORS${RESET}"
    echo -e "  ${YELLOW}Advertencias: $WARNINGS${RESET}"
    echo ""
    
    if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
        echo -e "${GREEN}${BOLD}✓ La rama cumple con todas las validaciones${RESET}"
        return 0
    elif [ "$ERRORS" -eq 0 ]; then
        echo -e "${YELLOW}${BOLD}⚠ La rama tiene advertencias pero es válida${RESET}"
        return 0
    else
        echo -e "${RED}${BOLD}✗ La rama no cumple con los requisitos${RESET}"
        echo ""
        echo "Para corregir los errores:"
        echo "  1. Revise el nombre de la rama"
        echo "  2. Asegure que los commits sigan la convención"
        echo "  3. Mantenga la rama actualizada con upstream"
        return 1
    fi
}

function run_full_validation() {
    check_git_repository
    validate_branch_name_format
    validate_branch_upstream
    validate_commit_history
    validate_branch_protection
    validate_working_directory
    validate_ci_config
    display_summary
}

function validate_specific_branch() {
    local branch_name="$1"
    
    print_section "Validando rama específica: $branch_name"
    
    local current_branch
    current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
    
    if [ -n "$current_branch" ]; then
        git checkout "$branch_name" 2>/dev/null || {
            print_error "No se pudo cambiar a la rama $branch_name"
            exit 1
        }
    fi
    
    validate_branch_name_format
    validate_branch_upstream
    validate_commit_history
    validate_branch_protection
    display_summary
}

function display_usage() {
    cat << EOF
${BOLD}Uso:${RESET}
    $0 [opciones] [rama]

${BOLD}Opciones:${RESET}
    -a, --all          Validar todas las ramas del repositorio
    -b, --branch       Validar una rama específica
    -q, --quiet        Salida mínima
    -v, --verbose      Salida detallada
    -h, --help         Mostrar esta ayuda

${BOLD}Descripción:${RESET}
    Este script valida que las ramas de Git cumplan con la estrategia
    de branching definida, incluyendo:
    
    - Formato del nombre de rama
    - Relación con rama upstream
    - Historial de commits
    - Protección de ramas
    - Estado del working directory
    - Configuración de CI/CD

${BOLD}Convenciones de nombres:${RESET}
    feature:  feature/PROJ-123-descripcion
    hotfix:   hotfix/PROJ-456-descripcion
    release:  release/1.2.0
    bugfix:   bugfix/PROJ-789-descripcion

${BOLD}Commits:${RESET}
    Los mensajes deben seguir la convención Angular:
    tipo(descripción): mensaje
    
   Tipos válidos: feat, fix, docs, style, refactor, test, chore

${BOLD}Ejemplos:${RESET}
    $0                  # Validar rama actual
    $0 -b feature/PROJ-123  # Validar rama específica
    $0 -a                # Validar todas las ramas
EOF
}

function validate_all_branches() {
    print_section "Validando todas las ramas"
    
    local branches
    branches=$(git for-each-ref --format='%(refname:short)' refs/heads/)
    
    local current_branch
    current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
    
    for branch in $branches; do
        echo -e "\n${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        echo -e "${BOLD}  Validando: $branch${RESET}"
        echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
        
        if [ "$branch" != "$current_branch" ]; then
            git checkout "$branch" > /dev/null 2>&1
        fi
        
        ERRORS=0
        WARNINGS=0
        
        validate_branch_name_format
        validate_branch_upstream
        validate_commit_history
        validate_branch_protection
        
        if [ "$ERRORS" -gt 0 ]; then
            print_error "Rama '$branch' tiene $ERRORS errores"
        fi
    done
    
    if [ -n "$current_branch" ]; then
        git checkout "$current_branch" > /dev/null 2>&1
    fi
    
    echo -e "\n${BOLD}========================================${RESET}"
    echo -e "${BOLD}  Resumen de todas las ramas${RESET}"
    echo -e "${BOLD}========================================${RESET}"
}

function main() {
    print_header
    
    local mode="current"
    local branch_name=""
    local quiet=false
    local verbose=false
    
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -a|--all)
                mode="all"
                shift
                ;;
            -b|--branch)
                mode="specific"
                branch_name="$2"
                shift 2
                ;;
            -q|--quiet)
                quiet=true
                shift
                ;;
            -v|--verbose)
                verbose=true
                shift
                ;;
            -h|--help)
                display_usage
                exit 0
                ;;
            *)
                branch_name="$1"
                mode="specific"
                shift
                ;;
        esac
    done
    
    case "$mode" in
        current)
            run_full_validation
            ;;
        specific)
            if [ -z "$branch_name" ]; then
                print_error "Debe especificar una rama"
                display_usage
                exit 1
            fi
            validate_specific_branch "$branch_name"
            ;;
        all)
            validate_all_branches
            ;;
    esac
}

main "$@"

```
