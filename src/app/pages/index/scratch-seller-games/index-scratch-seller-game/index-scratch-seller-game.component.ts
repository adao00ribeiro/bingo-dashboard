import { Component, computed, effect, inject } from '@angular/core';
import { TableComponent } from '../../../../components/table/table.component';
import { Router } from '@angular/router';
import { ScratchGameResource } from '../../../../resource/scratch/scratch-game.resource';
import { ScratchSellerGameResource } from '../../../../resource/scratch/scratch-seller-game.resource';

@Component({
  selector: 'app-index-scratch-seller-game',
  imports: [TableComponent],
  templateUrl: './index-scratch-seller-game.component.html',
  styleUrl: './index-scratch-seller-game.component.scss'
})
export class IndexScratchSellerGameComponent {

  protected readonly scratchSellerGameResource: ScratchSellerGameResource = inject(ScratchSellerGameResource);


  private router: Router = inject(Router);
  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid",position:1 },
    { key: 'scratchGame.name', displayName: 'Nome' ,position:2},

  ];

   scratchGames = computed(() => this.scratchSellerGameResource.resource.value()|| undefined);
  totalItems = computed(() =>
       this.scratchSellerGameResource.resource.value()?.rowsCount || 0
    );
  ngOnInit(): void {
    this.scratchSellerGameResource.setRequest({ page:1, size: 50 });
  }

  addScratch(){
    this.router.navigate(['/add-scratch-game']);
  }
  editScratch(scratchGame : any){

  }
}
