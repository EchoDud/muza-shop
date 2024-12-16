import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitStatsComponent } from './visit-stats.component';

describe('VisitStatsComponent', () => {
  let component: VisitStatsComponent;
  let fixture: ComponentFixture<VisitStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
