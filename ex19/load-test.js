import http from 'k6/http';

export const options = {
  vus: 100,
  duration: '2m',
};

export default function () {
  http.get('http://k8s-default-demoweba-6d951cbb6c-909443611.us-east-1.elb.amazonaws.com');
}