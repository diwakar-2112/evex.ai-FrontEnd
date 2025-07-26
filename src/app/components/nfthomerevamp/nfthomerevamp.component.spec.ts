import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfthomerevampComponent } from './nfthomerevamp.component';

describe('NfthomerevampComponent', () => {
  let component: NfthomerevampComponent;
  let fixture: ComponentFixture<NfthomerevampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NfthomerevampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NfthomerevampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
