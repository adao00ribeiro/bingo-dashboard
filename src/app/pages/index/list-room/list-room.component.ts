import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { RoomService } from '../../../services/room.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-room',
    imports: [TableComponent],
    templateUrl: './list-room.component.html',
    styleUrl: './list-room.component.scss'
})
export class ListRoomComponent implements OnInit {

  protected readonly roomService: RoomService = inject(RoomService);
 private router: Router = inject(Router);

  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid" },
    { key: 'name', displayName: 'Nome' },

  ];
  ngOnInit(): void {
    this.roomService.loadRooms();
  }

  addSala(){
    this.router.navigate(['/addrooms']);
  }
}
