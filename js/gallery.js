import gallery from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  lightboxEl: document.querySelector('.lightbox'),
  buttonEl: document.querySelector('.lightbox__button'),
  lightboxImageEl: document.querySelector('.lightbox__image'),
};

const createListItemsMarkup = gallery
  .map(
    ({ preview, original, description }, index) =>
      `<li class="gallery__item">
      <a class="gallery__link" href=''>
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" data-index="${index}"/> </a> </li>`,
  )
  .join('');

refs.galleryList.innerHTML = createListItemsMarkup;

const OpenModalClick = evt => {
  evt.preventDefault();
  if (evt.target.localName === 'img') {
    refs.lightboxImageEl.src = evt.target.dataset.source;
    refs.lightboxImageEl.alt = evt.target.alt;
    refs.lightboxImageEl.dataset.index = evt.target.dataset.index;

    refs.lightboxEl.classList.add('is-open');
  }
};

const KeyboardClick = evt => {
  if (evt.key === 'Escape') {
    refs.lightboxEl.classList.remove('is-open');
  }
};

const CloseModalClick = evt => {
  if (evt.target.localName !== 'img') {
    refs.lightboxEl.classList.remove('is-open');

    refs.lightboxImageEl.src = '';
    refs.lightboxImageEl.alt = '';
  }
};

refs.galleryList.addEventListener('click', OpenModalClick);
window.addEventListener('keyup', KeyboardClick);
window.addEventListener('click', CloseModalClick);

window.addEventListener('keydown', evt => {
  if (evt.code === 'ArrowLeft') {
    clickArrowLeft();
  }
  if (evt.code === 'ArrowRight') {
    clickArrowRight();
  }
});

function clickArrowLeft() {
  let index = +refs.lightboxImageEl.dataset.index;
  if (index === 0) {
    newImg(gallery.length - 1);
    return;
  }
  newImg(index, -1);
}
function clickArrowRight() {
  let index = +refs.lightboxImageEl.dataset.index;
  if (index === gallery.length - 1) {
    newImg(0);
    return;
  }
  newImg(index, 1);
}

function newImg(index, step = 0) {
  refs.lightboxImageEl.dataset.index = `${index + step}`;
  refs.lightboxImageEl.src = gallery[index + step].original;
}
