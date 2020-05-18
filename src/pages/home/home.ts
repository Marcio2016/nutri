
import { Component,ViewChild } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';

import { Users } from './users';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { DicasPage } from './../dicas/dicas';
import { CadastrarPage } from '../cadastrar/cadastrar';
import { RecuperarPage } from './../recuperar/recuperar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: Users = new Users();
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public fire: AngularFireAuth) {

  }

  entrar() {
    let message = this.toastCtrl.create({duration: 3000, position: 'bottom'});
   
      this.fire.auth.signInWithEmailAndPassword(this.email.value,this.password.value )
        .then(data => {
          this.users.email = this.email.value;
          this.users.senha = this.password.value;

          this.navCtrl.setRoot(DicasPage);          
          
        }).catch((error:any) =>{
          if(error.code == 'auth/invalid-email') {
            message.setMessage('Endereço de e-mail invalido!');
          }else if (error.code == 'auth/user-disabled'){
            message.setMessage('E-mail especificado destivado');
          }else if (error.code == 'auth/user-not-found'){
            message.setMessage('E-mail não encontrado!');
          }else if (error.code == 'auth/wrong-password'){
            message.setMessage('E-mail ou senha não cadastrado!');
          }
          message.present();
      })   
  }

  cadastrar() {
    this.navCtrl.push(CadastrarPage);
  }

  recuperar(){
    this.navCtrl.push(RecuperarPage);
  }

  entrarComFacebook() {
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res =>{
      //console.log(res);
      this.navCtrl.setRoot(DicasPage);
    })
  }

}
