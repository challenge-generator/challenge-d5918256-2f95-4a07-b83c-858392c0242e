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