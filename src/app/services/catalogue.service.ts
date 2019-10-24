import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
public produits: any;

public host = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

  public getProducts(page: number, size: number) {
   return  this.httpClient.get(this.host + '/produits?page=' + page + '&size=' + size);
  }
  public getProductsByKeyword(page: number, size: number, keyword: string) {
    return  this.httpClient.get(this.host + '/produits/search/byDesignationPage?mc=' + keyword + '&page=' + page + '&size=' + size);
  }
  public deleteRessource(url) {
    return  this.httpClient.delete( url );
  }

  public addProduct(url, data): Observable <ProductModel> {
    return this.httpClient.post<ProductModel>(url, data);
  }

  public getRessource(url): Observable<ProductModel> {
      return this.httpClient.get<ProductModel>(url);
  }

  public UpdateRssource(url, data) {
    return this.httpClient.put(url, data);
  }

}
