import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  email: string;
  fotoPerfil: boolean = false;

  facebook = {
    nome: '',
    fotoUrl: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fire: AngularFireAuth, public toast: ToastController) {

      this.email = fire.auth.currentUser.email;
      this.facebook.nome = fire.auth.currentUser.displayName;
      this.facebook.fotoUrl = fire.auth.currentUser.photoURL;

      if(this.facebook.fotoUrl == null) {
        this.fotoPerfil;
      }else {
        this.fotoPerfil = true;
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
}
