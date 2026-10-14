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