const socket = new WebSocket('ws://localhost:8080');
let timestamp = new Date().toLocaleTimeString();
setInterval(()=>{
    timestamp = new Date().toLocaleTimeString();
},1000)
socket.addEventListener('open', () => {
  console.log('Connected to WebSocket server');
});

socket.addEventListener('message', (event) => {
  const chat = document.getElementById('chat');
  let messageDiv = document.createElement('div');

  if (event.data instanceof Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      const message = reader.result;
      messageDiv.className = 'message received';
      messageDiv.innerHTML = `${message}<div style="font-size:10px; margin-top:5px" class="timestamp">${timestamp}</div>`;
      chat.appendChild(messageDiv);
      chat.scrollTop = chat.scrollHeight;
    };
    reader.readAsText(event.data);
  } else {
    const message = event.data;
    messageDiv.className = 'message received';
    messageDiv.innerHTML = `${message}<div style="font-size:10px; margin-top:5px" class="timestamp">${timestamp}</div>`;
    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
  }
});

document.getElementById('send').addEventListener('click', () => {
  const messageInput = document.getElementById('input');
  const message = messageInput.value;
  if(message.trim()!=""){
    socket.send(message);
    const chat = document.getElementById('chat');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    messageDiv.innerHTML = `${message}<div style="font-size:10px; margin-top:5px" class="timestamp">${timestamp}</div>`;
    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
    messageInput.value = '';
  } 
});