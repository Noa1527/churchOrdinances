import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderPastoralComponent } from './elder-pastoral.component';

describe('ElderPastoralComponent', () => {
  let component: ElderPastoralComponent;
  let fixture: ComponentFixture<ElderPastoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElderPastoralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElderPastoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
