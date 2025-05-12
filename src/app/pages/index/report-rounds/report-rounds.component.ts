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
import { SellersResourceService } from '../../../resource/seller/sellers-resource.service';
import { MatSelectModule } from '@angular/material/select';
import { ReportRoundsService } from '../../../services/reports/report.service';
import { IRoundReportItem } from '../../../interfaces/reports/IRoundReportItem';


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
    ReactiveFormsModule,
    MatSelectModule

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
  dataSource = signal<IRoundReportItem[]>([])

  private router: Router = inject(Router);
  protected sellerResourceService: SellersResourceService = inject(SellersResourceService);
  protected reportRoundsService : ReportRoundsService = inject(ReportRoundsService);

  columnConfigs = [
    { key: 'roundId', displayName: 'Rodada',pipe: "guid"  },
    { key: 'roundTime', displayName: 'Horario',pipe: "dateTime"  },
    { key: 'cardSaleCount', displayName: 'Vendas Usuarios', },
    { key: 'botSaleCount', displayName: 'Vendas Bots', },
    { key: 'collected', displayName: 'Arrecadado Usuario',  pipe: "currency" },
    { key: 'botCollected', displayName: 'Arrecadado Bots',  pipe: "currency" },
    { key: 'userWinners', displayName: 'Usuarios Premiados'},
    { key: 'botWinners', displayName: 'Bots Premiados', },
    { key: 'userAwards', displayName: 'Premios Usuarios',  pipe: "currency" },
    { key: 'botAwards', displayName: 'Premios Bots',  pipe: "currency" },
    { key: 'totalPrizes', displayName: 'Total Premios',  pipe: "currency" },
    { key: 'comissions', displayName: 'Despesa Comissoes',  pipe: "currency" },
    { key: 'netValue', displayName: 'Lucro',  pipe: "currency" },

  ];
  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      sellersId: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      enabled:  ['', [Validators.required]],
    });


  }

  ngOnInit(): void {

 this.editForm.valueChanges.pipe(
      startWith(this.editForm.value),
      debounceTime(300), // evita múltiplas chamadas em digitação rápida
     switchMap(formValues => {
      const { sellersId, start, end, enabled } = formValues;
      // Somente realiza a busca se o vendedor e as datas estiverem preenchidos
      if (sellersId && start && end) {
        const sellerIds = Array.isArray(sellersId) ? sellersId : [sellersId];
        return this.reportRoundsService.Rounds({
          sellerIds: sellerIds,
          startingOn: start,
          endingOn: end,
          page: 1, // valor padrão para página
          perPage: 10, // valor padrão para itens por página
          orders: [] // array vazio para ordenação
        });
      }
      // Retorna um array vazio se as condições não forem atendidas
      return [];
    })
  ).subscribe(data => {
    this.dataSource.set(data.rows);
  });

  }

  addSala() {
    this.router.navigate(['/addrooms']);
  }
  editRoom(room: any) {
    this.router.navigate(['/editroom', room.id]);
  }

  onSubmit() { }
}
