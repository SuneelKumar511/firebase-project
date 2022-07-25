let uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
        uid = user.uid;
        console.log(uid)
    } else {
        // window.location.href = "./signIn.html"
    }
});



let ul = document.getElementById("list");
let loader = document.getElementById("loader");
let loaderdiv = document.getElementById("loaderdiv");

loader.style.display = "block";
firebase.firestore().collection("users/").where("reject", "==", true).get().then((querySnapshot) => {
    loader.style.display = "none";
    loaderdiv.style.display = "block"
    querySnapshot.forEach((doc) => {
        var myData = doc.data();
        console.log(myData);


        let li = document.createElement("li");
        ul.appendChild(li)
        li.setAttribute("id", "li")
        const liText = document.createTextNode(myData.Firstname + " " + myData.Lastname);
        li.appendChild(liText);


    })
})