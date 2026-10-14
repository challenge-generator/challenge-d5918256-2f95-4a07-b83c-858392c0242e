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