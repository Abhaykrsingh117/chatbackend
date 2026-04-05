let stompClient = null;
let currentUser = prompt("Enter Username:")?.toLowerCase().trim();
let selectedUser = null;

const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// ================= CONNECT =================
function connect() {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
        console.log("CONNECTED successfully");

        stompClient.subscribe("/topic/messages", function (msg) {

            const message = JSON.parse(msg.body);

            if (!selectedUser) return;

            // Strict conversation filter
            if (
                (message.sender.toLowerCase() === currentUser &&
                 message.receiver.toLowerCase() === selectedUser) ||

                (message.sender.toLowerCase() === selectedUser &&
                 message.receiver.toLowerCase() === currentUser)
            ) {
                showMessage(message);
            }
        });
    });
}

connect();


// ================= OPEN CHAT =================
function openChat(username, element) {

    selectedUser = username.toLowerCase().trim();

    // Remove active class
    document.querySelectorAll(".contact")
        .forEach(c => c.classList.remove("active"));

    element.classList.add("active");

    document.getElementById("chatHeaderName").innerText = username;

    // ✅ FIX HEADER IMAGE PROPERLY
    const headerImg = document.getElementById("chatHeaderImg");

    headerImg.src = ""; // reset first
    headerImg.src = "images/" + selectedUser + ".jpg";

    headerImg.onerror = function () {
        this.src = "images/default.jpg";
    };

    // Clear old messages
    messagesDiv.innerHTML = "";

    loadChatHistory();
}


// ================= LOAD HISTORY =================
function loadChatHistory() {

    if (!selectedUser) return;

    fetch(`http://localhost:8080/api/chat/history?user1=${currentUser}&user2=${selectedUser}`)
        .then(res => res.json())
        .then(messages => {

            messagesDiv.innerHTML = "";

            messages.forEach(message => {
                showMessage(message);
            });

            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        })
        .catch(err => console.error("History error:", err));
}


// ================= SEND MESSAGE =================
sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", function (e) {
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


// ================= SHOW MESSAGE =================
function showMessage(message) {

    // Strict protection again (extra safety)
    if (
        !( (message.sender.toLowerCase() === currentUser &&
            message.receiver.toLowerCase() === selectedUser) ||

           (message.sender.toLowerCase() === selectedUser &&
            message.receiver.toLowerCase() === currentUser) )
    ) return;

    const bubble = document.createElement("div");
    bubble.classList.add("message");

    if (message.sender.toLowerCase() === currentUser) {
        bubble.classList.add("sent");
    } else {
        bubble.classList.add("received");
    }

    bubble.textContent = message.content;

    messagesDiv.appendChild(bubble);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}