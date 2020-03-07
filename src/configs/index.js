import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyA6lAIRfkMpiz8PklKKNfaHY5zaio8WEtE",
    authDomain: "react-blog-dac5f.firebaseapp.com",
    databaseURL: "https://react-blog-dac5f.firebaseio.com",
    projectId: "react-blog-dac5f",
    storageBucket: "react-blog-dac5f.appspot.com",
    messagingSenderId: "567181721354",
    appId: "1:567181721354:web:5e7e4131092125b3cf84f3"
  };
  


class Firebase{
  constructor(){
      firebase.initializeApp(firebaseConfig);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      this.storage = firebase.storage();
  }
  async login(email,password){
    const user = await this.auth.signInWithEmailAndPassword(email,password)
            .catch(err=>{
                console.log(err)
                return err;
            })
            return user;
  }

  async CreateUser(email,password){
    // const user = await this.auth.createUserWithEmailAndPassword(email,password)
    //       .then(res=>{
    //         console.log('sign up successfull')
    //         return  user  // wrong
    //       })
    //       .catch(err=>{
    //         console.log(err);
    //       })
    //       return user
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
      console.log(err);
      return err;
  });
      return user;
  }

  async logout(){
    await this.auth.signOut()
          .then(res=>{
              console.log('logout successfully')
          })
          .catch(err=>{
              console.log("err : "+err)
          })
  }
  async getUserState(){
    return new Promise(resolve=>{
      this.auth.onAuthStateChanged(resolve)
    })
  }
  // ------------------

  async CreatePost({title,content,cover}){
    // console.log(title,content,cover)
    //1. storage
    //2. getDownloadURL
    //3. firestore

    var storeRef = this.storage.ref('reactImg');
    var storeChildRef = storeRef.child(cover.name);
    var postCover = await storeRef.child(cover.name).put(cover)
    //2
    var downloadURL = await storeChildRef.getDownloadURL()
    var fileRef = postCover.ref.location.path;
    var newPost ={
      title,
      content,
      cover: downloadURL,
      fileRef,
    }
    // 3
    const firestorePost = await this.db.collection('Posts').add(newPost).catch(err=>{
      return err;
    });
    return firestorePost;
  }

  async getPosts(){
    let postArray = [];
    const posts = await this.db.collection("Posts").get()
    posts.forEach(doc=>{
      postArray.push({data: doc.data(),id: doc.id})
    })
    return postArray;
  }
  
  async getPost(postId){
    const post = await this.db.collection("Posts").doc(postId).get()
    const postdata = post.data();
    return postdata;
    
  }
}

export default new Firebase();