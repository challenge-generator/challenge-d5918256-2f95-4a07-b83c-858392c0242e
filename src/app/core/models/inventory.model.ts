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