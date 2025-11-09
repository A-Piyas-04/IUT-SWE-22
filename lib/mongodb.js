/**
 * MongoDB client utility using a singleton pattern.
 * Ensures a single reusable connection across serverless/edge invocations.
 * Requires process.env.MONGODB_URI to be defined.
 */
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error(
    "Missing environment variable: MONGODB_URI. Please set it in .env.local"
  );
}

// Global is used to preserve the value across hot-reloads in dev
let clientPromise;

if (!globalThis._mongoClientPromise) {
  const client = new MongoClient(uri, {
    // Adjust options as needed for production stability
    serverSelectionTimeoutMS: 5000,
  });
  globalThis._mongoClientPromise = client.connect();
}

clientPromise = globalThis._mongoClientPromise;

export default clientPromise;