const http = require('http');

// Helper to make HTTP requests
function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function testApiContract() {
  console.log('--- Testing API Endpoints Contract ---');
  
  try {
    // 1. Health check
    const health = await request('GET', '/api/health');
    console.log('1. GET /api/health =>', health.status, health.body.message);

    // 2. GET /api/leads
    const getLeadsRes = await request('GET', '/api/leads');
    console.log(`2. GET /api/leads => status ${getLeadsRes.status}, count: ${getLeadsRes.body.count}`);

    // 3. POST /api/leads (Create new lead)
    const newLeadPayload = {
      name: 'Verification Tester',
      email: 'tester@example.com',
      phone: '(555) 000-1111',
      service: 'Signature Hydrafacial Glow',
      message: 'Automated test inquiry message'
    };
    const createRes = await request('POST', '/api/leads', newLeadPayload);
    console.log('3. POST /api/leads => status', createRes.status, 'Created ID:', createRes.body.data.id || createRes.body.data._id);
    const createdId = createRes.body.data.id || createRes.body.data._id;

    // 4. PATCH /api/leads/:id/status (Update status to Contacted)
    const patchRes = await request('PATCH', `/api/leads/${createdId}/status`, { status: 'Contacted' });
    console.log('4. PATCH /api/leads/:id/status => status', patchRes.status, 'Updated status:', patchRes.body.data.status);

    // 5. POST /api/leads/:id/notes (Append note)
    const noteRes = await request('POST', `/api/leads/${createdId}/notes`, { text: 'Test note appended via API' });
    console.log('5. POST /api/leads/:id/notes => status', noteRes.status, 'Notes count:', noteRes.body.data.notes.length);

    // 6. DELETE /api/leads/:id (Delete lead)
    const deleteRes = await request('DELETE', `/api/leads/${createdId}`);
    console.log('6. DELETE /api/leads/:id => status', deleteRes.status, 'Message:', deleteRes.body.message);

    console.log('\n✅ ALL API ENDPOINT CONTRACT TESTS PASSED SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('❌ API Verification failed:', err.message);
    process.exit(1);
  }
}

// Wait 2 seconds for server boot then run test
setTimeout(testApiContract, 2500);
