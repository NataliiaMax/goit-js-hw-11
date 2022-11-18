import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PixabayApiService from './js/pixabay';
import { refs } from './js/refs';

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const newPixabayApiService = new PixabayApiService();

refs.form.addEventListener('submit', onSubmitForm);
refs.button.addEventListener('click', onloadMore);
refs.galleryWrapper.addEventListener('click', (event) => event.preventDefault());
refs.button.classList.add('is-hidden');


function onSubmitForm(ev) {
  ev.preventDefault();
  refs.button.classList.add('is-hidden');
  clearGallery();
  newPixabayApiService.query = ev.currentTarget.elements.searchQuery.value;
 
  // window.addEventListener('scroll', onScroll);

  if (newPixabayApiService.query === '') {
    refs.container.innerHTML = '';
    refs.button.classList.add('is-hidden');
    return;
  }
  
  newPixabayApiService
    .fetchGallery()
    .then(images => {
      const imagesQuantity = images.totalHits;
      console.log(imagesQuantity);

      if (imagesQuantity === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your ${newPixabayApiService.searchQuery}. Please try again.`
        );
        Notiflix.Notify.info(`Hooray! We found ${imagesQuantity} images.`);
        appendImages(images);
        refs.button.classList.remove('is-hidden');
        lightbox.refresh();
        onScroll();
      }
    })
              .catch(error =>
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your ${newPixabayApiService.searchQuery}. Please try again.`
        )
      )
      .finally(() => {
        refs.form.reset();
      });
  newPixabayApiService.resetPage();
    }

function showGallery(images) {

  const cards = images.hits;
  
  console.log(images);
  const markup = cards
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

function appendImages(images) {
      refs.container.insertAdjacentHTML('beforeend', showGallery(images));
      }

async function onloadMore() {try{
  const data = await newPixabayApiService.fetchGallery();
          appendImages(data);
  lightbox.refresh();
  onScroll();
      }
   catch(error) { 
          refs.button.classList.add('is-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
  }      }

function clearGallery() {
  refs.container.innerHTML = '';
}

function onScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  })
};


