import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { UntypedFormGroup,UntypedFormBuilder,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
freshnessList: string[] = ['Brand New', 'Second Hand', 'ReFurbished'];

productForm !: UntypedFormGroup;
actionButton : string = "Save";
  constructor(private formBuilder : UntypedFormBuilder,
    private api : ApiService,private _snackBar: MatSnackBar,
     private dialogRef : MatDialogRef<AddProductDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['',Validators.required],
      productCategory : ['',Validators.required],
      productConditions : ['',Validators.required],
      productPrice : ['',Validators.required],
      productDate: ['',Validators.required],
      productComment : [''],
    });

    if(this.editData){
      this.actionButton = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['productCategory'].setValue(this.editData.productCategory);
      this.productForm.controls['productConditions'].setValue(this.editData.productConditions);
      this.productForm.controls['productPrice'].setValue(this.editData.productPrice);
      this.productForm.controls['productDate'].setValue(this.editData.productDate);
      this.productForm.controls['productComment'].setValue(this.editData.productComment);
    }
  }

  addProduct()
  {
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            this._snackBar.open("Product Added Successfully.", "Hurrah!");
            this.productForm.reset();
            this.dialogRef.close('Save');
          },
          error:()=>{
            this._snackBar.open("Product Added Failed.", "Ok");
          }
        })
      }
    }
    else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        this._snackBar.open("Product Info Updated Successfully", "Ok");
        this.productForm.reset();
        this.dialogRef.close('Update');
      },
      error:()=>{
        this._snackBar.open("Product Update Failed.", "Ok");
      }
    })
  }
  

}
