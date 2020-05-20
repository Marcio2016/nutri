import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

import { NutriProvider } from './../../providers/nutri/nutri';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post: any;
  user:any;
  categorias: Array<any> = new Array<any>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loading: LoadingController,
              public service: NutriProvider) {
  }

  ionViewWillEnter() {
    let loading = this.loading.create();
    loading.present();
    this.post = this.navParams.get('item');

    Observable.forkJoin(
      this.getAutorData(),
      this.getCategoria()
    ).subscribe(data => {
      this.user = data[0];
      this.categorias = data[1];
      loading.dismiss();
    });
  }

  getAutorData()  {
    return this.service.getAuthor(this.post.author);
  }

  getCategoria(){
    return this.service.getPostCategoria(this.post);
  }

}
