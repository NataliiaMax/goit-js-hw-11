// export { fetchGallery };
import axios from 'axios';  
// const URL = 'https://pixabay.com/api/';
// const FIELDS =
//   `?key=31223226-3ecae3b2f04fb3bb58e55d840&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`;

  
// function fetchGallery() {
//   fetch(`${URL}${FIELDS}`)
//       .then(responce => {
    //  if (!response.ok) {
    //    throw new Error(response.status);
    //  }
    //  return response.json();
//    })
//       };
import Notiflix from 'notiflix';
// import { refs } from '../src/index';
export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.image = '';
  }
  async fetchGallery() {
    // const URL = 'https://pixabay.com/api/';
    // const FIELDS = `?key=31223226-3ecae3b2f04fb3bb58e55d840&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
  const response = await axios.get(`https://pixabay.com/api/?key=31223226-3ecae3b2f04fb3bb58e55d840&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`)
const data = response.data;
    
    this.image = data.hits;
  // .then(response => {
      //   if (!response.ok) {
      //     Notiflix.Notify.failure(
      //       'Sorry, there are no images matching your search query. Please try again.'
      //     );
      //     throw new Error(response.status);
      //   }
      //   return response.json();
      // })
      // .then(data => {
        this.incrementPage();
       
        return this.image;
        // return data.hits;
      }
  

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// export { fetchGallery };

// async function fetchGallery() {
//   const url = await axios.get(
//     'https://pixabay.com/api/?key=31223226-3ecae3b2f04fb3bb58e55d840&q&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1'
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       const dataArr = url.data
//       console.log(response);
//       page += 1;
//     })

// }








