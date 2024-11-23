# EchoLynk Messaging Platform

A secure, feature-rich messaging platform focused on privacy and seamless communication.

## Key Features

- End-to-end encryption for all messages
- Real-time messaging with WebSocket
- Media sharing with compression
- Voice and video calls
- Cloud backup and sync
- Customizable themes
- Group chats with advanced permissions

## Technology Stack

- **Frontend**: React Native
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Cloud Storage**: AWS S3
- **Authentication**: JWT + bcrypt

## Platform Support

EchoLynk is available on multiple platforms:

### Mobile
- iOS
- Android

### Desktop
- Windows
- macOS
- Linux

## Getting Started

### Prerequisites

- Node.js v16 or higher
- MongoDB
- React Native development environment
- AWS Account for S3

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/echolynk.git
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../mobile
npm install
```

4. Set up environment variables
```bash
cp .env.example .env
```

5. Start the development servers
```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../mobile
npm start
```

## Building the Apps

### Prerequisites for All Platforms
- Node.js v16 or higher
- MongoDB
- Git

### Mobile App (iOS/Android)

1. Install React Native dependencies:
```bash
cd mobile
npm install
```

2. For iOS:
- macOS required
- Xcode 12 or higher
- CocoaPods
```bash
cd ios
pod install
cd ..
npm run ios
```

3. For Android:
- Android Studio
- Android SDK
- JDK 11
```bash
npm run android
```

### Desktop App (Windows, macOS, Linux)

1. Install dependencies:
```bash
cd desktop
npm install
```

2. Development:
```bash
npm start
```

3. Building:
- Windows: `npm run build:win`
- macOS: `npm run build:mac`
- Linux: `npm run build:linux`
- All platforms: `npm run build:all`

## Development Setup

1. Backend:
```bash
cd backend
npm install
npm run dev
```

2. Mobile:
```bash
cd mobile
npm install
npm start
```

3. Desktop:
```bash
cd desktop
npm install
npm start
```

## Security Features

- End-to-end encryption using the Signal Protocol
- Perfect forward secrecy
- Zero-knowledge architecture
- Secure file transfer with client-side encryption

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
