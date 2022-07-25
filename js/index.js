const loader = document.getElementById("loader")
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location.href = "./html-page/home-page.html"
      if(user.emailVerified){
            window.location.href ="./html-page/home-page.html"
      }else{
        window.location.href = "./html-page/email-verifaction.html"
      }
      
    } else {
      setTimeout (()=>{
        loader.style.display = "none"
          window.location.href ="./html-page/signIn.html"
      },3000)
    }
  });