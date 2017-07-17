import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsImportExportComponent } from './products-import-export/products-import-export.component';
import { ProductsExplorerComponent } from './products-explorer/products-explorer.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { SortGroupsAndItemsPipe } from './sort-groups-and-items.pipe';

const APP_ROUTES = [
  { path: "", "component": HomeComponent },
  { path: "addProduct", "component": AddProductComponent },
  { path: "editProduct", "component": EditProductComponent },
  { path: "products-import-export", "component": ProductsImportExportComponent },
  { path: "**", "component": ErrorNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProductComponent,
    EditProductComponent,
    ProductFormComponent,
    ProductsImportExportComponent,
    ProductsExplorerComponent,
    ErrorNotFoundComponent,
    SortGroupsAndItemsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
