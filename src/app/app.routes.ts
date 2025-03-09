import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MyAwardsComponent } from './pages/index/my-awards/my-awards.component';
import { authGuard } from './guard/auth.guard';
import { WalletComponent } from './pages/index/wallet/wallet.component';
import { MyAccountComponent } from './pages/index/my-account/my-account.component';
import { DashboardComponent } from './pages/index/dashboard/dashboard.component';
import { ListRoomComponent } from './pages/index/list-room/list-room.component';
import { AddRoomComponent } from './pages/index/add-room/add-room.component';
import { ListRoundComponent } from './pages/index/list-round/list-round.component';
import { RoundTabsComponent } from './pages/index/round-tabs/round-tabs.component';

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
        path: 'premios',
        component: MyAwardsComponent,
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
        path: 'rounds',
        component: ListRoundComponent,
      },
      {
        path: 'addrounds',
        component: RoundTabsComponent,
      },
      {
        path: 'wallet',
        component: WalletComponent,
      },
      {
        path: 'account',
        component: MyAccountComponent,
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
