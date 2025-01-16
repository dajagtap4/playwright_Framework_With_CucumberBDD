import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up to 10 users
    { duration: '1m', target: 10 },  // Stay at 10 users
    { duration: '10s', target: 0 },  // Ramp-down to 0 users
  ],
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}
