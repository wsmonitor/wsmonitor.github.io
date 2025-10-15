# WebSocket Monitor

A simple and efficient web application for monitoring WebSocket connections in real-time.

![WebSocket Monitor](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![Built with Claude](https://img.shields.io/badge/Built%20with-Claude-blueviolet)

## Overview

WebSocket Monitor is a lightweight tool that allows you to connect to any WebSocket server and visualize messages in real-time. Perfect for debugging, testing, and monitoring WebSocket communications during development.

## Features

- **Real-time Monitoring** - View messages as they arrive from the WebSocket server
- **Universal Compatibility** - Connect to any WebSocket endpoint (ws:// or wss://)
- **Smart Message Formatting** - Automatically formats JSON messages for better readability
- **Connection Status** - Visual indicator showing current connection state
- **Message History** - Keep track of all received messages with timestamps
- **Clean Interface** - Intuitive and distraction-free user interface

## Live Demo

Visit the live application: [WebSocket Monitor](https://wsmonitor.github.io/)

## Quick Start

### Run Locally

```bash
# Clone the repository
git clone https://github.com/wsmonitor/wsmonitor.github.io.git

# Navigate to the project directory
cd wsmonitor

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Enter WebSocket URL** - Type the WebSocket endpoint you want to monitor
   - Examples: `wss://echo.websocket.org/`, `ws://localhost:8080/ws`
   - The app automatically adds `wss://` if no protocol is specified

2. **Connect** - Click the "Connect" button or press Enter

3. **Monitor Messages** - All incoming messages will appear in the message panel with:
   - Message type (SYSTEM, MESSAGE, ERROR)
   - Timestamp
   - Formatted content

4. **Manage** - Use "Clear Messages" to reset the history or "Disconnect" to close the connection

## Technologies

Built with modern web technologies:
- **React 19** - UI framework
- **Vite 7** - Build tool and development server
- **WebSocket API** - Native browser WebSocket implementation

## Browser Support

Works in all modern browsers that support the WebSocket API:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## License

MIT
