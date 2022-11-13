import axios from 'axios';
import Notiflix from 'notiflix';
export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.image = '';
    // this.card = '';
  }
  async fetchGallery() {
    const response = await axios.get(
      `https://pixabay.com/api/?key=31223226-3ecae3b2f04fb3bb58e55d840&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    const data = response.data;

    this.image = data.hits;
    // this.card= data.totalHits;
 

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
