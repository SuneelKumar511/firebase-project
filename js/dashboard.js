let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user && user.emailVerified) {
    uid = user.uid;
    console.log(uid)
  } else {
    window.location.href = "./signIn.html"
  }
});
const Firstname = document.getElementById("firstName");
const Lastname = document.getElementById("lastName");
const mobileNumber = document.getElementById("mobileNumber");
const country = document.getElementById("country");
const courselist = document.getElementById("courselist");
const Email = document.getElementById("email");
const ProfileImage = document.getElementById("wizardPicturePreview")
setTimeout(() => {
  const db = firebase.firestore().collection("users/").doc(uid).get().then((querySnapshot) => {
    var myData = querySnapshot.data();
    console.log(myData);
    // Firstname.setAttribute("value", myData.Firstname);
    Firstname.innerHTML = myData.Firstname;
    Lastname.innerHTML = myData.Lastname;
    mobileNumber.innerHTML = myData.mobileNumber;
    country.innerHTML = myData.country;
    courselist.innerHTML = myData.courselist;
  });
}, 2000);

let challanurl = "";
const challan = (e) => {
  var file = e.target.files[0];
  console.log(file)

  var storageRef = firebase.storage().ref();

  var uploadTask = storageRef.child(`userchallan/${file.name}`).put(file);

  uploadTask.on('state_changed',
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        challanurl = downloadURL;
        console.log('File available at', downloadURL);
      // pending  true
        // reject = false // true
        // reject () => reject = true , accept :fasle, pending :false
        // accept = false // true// pending :false
      });
    }
  );
}

let update = ()=>{
  if(challanurl === ""){
    alert("Please Upload Challan")
  }else{
    firebase.firestore().collection("users/").doc(uid).update({
      challanurl : challanurl,
      pending: true,
      reject: false,
      approve: false,
    }).then(()=>{
      alert("Challan upload succesfuly")
    })
  }
}






