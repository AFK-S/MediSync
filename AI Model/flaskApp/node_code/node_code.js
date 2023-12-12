const axios = require('axios');

async function fetchData() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/patient/1');
    console.log('Patients Data:', response.data);
    // Use the received data as needed in your Node.js application
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the fetchData function to initiate the request
fetchData();
