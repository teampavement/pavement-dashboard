import fetch from 'isomorphic-fetch'

const API_URL = `http://127.0.0.1:5000`;

const paramStringBuilder = (obj) => {
  let output = '';

  if (!obj) {
    return output;
  }
  Object.keys(obj).forEach((key) => {
    output += key + '=' + obj[key] + '&';
  });
  return output;
}

const getRequestURLBuilder = (body) => {
  return API_URL + '?' + paramStringBuilder(body);
};

export default (endpoint, method, body) => {
  if (method === 'POST') {
    return fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: "same-origin"
    });
  }
};
