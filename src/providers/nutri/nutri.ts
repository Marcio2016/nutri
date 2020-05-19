import { URL_API } from './../../config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

import * as Config from '../../config';



@Injectable()
export class NutriProvider {

  constructor(public http: HttpClient) {
    
  }

  getRecentePosts(page: number = 1) {
    return this.http.get(
      Config.URL_API + 'posts?page=' + page )
      .map(res => res);
  }

  getAuthor(autor){
    return this.http.get(Config.URL_API + 'users/' + autor).map(res => res);
  }

  getPostCategoria(post) {
    let observableBatch = [];

    post.categoria.forEach(categoria => {
      observableBatch.push(this.getCategoria(categoria))
    });
    return Observable.forkJoin(observableBatch);
  }

  getCategoria(categoria){
    return this.http.get(Config.URL_API + "categoria/" + categoria).map(res => res);
  }

}
