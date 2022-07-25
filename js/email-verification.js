const verificationemail = document.getElementById("verificationemail");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        verificationemail.innerHTML = user.email
          if(user.emailVerified){
            window.location.href = "./Dashboard.html"
          }
  
    } else {
      window.location.href='./signIn.html';
    }
  });




const emailresend = document.getElementById("emailresend")
const reSend = ()=>{
  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    emailresend.innerHTML = "Email Verification Sent"
    emailresend.style.color = "green"
  });
}

  const reloadpage = ()=>{
    window.location.reload();
  }
  