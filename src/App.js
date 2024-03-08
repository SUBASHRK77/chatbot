import { useEffect, useState } from "react";
import "./App.css";
import Chatapp from "./Chatbot";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

function App() {
  const [chatData, setChat] = useState([]);
  const firebaseConfig = {
    apiKey: "AIzaSyAaHFDfQwfkQ_zjdm7-BOhe7zAunw71Z7s",
    authDomain: "project-k-89c5a.firebaseapp.com",
    projectId: "project-k-89c5a",
    storageBucket: "project-k-89c5a.appspot.com",
    messagingSenderId: "346934564773",
    appId: "1:346934564773:web:9f00201dac0e0b54383a4c",
    measurementId: "G-QWGB7CZJBN",
  };

  let app = initializeApp(firebaseConfig);

  // initialize services
  const database = getFirestore(app);
  const storage = getStorage(app);
  // collection reference
  const collectionRef = collection(database, "posts");

  useEffect(() => {
    fetchChatData();
  }, []);

  const fetchChatData = () => {
    getDocs(collectionRef)
      .then((snapshot) => {
        let posts = [];
        snapshot.docs.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setChat(posts);
      })
      .catch((err) => {
        console.log(err, "firebase error");
      });
  };
  console.log(chatData, "firebase posts");

  return (
    <div className="App">
      <Chatapp
        data={chatData}
        db={database}
        storage={storage}
        colRef={collectionRef}
        getChat={fetchChatData}
      />
    </div>
  );
}

export default App;
