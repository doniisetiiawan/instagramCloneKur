import * as firebase from 'firebase';
import envs from '../config/env';

export const initialize = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: envs.dev.APIKEY,
      authDomain: envs.dev.AUTHDOMAIN,
      databaseURL: envs.dev.DATABASEURL,
      projectId: envs.dev.PROJECTID,
      storageBucket: envs.dev.STORAGEBUCKET,
      messagingSenderId: envs.dev.MESSAGINGSENDERID,
      appId: envs.dev.APPID,
      measurementId: envs.dev.MEASUREMENTID,
    });
  }
};

export const setListener = (endpoint, updaterFn) => {
  firebase.database().ref(endpoint).on('value', updaterFn);
  return () => firebase.database().ref(endpoint).off();
};

export const pushData = (endpoint, data) => firebase.database().ref(endpoint).push(data);

export const login = (email, pass) => firebase.auth().signInWithEmailAndPassword(email, pass);

export const logout = () => firebase.auth().signOut();

export const signup = (email, pass) => firebase
  .auth()
  .createUserWithEmailAndPassword(email, pass);
