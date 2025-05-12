import { ChangeDetectionStrategy, Component, inject, OnInit, output, signal } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { RoomService } from '../../../services/room.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { debounceTime, startWith, switchMap } from 'rxjs';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-report-rounds',
  imports: [TableComponent,
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
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  templateUrl: './report-rounds.component.html',
  styleUrl: './report-rounds.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportRoundsComponent implements OnInit {
  editForm: FormGroup;
  onClickCancel = output<void>();
  checked = false;
  disabled = false;
  dataSource = signal([])

  private router: Router = inject(Router);

  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid", position: 1 },
    { key: 'name', displayName: 'Nome', position: 2 },

  ];
  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      sellers: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      enabled:  ['', [Validators.required]],
    });


  }

  ngOnInit(): void {

 this.editForm.valueChanges.pipe(
      startWith(this.editForm.value),
      debounceTime(300), // evita múltiplas chamadas em digitação rápida
      switchMap(({ sellers, start, end, enabled }) =>
         []
      )
    );

  }

  addSala() {
    this.router.navigate(['/addrooms']);
  }
  editRoom(room: any) {
    this.router.navigate(['/editroom', room.id]);
  }

  onSubmit() { }
}
