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