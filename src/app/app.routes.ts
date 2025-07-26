import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { KioskComponent } from './components/kiosk/kiosk.component';
import { TopDrawComponent } from './components/top-draw/top-draw.component';
import { DemocompComponent } from './components/democomp/democomp.component';
import { NfthomerevampComponent } from './components/nfthomerevamp/nfthomerevamp.component';
import { StripeDemoComponent } from './components/stripe-demo/stripe-demo.component';
export const routes: Routes = [
    { path: 'stripe', component: StripeDemoComponent },
    {path:'',component:ContactUsComponent,pathMatch: 'full'},
    {path:'kiosk',component:KioskComponent},
    { path: 'top-draw', component: TopDrawComponent },
    {path:'demo',component: DemocompComponent},
    { path: '**', component: PageNotFoundComponent },
];
