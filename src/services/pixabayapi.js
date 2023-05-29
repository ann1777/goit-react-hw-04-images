let PAGE_COUNTER = 1;
export default async function handleFetch (inputValue) {
  const BASE_URL = 'https://pixabay.com/api/';
  const searchParam = new URLSearchParams({
    key: '35889696-234245940e7cec3ffc17b1751',
    q: `${inputValue}`,
    image_type: 'photo',
    orientation: 'horizontal',
    page: `${PAGE_COUNTER}`,
    per_page: 12,
  });
  return await fetch(
      `${BASE_URL}?${searchParam}`
    )
    .then(response => response.json(), PAGE_COUNTER += 1)
    .catch(err => console.log(err));
}
