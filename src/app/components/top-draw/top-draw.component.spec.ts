import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDrawComponent } from './top-draw.component';

describe('TopDrawComponent', () => {
  let component: TopDrawComponent;
  let fixture: ComponentFixture<TopDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopDrawComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
