import { Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
export interface Game {
  id: string;
  name: string;
  logo: string;
  nowPlayingText?: string; // Optional text
}

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ContactUsComponent {
  
// --- STATE FOR THE TOP BAR ---
  balance = 1300;
  currentTime = new Date(); // We can update this with a timer
  cartItemCount = 1;

  // --- STATE FOR THE GAME CAROUSEL ---
  games: Game[] = [
    { id: 'lotto', name: 'Lotto', logo: 'assets/logos/lotto.png' },
    { id: 'lotto-2', name: 'Lotto', logo: 'assets/logos/lotto.png' },
    { id: 'lotto-3', name: 'Lotto', logo: 'assets/logos/lotto.png' },
    { id: 'pick3', name: 'Pick 3', logo: 'assets/logos/pick3.png' },
    { id: 'pick2', name: 'Pick 2', logo: 'assets/logos/pick2.png', nowPlayingText: 'Now Playing' },
    { id: 'top-draw', name: 'Top Draw', logo: 'assets/logos/top-draw.png' },
    { id: 'lucky5', name: 'Lucky 5', logo: 'assets/logos/lucky5.png' },
    // ... add other games here
  ];
  selectedIndex = 4; // 'Pick 2' is the 5th item, so its index is 4

  // --- STATE FOR THE NUMBER GRID ---
  numbersToPick = Array.from({length: 36}, (_, i) => i + 1); // [1, 2, 3... 36]
  selectedNumbers: number[] = [3]; // Initial selected numbers

  // --- STATE FOR THE WAGER ---
  wagerAmount = 200.00;

  // --- METHODS (The "Actions") ---

  // Method to handle selecting a game from the carousel
  selectGame(index: number): void {
    this.selectedIndex = index;
    // Here you would also add logic to change the game content below
  }

  // Method to handle selecting a number from the grid
  toggleNumberSelection(num: number): void {
    const idx = this.selectedNumbers.indexOf(num);
    if (idx > -1) {
      // If number is already selected, deselect it
      this.selectedNumbers.splice(idx, 1);
    } else if (this.selectedNumbers.length < 2) {
      // If not selected and we have space (e.g., for Pick 2), select it
      this.selectedNumbers.push(num);
    }
  }

  // Helper method to check if a number is selected (for styling)
  isSelected(num: number): boolean {
    return this.selectedNumbers.includes(num);
  }

  // Quick Pick logic
  quickPick(): void {
    // A simple random number generator for Pick 2
    this.selectedNumbers = [];
    while (this.selectedNumbers.length < 2) {
      const randomNum = Math.floor(Math.random() * 36) + 1;
      if (!this.selectedNumbers.includes(randomNum)) {
        this.selectedNumbers.push(randomNum);
      }
    }
  }

// Add this as a property in your component class
readonly itemWidth = 140; // The width of ONE game item in pixels. MUST match your CSS!

get carouselTransform(): string {
  // We calculate the total distance to shift the track to the left.
  // This is the width of all previous items, plus half the width of the current item.
  const offset = (this.selectedIndex * this.itemWidth) + (this.itemWidth / 2);
  
  // We return a CSS transform value to be applied with [style.transform]
  return `translateX(-${offset}px)`;
}
// @ViewChild('carouselWrapper', { static: true }) carouselWrapper!: ElementRef;

// games = [
//   { name: 'Lotto', image: 'assets/images/lotto1.png' },
//   { name: 'Lotto', image: 'assets/images/lotto2.png' },
//   { name: 'Lotto', image: 'assets/images/lotto3.png' },
//   { name: 'Pick 3', image: 'assets/images/pick3.png' },
//   { name: 'Pick 2', image: 'assets/images/pick2.png' },
//   { name: 'Top Draw', image: 'assets/images/topdraw.png' },
//   { name: 'Lucky 5', image: 'assets/images/lucky5.png' },
//   { name: 'Top Draw', image: 'assets/images/topdraw.png' },
// ];

// activeIndex = 4;
// progressPercent = 0;

// ngAfterViewInit() {
//   this.updateProgress();
//   this.scrollToActive();
// }

// setActive(index: number) {
//   this.activeIndex = index;
//   this.updateProgress();
//   this.scrollToActive();
// }

// scrollLeft() {
//   if (this.activeIndex === 0) {
//     this.setActive(this.games.length - 1); // loop to last
//   } else {
//     this.setActive(this.activeIndex - 1);
//   }
// }

// scrollRight() {
//   if (this.activeIndex === this.games.length - 1) {
//     this.setActive(0); // reset to first
//   } else {
//     this.setActive(this.activeIndex + 1);
//   }
// }

// updateProgress() {
//   this.progressPercent = ((this.activeIndex + 1) / this.games.length) * 100;
// }

// scrollToActive() {
//   const wrapper = this.carouselWrapper.nativeElement as HTMLElement;
//   const items = wrapper.querySelectorAll('.game-icon');
//   const activeItem = items[this.activeIndex] as HTMLElement;

//   if (activeItem) {
//     const wrapperWidth = wrapper.offsetWidth;
//     const itemOffsetLeft = activeItem.offsetLeft;
//     const itemWidth = activeItem.offsetWidth;

//     const scrollTo = itemOffsetLeft - (wrapperWidth / 2) + (itemWidth / 2);

//     wrapper.scrollTo({
//       left: scrollTo,
//       behavior: 'smooth'
//     });
//   }
// scrollToActive() {
//   const wrapper = this.carouselWrapper.nativeElement as HTMLElement;
//   const items = wrapper.querySelectorAll('.game-icon');
//   const activeItem = items[this.activeIndex] as HTMLElement;

//   if (activeItem) {
//     const wrapperWidth = wrapper.offsetWidth;
//     const itemOffsetLeft = activeItem.offsetLeft;
//     const itemWidth = activeItem.offsetWidth;

//     const scrollTo = itemOffsetLeft - (wrapperWidth / 2) + (itemWidth / 2);

//     wrapper.scrollTo({
//       left: scrollTo,
//       behavior: 'smooth'
//     });
//   }
// }






//  @ViewChild('carouselWrapper', { static: true }) carouselWrapper!: ElementRef;

  // games = [
  //   { name: 'Lotto', image: 'assets/images/lotto1.png' },
  //   { name: 'Lotto', image: 'assets/images/lotto2.png' },
  //   { name: 'Lotto', image: 'assets/images/lotto3.png' },
  //   { name: 'Pick 3', image: 'assets/images/pick3.png' },
  //   { name: 'Pick 2', image: 'assets/images/pick2.png' },
  //   { name: 'Top Draw', image: 'assets/images/topdraw.png' },
  //   { name: 'Lucky 5', image: 'assets/images/lucky5.png' },
  //   { name: 'Lucky 5', image: 'assets/images/lucky5.png' },
  //   { name: 'Lucky 5', image: 'assets/images/lucky5.png' },
  //   { name: 'Lucky 5', image: 'assets/images/lucky5.png' },
  //   { name: 'Lucky 5', image: 'assets/images/lucky5.png' },
  // ];

//   activeIndex = 3;
//   progressPercent = 0;
//   translateX = 0;

//   ngAfterViewInit() {
//     this.updateProgress();
//     this.centerActive();
//      window.addEventListener('resize', () => this.centerActive());
//   }


//   setActive(index: number): void {
//     this.activeIndex = index;
//     this.updateProgress();
//     this.centerActive();
//   }

//   scrollLeft(): void {
//     if (this.activeIndex === 0) {
//       this.setActive(this.games.length - 1); // loop to end
//     } else {
//       this.setActive(this.activeIndex - 1);
//     }
//   }

//   scrollRight(): void {
//     if (this.activeIndex === this.games.length - 1) {
//       this.setActive(0); // loop to start
//     } else {
//       this.setActive(this.activeIndex + 1);
//     }
//   }

//   updateProgress(): void {
//     this.progressPercent = ((this.activeIndex + 1) / this.games.length) * 100;
//   }

//   centerActive(): void {
//     const itemWidth = 100+10;
//     const visibleCenterOffset = (600 / 2) - (itemWidth / 2);
//     this.translateX = -1 * (this.activeIndex * itemWidth - visibleCenterOffset);
//   }
//   @ViewChild('carouselWrapper', { static: true }) carouselWrapper!: ElementRef;
// @ViewChild('carouselContainer', { static: true }) carouselContainer!: ElementRef;
// @ViewChildren('gameItems') gameItems!: QueryList<ElementRef>;

// activeIndex = 3;
// progressPercent = 0;
// translateX = 0;

// ngAfterViewInit() {
//   this.updateProgress();
//   setTimeout(() => this.centerActive(), 0); // Wait for view to render
//   window.addEventListener('resize', () => this.centerActive());
// }

// setActive(index: number): void {
//   this.activeIndex = index;
//   this.updateProgress();
//   this.centerActive();
// }

// scrollLeft(): void {
//   if (this.activeIndex === 0) {
//     this.setActive(this.games.length - 1);
//   } else {
//     this.setActive(this.activeIndex - 1);
//   }
// }

// scrollRight(): void {
//   if (this.activeIndex === this.games.length - 1) {
//     this.setActive(0);
//   } else {
//     this.setActive(this.activeIndex + 1);
//   }
// }

// updateProgress(): void {
//   this.progressPercent = ((this.activeIndex + 1) / this.games.length) * 100;
// }

// centerActive(): void {
//   const wrapper = this.carouselWrapper.nativeElement as HTMLElement;
//   const itemElems = this.gameItems.toArray().map(e => e.nativeElement as HTMLElement);

//   if (!itemElems[this.activeIndex]) return;

//   const wrapperWidth = wrapper.offsetWidth;
//   const selectedItem = itemElems[this.activeIndex];
//   const selectedRect = selectedItem.getBoundingClientRect();
//   const containerRect = this.carouselContainer.nativeElement.getBoundingClientRect();

//   const selectedOffset = selectedItem.offsetLeft + selectedItem.offsetWidth / 2;
//   const centerOffset = wrapperWidth / 2;

//   this.translateX = centerOffset - selectedOffset;
// }

  // amounts = [10, 20, 30, 40, 50, 60, 70];
  // centerIndex = 1;

  // moveLeft(): void {
  //   if (this.centerIndex > 0) {
  //     this.centerIndex--;
  //   }
  // }

  // moveRight(): void {
  //   if (this.centerIndex < this.amounts.length - 1) {
  //     this.centerIndex++;
  //   }
  // }

  // selectIndex(index: number): void {
  //   this.centerIndex = index;
  // }

  // getTransform(): string {
  //   return `translateX(-${(this.centerIndex - 1) * 80}px)`;
  // }
  
}
