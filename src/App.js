import React, { useEffect } from 'react';
import echo from './util/echo'; // Adjust the path as needed
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

function MyComponent() {
    useEffect(() => {
        console.log('Component mounted');

        // Example of subscribing to a channel
        const channel = echo.channel('channel-public');
        console.log(echo.connector.socket);

        // Ensure echo.connector.socket exists before setting event listeners
        if (echo.connector.socket) {
            // Log when an error occurs with the WebSocket connection
            echo.connector.socket.onerror = (error) => {
                console.error('WebSocket connection error:', error);
            };

            // Log when the WebSocket connection is closed
            echo.connector.socket.onclose = () => {
                console.log('WebSocket connection closed');
            };

            // Log when the WebSocket connection is established
            echo.connector.socket.onopen = () => {
                console.log('WebSocket connection established');
            };
        } else {
            console.error('WebSocket connection not established');
        }

        channel.listen('PublicEvent', (data) => {
            console.log('Received event:', data);
        });

        // Clean up subscription on component unmount
        return () => {
            channel.unsubscribe();
            console.log('Component unmounted');
        };
    }, []);

    return (
        <div>
            {/* Your component JSX */}
        </div>
    );
}

export default MyComponent;
