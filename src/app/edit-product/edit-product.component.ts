import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {ProductModel} from '../model/product.model';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  private currentProduct: ProductModel;
  private url: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private catalogueService: CatalogueService) { }

  ngOnInit() {

    this.url = atob(this.activatedRoute.snapshot.params.id)
    this.catalogueService.getRessource(this.url)
      .subscribe( data => {
        this.currentProduct = data;
      }, error => {
         console.log( error );
      });
    console.log(this.url);
  }

  onUpdate(value: any) {
    this.catalogueService.UpdateRssource(this.url, value)
      .subscribe( data => {
           this.router.navigateByUrl('/products');
      }, err => {
        console.log( err );
      });
  }
}
