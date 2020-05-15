import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-recuperar',
  templateUrl: 'recuperar.html',
})
export class RecuperarPage {

  @ViewChild('usuario') emailRecuperacao;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toast: ToastController,
              public fire: AngularFireAuth ) {
  }

  recuperar(){
    let msg = this.toast.create({duration: 2000, position: 'bottom'});
    this.fire.auth.sendPasswordResetEmail(this.emailRecuperacao.value)
    .then(data => {
      msg.setMessage('Solicitação enviada para seu e-mail. ');
      msg.present();
      this.navCtrl.pop();

    }).catch((error:any)=> {
      if(error.code == 'auth/invalid-email'){
        msg.setMessage('E-mail inválido!');

      }else if (error.code == 'auth/user-not-found'){
        msg.setMessage('Usuário não encontrado!')
      }
      msg.present();
    })
  }

}
