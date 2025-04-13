import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ColorPickerComponent, ColorPickerDirective } from 'ngx-color-picker';

@Component({
  selector: 'app-customize-colors',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ColorPickerDirective],
  templateUrl: './customize-colors.component.html',
  styleUrl: './customize-colors.component.scss'
})
export class CustomizeColorsComponent {
  public color: string = '#2889e9';
}
