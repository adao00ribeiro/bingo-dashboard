import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ScratchGameResource } from '../../../../resource/scratch/scratch-game.resource';
import { SellersResource } from '../../../../resource/seller/sellers.resource';
import { ScratchGameOverrideService } from '../../../../services/scratch/scratch-seller-game/scratch-game-override.service';
import { IScratchGameOverrideRequest } from '../../../../interfaces/request/scratch/IScratchGameOverrideRequest';
import { OnlineHousesResource } from '../../../../resource/online-house/online-houses.resource';

@Component({
  selector: 'app-new-scratch-game-override',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './new-scratch-game-override.component.html',
  styleUrl: './new-scratch-game-override.component.scss'
})
export class NewScratchGameOverrideComponent {
  Form: FormGroup;
  private router: Router = inject(Router);
  protected readonly onlineHouseResource: OnlineHousesResource = inject(OnlineHousesResource);
  protected readonly scratchGameResource = inject(ScratchGameResource);
  protected readonly scratchGameOverrideService = inject(ScratchGameOverrideService);

  readonly snackBar = inject(MatSnackBar);

  scrachGames = computed(() => this.scratchGameResource.resource.value()?.rows || []);
  onlineHouses = computed(() => this.onlineHouseResource.resource.value()?.rows || []);


  constructor(private fb: FormBuilder) {
    this.Form = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      cardValue: ['', [Validators.required]],
      onlineHouseId: ['', [Validators.required]],
      scratchGameId: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.onlineHouseResource.setRequest({ page: 1, size: 5000 ,enabledScratch:true });
    this.scratchGameResource.setRequest({ page: 1, size: 5000 });
  }
  cancelar() {
    this.router.navigate(['/scratch-games']);
  }
  addScratchSellerGame() {

    if (this.Form.invalid) {
      return;
    }
    var data: IScratchGameOverrideRequest = {
    title:this.Form.value.title,
    subtitle:this.Form.value.subtitle,
    cardValue:this.Form.value.cardValue,
    onlineHouseId:this.Form.value.onlineHouseId,
    scratchGameId: this.Form.value.scratchGameId,
    }
    this.scratchGameOverrideService.Create(data).subscribe({
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
