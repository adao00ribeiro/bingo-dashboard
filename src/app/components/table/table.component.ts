import {AfterViewInit, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, inject, Input, OnInit, QueryList, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatColumnDef, MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DynamicPipe } from '../../pipes/dynamic.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicPipe,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class TableComponent<T extends object> implements OnInit, AfterViewInit{
  @Input() columnMappings: { key: string; displayName: string , pipe?: string }[] = [];
  @Input() data: T[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ContentChildren(TemplateRef) columnTemplatesList!: QueryList<TemplateRef<any>>;
  columnTemplates: { [key: string]: TemplateRef<any> } = {};
  dataSource = new MatTableDataSource<T>();
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  displayedColumns: string[] = [];
  ngOnInit() {
   this.initializeColumnsAndData();
   this.displayedColumns = this.columnMappings.map(col => col.key);

   this.dataSource.filterPredicate = (data: T, filter: string) => {
    const formattedFilter = filter.trim().toLowerCase();

    // Concatena todos os valores relevantes da linha em uma única string pesquisável
    const searchableData = this.columnMappings
      .map(col => {
        let value = this.getValue(data, col.key);

        // Se houver um pipe associado, aplicamos a transformação
        if (col.pipe) {
          const dynamicPipe = new DynamicPipe(); // Criamos uma instância do pipe
          value = dynamicPipe.transform(value, col.pipe); // Aplicamos o pipe correto
        }

        return value;
      })
      .join(' ')
      .toLowerCase();

    return searchableData.includes(formattedFilter);
  };
  }
  ngAfterContentInit() {
    this.columnTemplatesList.forEach((template) => {
      const columnName = (template as any)._declarationTContainer?.attrs?.[1]; // Obtém o nome da coluna
      if (columnName) {
        this.columnTemplates[columnName] = template;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['columnMappings']) {
      this.initializeColumnsAndData();
    }
  }

  getValue(element: any, path: string): any {
    return path.split('.').reduce((obj, key) =>
      (obj && obj[key] !== undefined) ? obj[key] : null, element);
  }
  ngAfterViewInit() {
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.sort) {
      this.dataSource.sortingDataAccessor = (item, property) => {
        return this.getValue(item, property);
      };
    }
    this.cdr.detectChanges();
  }
  private initializeColumnsAndData() {
    if (this.data.length) {
      this.displayedColumns = this.columnMappings.map(column => column.key);
      this.dataSource.data = this.data;
    }
  }
  getPipe(columnKey: string): string | null {
    const column = this.columnMappings.find(col => col.key === columnKey);
    return column?.pipe || null;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
