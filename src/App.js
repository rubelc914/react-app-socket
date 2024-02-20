import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  const bearerToken = "10|XrS4V9Il7knFoCynD20zhQfB45icv3jl0k8QNgZi";
  const socketUrl = "ws://127.0.0.1:6001/app/laravel";

  const socket = new WebSocket(socketUrl);

  const send = () => {
    socket.send(
      JSON.stringify({
        channel: "test-channel" + 1,
        event: "PrivateEvent",
        data: {
          message: "hello",
        },
      })
    );
  };

  const callBackendApiAndTriggerEvent = () => {
    // Replace this with your actual backend API endpoint
    fetch("http://127.0.0.1:8000/api/private/1", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const handleOpen = (event) => {
      console.log("WebSocket connection opened:", event);
      callBackendApiAndTriggerEvent();
    };

    const handleError = (event) => {
      console.error("WebSocket error:", event);
    };

    const handleClose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("error", handleError);
    socket.addEventListener("close", handleClose);
    socket.onmessage = (event) => {
      const parseEvent = JSON.parse(event.data);
      const message = parseEvent.data;
      console.log("message", message);
    };

    return () => {
      // Clean up event listeners on component unmount
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("error", handleError);
      socket.removeEventListener("close", handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="App">
      <button onClick={() => send()}>send</button>
    </div>
  );
}

export default App;
