import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";

import { api_url } from "../config";
import {axiosConfig} from '../config'

// Scripts for firebase and firebase messaging
const firebaseConfig = {
  apiKey: "AIzaSyDMZkaYfvNA1UvZp5w01sqasV9IoQqO7gw",
  authDomain: "vision-law-app.firebaseapp.com",
  projectId: "vision-law-app",
  storageBucket: "vision-law-app.appspot.com",
  messagingSenderId: "654231518632",
  appId: "1:654231518632:web:ae6202f790284b8023f19d",
  measurementId: "G-QEN4R14TKG"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BBrcfY_NuT5hBP156dugamNUn7gx3cZwRCiHZALO9UtPTLgd1fx91kSVzk7eWW2Esp6PsBYXF6L3hFa1kds4zKY",
  })
    .then((currentToken) => {
      if (currentToken && JSON.parse(localStorage.getItem('userInfo'))?.accessToken) {
        // console.log("current token for client: ", currentToken);
        setTokenFound(true);
        axios.post(`${api_url}/notification/register`, { token: currentToken, type: "Website" },{
            headers: axiosConfig
        })
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      // console.log("payload12: ", payload)
      resolve(payload);
    });
  });
