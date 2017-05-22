import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsExplorerComponent } from './products-explorer.component';

describe('ProductsExplorerComponent', () => {
  let component: ProductsExplorerComponent;
  let fixture: ComponentFixture<ProductsExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
