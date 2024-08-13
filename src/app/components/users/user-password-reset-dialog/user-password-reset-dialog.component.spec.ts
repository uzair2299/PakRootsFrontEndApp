import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordResetDialogComponent } from './user-password-reset-dialog.component';

describe('UserPasswordResetDialogComponent', () => {
  let component: UserPasswordResetDialogComponent;
  let fixture: ComponentFixture<UserPasswordResetDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPasswordResetDialogComponent]
    });
    fixture = TestBed.createComponent(UserPasswordResetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
