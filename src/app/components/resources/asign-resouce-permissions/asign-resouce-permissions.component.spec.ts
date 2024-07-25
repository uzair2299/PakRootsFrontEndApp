import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignResoucePermissionsComponent } from './asign-resouce-permissions.component';

describe('AsignResoucePermissionsComponent', () => {
  let component: AsignResoucePermissionsComponent;
  let fixture: ComponentFixture<AsignResoucePermissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignResoucePermissionsComponent]
    });
    fixture = TestBed.createComponent(AsignResoucePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
