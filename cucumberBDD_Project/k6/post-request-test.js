import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,  // Virtual users
  duration: '30s', // Test duration
};

export default function () {
  const url = 'https://your-api-endpoint.com/resource';
  
  // Payload for POST request
  const payload = JSON.stringify({
    key1: 'value1',
    key2: 'value2',
  });

  // Headers
  const headers = {
    'Content-Type': 'application/json',
  };

  // Perform POST request
  let response = http.post(url, payload, { headers });

  // Validate response
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'response contains expected key': (r) => JSON.parse(r.body).key1 === 'value1',
  });

  // Simulate user wait time
  sleep(1);
}
