import { Component, effect, inject, input, output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAccumulated } from '../../../../../../interfaces/IAccumulated';
import { AccumulatedService } from '../../../../../../services/accumulated/accumulated.service';
@Component({
  selector: 'app-edit-accumulated',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  templateUrl: './edit-accumulated.component.html',
  styleUrl: './edit-accumulated.component.scss',

})

export class EditAccumulatedComponent {
  roomId = input('');
  editForm: FormGroup;
  checked = false;
  disabled = false;
  onClickCancel = output<void>();

  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly acumulatedService = inject(AccumulatedService);


  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      id: [''],
      activated: [false, [Validators.required]],
      minimumValue: [0, [Validators.required]],
      maximumValue: [0, [Validators.required]],
      currentValue: [0, [Validators.required]],
      maximumNumberOfBalls: [40, [Validators.required]],
      cumulativePercentage: [2, [Validators.required]],
      incrementBallCumulative: [false, [Validators.required]],
      roomId: ["", [Validators.required]],

    });
  }
  ngOnInit(): void {
    this.acumulatedService.GetByRoomId(this.roomId()).subscribe({
      next: (data) => {
        if (data) {
          this.editForm.patchValue({
            id: data.id,
            activated: data.activated,
            minimumValue: data.minimumValue,
            maximumValue: data.maximumValue,
            currentValue: data.currentValue,
            maximumNumberOfBalls: data.maximumNumberOfBalls,
            cumulativePercentage: data.cumulativePercentage,
            incrementBallCumulative: data.incrementBallCumulative,
            roomId: data.roomId
          });
        }
      },
      error: (err) => {

      },
      complete: () => {


      }
    });;
  }

  onSubmit() {
    if (this.editForm.invalid) return;

    const accumulated: IAccumulated = this.editForm.value;
    this.acumulatedService.UpdateById(accumulated.id, accumulated).subscribe({
      next: (data) => {
        console.log(data);
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
        this.snackBar.open("Acumulado Atualizado com Sucesso", 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['sucess-snackbar'],
        });
        this.router.navigate(['/rooms']);
      }
    });;
  }

}
