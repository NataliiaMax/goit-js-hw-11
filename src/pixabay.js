export { fetchGallery};

const URL = 'https://pixabay.com/api/';
const FIELDS = "?fields=key='31223226-3ecae3b2f04fb3bb58e55d840,q,image_type='photo',orientation='horizontal',safesearch=true";

function fetchGallery() {
    fetch = `${URL}${FIELDS}`
    .then(responce => {
     if (!response.ok) {
       throw new Error(response.status);
     }
     return response.json();
   })
      };
