import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderComponent } from './elder.component';

describe('ElderComponent', () => {
  let component: ElderComponent;
  let fixture: ComponentFixture<ElderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
