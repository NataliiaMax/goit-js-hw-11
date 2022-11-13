import './css/styles.css';
import Notiflix from 'notiflix';
import PixabayApiService from '../src/pixabay';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PixabayApiService from '../src/pixabay';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  container: document.querySelector('.gallery'),
  button: document.querySelector('.load-more'),
  galleryWrapper: document.querySelector('.gallery'),
};
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

console.log(refs.galleryWrapper);

const newPixabayApiService = new PixabayApiService();

console.log(newPixabayApiService);
console.log(refs.input);



refs.button.classList.add('is-hidden');

refs.form.addEventListener('submit', onSubmitForm);
refs.button.addEventListener('click', onloadMore);
refs.galleryWrapper.addEventListener('click', (event) => event.preventDefault());

function onSubmitForm(ev) {
  ev.preventDefault();
  refs.button.classList.remove('is-hidden');

  newPixabayApiService.query = ev.currentTarget.elements.searchQuery.value;
  newPixabayApiService.resetPage();

  if (newPixabayApiService.query === '') {
    refs.container.innerHTML = '';
    refs.button.classList.add('is-hidden');
  }
  
    newPixabayApiService.fetchGallery().then(hits => {
      clearGallery();
      appendImages(hits);
      lightbox.refresh();
        }
  );
  // if (totalHits === 0) {
  //   Notiflix.Notify.info(
  //     "We're sorry, but you've reached the end of search results."
  //   )
  // }
    console.log(newPixabayApiService);
  }


function showGallery(hits) {
  console.log(hits);
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `   <a href="${largeImageURL}"><div class="photo-card">
           <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
       
      </div> </a>`
    )
    .join('');
  return markup;
}

function appendImages(hits) {
    if (hits.length === 0) {
    Notiflix.Notify.info(
      '"Sorry, there are no images matching your search query. Please try again."'
    );
    } else {
      // Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    refs.container.insertAdjacentHTML('beforeend', showGallery(hits));
    refs.button.classList.remove('is-visible');
  }
}

function onloadMore() {
  newPixabayApiService.fetchGallery().then(hits => { appendImages(hits); lightbox.refresh(); });
  console.log(newPixabayApiService);
       
}

function clearGallery() {
  refs.container.innerHTML = '';
}

// function onScroll() {}
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
// onScroll();

// function createGallery(event) {
//   event.preventDefault();
//   // refs.galleryWrapper.insertAdjacentHTML('afterbegin', showGallery(hits));
//   // newPixabayApiService.fetchGallery().then(appendGallery(hits));
// }



// function appendGallery(hits) {
//   
// }
