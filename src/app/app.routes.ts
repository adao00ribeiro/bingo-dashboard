import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { MyAccountComponent } from './pages/index/my-account/my-account.component';
import { DashboardComponent } from './pages/index/dashboard/dashboard.component';
import { AddRoomComponent } from './pages/index/room/add-room/add-room.component';
import { ListRoundComponent } from './pages/index/round/list-round/list-round.component';
import { ListRoomComponent } from './pages/index/room/list-room/list-room.component';
import { RoundTabsComponent } from './pages/index/round/round-tabs/round-tabs.component';
import { PunterRechargeComponent } from './pages/index/punter-recharge/punter-recharge.component';
import { EditRoomComponent } from './pages/index/room/edit-room/edit-room.component';
import { CustomizeColorsComponent } from './pages/index/customize-colors/customize-colors.component';
import { ListPunterComponent } from './pages/index/punter/list-punter/list-punter.component';
import { ReportRoundsComponent } from './pages/index/report-rounds/report-rounds.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: IndexComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
       {
        path: 'report-rounds',
        component: ReportRoundsComponent,
      },
      {
        path: 'punters',
        component: ListPunterComponent,
      },
      {
        path: 'rooms',
        component: ListRoomComponent,
      },
      {
        path: 'addrooms',
        component: AddRoomComponent,
      },
      {
        path: 'editroom/:id',
        component: EditRoomComponent,
      },
      {
        path: 'rounds',
        component: ListRoundComponent,
      },
      {
        path: 'addrounds',
        component: RoundTabsComponent,
      },
      {
        path: 'account',
        component: MyAccountComponent,
      },
      {
        path: 'recharges',
        component: PunterRechargeComponent,
      },
      {
        path: 'customize-colors',
        component: CustomizeColorsComponent,
      },
    ],
  },
  {
    path: 'cadastro',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

];
