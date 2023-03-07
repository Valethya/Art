const socket = io();
//FORMS
const formEmail = document.querySelector("#formEmail");
const formMessage = document.querySelector("#formMessage");
//INPUTS
const inputEmail = document.querySelector("#userEmail");
const inputMessage = document.querySelector("#userMessage");
//ALERT
const errorMessage = document.querySelector(".validate");
let email = "";
//SCREENS
const joinScreen = document.querySelector(".joinScreen");
const chatScreen = document.querySelector(".chatScreen");
//BTN
const sendMessage = document.querySelector("#sendMessage");

const emailRegex =
  /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

formEmail.addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = inputEmail.value.trim();
  if (input.length <= 0) {
    errorMessage.style.display = "flex";
    errorMessage.style.color = "rgb(255, 103, 43)";
    inputEmail.style.borderBottomColor = "rgb(255, 103, 43)";
    errorMessage.innerHTML = `Por favor pon un estupido email`;
  } else if (!emailRegex.test(input)) {
    errorMessage.style.display = "flex";
    errorMessage.style.color = "rgb(255, 103, 43)";
    inputEmail.style.borderBottomColor = "rgb(255, 103, 43)";
    errorMessage.innerHTML = `Por favor pon un email valido`;
  } else {
    errorMessage.style.display = "none";
    inputEmail.style.borderBottomColor = "rgb(141, 238, 15)";
    email = inputEmail.value;
    joinScreen.style.display = "none";
    chatScreen.style.display = "flex";
  }
});

//ESCUCHAS DE LOS MENSAJES
formMessage.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = formMessage.value;

  if (message === undefined) {
    event.preventDefault();
  }
  const dataMessage = {
    userEmail: email,
    userMessage: inputMessage.value,
  };

  const url = "http://localhost:8080/api/messages";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataMessage),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  socket.emit("message", dataMessage);
  inputMessage.value = "";
});

///click
sendMessage.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("holis");
  const message = formMessage.value;

  if (message === undefined) {
    event.preventDefault();
  }
  const dataMessage = {
    userEmail: email,
    userMessage: inputMessage.value,
  };

  const url = "http://localhost:8080/api/messages";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataMessage),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  socket.emit("message", dataMessage);
  inputMessage.value = "";
});
///

inputMessage.addEventListener("keydown", async (event) => {
  const message = formMessage.value;

  if (event.key == "Enter" && message === undefined) {
    event.preventDefault();
  }
  const dataMessage = {
    userEmail: email,
    userMessage: inputMessage.value,
  };

  const url = "http://localhost:8080/api/messages";
  if (event.key == "Enter") {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataMessage),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    socket.emit("message", dataMessage);
    inputMessage.value = "";
  }
});

const chatBox = document.querySelector(".chatBox");

const createNewMessage = (message) => {
  const verify = email == message.user;
  const style = verify ? "own" : "other";

  chatBox.innerHTML += `<div class="message ${style}">
        <p>${message.message}</p>
    </div>`;
};

socket.on("allMessages", async (data) => {
  chatBox.innerHTML = "";
  await data.forEach((message) => {
    return createNewMessage(message);
  });
});
