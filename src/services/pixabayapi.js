export default async function handleFetch (inputValue, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const searchParam = new URLSearchParams({
    key: '35889696-234245940e7cec3ffc17b1751',
    q: `${inputValue}`,
    image_type: 'photo',
    orientation: 'horizontal',
    page: `${page}`,
    per_page: 12,
  });

  const response = await fetch(`${BASE_URL}?${searchParam}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Sorry, we couldn’t find any image for your search ', `${inputValue}`);
}
