import { Component } from '@angular/core';
import { UserManagementComponent } from '../../admin/user-management/user-management.component';
import { useAnimation } from '@angular/animations';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [UserManagementComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
