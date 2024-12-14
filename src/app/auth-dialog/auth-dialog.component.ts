import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [MatDialogModule], // Добавлен импорт MatDialogModule
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css'],
})
export class AuthDialogComponent {
  constructor(private dialogRef: MatDialogRef<AuthDialogComponent>) {}

  auth() {
    this.dialogRef.close('auth');
  }

  close(){
    this.dialogRef.close();
  }
}
