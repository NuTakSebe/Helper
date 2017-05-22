import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsImportExportComponent } from './products-import-export.component';

describe('ProductsImportExportComponent', () => {
  let component: ProductsImportExportComponent;
  let fixture: ComponentFixture<ProductsImportExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsImportExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsImportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
