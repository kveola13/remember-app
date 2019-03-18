import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Post} from "../../models/Post";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public collection: AngularFirestoreCollection<Post>;
  public posts: Observable<Post[]>;
  public itemInput = "";


  constructor(public navCtrl: NavController, private angularFireStore: AngularFirestore) {
    this.collection = this.angularFireStore.collection<any>("posts");
    this.posts = this.collection.snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Post;
          let id = action.payload.doc.id;

          return {
            id,
            ...data
          };
        })
      });
  }

  addItem(name: string) {
    this.collection.add({
      body: name,
      purchased: false
    }).then(docRef => {
      console.log(docRef);
    }).catch(error => {
      console.log(error);
    });
    this.itemInput = "";
  }

  removeItem(name: string) {
    this.collection.doc(name)
      .collection("posts")
      .doc(name)
      .delete()
      .then(doc => {
        console.log(doc);
      }).catch(error => {
      console.log(error);
    });
    this.itemInput = "";
  }

  checkPurchase(data: any) {
    data.purchased = !data.purchased;
    this.collection.doc(data.id)
      .update(data)
      .then(doc => {
        console.log(doc);
      }).catch(error => {
      console.log(error);
    });
  }

  logOut() {
    this.angularFireStore.app.auth().signOut();
  }
}
