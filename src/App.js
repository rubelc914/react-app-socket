import logo from './logo.svg';
import './App.css';

const bearerToken = "10|XrS4V9Il7knFoCynD20zhQfB45icv3jl0k8QNgZi";
const socketUrl = "ws://127.0.0.1:6001/app/laravel";

const socket = new WebSocket(socketUrl);

const callBackendApiAndTriggerEvent = () => {
  // Replace this with your actual backend API endpoint
  fetch('http://127.0.0.1:8000/api/private/2', {
      method: 'GET',
      headers: {
          'Authorization': bearerToken
      }
  })
  .then(response => response.json())
  .then(data => {
      console.log("Data to send:", {
          channel: 'test-channel' + 2,
          event: 'PrivateEvent',
          data: {
              message: data,
          }
      }); 
      // Trigger the private channel event
      socket.send(JSON.stringify({
          channel: 'test-channel'+ 2, 
          event: 'PrivateEvent', 
          data: {
              message: data,
          }
      }));
  })  
  .catch(error => {
      console.error('Error:', error);
  });
};

socket.addEventListener("open", (event) => {
    console.log("WebSocket connection opened:", event);
    callBackendApiAndTriggerEvent();
});

socket.addEventListener("message", (event) => {
    console.log("Received message:", event.data);
    const eventData = JSON.parse(event.data);

    if (eventData.event === 'PrivateEvent') {
        // Handle the event result
        console.log("Event result:", eventData.data);
    } else {
        // Handle other types of messages if needed
    }
});

socket.addEventListener("error", (event) => {
    console.error("WebSocket error:", event);
});

socket.addEventListener("close", (event) => {
    console.log("WebSocket connection closed:", event);
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
