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
import { EditRoomComponent } from './pages/index/room/edit-room/edit-room.component';
import { CustomizeColorsComponent } from './pages/index/customize-colors/customize-colors.component';
import { ListPunterComponent } from './pages/index/punter/list-punter/list-punter.component';
import { ReportRoundsComponent } from './pages/index/report-rounds/report-rounds.component';
import { ListSellerComponent } from './pages/index/seller/list-seller/list-seller.component';
import { EditSellerComponent } from './pages/index/seller/edit-seller/edit-seller.component';
import { IndexScratchSellerGameComponent } from './pages/index/scratch-seller-games/index-scratch-seller-game/index-scratch-seller-game.component';
import { NewScratchSellerGameComponent } from './pages/index/scratch-seller-games/new-scratch-seller-game/new-scratch-seller-game.component';
import { IndexTransactionComponent } from './pages/index/transactions/index-transaction.component';


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
        path: 'sellers',
        component: ListSellerComponent,
      },
        {
        path: 'seller/:id',
        component: EditSellerComponent,
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
        path: 'transactions',
        component: IndexTransactionComponent,
      },
      {
        path: 'customize-colors',
        component: CustomizeColorsComponent,
      },
        {
        path: 'scratch-games',
        component: IndexScratchSellerGameComponent,
      },
      {
        path: 'add-scratch-game',
        component: NewScratchSellerGameComponent,
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
