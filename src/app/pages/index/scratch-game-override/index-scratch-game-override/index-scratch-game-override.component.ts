import { Component, computed, effect, inject } from '@angular/core';
import { TableComponent } from '../../../../components/table/table.component';
import { Router } from '@angular/router';
import { ScratchGameResource } from '../../../../resource/scratch/scratch-game.resource';
import { ScratchGameOverrideResource } from '../../../../resource/scratch/scratch-game-override.resource';

@Component({
  selector: 'app-index-scratch-game-override',
  imports: [TableComponent],
  templateUrl: './index-scratch-game-override.component.html',
  styleUrl: './index-scratch-game-override.component.scss'
})
export class IndexScratchSellerGameComponent {

  protected readonly scratchGameOverrideResource: ScratchGameOverrideResource = inject(ScratchGameOverrideResource);

  private router: Router = inject(Router);
  columnConfigs = [
    { key: 'id', displayName: 'ID', pipe: "guid",position:1 },
    { key: 'title', displayName: 'Nome' ,position:2},
    { key: 'subtitle', displayName: 'Sub-Titulo' ,position:3},
    { key: 'cardValue', displayName: 'Valor Cartela' , pipe: "currency"},

  ];

   scratchGames = computed(() => this.scratchGameOverrideResource.resource.value()|| undefined);
  totalItems = computed(() =>
       this.scratchGameOverrideResource.resource.value()?.rowsCount || 0
    );
  ngOnInit(): void {
    this.scratchGameOverrideResource.setRequest({ page:1, size: 50 });
  }

  addScratch(){
    this.router.navigate(['/add-scratch-game']);
  }
  editScratch(scratchGame : any){

  }
}
