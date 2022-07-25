let uid;
const profile = (e) => {
  var file = e.target.files[0];
  console.log(file)

  var storageRef = firebase.storage().ref();

  var uploadTask = storageRef.child(`Profileimags/${file.name}`).put(file);

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
        console.log('File available at', downloadURL);
        firebase.firestore().collection("users/").doc(uid).update({profileImage: downloadURL})
        .then(()=>{
          window.location.reload();
        })
      });
    }
  );
}

firebase.auth().onAuthStateChanged((user) => {
  if (user && user.emailVerified) {
    uid = user.uid;
  } else {
    window.location.href = "./signIn.html"
  }
});



const Firstname = document.getElementById("firstName");
const Lastname = document.getElementById("lastName");
const mobileNumber = document.getElementById("mobileNumber");
const country = document.getElementById("country");
const ProfileImage = document.getElementById("wizardPicturePreview")
setTimeout(() => {
  const db = firebase.firestore();
  db.collection("users/").doc(uid).get().then((querySnapshot) => {
    var myData = querySnapshot.data();
    console.log(myData);
    Firstname.setAttribute("value", myData.Firstname);
    Lastname.setAttribute("value", myData.Lastname);
    mobileNumber.setAttribute("value", myData.mobileNumber);
    country.setAttribute("value", myData.country);
    if (myData.profileImage === "") {
            wizardPicturePreview.setAttribute("src", "../imgs/Avatar-Profile-PNG-Picture.png")
          } else {
            wizardPicturePreview.setAttribute("src", myData.profileImage)
            // alert("profile")
          }
  });
}, 5000);



////////updateProfile

const updateProfile = () => {
  firebase.firestore().collection("users/").doc(uid).update({
    Firstname: Firstname.value,
    Lastname: Lastname.value,
    mobileNumber: mobileNumber.value,
    country: country.value,
  })
    .then(() => {
      console.log("update")
      // alert("update")
    })
}



