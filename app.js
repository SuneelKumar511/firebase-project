// let loader = document.getElementById("loading")
// db.collection("users/").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc)=>{
//         var myData = doc.data();
//         console.log(myData);
//     })
   
// });

// let challanurl = "";
// const uploadchallan = (e)=>{
//     var file = e.target.files[0];
//     console.log(file)
  
//     var storageRef = firebase.storage().ref();
  
//     var uploadTask = storageRef.child(`userchallan/${file.name}`).put(file);
  
//     uploadTask.on('state_changed',
//       (snapshot) => {
//         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//       },
//       (error) => {
//         // Handle unsuccessful uploads
//       },
//       () => {
//         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//           console.log('File available at', downloadURL);
//           console.log(downloadURL)
//           challanurl = downloadURL;
//         });
//       }
//     );
// }

// const challan = ()=>{
//     if(challanurl === ""){
//         console.log();

//     }else{
//         firebase.firestore().collection("users/").doc(uid).update({
// challurl : challurl,
// pending: ttrue;
// reject: true;
// approve: false
// })
//     }
// }


// pending

// if(querySnapshot.empty){
// console.log("no student ")

// }else{

// }
// .where("pending", "==" true)
if(mydata.pending){
    console.log("pending true")
}else{
    console.log("pending false")

}
