const socket = io();

let username;

Swal.fire({
  title: 'identificate',
  input: "text",
  allowOutsideClick: false,
  text: 'ingresa nombre usuario',
  inputValidator: (value) => {
    return !value && "es obligatorio"
  },

}).then((result) => {

  username = result.value;
  socket.emit("new-user", username)
});

const chatInput = document.getElementById("chat-input")

chatInput.addEventListener("keyup", (ev) => {
  if (ev.key === "Enter") {
    const inputMessage = chatInput.value;


    if (inputMessage.trim().length > 0) {
      socket.emit("chat-message", { username, message: inputMessage })
      chatInput.value = ""
    }
  }
})

const messagesPanel = document.getElementById("messages-panel");
socket.on("messages", (data) => {
  console.log(data)
  let messages = "";

  data.forEach(m => {
    messages += `<b>${m.username}:<b>${m.message}<br>`

  });
  messagesPanel.innerHTML = messages;

})

socket.on("new-user", (username) => {
  Swal.fire({
    title: `${username} se ha unido `,
    toast: true,
    position: "top-end"
  })
})

/* 
socket.emit("message", "Mensaje desde frontend!");

socket.on("message", (data) => {
  console.log(data);
});

socket.on("input-changed", (data) => {
  const receivedTextInput = document.getElementById("received-text-input");
  receivedTextInput.innerHTML = data;
});

const textInput = document.getElementById("text-input");
textInput.addEventListener("input", (ev) => {
  socket.emit("input-changed", ev.target.value);
});
 */