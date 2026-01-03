ChatSphere – Real-Time Chat Application-
ChatSphere is a real-time one-to-one chat application built using Spring Boot, WebSocket (STOMP + SockJS), and MongoDB.
It supports instant messaging with persistent chat history and a clean, user-friendly interface.

Features-
 Real-time messaging using WebSocket (STOMP protocol)
 Chat history persistence with MongoDB
 Load previous messages when switching chats
 No duplicate messages (server-driven updates)
 One-to-one user chat
 User profile images with default fallback
 Frontend served directly from Spring Boot

Tech Stack-
    Backend-Java,Spring Boot,WebSocket (STOMP + SockJS),Spring Data MongoDB
    Frontend-HTML,CSS,JavaScript
    Database-MongoDB
    Tools-IntelliJ IDEA,MongoDB Compass,Git & GitHub
    
Project Architecture-
  Backend (Spring Boot)
    ├── WebSocketConfig
    ├── ChatController (WebSocket)
    ├── ChatHistoryController (REST)
    ├── MongoDB (messages collection)
  Frontend (Static Resources)
   ├── chat.html
   ├── chat.js
   └── images/

How to Run the Project Locally-
    Prerequisites-Java 17+,MongoDB running on localhost:27017,Git

Clone the Repository-
      git clone https://github.com/<your-username>/<your-repo-name>.git
      cd <your-repo-name>
      
Start MongoDB-
       mongod(Make sure MongoDB is running locally)

Run the Spring Boot Application-
       You can run it using:IntelliJ Run button or mvn spring-boot:run

Open the Chat Application-
       Open your browser and visit:http://localhost:8080/chat.html

Key Learnings-
      Implemented real-time communication using WebSocket
      Managed message persistence and retrieval with MongoDB
      Solved common WebSocket issues like duplicate messages
      Understood clean backend–frontend integration
      Learned practical Git and GitHub workflow

Future Enhancements-
      User authentication (JWT)
     Online / Offline status
     Typing indicator
     Responsive mobile UI
     Cloud deployment

Author-
    Abhay Kumar Singh
    BCA Student | Java & Backend Developer
    GitHub: https://github.com/Abhaykrsingh117

If you like this project-
Give it a ⭐ on GitHub — it really helps!



