import { initializeApp } from 'firebase/app';
import * as Auth from 'firebase/auth';

export const firebaseConfig = {};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = Auth.initializeAuth(firebaseApp);