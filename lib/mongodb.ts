import mongoose from 'mongoose';

// Define the MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the NodeJS global type to include our mongoose cache
declare global {
  var mongoose: MongooseCache | undefined;
}

// Initialize the cache
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Caches the connection to reuse across function calls.
 * 
 * @returns {Promise<typeof mongoose>} The Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return the cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise doesn't exist, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts);
  }

  try {
    // Await the connection promise and cache the result
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the promise on error so we can retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
