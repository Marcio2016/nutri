import { TabsPage } from './../tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the CadastrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html',
})
export class CadastrarPage {
  tabBarElemente: any;
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public fire: AngularFireAuth,
               public toast: ToastController) {

                this.tabBarElemente = document.querySelectorAll('.show-tabbar');         
  }

  ionViewWillEnter(){
    let tabs = document.querySelectorAll('.show-tabbar');
    if(tabs !== null){
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  ionViewWillLeave(){
    let tabs = document.querySelectorAll('.show-tabbar');
    if(tabs !== null){
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }
  
  cadastrar(){
    let msg = this.toast.create({duration: 2000, position: 'bottom'});

    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
        msg.setMessage('Parabéns acesso liberado!');
        msg.present();
        this.navCtrl.setRoot(TabsPage);

    }).catch((error:any) => {
      if(error.code == 'auth/email-already-in-use'){
        msg.setMessage('O e-mail digitado já está em uso.');
        
      }else if(error.code == 'auth/invalid-email'){
        msg.setMessage('O e-mail digitado não é válido!');
        
      }else if(error.code == 'auth/operation-not-allowed'){
        msg.setMessage('Não está habilitado a criar usuário!');
        
      }else if(error.code == 'auth/weak-password'){
        msg.setMessage('Senha é muito fraca');
        
      }
      msg.present();
    })
 }

}
