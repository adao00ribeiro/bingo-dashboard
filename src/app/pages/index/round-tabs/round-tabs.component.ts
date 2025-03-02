import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { AddRoundComponent } from "../add-round/add-round.component";
@Component({
  selector: 'app-round-tabs',
  standalone: true,
  imports: [MatTabsModule, AddRoundComponent],
  templateUrl: './round-tabs.component.html',
  styleUrl: './round-tabs.component.scss'
})
export class RoundTabsComponent {

}
