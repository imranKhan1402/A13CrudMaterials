import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddProductDialogComponent } from './Dialog/add-product-dialog/add-product-dialog.component';
import { AngularMaterialModule } from 'src/Materials/angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    AddProductDialogComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
