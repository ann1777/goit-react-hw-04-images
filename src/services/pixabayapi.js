// import axios from 'axios';
export default async function handleFetch (request, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '35889696-234245940e7cec3ffc17b1751';
  return await fetch(
      `${BASE_URL}?key=${KEY}&q=${request}&per_page=12&page=${page}&image_type=photo&orientation=horizontal`
    )
    .then(response => response.json())
    .catch(err => console.log(err));
}
