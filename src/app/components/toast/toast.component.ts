import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="toast-container">
      @for (toast of toastService.toasts$ | async; track toast.id) {
        <div class="toast" [ngClass]="toast.type">
          <span>{{ toast.message }}</span>
          <button (click)="toastService.remove(toast.id)" class="close-btn">&times;</button>
        </div>
      }
    </div>
  `,
    styles: [`
    .toast-container { position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px; }
    .toast { min-width: 300px; padding: 16px; border-radius: 8px; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; justify-content: space-between; align-items: center; animation: slideIn 0.3s ease-out; }
    .toast.success { border-left: 4px solid #10B981; }
    .toast.error { border-left: 4px solid #EF4444; }
    .toast.info { border-left: 4px solid #3B82F6; }
    .close-btn { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #999; margin-left: 10px; }
    .close-btn:hover { color: #333; }
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  `]
})
export class ToastComponent {
    constructor(public toastService: ToastService) { }
}
