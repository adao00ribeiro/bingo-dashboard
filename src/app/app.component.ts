import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { SocketService } from './services/socket/socket.service';
import { RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'bingo.frontend';
  public socketService :SocketService = inject(SocketService)


  constructor( ) {
    let theme = 'bingo-dark';
    document.body.classList.add(theme);
    this.socketService.connect();
    effect(() => {
      if( this.socketService.IsConnected()){
        this.socketService.subscribeToChannel("room_98522b7d-81d9-4c71-9ef4-fe505aae92b6");
      }
    });
  }
  ngOnInit(): void {

  }

}

