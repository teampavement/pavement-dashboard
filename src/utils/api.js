// import fetch from 'isomorphic-fetch'

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

const getRequestURLBuilder = (API_URL, queryParams) => {
  return API_URL + '/?' + paramStringBuilder(queryParams);
};

export default (endpoint, method, body, queryParams) => {
  let url = `${API_URL}/${endpoint}`;
  if (queryParams) {
    url += `?${paramStringBuilder(queryParams)}`;
  }

  if (method === 'POST') {
    return fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: "same-origin"
    });
  }

  if (method === 'GET') {

    return fetch(`${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: "same-origin"
    });
  }
};
