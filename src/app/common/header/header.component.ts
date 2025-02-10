import { Component } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbCollapse],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  isNavbarCollapsed = true;
  constructor(private router:Router){

  }
  goToPath(url:any){
    this.router.navigateByUrl(url)
  }
  
}
