import { firestore } from 'firebase-admin';
import { DateTime } from 'luxon';

export class RemoService {
  constructor(private firestore: firestore.Firestore) {
  }

  async isGoingOutDay(): Promise<boolean> {
    const today = DateTime.local().setZone('Asia/Tokyo');
    const date = today.toFormat('YYYY-mm-dd');

    const record = await this.firestore.collection('GoingOutDay')
      .doc(date).get();

    return record !== undefined;
  }
}
