import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFirestore} from "angularfire2/firestore";

/**
 * Generated class for the AuthorizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-authorize',
  templateUrl: 'authorize.html',
})
export class AuthorizePage {

  public user = {
    username: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFire: AngularFirestore) {
  }

  logInUser() {
    this.angularFire.app.auth().signInWithEmailAndPassword(this.user.username, this.user.password).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error)
    });
  }

  registerUser() {
    this.angularFire.app.auth().createUserWithEmailAndPassword(this.user.username, this.user.password).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthorizePage');
  }

}
