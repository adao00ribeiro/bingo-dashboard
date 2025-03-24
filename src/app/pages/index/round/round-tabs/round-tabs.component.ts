import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { AddRoundComponent } from "../add-round/add-round.component";
import { AddMultRoundComponent } from "../add-mult-round/add-mult-round.component";
@Component({
    selector: 'app-round-tabs',
    imports: [MatTabsModule, AddRoundComponent, AddMultRoundComponent],
    templateUrl: './round-tabs.component.html',
    styleUrl: './round-tabs.component.scss'
})
export class RoundTabsComponent {

}
