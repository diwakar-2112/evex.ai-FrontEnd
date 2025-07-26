import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeDemoComponent } from './stripe-demo.component';

describe('StripeDemoComponent', () => {
  let component: StripeDemoComponent;
  let fixture: ComponentFixture<StripeDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StripeDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StripeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
