import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../components/table/table.component';
import { RoomService } from '../../../../services/room.service';

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
    { key: 'id', displayName: 'ID', pipe: "guid",position:1 },
    { key: 'name', displayName: 'Nome' ,position:2},

  ];
  ngOnInit(): void {
    this.roomService.loadRooms();
  }

  addSala(){
    this.router.navigate(['/addrooms']);
  }
}
