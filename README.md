![License](https://img.shields.io/badge/license-MIT-green)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)
# PASO – Advanced Real-Time Chat Application

PASO is a production-level real-time communication platform inspired by WhatsApp, enhanced with **Machine Learning capabilities**, **AI automation**, and full multimedia support. It integrates messaging, voice/video communication, intelligent moderation, and admin analytics into a complete chat ecosystem.

---

## Architecture

The application follows a decoupled micro-service inspired architecture to handle real-time sockets and ML processing efficiently.

```mermaid
graph TD

%% ================= FRONTEND =================
subgraph FRONTEND [Frontend Layer]
A1[React App]
A2[State Management]
A3[UI: Tailwind + DaisyUI]
A4[Routing]
A5[Socket Client]
end

%% ================= BACKEND =================
subgraph BACKEND [Backend Layer]
B1[Express Server]
B2[REST API Controllers]
B3[Authentication Service]
B4[JWT Middleware]
B5[Socket.io Server]
B6[Message Service]
B7[Group Service]
B8[User Service]
B9[Admin Service]
end

%% ================= DATABASE =================
subgraph DATABASE [Database Layer]
C1[(MongoDB)]
C2[User Collection]
C3[Message Collection]
C4[Group Collection]
C5[Report Collection]
end

%% ================= ML SERVICE =================
subgraph ML [ML Moderation Service]
D1[FastAPI Server]
D2[Text Analysis Model]
D3[Toxicity Detection]
end

%% ================= EXTERNAL =================
subgraph EXTERNAL [External Services]
E1[Groq API - AI Chat]
E2[ZegoCloud - Voice/Video]
E3[Cloudinary - Media Storage]
E4[Brevo - Email Service]
end

%% ================= FLOW =================

%% Frontend to Backend
A1 -->|HTTP Requests| B1
A5 -->|WebSocket| B5

%% Backend internal flow
B1 --> B2
B2 --> B3
B3 --> B4

B2 --> B6
B2 --> B7
B2 --> B8
B2 --> B9

%% Socket communication
B5 --> B6

%% Database connections
B6 --> C3
B7 --> C4
B8 --> C2
B9 --> C5

C1 --> C2
C1 --> C3
C1 --> C4
C1 --> C5

%% ML Service
B6 -->|Analyze Message| D1
D1 --> D2
D2 --> D3

%% External APIs
B6 --> E1
B6 --> E3
B3 --> E4
B6 --> E2

%% AI Chat
A1 -->|AI Chat Request| B6
B6 --> E1

%% Calling Feature
A1 -->|Call Init| E2

%% Media Upload
A1 -->|Upload Media| B6
B6 --> E3

%% Email Flow
B3 -->|Send Email| E4
```

## Screenshots

## Authentication
<p align="center"> 
    <img src="https://github.com/user-attachments/assets/0a79012d-8a32-4bf4-b634-411d512e1a24" width="90%" />
</p>

## Chat Interface
<p align="center">
    <img src="https://github.com/user-attachments/assets/f7412938-9575-40c8-a01d-e90540db73ec" width="90%"/> </p> 
    <p align="center"><img src="https://github.com/user-attachments/assets/a0a6e650-b7e7-46d5-8187-e2f6aa83e5ab" width="90%"/> </p>
    <p align="center"><img src="https://github.com/user-attachments/assets/56dea4bf-8551-4d2e-adb2-9e4120ec58e7" width="90%"/> </p>
    <p align="center"><img src="https://github.com/user-attachments/assets/9da9c528-4690-43d3-a7bd-0924278725e0" width="90%"/> </p>

## AI Chat
<p align="center"> <img src="https://github.com/user-attachments/assets/c262ed0c-303b-4307-9141-9159f20233cf" width="90%"/> </p>

## Calling
<p align="center"> <img src="https://github.com/user-attachments/assets/3aa8c4bb-0861-4d4b-abad-2861347ac865" width="90%"/> </p>

## Status page
<p align="center"> <img src="https://github.com/user-attachments/assets/96aea367-128d-47f1-9588-d89d3dff7b29" width="90%"/> </p>

## Admin Panel
<p align="center"> <img src="https://github.com/user-attachments/assets/8f96ed1a-fd29-4cd3-8d05-9f2c36e08492" width="90%"/> </p> 
<p align="center"> <img src="https://github.com/user-attachments/assets/a53aea78-82c0-4f40-a94a-eeba0b053eed" width="90%"/> </p> 
<p align="center"> <img src="https://github.com/user-attachments/assets/fe17f60b-a3c1-4152-9d5e-9aced6f67d4c" width="90%"/> </p>

## Features

Authentication System

- Secure sign up with full name, email, password
- Security questions (3-level verification)
- Forgot password with identity verification
- Email notifications via Brevo

UI and Customization

- Built with DaisyUI and Tailwind CSS
- Dynamic themes
- Chat wallpapers

AI Integration
- AI chatbot powered by Groq API

Messaging System

- One-to-one chat
- Group chat with admin roles

Features:

- Message status (single/double/blue tick)
- Reactions
- Pin messages
- Reply system
- Copy text
- Delete (me / everyone)


Reporting and Moderation
- Message reporting system
- ML-based moderation
- Admin review pipeline

Search System

- Global message search
- Highlighted results

Calling Features

Voice and video calls (ZegoCloud)
- Admin Panel
- Analytics dashboard
- User management
- Report management
- CSV export

##  Machine Learning Service

Run Locally : 
```bash
cd ml-service
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

## ML Features
- Toxic Message Detection (ML-based)
- Spam Detection (ML-based)

See [ML_MODEL.md](./ML_MODEL.md) for detailed implementation.

## Tech Stack

## Frontend:

- React.js
- Tailwind CSS
- DaisyUI

Backend:

- Node.js
- Express.js
- Socket.io

Database:

- MongoDB

Services:

- Cloudinary
- Brevo
- Groq API
- ZegoCloud
- FastAPI (ML service)

## Deployment

- Frontend: Vercel

- Backend: Render

- ml-service: Render

## Environment Variables

Backend

```bash
MONGODB_URI=
PORT=5001
JWT_SECRET=
NODE_ENV=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GROQ_API_KEY=

ZEGO_APP_ID=
ZEGO_SERVER_SECRET=

CLIENT_URL=https://chat-app-sooty-mu.vercel.app
BREVO_API_KEY=xxx-xxx-xxx

ML_SERVICE_URL=https://chat-app-1-bj8j.onrender.com/analyze

BASE_URL=http://localhost:5000

VITE_ZEGO_APP_ID=
VITE_ZEGO_SERVER_SECRET=
VITE_BACKEND_URL=http://localhost:5001
```

Frontend

```bash
VITE_ZEGO_APP_ID= (put it in frontend also if not work through backend)
VITE_ZEGO_SERVER_SECRET= (put it in frontend also if not work through backend)
# VITE_BACKEND_URL=https://chat-app-xsng.onrender.com
VITE_BACKEND_URL=http://localhost:5001
```

## Installation and Setup
```bash
git clone https://github.com/your-username/paso.git
cd paso

# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```

## Project Highlights

- Real-time chat with Socket.io
- AI chatbot integration
- ML-based moderation system
- Full admin analytics panel
- Voice and video communication
- Scalable architecture
- Open-source contribution ready

## Contributing

- Check Issues
- Pick a task
- Submit a Pull Request

## Future Improvements
- Advanced ML moderation
- Notifications system
- Mobile optimization
- UI/UX improvements

## 🤝 Contributing
Contributions are welcome!  
See [CONTRIBUTING.md](./CONTRIBUTING.md)

Author

Akash Santra
