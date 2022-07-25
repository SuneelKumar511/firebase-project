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
firebase.firestore().collection("users/").where("pending", "==", true).get().then((querySnapshot) => {
    loader.style.display = "none";
    loaderdiv.style.display = "block"
    querySnapshot.forEach((doc) => {
        console.log(doc.id);
        var myData = doc.data();
        console.log(myData)


        let li = document.createElement("li");
        ul.appendChild(li)
        li.setAttribute("id", "li")
        const liText = document.createTextNode(myData.Firstname + " " + myData.Lastname);
        li.appendChild(liText);


        const buttondiv = document.createElement("div")
        li.appendChild(buttondiv);

        const approve = document.createElement("button");
        const approvebutton = document.createTextNode("Approve")
        buttondiv.appendChild(approve);
        approve.appendChild(approvebutton);
        approve.setAttribute("id", "button")

        const reject = document.createElement("button");
        const rejectbutton = document.createTextNode("Reject")
        buttondiv.appendChild(reject);
        reject.appendChild(rejectbutton);
        reject.setAttribute("id", "button")


        approve.addEventListener("click", () => {
            //  alert("aprove");
             firebase.firestore().collection("users/").doc(doc.id).update({
                pending: false,
                reject: false,
                approve: true,
              }).then(()=>{
               reject.remove();
              })
        })


        reject.addEventListener("click", () => {
            // alert("reject")

            firebase.firestore().collection("users/").doc(doc.id).update({
                pending: false,
                reject: true,
                approve: false,
              }).then(()=>{
               buttondiv.parentNode.remove();
              })
        })

    })
})