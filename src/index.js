import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchGallery } from '../src/pixabay';


const formRef = document.querySelector('#search-form');


formRef.addEventListener('submit', onSubmitFormRef);

function onSubmitFormRef(ev) {
    ev.preventDefault();
    const data = ev.target.value.trim();
    fetchGallery(data)
    console.log(data);
}
