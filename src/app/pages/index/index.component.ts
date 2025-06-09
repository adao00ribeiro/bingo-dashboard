import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonMenuComponent } from '../../components/button-menu/button-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDepositComponent } from '../../components/dialogs/dialog-deposit/dialog-deposit.component';
import { ISeller } from '../../interfaces/ISeller';
import { SellerService } from '../../services/seller/seller.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { SellerMeResourceService } from '../../resource/seller/seller-me-resource.service';
@Component({
    selector: 'app-index',
    imports: [MatExpansionModule ,MatButtonModule, MatMenuModule, ButtonMenuComponent, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule],
    templateUrl: './index.component.html',
    styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  @ViewChild('snav') sidenav!: MatSidenav; // Referência ao MatSidenav
  isSidenavOpen = true;
  showFiller = true;
  mobileQuery: MediaQueryList;
  private router: Router = inject(Router);
  readonly dialog = inject(MatDialog);
  private _mobileQueryListener: () => void;
  readonly panelOpenState = signal(false);

   protected readonly SellerMeResourceService = inject(SellerMeResourceService);

  seller: ISeller | null = null;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    effect(() => {

    })
  }
 ngOnInit(): void {
    this.SellerMeResourceService.reload();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  handleClick(route: string) {
    this.router.navigate([route]);
  }

  deposit() {
    this.dialog.open(DialogDepositComponent, {
      disableClose: true,
      data: {

      },
    });
  }
  wallet() {
    this.router.navigate(['/wallet']);
  }
  myAccount() {
    this.router.navigate(['/account']);
  }
  logout() {
    // Limpa o token de autenticação do sessionStorage
    sessionStorage.removeItem('token-data');
    // Redireciona para a página de login
    this.router.navigate(['/login']);
  }
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.sidenav.toggle(); // Alterna o estado do sidenav
  }

  closeSidenav() {
    this.isSidenavOpen = false;
    this.sidenav.close(); // Fecha o sidenav
  }

  openSidenav() {
    this.isSidenavOpen = true;
    this.sidenav.open(); // Abre o sidenav
  }
}
