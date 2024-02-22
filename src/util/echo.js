import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

const YOUR_TOKEN_FROM_LOGIN = '12|9DcgBtMzFjID6Y3NXWiYq1ZWGLkYXQLEzzJohHQw';
const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    wsHost: process.env.REACT_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    cluster: 'mt1',
    forceTLS: false,
    disableStats: true,
    authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
    auth: {
        headers: {
            Authorization: 'Bearer ' + YOUR_TOKEN_FROM_LOGIN,
        }
    },
});

export default echo;
