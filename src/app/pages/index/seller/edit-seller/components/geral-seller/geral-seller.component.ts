import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { SellerService } from '../../../../../../services/seller/seller.service';

@Component({
  selector: 'app-geral-seller',
  imports: [
    ReactiveFormsModule,
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
    MatExpansionModule],
  templateUrl: './geral-seller.component.html',
  styleUrl: './geral-seller.component.scss',
})
export class GeralSellerComponent implements OnInit {
  id = input('');
  form!: FormGroup;
  loading = false;
  protected readonly sellerService: SellerService = inject(SellerService);
  private router: Router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      indicateRewardValue: ['', Validators.required],
    });

    this.loadSeller();
  }
  loadSeller(): void {
    this.loading = true;
    this.sellerService.GetById(this.id()).subscribe({
      next: (seller) => {
        this.form.patchValue(seller);
        this.loading = false;
      },
      error: (err) => {
        this.snackBar.open(err.error.detail, 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'error-snackbar',
        });
        this.loading = false;
      },
      complete: () => {


      }
    });;
  }

  save(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const updatedSeller = this.form.value;

    this.sellerService.UpdateById(this.id(), updatedSeller).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open("Campo Atualizado com Sucesso", 'Ok', {
                duration: 5000,
               horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['sucess-snackbar'],
              });
      },
      error: (err) => {
        console.error('Erro ao salvar', err);
        this.loading = false;
      }
    });
  }
  back(){
        this.router.navigate(['/sellers']);
  }
}
