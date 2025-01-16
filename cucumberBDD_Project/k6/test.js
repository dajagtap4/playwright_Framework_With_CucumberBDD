import http from 'k6/http';
import { sleep, check } from 'k6';
export const options={
	vus:5,
	duration:'10s',
}
export default function()  {
  const response = http.get('https://www.polestar.com/se/test-drive/booking/ps4/');
	sleep(1);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 5000ms': (r) => r.timings.duration < 5000,
  });
};



// import http from 'k6/http';
// import { check } from 'k6';

// export default function () {
//   const url = 'https://www.polestar.com/se';
//   const response = http.get(url);

//   check(response, {
//     'status is 200': (r) => r.status === 201,
//     'response time < 500ms': (r) => r.timings.duration < 500,
//   });
// }
