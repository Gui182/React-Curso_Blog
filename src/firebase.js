import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
      apiKey: "AIzaSyC9w9EMSf4sLuuWC_meLNzM-GQ1NHeSCNI",
      authDomain: "reactapp-2e4d7.firebaseapp.com",
      databaseURL: "https://reactapp-2e4d7.firebaseio.com",
      projectId: "reactapp-2e4d7",
      storageBucket: "reactapp-2e4d7.appspot.com",
      messagingSenderId: "836048674983",
      appId: "1:836048674983:web:1384e61fba790f4e"
    };
 
   

class Firebase {
    constructor(){
        app.initializeApp(firebaseConfig);

        this.app = app.database()
    }
    
    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut()
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }


    isInitialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve)
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null
        }

        const uid = app.auth().currentUser.uid
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback)
    }
}

export default new Firebase