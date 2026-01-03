let stompClient = null;
let currentUser = "akshay";
let selectedUser = null;

const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// CONNECT WEBSOCKET
function connect() {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
        console.log("WebSocket connected");

        stompClient.subscribe("/topic/messages", function (msg) {
            const message = JSON.parse(msg.body);

            if (
                (message.sender === currentUser && message.receiver === selectedUser) ||
                (message.sender === selectedUser && message.receiver === currentUser)
            ) {
                showMessage(message);
            }
        });
    });
}

connect();

// OPEN CHAT (LOAD HISTORY)
function openChat(username, element) {
    selectedUser = username;

    document.querySelectorAll(".contact").forEach(c => c.classList.remove("active"));
    element.classList.add("active");

    document.getElementById("chatHeaderName").innerText = username;

    const img = document.getElementById("chatHeaderImg");
    img.src = `images/${username}.jpg`;
    img.onerror = () => img.src = "images/default.png";

    loadChatHistory(currentUser, selectedUser);
}

// LOAD CHAT HISTORY
function loadChatHistory(user1, user2) {
    fetch(`http://localhost:8080/api/chat/history?user1=${user1}&user2=${user2}`)
        .then(res => res.json())
        .then(messages => {
            messagesDiv.innerHTML = "";
            messages.forEach(showMessage);
        });
}

// SEND MESSAGE
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !selectedUser) return;

    const message = {
        sender: currentUser,
        receiver: selectedUser,
        content: text
    };

    stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
    messageInput.value = "";
}

// SHOW MESSAGE
function showMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");

    if (message.sender === currentUser) {
        div.classList.add("sent");
    } else {
        div.classList.add("received");
    }

    div.innerText = message.content;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
