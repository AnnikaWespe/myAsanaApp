import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	emailAdress;
	password;

  constructor(public navCtrl: NavController,
  	public afAuth: AngularFireAuth,
  	private alertCtrl: AlertController) {
console.log('in here');
  }
  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFacebook(){

  }

  loginWithEmail(){
  	this.afAuth.auth.signInWithEmailAndPassword(this.emailAdress, this.password).then((response)=>{
  		console.log(response);
  	});
  }

  createAccountWithEmail(){
  	 let alert = this.alertCtrl.create({
    title: 'Sign up',
    inputs: [
      {
        name: 'emailAdress',
        placeholder: 'example@host.com'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Create account',
        handler: data => {
          this.afAuth.auth.createUserWithEmailAndPassword(data.emailAdress, data.password).then((response)=>{console.log(response)});
      }
  	}
    ]
  })
  alert.present();
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
