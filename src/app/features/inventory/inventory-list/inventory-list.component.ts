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