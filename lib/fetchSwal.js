import Swal from 'sweetalert2';
import fetch from 'isomorphic-unfetch';

export default function fetchSwal(method, url, data, options) {
  const opts = options;
  opts.headers = {
    'Content-Type': 'application/json',
    ...opts.headers,
  };
  fetch(url, {
    ...opts,
    method,
    body: data ? JSON.stringify(data) : null,
  }).then(response => response.json()).then((json) => {
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
