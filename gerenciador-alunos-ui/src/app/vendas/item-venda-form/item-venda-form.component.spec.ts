import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVendaFormComponent } from './item-venda-form.component';

describe('ItemVendaFormComponent', () => {
  let component: ItemVendaFormComponent;
  let fixture: ComponentFixture<ItemVendaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemVendaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemVendaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
