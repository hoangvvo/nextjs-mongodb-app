import Swal from 'sweetalert2';
import fetch from 'isomorphic-unfetch';

export default function fetchSwal(method, url, data, options = {}, noDefaultOpts) {
  const opts = options;
  // formdata/multipart must have no 'Content-Type
  if (noDefaultOpts !== true) {
    opts.headers = {
      'Content-Type': 'application/json',
      ...opts.headers,
    };
  }
  return fetch(url, {
    ...opts,
    method,
    // eslint-disable-next-line no-nested-ternary
    body: data
      ? opts && opts.headers && opts.headers['Content-Type'] === 'application/json'
        ? JSON.stringify(data)
        : data
      : null,
  })
    .then(response => response.json())
    .then((json) => {
      const isError = json.ok === false;
      Swal.fire({
        toast: true,
        showConfirmButton: false,
        position: 'bottom-end',
        timer: 6000,
        title: json.message || (isError ? 'An error has occurred.' : 'Success'),
        icon: isError ? 'error' : 'success',
      });
      return json;
    });
}

fetchSwal.get = fetchSwal.bind(this, 'GET');
fetchSwal.delete = fetchSwal.bind(this, 'DELETE');
fetchSwal.post = fetchSwal.bind(this, 'POST');
fetchSwal.put = fetchSwal.bind(this, 'PUT');
fetchSwal.patch = fetchSwal.bind(this, 'PATCH');
