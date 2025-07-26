import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopDrawComponent } from '../top-draw/top-draw.component';
@Component({
  selector: 'app-kiosk',
  standalone: true,
  imports: [CommonModule,TopDrawComponent],
  templateUrl: './kiosk.component.html',
  styleUrl: './kiosk.component.scss'
})
export class KioskComponent {
  gameName='top-draw';
  games = [
    { src: "/assets/kiosk/Cash-Pot@3x.png", name: "cash-pot" },
    { src: "/assets/kiosk/Top Draw@3x.png", name: "top-draw" },
    { src: "/assets/kiosk/Dollaz@3x.png", name: "Dollaz" },
    { src: "/assets/kiosk/Lotto@3x.png", name: "Lotto" },
    { src: "/assets/kiosk/Lucky 5@3x.png", name: "Lucky 5" },
    { src: "/assets/kiosk/Pick 2@3x.png", name: "Pick 2" },
    { src: "/assets/kiosk/Pick 3@3x.png", name: "Pick 3" },
    { src: "/assets/kiosk/Pick 4@3x.png", name: "Pick 4" },
    { src: "/assets/kiosk/Super Lotto@3x.png", name: "Super Lotto" }
  ];
  gameSelect(game:any){
this.gameName=game;
console.log(this.gameName,'gamename')
  }
}
