
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any;
  userState:any
  constructor(private afAuth:AngularFireAuth,private afs:AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      this.userData = user;
      if(user) {
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('email', this.userData.email);
      }
    });
   }
   get isLoggedIn(): boolean {

    const user = JSON.parse(this.userState);
    return (user !== null && user.emailVerified !== false) ? true : false;

  }
  async signUp(email:string,password:string){
    this.afAuth.createUserWithEmailAndPassword(email,password).then(rsp=>{
      if(rsp.additionalUserInfo?.isNewUser){
        const data=rsp.user; 
        this.createUser(rsp.user);
        console.log(rsp.user)
      }
    }).catch(er=>{
      console.log(er)
    })
  }
  logInWithEmailPassword(email:string ,password:string){
    this.afAuth.signInWithEmailAndPassword(email,password).then(res=>{
      res.user?.sendEmailVerification();
      res.user?.email
      console.log(res.user)
    }).catch(error=>{
      console.log(error);
    })
  }
  createUser(user:any){
    return this.afs.doc(`users/${user.uid}`).set({

      // id: "",
      uid: user?.uid,
      emailId: user?.email,
      name: user?.displayName,
      avatar: user?.photoURL,
      created_on: Date.now(),
      

    }, {
      merge: true
    })
  }
  logOut(){

  }
}
