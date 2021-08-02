const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.js-lightbox .lightbox__image'),
  lightboxOverlay: document.querySelector('.js-lightbox .lightbox__overlay'),
  lightboxButton: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
};

const makeGalleryItemEl = galleryItem => {
  const galleryItemEl = document.createElement('li');
  galleryItemEl.classList.add('gallery__item');

  const galleryLinkEl = document.createElement('a');
  galleryLinkEl.classList.add('gallery__link');
  galleryLinkEl.href = '#';

  const galleryImageEl = document.createElement('img');
  galleryImageEl.classList.add('gallery__image');
  galleryImageEl.src = galleryItem.preview;
  galleryImageEl.alt = galleryItem.description;
  galleryImageEl.dataset.original = galleryItem.original;

  galleryLinkEl.appendChild(galleryImageEl);
  galleryItemEl.appendChild(galleryLinkEl);

  return galleryItemEl;
};

const galleryItemElList = galleryItems.map(makeGalleryItemEl);

refs.gallery.append(...galleryItemElList);

const addModalEventListeners = () => {
  refs.lightboxOverlay.addEventListener('click', onLightboxOverlayClick);
  window.addEventListener('keydown', onEscKeyPressed);
  window.addEventListener('keydown', onRightButtonPressed);
  window.addEventListener('keydown', onLeftButtonPressed);
};

const onGalleryImageClick = event => {
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  refs.lightbox.classList.add('is-open');
  addModalEventListeners();

  refs.lightboxImage.src = event.target.dataset.original;
  refs.lightboxImage.alt = event.target.alt;
};

const onGalleryLinkClick = event => {
  if (!event.target.classList.contains('gallery__link')) {
    return;
  }

  refs.lightbox.classList.add('is-open');
  const childImage = event.target.querySelector('.gallery__image');

  refs.lightboxImage.src = childImage.dataset.original;
  refs.lightboxImage.alt = childImage.alt;

  addModalEventListeners();
};

const closeModalAndRemoveModalEventListeners = () => {
  refs.lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', onEscKeyPressed);
  window.removeEventListener('keydown', onRightButtonPressed);
  window.removeEventListener('keydown', onLeftButtonPressed);
};

const onLightboxCloseButtonClick = event => {
  closeModalAndRemoveModalEventListeners();
};

const onLightboxOverlayClick = event => {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeModalAndRemoveModalEventListeners();
};

const onEscKeyPressed = event => {
  if (event.code !== 'Escape') {
    return;
  }
  closeModalAndRemoveModalEventListeners();
};

const onRightButtonPressed = event => {
  if (event.code !== 'ArrowRight') {
    return;
  }

  const currentItemIndex = galleryItems.findIndex(
    item => item.original === refs.lightboxImage.src
  );

  const nextGalleryItem = galleryItems[currentItemIndex + 1];

  if (nextGalleryItem) {
    refs.lightboxImage.src = nextGalleryItem.original;
    refs.lightboxImage.alt = nextGalleryItem.alt;
  }
};

const onLeftButtonPressed = event => {
  if (event.code !== 'ArrowLeft') {
    return;
  }

  const currentItemIndex = galleryItems.findIndex(
    item => item.original === refs.lightboxImage.src
  );

  const prevItemIndex = currentItemIndex - 1;

  const prevGalleryItem = galleryItems[prevItemIndex];

  if (prevGalleryItem) {
    refs.lightboxImage.src = prevGalleryItem.original;
    refs.lightboxImage.alt = prevGalleryItem.alt;
  }
};

refs.gallery.addEventListener('click', onGalleryImageClick);
refs.gallery.addEventListener('click', onGalleryLinkClick);

refs.lightboxButton.addEventListener('click', onLightboxCloseButtonClick);
