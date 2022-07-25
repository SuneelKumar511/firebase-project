let adminemail = document.getElementById("adminemail");
let adminpassword = document.getElementById("adminpassword");
let adminmessage = document.getElementById("adminmessage");


let login = ()=>{
    if(adminemail.value === ""){
        adminmessage.innerHTML = "Please inter Email Address";
        adminmessage.style.color= "red";
    }else if(adminpassword.value === "" || adminpassword.length < 6){
        adminmessage.innerHTML = "Please inter Password";
        adminmessage.style.color = "red";
    }else{

        let object ={
            adminemail: adminemail.value,
            adminpassword: adminpassword.value,
        }
        if(adminemail.value = "mramrani511@gmail.com"){
          firebase.auth().signInWithEmailAndPassword(object.adminemail, object.adminpassword)
        .then((userCredential)=>{
            adminmessage.innerHTML = "Login Succsesfully";
            adminmessage.style.color= "green";
            setTimeout(() => {
                window.location.href = "./html/allStudent.html"
            }, 2000);

        }).catch((error) => {
            adminmessage.innerHTML = error.message;
            adminmessage.style.color = "red";
          });
    }else{
      adminmessage.innerHTML = "Email or Password Not correct"
    }
        }
}

 
// let forgetemail = document.getElementById("forgetemail")
// let forgetmessage = document.getElementById("forgetmessage")
// const forgetpassword = ()=>{
//     firebase.auth().sendPasswordResetEmail(forgetemail.value)
//   .then(() => {
//     forgetmessage.style.color = "green"
//     forgetmessage.innerHTML = "sent Email Succesfully"
//   })
//   .catch((error) => {
//     var errorMessage = error.message;
//     forgetmessage.style.color = "red"
//     forgetmessage.innerHTML = errorMessage;
//   });
// }




// let google = ()=>{
//     var provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth()
//   .signInWithPopup(provider)
//   .then((result) => {
//     /** @type {firebase.auth.OAuthCredential} */
//     var credential = result.credential;

//     var token = credential.accessToken;
//     var user = result.user;
//     console.log(user);
//     console.log(token);
//     loginmessage.innerHTML = "Login Succsesfully";
//     loginmessage.style.color= "green";
//     setTimeout(() => {
//             loginmessage.style.display= "none";
//             window.location.href = "./home-page.html"
//     }, 2000);
//   }).catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     var email = error.email;
//     var credential = error.credential;
//     console.log(error.message)
//   });
// }