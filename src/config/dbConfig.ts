import mongoose from "mongoose";

// Define global type for mongoose connection caching
declare global {
  var mongoose: {
    conn: any;
    promise: Promise<any> | null;
  };
}

// Use Node.js global object to cache connection across hot reloads
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise exists, create new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    };

    mongoose.set('strictQuery', false);

    cached.promise = mongoose.connect(process.env.mongo_url!, opts).then((mongoose) => {
      console.log("MongoDB Connection Successful");
      console.log("Connected to database:", mongoose.connection.db?.databaseName || "default");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB Connection Failed:", error);
    throw error;
  }

  return cached.conn;
}
