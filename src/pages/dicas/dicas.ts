import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from './../home/home';
import { PostPage } from './../post/post';
import { NutriProvider } from '../../providers/nutri/nutri';

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {
  data: any;
  dados: any
  posts: Array<any> = new Array<any>();
  maisPagindasAvaliadas: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fire: AngularFireAuth,
              public toast: ToastController,
              public loading: LoadingController,
              public service: NutriProvider) {      

  }

  ionViewWillEnter(){
    this.maisPagindasAvaliadas = true;
    if(!(this.posts.length > 0)){
      let carregando = this.loading.create();
      carregando.present();
      this.service.getRecentePosts()
      .subscribe(data => {
        this.data = data        
        for(let post of this.data){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "<p>";

          this.posts.push(post);
        }
        carregando.dismiss();
      })
    }
  }

  logout(){
    let msg = this.toast.create({
      duration: 2000,
      position: 'bottom'
    })
    this.fire.auth.signOut();
    msg.setMessage('hasta la vista Baby!');
    msg.present();

    this.navCtrl.setRoot(HomePage);
  }

  postClicado(event,post){
    this.navCtrl.push(PostPage, {
      item:post
    });
  }

  doInfinite(infiniteScroll){
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.service.getRecentePosts(page).subscribe(data => {
      this.dados = data;
      for(let post of this.dados){
        if(!loading){
          infiniteScroll.complete();
        }
        this.posts.push(post);
        loading = false;
      }
    },err => {
      this.maisPagindasAvaliadas = false;
    })
  }

  doRefresh(refresher){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    setTimeout(() => {
      refresher.complete();
    },2000);
  }
}
