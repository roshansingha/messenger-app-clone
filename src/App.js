import React, { useState, useEffect } from "react";
import { FormControl, Input, IconButton } from "@material-ui/core";
import "./App.css";
import SendIcon from "@material-ui/icons/Send";
import FlipMove from "react-flip-move";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // console.log(input);
  //console.log(messages);

  useEffect(() => {
    setUsername(prompt("Please enter your name..."));
  }, []);

  useEffect(() => {
    // runs once when the app components loads
    // is basically a listener
    // shoots off a snapshot of db
    // loops through each message obj in db
    // if its changed it will update the snapshot
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    // All the logic to send message goes here

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <img
        className="fb__icon"
        src="https://facebookbrand.com/wp-content/uploads/2018/09/header-e1538151782912.png?w=100&h=100"
        alt="Facebook Messagenger Logo Icon"
      />
      <h1>Facebook Messenger</h1>
      <h2>Welcome {username}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            className="app__iconBtn"
            disabled={!input}
            variant="contained"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map((message) => (
          <Message username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
