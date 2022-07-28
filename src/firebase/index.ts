import { credential, initializeApp } from 'firebase-admin';

export const initialize = () => {
  initializeApp({
    credential: credential.applicationDefault(),
  })
}
