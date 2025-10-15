import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [websocketPath, setWebsocketPath] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const wsRef = useRef(null);

  const connectWebSocket = () => {
    if (!websocketPath.trim()) {
      alert('Please enter a WebSocket URL');
      return;
    }

    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close();
    }

    setMessages([]);
    setConnectionStatus('Connecting...');

    // Use the URL as-is if it starts with ws:// or wss://, otherwise treat it as a path
    let fullUrl = websocketPath.trim();
    if (!fullUrl.startsWith('ws://') && !fullUrl.startsWith('wss://')) {
      // If it doesn't start with a protocol, assume it's a path and needs wss://
      fullUrl = fullUrl.startsWith('/') ? `wss:/${fullUrl}` : `wss://${fullUrl}`;
    }

    try {
      const ws = new WebSocket(fullUrl);

      ws.onopen = () => {
        setIsConnected(true);
        setConnectionStatus('Connected');
        addMessage('system', 'Connected to WebSocket');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          addMessage('message', data);
        } catch {
          addMessage('message', event.data);
        }
      };

      ws.onerror = (error) => {
        addMessage('error', `WebSocket error: ${error.message || 'Unknown error'}`);
        setConnectionStatus('Error');
      };

      ws.onclose = (event) => {
        setIsConnected(false);
        setConnectionStatus('Disconnected');
        addMessage('system', `Connection closed (Code: ${event.code}, Reason: ${event.reason || 'No reason provided'})`);
      };

      wsRef.current = ws;
    } catch (error) {
      setConnectionStatus('Error');
      addMessage('error', `Failed to connect: ${error.message}`);
    }
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const addMessage = (type, content) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages(prev => [{ type, content, timestamp }, ...prev]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const formatMessage = (content) => {
    if (typeof content === 'object') {
      return JSON.stringify(content, null, 2);
    }
    return content;
  };

  const copyToClipboard = async (content, index) => {
    try {
      const textToCopy = formatMessage(content);
      await navigator.clipboard.writeText(textToCopy);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>WebSocket Monitor</h1>
        <div className="status-indicator">
          <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
          <span className="status-text">{connectionStatus}</span>
        </div>
      </header>

      <div className="connection-panel">
        <div className="input-group">
          <label htmlFor="ws-url">WebSocket URL:</label>
          <input
            id="ws-url"
            type="text"
            value={websocketPath}
            onChange={(e) => setWebsocketPath(e.target.value)}
            placeholder="wss://example.com/ws or ws://localhost:8080/ws"
            disabled={isConnected}
            onKeyDown={(e) => e.key === 'Enter' && !isConnected && connectWebSocket()}
          />
        </div>
        <div className="button-group">
          {!isConnected ? (
            <button onClick={connectWebSocket} className="btn btn-connect">
              Connect
            </button>
          ) : (
            <button onClick={disconnectWebSocket} className="btn btn-disconnect">
              Disconnect
            </button>
          )}
          <button onClick={clearMessages} className="btn btn-clear">
            Clear Messages
          </button>
        </div>
      </div>

      <div className="messages-container">
        <div className="messages-header">
          <h2>Messages ({messages.length})</h2>
        </div>
        <div className="messages-list">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>No messages yet. Connect to a WebSocket to start receiving messages.</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message message-${msg.type}`}>
                <div className="message-header">
                  <span className="message-type">{msg.type.toUpperCase()}</span>
                  <div className="message-header-right">
                    <button
                      className="btn-copy"
                      onClick={() => copyToClipboard(msg.content, index)}
                      title="Copy message to clipboard"
                    >
                      {copiedIndex === index ? '✓ Copied' : 'Copy'}
                    </button>
                    <span className="message-timestamp">{msg.timestamp}</span>
                  </div>
                </div>
                <pre className="message-content">{formatMessage(msg.content)}</pre>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
