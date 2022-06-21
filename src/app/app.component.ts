import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductDialogComponent } from './Dialog/add-product-dialog/add-product-dialog.component';
import { ApiService } from './Services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

//json-server --watch db.json
//ng serve
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 13 Crud';
  displayedColumns: string[] = ['productName', 'productCategory', 'productConditions', 'productPrice','productDate','productComment','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(public dialog: MatDialog,private api : ApiService,private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  addProduct() {
    this.dialog.open(AddProductDialogComponent,{
      width:'30%'
    }).afterClosed()
    .subscribe(val=>{
      if(val === 'Save'){
        this.getAllProducts();
      }
    });
  }

  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        this._snackBar.open("Can not Retreve Data Form Server", "Oh no!");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editProduct(row : any){
    this.dialog.open(AddProductDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed()
    .subscribe(val=>{
      if(val === 'Update'){
        this.getAllProducts();
      }
    });
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        this._snackBar.open("Product Deleted Successfully", "Ok");
        this.getAllProducts();
      },
      error:()=>{
        this._snackBar.open("Error While Deleting Product !", "Oh no!");
      }
    })
  }
}
