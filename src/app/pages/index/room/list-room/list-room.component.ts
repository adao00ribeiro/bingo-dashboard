import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../components/table/table.component';
import { RoomsResource } from '../../../../resource/room/rooms.resource';
import { IRoom } from '../../../../interfaces/IRoom';

@Component({
  selector: 'app-list-room',
  imports: [TableComponent],
  templateUrl: './list-room.component.html',
  styleUrl: './list-room.component.scss'
})
export class ListRoomComponent implements OnInit {
  protected readonly roomsResource: RoomsResource = inject(RoomsResource);
  private router: Router = inject(Router);
  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid", position: 1 },
    { key: 'name', displayName: 'Nome', position: 2 },

  ];
  rooms = computed(() => this.roomsResource.resource.value() || undefined);
  totalItems = computed(() =>
    this.roomsResource.resource.value()?.rowsCount || 0
  );
  ngOnInit(): void {
      this.roomsResource.reload({page:1,size:50});
  }
   refresh(page: number, size: number){
     this.roomsResource.reload({page:page,size:size});
  }
  addSala() {
    this.router.navigate(['/addrooms']);
  }
  editRoom(event: any) {
    this.router.navigate(['/editroom', event.id]);
  }
}
