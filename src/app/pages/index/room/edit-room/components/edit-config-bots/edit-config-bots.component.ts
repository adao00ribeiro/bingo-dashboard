import { Component, effect, inject, input, OnInit, output, ResourceStatus, ViewEncapsulation } from '@angular/core';
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
import { BotConfigResourceService } from '../../../../../../resource/bot-config/bot-config-resource.service';
import { IBotConfig } from '../../../../../../interfaces/IBotConfig';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BotConfigUpdateService } from '../../../../../../services/bot-config/bot-config-update.service';

@Component({
  selector: 'app-edit-config-bots',
  standalone: true,
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
    MatSlideToggleModule
  ],
  templateUrl: './edit-config-bots.component.html',
  styleUrl: './edit-config-bots.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditConfigBotsComponent implements OnInit {
  roomId = input('');
  onClickCancel = output<void>();

  editForm: FormGroup;
  checked = false;
  disabled = false;

  private readonly fb = inject(FormBuilder);
  private readonly botConfigResourceService = inject(BotConfigResourceService);
  private readonly botConfigUpdateService = inject(BotConfigUpdateService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  constructor() {
    this.editForm = this.fb.group({
      id: [''],
      enabled: [false, Validators.required],
      roomId: ['']
    });

    effect(() => {
      const config = this.botConfigResourceService.resource.value();

      if (config) {
        this.editForm.patchValue({
          id: config.id,
          enabled: config.enabled,
          roomId: config.roomId
        });
      }

    });

  }

  ngOnInit(): void {
    this.botConfigResourceService.loadBotConfigByRoomId(this.roomId());
  }



async  onSubmit(): Promise<void> {
    if (this.editForm.invalid) return;

    const config: IBotConfig = this.editForm.value;
    this.botConfigUpdateService.UpdateById(config.id, config).subscribe({
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
        this.snackBar.open("Bot Config Atualizado com Sucesso", 'Ok', {
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
