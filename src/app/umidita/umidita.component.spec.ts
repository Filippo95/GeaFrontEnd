import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmiditaComponent } from './umidita.component';

describe('UmiditaComponent', () => {
  let component: UmiditaComponent;
  let fixture: ComponentFixture<UmiditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmiditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmiditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
