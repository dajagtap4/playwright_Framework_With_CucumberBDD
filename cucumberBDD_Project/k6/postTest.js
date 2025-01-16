import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  const url = 'https://www.polestar.com/se/test-drive/booking/ps4/';
  const payload = JSON.stringify({
    // Replace with the actual data you need to send
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    testDriveDate: "2025-01-15",
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);
  sleep(1);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 5000ms': (r) => r.timings.duration < 5000,
  });
}
