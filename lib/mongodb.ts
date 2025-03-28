import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

declare const global: typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};


const isServer = typeof window === 'undefined';

if (!isServer) {
  throw new Error('MongoDB client should only be used on the server side');
}

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;


if (process.env.NODE_ENV === 'development') {

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {

  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;