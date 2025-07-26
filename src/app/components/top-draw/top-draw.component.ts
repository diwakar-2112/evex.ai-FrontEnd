import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

@Component({
  selector: 'app-top-draw',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './top-draw.component.html',
  styleUrl: './top-draw.component.scss',
})
export class TopDrawComponent implements OnInit {
eventLIsten:boolean=false;
hideCart:boolean=false;
constructor(@Inject(PLATFORM_ID) private platformId: any,private router:Router) {}

ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    document.addEventListener("message", (event: any) => {
      try {
        const data = JSON.parse(event.data);
        if (data.action === "confirmClicked") {
          this.eventLIsten = true;
          this.handleConfirmFromApp();
        } else {
          window.alert("Not worked");
        }
      } catch (err) {
        window.alert("not worked");
      }
    });
  }
}
gotoPage(path:string){
  this.router.navigate([path], {  skipLocationChange: false });
}

  handleConfirmFromApp(){
    if(this.eventLIsten==true){
      let body = {
        "bettingDetails": {
          "bets": this.cartDetailObject,
          "drawCount": this.nextDraw,
          "totalAmount": this.totalBetAmount,
          "gameId": 9,
          "phone": '9877725955',
          "latitude" : 52521.232,
          "longitude" : 65656565
        }
      }
      console.log(body)
      if( body.bettingDetails.bets.length > 0){
        window.ReactNativeWebView?.postMessage(JSON.stringify(body));
        this.eventLIsten=false;
      }
    }
  }
  stakes = [50, 2, 3, 4];
selectedAmount = 50;
totalBetAmount=0;
durations=[1,2,3,4]
nextDraw:any=1;
qP:boolean=false;

  selectedNumbers:any=[];
  cart:any=[];
  cartDetailObject:any=[]
  selectNumber(num: number) {
    if (this.selectedNumbers.includes(num)) {
      this.selectedNumbers = this.selectedNumbers.filter((n: number) => n !== num);
    } else {
      if (this.selectedNumbers.length < 5) {
        this.selectedNumbers.push(num);
      } else {
        window.alert("You can select only 5 numbers");
      }
    }
  }
  betType = 'REGULAR';
  addToCart(){
    console.log(
      this.selectedNumbers)
    if(this.selectedNumbers.length>0){
      let cartDetails = {} as any;
      cartDetails['betType'] = this.betType;
      cartDetails['bet'] = this.selectedNumbers;
      cartDetails['betAmount'] = this.selectedAmount;
      this.cartDetailObject.push(cartDetails);
      this.totalBetAmount= this.getTotal(this.cartDetailObject)*parseInt(this.nextDraw);
      console.log(this.totalBetAmount,"this.totlalksjflksdjflksj")
    //  this.clearData();
    }
    if(!this.qP){
      this.selectedNumbers=[];
    }else{
      this.qP=false;
    }
  }
  
  getTotal(arr: any[]) {
    let tempTotal: number[] = [];
    arr.forEach(item => {
      tempTotal.push(parseInt(item.betAmount));
    });
    return tempTotal.reduce(function (a, b) {
      return a + b;
    }, 0);
  }
 
  clearCart(){
    console.log("inside cler cart")
    this.cartDetailObject=[];
    this.selectedNumbers=[];
    this.cart=[];
    this.totalBetAmount=0;
    this.eventLIsten=false;
  }
  clearData(){
    this.selectedNumbers=[];
    this.cart=[];
    this.totalBetAmount=0;
  }
  changeNextDraw(){
    this.totalBetAmount=this.getTotal(this.cartDetailObject)*parseInt(this.nextDraw)
  }
  quickPick(){
    this.qP=true;
    const numbers: number[] = [];
    if(this.cartDetailObject.length<15){
      while (numbers.length < 5) {
        const num = Math.floor(Math.random() * 22) + 1;
        if (!numbers.includes(num)) {
          numbers.push(num);
        }
      }
    }else{
      window.alert("maximum five bets")
    }

    this.selectedNumbers=numbers;
    this.addToCart();
  }
  confirmBet(){
    
    let body = {
      "bettingDetails": {
        "bets": this.cartDetailObject,
        "drawCount": this.nextDraw,
        "totalAmount": this.totalBetAmount,
        "gameId": 9,
        "phone": '9877725955',
        "latitude" : 52521.232,
        "longitude" : 65656565
      }
    }
    console.log(body)
    if( body.bettingDetails.bets.length > 0){
      window.ReactNativeWebView?.postMessage(JSON.stringify(body));
    }
  
}

}

