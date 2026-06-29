import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function makeImageCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info-box">
        <div class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </div>
        <div class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </div>
      </div>
    </li>
  `;
}

export function createGallery(images) {
  const galleryElement = document.querySelector('#gallery');
  if (!galleryElement) return;

  const markup = images.map(makeImageCard).join('');
  galleryElement.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  const galleryElement = document.querySelector('#gallery');
  if (galleryElement) {
    galleryElement.innerHTML = '';
  }
}

export function showLoader() {
  const loaderElement = document.querySelector('#loader');
  if (loaderElement) {
    loaderElement.classList.add('is-active');
  }
}

export function hideLoader() {
  const loaderElement = document.querySelector('#loader');
  if (loaderElement) {
    loaderElement.classList.remove('is-active');
  }
}
