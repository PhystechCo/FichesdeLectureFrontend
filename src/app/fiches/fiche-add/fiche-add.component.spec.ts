import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheAddComponent } from './fiche-add.component';

describe('FicheAddComponent', () => {
  let component: FicheAddComponent;
  let fixture: ComponentFixture<FicheAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
