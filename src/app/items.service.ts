import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from './items/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  // _url = 'https://fakestoreapi.com/products?limit=5';
  _url = '/assets/data/store.json';

  constructor(private http: HttpClient) {}

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this._url);
  }
}
