import React, { useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const MyComponent = () => {
    useEffect(() => {
        // Initialize Laravel Echo
        // window.Pusher = Pusher;

        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'PLARAVEL',
            wsHost: window.location.hostname,
            wsPort: 6001,
            cluster: "mt1",
            forceTLS: false,
            disableStats: true,
            enabledTransports: ['ws'],
            authEndpoint :'http://127.0.0.1:8000/api/broadcasting/auth',
            auth:{
                headers: {
                    Authorization: 'Bearer '+'12|9DcgBtMzFjID6Y3NXWiYq1ZWGLkYXQLEzzJohHQw', 
                }
            },
        });

        // Subscribe to a channel
        const channel = echo.channel('channel-public');

        // Listen for an event
        channel.listen('.PublicEvent', (data) => {
            console.log('Event received:', data);
            // Handle the received event data
        });

        // Cleanup function to stop listening when the component unmounts
        return () => {
            channel.stopListening('.PublicEvent');
        };
    }, []);

    return (
        <div>
            {/* Your component content */}
        </div>
    );
};

export default MyComponent;
