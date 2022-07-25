let loginEmail = document.getElementById("loginEmail");
let loginpassword = document.getElementById("loginPass");
let loginmessage = document.getElementById("loginmessage");


let login = ()=>{
    if(loginEmail.value === ""){
        loginmessage.innerHTML = "Please inter Email Address";
        loginmessage.style.color= "red";
        loginEmail.focus();
    }else if(loginpassword.value === "" || loginpassword.length < 6){
        loginmessage.innerHTML = "Please inter Password";
        loginmessage.style.color = "red";
        loginpassword.focus();

    }else{

        let object ={
            EmailLogin: loginEmail.value,
            PasswordLogin: loginpassword.value,
        }
        firebase.auth().signInWithEmailAndPassword(object.EmailLogin, object.PasswordLogin)
        .then((userCredential)=>{
            loginmessage.innerHTML = "Login Succsesfully";
            loginmessage.style.color= "green";
            setTimeout(() => {
                if(userCredential.emailVerified){
                    loginmessage.style.display= "none";
                    window.location.href = "./Dashboard.html"
                }else{
                    window.location.href = "./email-verifaction.html"
                }
            }, 2000);

        }).catch((error) => {
            loginmessage.innerHTML = error.message;
            loginmessage.style.color = "red";
          });
    }
}

 
let forgetemail = document.getElementById("forgetemail")
let forgetmessage = document.getElementById("forgetmessage")
const forgetpassword = ()=>{
    firebase.auth().sendPasswordResetEmail(forgetemail.value)
  .then(() => {
    forgetmessage.style.color = "green"
    forgetmessage.innerHTML = "sent Email Succesfully"
  })
  .catch((error) => {
    var errorMessage = error.message;
    forgetmessage.style.color = "red"
    forgetmessage.innerHTML = errorMessage;
  });
}




let google = ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    var token = credential.accessToken;
    var user = result.user;
    console.log(user);
    console.log(token);
    alert("heeloo")
    setTimeout(() => {
            window.location.href = "../html/Dashboard.html"
    }, 2000);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(error.message)
    alert(error.message)
  });
}