import { Component, output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
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

  editForm: FormGroup;
  checked = false;
  disabled = false;
   onClickCancel = output<void>();
  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      enabled: [false, [Validators.required]],
      name: ['', [Validators.required]],
    });

  }
  ngOnInit(): void {

  }
  onSubmit() { }
}
