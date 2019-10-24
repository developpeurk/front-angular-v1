import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';
import {ProductModel} from '../model/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  private currentProduct: ProductModel;
  private mode = 1;

  constructor(private catalogueService: CatalogueService, private route: Router) { }

  ngOnInit() {
  }


  addProduct(data: any) {

    this.catalogueService.addProduct(this.catalogueService.host + '/produits', data).subscribe(res => {
      this.currentProduct = res;
      this.mode = 2;

    }, err => {
        console.log(err);
    });


  }

  onNewProduct() {
    this.mode = 1;
  }
}
