const mongoose = require('mongoose');

let useMemoryStore = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/local_biz_crm';
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 1500
    });
    console.log(`[MongoDB] Connected successfully to ${mongoose.connection.host}/${mongoose.connection.name}`);
    useMemoryStore = false;
  } catch (err) {
    console.log(`[MongoDB] Primary server offline. Initializing instant built-in memory database...`);
    useMemoryStore = true;
  }
};

const isUsingMemoryStore = () => useMemoryStore;

module.exports = { connectDB, isUsingMemoryStore };
