import * as admin from 'firebase-admin'

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.applicationDefault(), // usa credencial local (gcloud ou variáveis)
    })
  : admin.app()

export const adminAuth = app.auth()
