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
firebase.firestore().collection("users/").get().then((querySnapshot) => {
    loader.style.display = "none";
    loaderdiv.style.display = "block"
    querySnapshot.forEach((doc) => {
        var myData = doc.data();
        console.log(myData);


        let li = document.createElement("li");
        ul.appendChild(li)
        li.setAttribute("id", "li")
        const liText = document.createTextNode(myData.Firstname + <br /> + myData.Lastname);
        li.appendChild(liText);

        const showbutton = document.createElement("button");
        const buttontext = document.createTextNode("Show Details")
        li.appendChild(showbutton);
        showbutton.appendChild(buttontext);
        showbutton.setAttribute("id", "button")

        const datadiv = document.createElement("div");
        ul.appendChild(datadiv);
        datadiv.setAttribute("id", "datadiv")
        const heading = document.createElement("h1");
        const headingnode = document.createTextNode("Name:" + " " + myData.Firstname + " " + myData.Lastname);
        heading.appendChild(headingnode);
        datadiv.appendChild(heading);
        datadiv.style.display = "none";


        showbutton.addEventListener("click", () => {
            if (datadiv.style.display != "none") {

                datadiv.style.display = "none"; 
                showbutton.innerHTML = "Show Details"

            }
            else {
                datadiv.style.display = "block";
                showbutton.innerHTML = "Hide Details"
            }

        })
    })
})