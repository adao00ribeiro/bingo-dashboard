import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAccordion, MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { ColorPickerDirective } from 'ngx-color-picker';
import { IOnlineHouseResponse } from '../../../../../../interfaces/response/bingo/IOnlineHouseResponse';
import { OnlineHouseService } from '../../../../../../services/online-house/online-house.service';


@Component({
  selector: 'app-online-house',
  imports: [ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatAccordion,
    MatExpansionModule, ColorPickerDirective],
  templateUrl: './online-house.component.html',
  styleUrl: './online-house.component.scss',
})
export class OnlineHouseComponent implements OnInit{
  onlineHouse = input.required<IOnlineHouseResponse>();
  form!: FormGroup;
  loading = false;
  protected readonly onlineHouseService: OnlineHouseService = inject(OnlineHouseService);
  private router: Router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      hostname: ['', Validators.required],
      settings: this.fb.group({
        enabledScratch: ['', Validators.required],
        emailConfig: this.fb.group({
          primarySmtp: this.fb.group({
            host: ['', Validators.required],
            port: ['', Validators.required],
            user: ['', Validators.required],
            password: ['', Validators.required],
            enableSsl: [true],
          }),
          fromAddress: ['', [Validators.required, Validators.email]],
          fromName: ['', Validators.required]
        }),
        bingoColorsConfig: this.fb.group({
          colorPrimary: ['', [Validators.required]],
          colorPrimaryHover: ['', Validators.required],
          colorSecond: ['', Validators.required],
          colorSecondHover: ['', Validators.required],
          backgroundColorPrimary: ['', Validators.required],
          backgroundColorSecond: ['', Validators.required],
          backgroundColorThird: ['', Validators.required],
          colorBall: ['', Validators.required],
          colorBallMarked: ['', Validators.required],
          colorBallCurrent: ['', Validators.required],
          colorPanelCard: ['', Validators.required],
          textColor: ['', Validators.required],
          textColorHover: ['', Validators.required]
        }),
      })
    });
  }

  selectedColorControl: string | null = null;

  openColorPicker(controlName: string) {
    this.selectedColorControl = controlName;
  }

  ngOnInit(): void {
    this.form.patchValue(this.onlineHouse());
  }

  get bingoColors() {
    return this.form.get('settings.bingoColorsConfig') as FormGroup;
  }

  // Método genérico para salvar qualquer campo
  saveField(fieldPath: string, value: any): void {
    if (this.loading) return;

    // Cria o objeto com a estrutura aninhada correta
    const payload = this.buildNestedObject(fieldPath, value);

    this.loading = true;

    this.onlineHouseService.UpdateById(this.onlineHouse().id, payload).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open(`${fieldPath} atualizado com sucesso`, 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar'],
        });
      },
      error: (err) => {
        console.error('Erro ao salvar', err);
        this.loading = false;
        this.snackBar.open('Erro ao atualizar campo', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar'],
        });
      }
    });
  }

  // Método auxiliar para construir objeto aninhado a partir do path
  private buildNestedObject(path: string, value: any): any {
    const keys = path.split('.');
    const result: any = {};

    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    return result;
  }

  // Método específico para mudança de cor
  onColorChange(controlName: string, color: string): void {
    this.form.get('settings.bingoColorsConfig')?.get(controlName)?.setValue(color);
    this.saveField(`settings.bingoColorsConfig.${controlName}`, color);
  }

  // Método para salvar campos simples (name, hostname)
  onFieldChange(fieldName: string): void {
    const control = this.form.get(fieldName);
    if (control && control.valid) {
      this.saveField(fieldName, control.value);
    }
  }

  // Método para salvar campos aninhados
  onNestedFieldChange(fieldPath: string): void {
    const control = this.form.get(fieldPath);
    if (control && control.valid) {
      this.saveField(fieldPath, control.value);
    }
  }

  back() {
    this.router.navigate(['/sellers']);
  }
}
