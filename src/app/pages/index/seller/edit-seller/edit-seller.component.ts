import { Component, inject, input, OnInit, signal } from '@angular/core';
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
import { GeralSellerComponent } from "./components/geral-seller/geral-seller.component";
import { SellerService } from '../../../../services/seller/seller.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OnlineHouseComponent } from "./components/online-house/online-house.component";
import { ISeller } from '../../../../interfaces/ISeller';

@Component({
  selector: 'app-edit-seller',
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
    MatExpansionModule,
    GeralSellerComponent,
    OnlineHouseComponent
],
  templateUrl: './edit-seller.component.html',
  styleUrl: './edit-seller.component.scss'
})
export class EditSellerComponent implements OnInit {
  id = input('');
  form!: FormGroup;
  loading = false;
  protected readonly sellerService: SellerService = inject(SellerService);
  private router: Router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  constructor(private fb: FormBuilder) { }
  seller : ISeller | undefined  = undefined;
  ngOnInit(): void {
    this.form = this.fb.group({
      settings: this.fb.group({
        emailConfig: this.fb.group({
          primarySmtp: this.fb.group({
            host: ['', Validators.required],
            port: ['', Validators.required],
            user: ['', Validators.required],
            password: ['', Validators.required],
            enableSsl: [true], // checkbox
          }),
          fromAddress: ['', [Validators.required, Validators.email]],
          fromName: ['', Validators.required]
        }),
        enabledScratch:   ['', Validators.required],
      })
    });

    this.loadSeller();
  }
    loadSeller(): void {
    this.loading = true;
    this.sellerService.GetById(this.id()).subscribe({
      next: (seller) => {
        this.seller = seller;
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
   back(){
        this.router.navigate(['/sellers']);
  }
}
