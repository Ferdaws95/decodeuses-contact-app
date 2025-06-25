import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEmail } from './contact-email';

describe('ContactEmail', () => {
  let component: ContactEmail;
  let fixture: ComponentFixture<ContactEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
