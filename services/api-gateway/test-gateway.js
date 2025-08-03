const axios = require('axios');

async function testGateway() {
  const baseURL = 'http://localhost:3000/api';
  
  try {
    console.log('🧪 Testing API Gateway...\n');
    
    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${baseURL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    
    // Test services info
    console.log('\n2. Testing services info...');
    const servicesResponse = await axios.get(`${baseURL}/services`);
    console.log('✅ Services info:', servicesResponse.data);
    
    // Test gateway info
    console.log('\n3. Testing gateway info...');
    const infoResponse = await axios.get(`${baseURL}`);
    console.log('✅ Gateway info:', infoResponse.data);
    
    console.log('\n🎉 All tests passed! API Gateway is working correctly.');
    
  } catch (error) {
    console.error('❌ Error testing API Gateway:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testGateway(); 