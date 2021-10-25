import Firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDcbMRzauD7b42v8s2QjL4lkiclW_MS388",
    databaseURL: "https://chit-chat-ed721-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "chit-chat-ed721",
    storageBucket: "gs://chit-chat-ed721.appspot.com/",
    appId: "1:223586380109:android:a0da2be5247a4e0dbeaf04",
};

export default Firebase.initializeApp(firebaseConfig);