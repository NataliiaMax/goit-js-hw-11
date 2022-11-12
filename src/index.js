import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import PixabayApiService from '../src/pixabay';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// export { refs };
// import { fetchGallery } from '../src/pixabay';
import PixabayApiService from '../src/pixabay';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  container: document.querySelector('.gallery'),
  button: document.querySelector('.load-more'),
};

const newPixabayApiService = new PixabayApiService();

console.log(newPixabayApiService);
console.log(refs.input);


refs.form.addEventListener('submit', onSubmitForm);
refs.button.addEventListener('click', onloadMore);

function onSubmitForm(ev) {
  ev.preventDefault();


  newPixabayApiService.query = ev.currentTarget.elements.searchQuery.value;
  newPixabayApiService.resetPage();

  if (newPixabayApiService.query === '') {
    galleryRef.innerHTML = '';
  }

  newPixabayApiService.fetchGallery().then(hits => {
    clearGallery();
    appendImages(hits)
  })

     
      // if (hits.length === 0) {
      //   Notiflix.Notify.info(
      //     '"Sorry, there are no images matching your search query. Please try again."'
      //   );
      // } else {
      //   refs.container.insertAdjacentHTML('beforeend', showGallery(image));
      // }

}

function showGallery(hits) {
  console.log(hits);
  const markup = hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloadstags,
    }) => 
      `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes${likes}</b>
          </p>
          <p class="info-item">
            <b>Views${views}</b>
          </p>
          <p class="info-item">
            <b>Comments${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads${downloadstags}</b>
          </p>
        </div>
      </div>`
    
  ).join('');
  return markup;
}

function appendImages(hits) {
  if (hits.length === 0) {
        Notiflix.Notify.info(
          '"Sorry, there are no images matching your search query. Please try again."'
        );
      } else {
        refs.container.insertAdjacentHTML('beforeend', showGallery(hits));
      }

  // refs.container.insertAdjacentHTML('beforeend', showGallery(hits));
}

function onloadMore() {
  newPixabayApiService.fetchGallery().then(appendImages);
}

function clearGallery() {
  // if (data === '') {
    
  // }
  refs.container.innerHTML = '';
}


