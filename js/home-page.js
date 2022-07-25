let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user && user.emailVerified) {
    uid = user.uid;
  } else {
    window.location.href = "./signIn.html"
  }
});

///////// LogOut Function
const logout = () => {
  firebase.auth().signOut().then(() => {
    console.log("Sign-out successful.")
  }).catch((error) => {
    // An error happened.
  });
}

////////// DataBase
const database = () => {
  firebase.database().ref("user/").push({
    username: iskillers,
  })
}


///////// Todo List 

const inputText = document.getElementById("inputData")
const message = document.getElementById("message-todo")
const AddTodo = () => {
  firebase.database().ref("todo/").push({
    todo: inputText.value,
    uid: uid,
  }).then(() => {
    message.style.display = "block"
    message.innerHTML = "Task added";
    message.style.color = "green"
    setTimeout(() => {
      message.style.display = "none"
    }, 2000);
  })
};


const ul = document.getElementById("allTodo");
firebase.database().ref("todo/").on("child_added", (tododata) => {
  const key = tododata.key;
  const todoValue = tododata.val();
  console.log(todoValue.todo);

  const li = document.createElement("li");
  const allTodo = document.createTextNode(todoValue.todo)
  li.appendChild(allTodo)
  ul.appendChild(li);
  li.setAttribute("id", "myTodoText")

})

const myTodo = document.getElementById("myTodo");
firebase.database().ref("todo/").on("child_added", (tododata) => {
  const key = tododata.key;
  const todoValue = tododata.val();
  if (uid === todoValue.uid) {
    const mytodoli = document.createElement("li");
    mytodoli.setAttribute("class", "liText");
    myTodo.appendChild(mytodoli);

    const showContainer = document.createElement("div");
    const editContainer = document.createElement("div");
    mytodoli.appendChild(showContainer);
    mytodoli.appendChild(editContainer);
    showContainer.setAttribute("id", "showContainer")
    editContainer.setAttribute("id", "editContainer")
    showContainer.style.display = "block";
    editContainer.style.display = "none";

    const para = document.createElement("p");
    showContainer.appendChild(para);
    para.setAttribute("class", "para")
    const paraText = document.createTextNode(todoValue.todo);
    para.appendChild(paraText);


    // Edit Button
    const editbuuton = document.createElement("button");
    const buttontext = document.createTextNode("Edit");
    editbuuton.setAttribute("class", "buttons")
    editbuuton.appendChild(buttontext);
    showContainer.appendChild(editbuuton);
    editbuuton.addEventListener("click", () => {
      // alert("edit");
      showContainer.style.display = "none";
      editContainer.style.display = "block";
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      editContainer.appendChild(input);
      input.setAttribute("id", "inputUpdate")

      // Update Function
      const updatebutton = document.createElement("button")
      editContainer.appendChild(updatebutton);
      updatebutton.setAttribute("id", "updateButton")
      const updatebuttonText = document.createTextNode("Update");
      updatebutton.appendChild(updatebuttonText)
      updatebutton.addEventListener("click", () => {
        showContainer.style.display = "block";
        editContainer.style.display = "none";

        firebase.database().ref("todo/" + key).update({
          todo: input.value,
        });
        editbuuton.parentNode.innerHTML = input.value;
        showContainer.appendChild(deletebuuton);
        showContainer.appendChild(editbuuton);
      })
    })

    // / Delete Function
    const deletebuuton = document.createElement("button");
    const deletetext = document.createTextNode("delete");
    deletebuuton.setAttribute("class", "buttons")
    deletebuuton.appendChild(deletetext);
    showContainer.appendChild(deletebuuton);
    deletebuuton.addEventListener("click", () => {
      // alert("edit")
      firebase.database().ref("todo/" + key).remove();
      showContainer.parentNode.remove();
    })
  }
})






// djkfj

