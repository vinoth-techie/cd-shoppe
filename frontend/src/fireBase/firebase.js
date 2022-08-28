import firebase from "firebase/app";
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyD3UlDNq99zdw84rgUwT96rBrsa4piLYT0",
    authDomain: "cd-shoppe.firebaseapp.com",
    projectId: "cd-shoppe",
    storageBucket: "cd-shoppe.appspot.com",
    messagingSenderId: "220931944036",
    appId: "1:220931944036:web:ae594691f5ab2c9afab971"
});
export const auth = app.auth();
export default app; 
