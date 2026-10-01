const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, isUsingMemoryStore } = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const Lead = require('./models/Lead');
const memoryStore = require('./models/LeadMemoryStore');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/leads', leadRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Aura Luxe Local Business API is running',
    storageMode: isUsingMemoryStore() ? 'In-Memory Store' : 'MongoDB Mongoose'
  });
});

const sampleLeadsData = [
  {
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    phone: '(555) 234-5678',
    service: 'Signature Hydrafacial Glow',
    message: 'Looking to book a skin radiance treatment before my anniversary weekend!',
    status: 'New',
    notes: [
      { text: 'Initial lead ingested from online landing page.', createdAt: new Date(Date.now() - 3600000 * 4) }
    ],
    createdAt: new Date(Date.now() - 3600000 * 4)
  },
  {
    name: 'Marcus Vance',
    email: 'marcus.vance@techcorp.io',
    phone: '(555) 987-6543',
    service: 'Cryotherapy Body Sculpting',
    message: 'Interested in a consultation regarding recovery and body toning packages.',
    status: 'Contacted',
    notes: [
      { text: 'Called client. Left voicemail offering consultation times.', createdAt: new Date(Date.now() - 3600000 * 12) },
      { text: 'Sent follow-up SMS with booking link.', createdAt: new Date(Date.now() - 3600000 * 6) }
    ],
    createdAt: new Date(Date.now() - 3600000 * 24)
  },
  {
    name: 'Dr. Elena Rostova',
    email: 'elena.rostova@medwellness.org',
    phone: '(555) 456-7890',
    service: 'IV Vitamin Wellness Drips',
    message: 'Would like to inquire about monthly wellness membership packages.',
    status: 'Converted',
    notes: [
      { text: 'Consultation completed in clinic. Signed up for Gold Wellness Tier!', createdAt: new Date(Date.now() - 3600000 * 48) }
    ],
    createdAt: new Date(Date.now() - 3600000 * 72)
  }
];

const seedSampleLeads = async () => {
  try {
    if (isUsingMemoryStore()) {
      const count = await memoryStore.countDocuments();
      if (count === 0) {
        console.log('[Seed] Populating initial demo leads into in-memory store...');
        for (const item of sampleLeadsData) {
          await memoryStore.create(item);
        }
        console.log('[Seed] Sample leads seeded into in-memory store.');
      }
    } else {
      const count = await Lead.countDocuments();
      if (count === 0) {
        console.log('[Seed] Populating initial demo leads into MongoDB...');
        await Lead.create(sampleLeadsData);
        console.log('[Seed] Sample leads seeded into MongoDB.');
      }
    }
  } catch (err) {
    console.error('[Seed] Error seeding sample leads:', err.message);
  }
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedSampleLeads();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(`  Aura Luxe API Server running on port ${PORT}`);
    console.log(`  Storage Mode: ${isUsingMemoryStore() ? 'In-Memory Store' : 'MongoDB Mongoose'}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`  Leads API:    http://localhost:${PORT}/api/leads`);
    console.log(`====================================================`);
  });
};

startServer();
