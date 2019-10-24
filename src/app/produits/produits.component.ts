import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  public produits: any;
  public size = 5;
  public currentpage  = 0;
  public totalPages: number;
  public pages: Array<number>;
  private currentKeyword = '';
  private test = 0;


  constructor(private catalogueService: CatalogueService, private router: Router) { }

  ngOnInit() {
  }

  onGetProduct() {
    this.catalogueService.getProducts(this.currentpage, this.size)
      .subscribe(data => {
          this.totalPages = data['page'].totalPages;
          this.pages = new Array<number>(this.totalPages);
          this.produits = data;
      }, err => {
          console.log(err);
      });

  }

  onPageProduct(i) {
    this.currentpage = i;
    this.Chercher();

  }
   onChercher(form: any){
      this.currentpage = 0;
      this.currentKeyword = form.keyword;
      this.Chercher();
  }
  Chercher() {
     this.catalogueService.getProductsByKeyword(this.currentpage, this.size, this.currentKeyword)
      .subscribe( data => {
        this.totalPages = data['page'].totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.produits = data;
      }, err => {
            console.log(err);
      })
    ;
}

  onDeleteProduct(p: any) {
     const conf =  confirm('Etes vous sur?')
     if (conf) {
      this.catalogueService.deleteRessource(p._links.self.href).subscribe( data => {
           this.Chercher();
           this.test = 1;
           setTimeout(() => {
           this.test = 0;
        }, 5000);
      }, err => {
           console.log(err);
      });
    }


  }

  onEditProduct(p) {
    const url = p._links.self.href;
    this.router.navigateByUrl('/edit-product/' + btoa(url) );


  }
}
