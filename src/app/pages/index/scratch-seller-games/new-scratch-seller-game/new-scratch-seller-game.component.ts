import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ScratchGameResource } from '../../../../resource/scratch/scratch-game.resource';
import { SellersResource } from '../../../../resource/seller/sellers.resource';
import { ScratchSellerGameService } from '../../../../services/scratch/scratch-seller-game/scratch-seller-game.service';
import { IScratchGameRequest } from '../../../../interfaces/request/scratch/IScratchGameRequest';

@Component({
  selector: 'app-new-scratch-seller-game',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './new-scratch-seller-game.component.html',
  styleUrl: './new-scratch-seller-game.component.scss'
})
export class NewScratchSellerGameComponent {
  Form: FormGroup;
  private router: Router = inject(Router);
  protected readonly sellerResource: SellersResource = inject(SellersResource);
  protected readonly scratchGameResource = inject(ScratchGameResource);
  protected readonly scratchSellerGameService = inject(ScratchSellerGameService);

  readonly snackBar = inject(MatSnackBar);

  scrachGames = computed(() => this.scratchGameResource.resource.value()?.rows || []);
  sellers = computed(() => this.sellerResource.resource.value()?.rows || []);


  constructor(private fb: FormBuilder) {
    this.Form = this.fb.group({
      sellerId: ['', [Validators.required]],
      scratchGameId: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.sellerResource.setRequest({ page: 1, size: 5000 ,enabledScratch:true });
    this.scratchGameResource.setRequest({ page: 1, size: 5000 });
  }
  cancelar() {
    this.router.navigate(['/scratch-games']);
  }
  addScratchSellerGame() {

    if (this.Form.invalid) {
      return;
    }
    var data: IScratchGameRequest = {
      sellerId: this.Form.value.sellerId,
      scratchGameId: this.Form.value.scratchGameId
    }
    this.scratchSellerGameService.Create(data).subscribe({
      next: (data) => {
      },
      error: (err) => {
        this.snackBar.open(err.error.detail, 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'error-snackbar',
        });
      },
      complete: () => {
        this.snackBar.open("Game Adicionado com Sucesso", 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['sucess-snackbar'],
        });
        this.router.navigate(['/scratch-games']);
      }
    });
  }
}
