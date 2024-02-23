
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


window.Pusher = Pusher;

const YOUR_TOKEN_FROM_LOGIN = '12|9DcgBtMzFjID6Y3NXWiYq1ZWGLkYXQLEzzJohHQw';

const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    cluster: 'mt1',
    encrypted: true,
    wsHost: '127.0.0.1', // WebSocket server host
    wsPort: '6001', // WebSocket server port
    authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
    auth: {
        headers: {
            Authorization: 'Bearer ' + YOUR_TOKEN_FROM_LOGIN,
        }
    },
});

export default echo;
