import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nfthomerevamp',
  standalone: true,
  imports: [],
  templateUrl: './nfthomerevamp.component.html',
  styleUrl: './nfthomerevamp.component.scss'
})
export class NfthomerevampComponent implements OnInit  {
  currentIndex: number = 0;
  @ViewChild('myBtn') myBtn!: ElementRef;
  intervalId: any;
  totalImages: number = 5;
  imageKey: number = 0; 
  ngAfterViewInit(){
    console.log("Button ka text:", this.myBtn.nativeElement.innerText);
        console.log(document.querySelector("#hello")?.innerHTML);
        
      }
      ngOnInit(): void {
    console.log(document.querySelector("#hello")?.innerHTML);
    console.log("oninit")
  }
  ngOnDestroy(){
    console.log("desotry")
  }


  
}
