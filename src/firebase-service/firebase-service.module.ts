import { Module } from '@nestjs/common';
import { FirebaseServiceController } from './firebase-service.controller';
import {  envs } from 'src/config';
import * as admin from 'firebase-admin';
import { join } from 'path';
import { FirebaseServiceService } from './firebase-service.service';
import * as fs from 'fs';

@Module({
  controllers: [FirebaseServiceController],
  providers: [FirebaseServiceService],
 
})

export class FirebaseServiceModule {
  private readonly db: FirebaseFirestore.Firestore;

  constructor() {
    // Inicializar Firebase si no se ha hecho aún
    if (!admin.apps.length) {
      const credentials = JSON.parse(envs.firebase!); // Asegúrate de que esto ya está cargado
      admin.initializeApp({
        credential: admin.credential.cert(credentials),
        storageBucket: 'cip-img.appspot.com',
      });
      console.log('✅ Firebase initialized.');
    }

    // Ya puedes usar servicios de Firebase
    this.db = admin.firestore();
  }

  async getDocument(path: string) {
    const snapshot = await this.db.doc(path).get();
    return snapshot.exists ? snapshot.data() : null;
  }
}