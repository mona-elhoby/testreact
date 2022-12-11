// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDMZkaYfvNA1UvZp5w01sqasV9IoQqO7gw",
  authDomain: "vision-law-app.firebaseapp.com",
  projectId: "vision-law-app",
  storageBucket: "vision-law-app.appspot.com",
  messagingSenderId: "654231518632",
  appId: "1:654231518632:web:ae6202f790284b8023f19d",
  measurementId: "G-QEN4R14TKG"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

const broadcast = new BroadcastChannel('background-message');
messaging.onBackgroundMessage(function(payload) {
  // console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

      broadcast.postMessage(payload);
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});