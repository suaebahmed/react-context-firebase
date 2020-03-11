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
    return new Promise((resolve,reject) =>{
      this.auth.onAuthStateChanged(function(user){
        if(user){
          resolve(user)
        }

      })
    })
  }
  // my idea
  async isAuthenticated(){
    return new Promise(resolve=>{
      this.auth.onAuthStateChanged(function(user){
        resolve(user)
      })
    })
  }
  // ------------------

  async CreatePost({title,content,cover}){
    // console.log(title,content,cover)
    //1. storage
    //2. getDownloadURL
    //3. firestor
    var newPost = {
      title,
      content,
    }
    this.isAuthenticated().then(user=>{
      if(user){
        newPost.uid = user.uid  // to get user uid ------
      }
    })

    var storeRef = this.storage.ref('reactImg');
    var storeChildRef = storeRef.child(cover.name);
    var postCover = await storeRef.child(cover.name).put(cover)
    //2
    var downloadURL = await storeChildRef.getDownloadURL()
    var fileRef = postCover.ref.location.path;

    newPost.cover = downloadURL;
    newPost.fileRef = fileRef;
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

  async deletePost(postId,fileRef){
    var rt = await this.storage.ref(fileRef).delete().catch(err=>{return err;})
    this.db.collection("Posts").doc(postId).delete();
    return rt;
  }

async UpdatePost({title,content,cover},id,oldFRef){
      // store img
      // download ref
      // create firestore
      var newObj = {

      }
      if(title !== ''){
        newObj.title = title;
      }
      if(content !== ''){
        newObj.content = content;
      }

      if(cover !== ''){
        if(oldFRef !== undefined){
          var a = await this.storage.ref(oldFRef).delete().catch(err=>{
            console.log(err)
          })
        }
        var x  = await this.storage.ref('reactImg/'+cover.name).put(cover); //not update
        var fileRef = await x.ref.location.path;
        var downloadURL = await this.storage.ref('reactImg/'+cover.name).getDownloadURL();
        newObj.fileRef = fileRef;
        newObj.cover = downloadURL;
      }
      console.log(newObj)

      var z = await this.db.collection('Posts').doc(id).update(newObj)
        .then(err=>{
          return err;
        })
        .catch(err=>{
          return err;
        });
        return z;
}

}

export default new Firebase();