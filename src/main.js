import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#load-more-btn');
const endMessage = document.querySelector('#end-message');

let currentQuery = '';
let currentPage = 1;
const PER_PAGE = 15;

if (searchForm) {
  searchForm.addEventListener('submit', handleSearchSubmit);
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', handleLoadMore);
}

function hideEndMessage() {
  if (endMessage) {
    endMessage.classList.add('is-hidden');
  }
}

function showEndMessage() {
  if (endMessage) {
    endMessage.classList.remove('is-hidden');
  }
}

async function handleSearchSubmit(event) {
  event.preventDefault();

  const inputElement = event.currentTarget.elements['search-text'];
  const query = inputElement.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  hideEndMessage();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (!data || !data.hits || data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#EF5350',
        messageColor: '#FFFFFF',
        iconColor: '#FFFFFF',
        closeColor: '#FFFFFF',
        maxWidth: 432,
      });
      return;
    }

    createGallery(data.hits);
    searchForm.reset();

    // Check if we reached the end of the collection
    if (currentPage * PER_PAGE >= data.totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('API Error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching images. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  currentPage += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    // Smooth scroll logic
    const galleryCard = document.querySelector('.gallery-item');
    if (galleryCard) {
      const cardHeight = galleryCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    // Check if we reached the end of the collection
    if (currentPage * PER_PAGE >= data.totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error('API Error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching more images. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
