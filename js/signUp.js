let uid;
let Firstname = document.getElementById("firstname");
let Lastname = document.getElementById("lastname")
let MobileNumber = document.getElementById("mobileNumber")
let country = document.getElementById("country");
let courselist = document.getElementById("courselist");
let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.getElementById("message");

let signUp = () => {
    if (email.value === "") {
        message.style.display = "block";
        message.innerHTML = "Please Type Email Address";
        message.style.color = "red";
        email.focus();
        return false;
    } else if (password.value === "" || password.length < 6) {
        message.style.display = "block";
        message.innerHTML = "Please Type Password";
        message.style.color = "red";
        password.focus();
        return false;
    } else if (MobileNumber.value === "") {
        message.style.display = "block";
        message.innerHTML = "Please Type Mobile Number";
        message.style.color = "red";
        password.focus();
        return false;
    } else if (courselist.value === "") {
        message.style.display = "block";
        message.innerHTML = "Please Select course";
        message.style.color = "red";
        password.focus();
        return false;
    }  {
        let signUpObject = {
            Firstname: Firstname.value,
            Lastname: Lastname.value,
            mobileNumber: MobileNumber.value,
            country: country.value,
            courselist: courselist.value,
            Email: email.value,
            Password: password.value,
            profileImage: "",
        }
        firebase.auth().createUserWithEmailAndPassword(signUpObject.Email, signUpObject.Password)
            .then((userCredential) => {
                // firebase.firestore().collection("users/").add(signUpObject)
                var user = userCredential.user;
                firebase.firestore().collection("users/").doc(user.uid).set(signUpObject)
                user.sendEmailVerification();
                console.log(uid)
                message.innerHTML = "Sign Up is Sucessful";
                message.style.color = "green";
                setTimeout(() => {
                    message.style.display = "none";
                    if (user.emailVerified) {
                        window.location.href = "./Dashboard.html";
                    } else {
                        window.location.href = "./email-verifaction.html"
                    }
                }, 2000);
            })
            .catch((error) => {
                console.log(error)
                message.innerHTML = error.Message;
                message.style.color = "red";
            });
    }
}
// console.log(uid)
