import * as firebase from 'firebase';
require('firebase/firestore');
require('firebase/storage');
import DeviceInfo from 'react-native-device-info';
import {formatTime, getToday} from './utils.js';
// import moment from 'moment';

let db = '';

const firebaseConfig = {
  apiKey: 'AIzaSyCBgukAAfmml728DqLOfp2y5K3o7enlqnQ',
  authDomain: 'foster-c10a6.firebaseapp.com',
  databaseURL: 'https://foster-c10a6.firebaseio.com',
  projectId: 'foster-c10a6',
  storageBucket: 'foster-c10a6.appspot.com',
  messagingSenderId: '712297262351',
  appId: '1:712297262351:web:52851c8f0c2c93dd01627a',
  measurementId: 'G-DX17L80M1W',
};

class Fire {
  uniqueId = '';
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.uniqueId = DeviceInfo.getUniqueId();
    db = firebase.firestore();
  }

  // formatTime = date => {
  //   return moment(date.seconds * 1000).format('YYYY-MM-DD');
  // };

  exportDoc = doc => {
    return {
      ...doc.data(),
      id: parseInt(doc.id),
      created_date: formatTime(doc.data().created_date),
    };
  };

  async checkDevice() {
    console.log(this.uniqueId);
    // const db = firebase.firestore();
    const docRef = db.collection('devices').doc(this.uniqueId);
    const doc = await docRef.get();
    if (doc.exists) {
      return {id: this.uniqueId};
    } else {
      return await this.createDevice(this.uniqueId);
    }
  }

  async createDevice(id) {
    try {
      await db
        .collection('devices')
        .doc(`${id}`)
        .set({
          regtime: new Date(),
        });
      return {id};
    } catch (error) {
      console.error('Error writing document: ', error);
      return {error: error};
    }
  }

  async getDaily(date) {
    _self = this;
    const snapshot = await this.getAll('daily', {
      date: date,
      uniqueId: this.uniqueId,
    });
    return snapshot.docs.map(doc => {
      return _self.exportDoc(doc);
    });
  }

  async uploadImage(blob) {
    var storageRef = firebase.storage().ref();
    const currentTimeStamp = new Date().getTime();
    try {
      const snapshot = await storageRef
        .child('uploads/' + currentTimeStamp + '.jpg')
        .put(blob, {
          contentType: 'image/jpeg',
        });
      return snapshot;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async setDaily(daily) {
    const date = new Date();
    const currentDate = getToday()
    const snapshot = await this.getAll('daily', {
      date: currentDate,
      uniqueId: this.uniqueId,
    });
    if (snapshot.docs.length <= 0) {
      await this.create('daily', {
        answer: {...daily},
        date: currentDate,
        uniqueId: this.uniqueId,
      });
    } else {
      const id = snapshot.docs[0].id;
      let answer = snapshot.docs[0].data().answer || {};
      const key = Object.keys(daily)[0];
      answer[key] = daily[key];
      console.log(answer, daily, key);
      await this.update('daily', id, {answer});
    }
  }

  getNextId = async collectionName => {
    const snapshot = await db
      .collection(collectionName)
      .orderBy('created_date', 'desc')
      .limit(1)
      .get();
    return !snapshot.empty ? parseInt(snapshot.docs[0].id) + 1 : 1;
  };

  create = async (collectionName, values, id) => {
    let itemID = id;

    if (!itemID) itemID = await this.getNextId(collectionName);

    const data = {created_date: new Date()};

    for (let field of Object.keys(values)) {
      const value = values[field];
      data[field] = typeof value === 'number' ? String(value) : value;
    }

    const result = await db
      .collection(collectionName)
      .doc(String(itemID))
      .set(data);

    return this.get(collectionName, itemID);
  };

  update = async (collectionName, itemID, values) => {
    let id = typeof itemID === 'number' ? String(itemID) : itemID;
    const data = {};

    for (let field of Object.keys(values)) {
      const value = values[field];
      data[field] = typeof value === 'number' ? String(value) : value;
    }

    const result = await db
      .collection(collectionName)
      .doc(id)
      .update(data);
    return this.get(collectionName, itemID);
  };

  get = (collectionName, itemID) => {
    let id = typeof itemID === 'number' ? String(itemID) : itemID;
    return db
      .collection(collectionName)
      .doc(id)
      .get();
  };

  destroy = (collectionName, itemID) => {
    let id = typeof itemID === 'number' ? String(itemID) : itemID;
    return db
      .collection(collectionName)
      .doc(id)
      .delete();
  };

  batchUpdate = async (collectionName, where, values) => {
    const snapshot = await this.getAll(collectionName, where);
    if (snapshot.docs.length === 0) return;

    var batch = db.batch();

    for (let doc of snapshot.docs) {
      const data = {};

      for (let field of Object.keys(values)) {
        const value = values[field];
        data[field] = typeof value === 'number' ? String(value) : value;
      }

      batch.update(doc.ref, data);
    }

    return batch.commit();
  };

  batchDelete = async (collectionName, where) => {
    const snapshot = await this.getAll(collectionName, where);
    if (snapshot.docs.length === 0) return;

    var batch = db.batch();

    for (let doc of snapshot.docs) {
      batch.delete(doc.ref);
    }

    return batch.commit();
  };

  getAll = (collectionName, where, limit) => {
    let ref = db.collection(collectionName);

    if (where !== null && Object.keys(where).length > 0) {
      for (let field of Object.keys(where)) {
        if (where[field].constructor === Object) {
          if (where[field]['$gt'] !== undefined)
            ref = ref.where(field, '>', String(where[field]['$gt']));
          if (where[field]['$gte'] !== undefined)
            ref = ref.where(field, '>=', String(where[field]['$gte']));
          if (where[field]['$lt'] !== undefined)
            ref = ref.where(field, '<', String(where[field]['$lt']));
          if (where[field]['$lte'] !== undefined)
            ref = ref.where(field, '<=', String(where[field]['$lte']));
        } else {
          ref = ref.where(field, '==', String(where[field]));
        }
      }
    }

    if (limit) ref = ref.limit(limit);

    return ref.get();
  };

  getComAll = (collectionName, where, select, limit) => {
    let ref = db.collection(collectionName);
    if (select !== null) {
      ref = ref.select(...select);
    }
    if (where !== null && Object.keys(where).length > 0) {
      for (let field of Object.keys(where)) {
        if (where[field].constructor === Object) {
          if (where[field]['$gt'] !== undefined)
            ref = ref.where(field, '>', String(where[field]['$gt']));
          if (where[field]['$gte'] !== undefined)
            ref = ref.where(field, '>=', String(where[field]['$gte']));
          if (where[field]['$lt'] !== undefined)
            ref = ref.where(field, '<', String(where[field]['$lt']));
          if (where[field]['$lte'] !== undefined)
            ref = ref.where(field, '<=', String(where[field]['$lte']));
        } else {
          ref = ref.where(field, '==', String(where[field]));
        }
      }
    }

    if (limit) ref = ref.limit(limit);
    return ref.get();
  };
}

Fire.shared = new Fire();
export default Fire;
