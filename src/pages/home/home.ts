import { Component,ViewChild } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { viewClassName } from '@angular/compiler';

import { DicasPage } from './../dicas/dicas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  entrar(){
    let message = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    if(this.email.value === "admin@admin.com.br" && this.password.value === 'admin'){
      this.navCtrl.push(DicasPage);
      message.setMessage('Seja Bem vindo!');
      message.present();
    }else{
      message.setMessage('Usuário ou senha inválida!');
      message.present();
    }
  }

}
