import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFavoris } from './contact-favoris';

describe('ContactFavoris', () => {
  let component: ContactFavoris;
  let fixture: ComponentFixture<ContactFavoris>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFavoris]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFavoris);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
