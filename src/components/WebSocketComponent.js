// /src/components/WebSocketComponent.js
import React, { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketComponent = () => {
  useEffect(() => {
    // Establish WebSocket connection to Laravel WebSocket server
    const socket = io('ws://127.0.0.1:6001/app/laravel');
    const bearerToken = '11|UnlsXmXXp6VnMdkYNaalW1ogzMJ6i9sa0zJmxVGJ';

    // Handle connection success
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      
      // Authenticate connection (replace 'your-auth-token' with your actual token)
      socket.emit('authenticate', { token: bearerToken });
      
      // Subscribe to private channel
      socket.emit('subscribe', 'private-channel-name');
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    // Handle incoming messages from the private channel
    socket.on('private-channel-name:App\\Events\\EventName', (data) => {
      console.log('Received message from private channel:', data);
    });

    return () => {
      socket.disconnect(); // Disconnect socket when component unmounts
    };
  }, []);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default WebSocketComponent;
