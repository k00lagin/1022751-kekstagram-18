'use strict';
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateFakePhotoDescription(photoIndex) {
  var FAKE_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var FAKE_NAMES = [
    'Филипп Остин',
    'Дженнифер Картер',
    'Генри Лайгарт',
    'Альфред Ходжес',
    'Оскар Госс',
    'Дезмонд Хайнеман',
    'Рита Мэтьюз',
    'Джейми Демаси',
    'Дорис Бёрг',
    'Лилиан Коделл',
    'Дэнни Аллен',
    'Триша Корнуелл',
    'Джоан Гарза'
  ];

  var description = {
    url: 'photos/' + photoIndex + '.jpg',
    description: '',
    likes: random(15, 200),
    comments: []
  };
  var commentsAmount = random(0, 3);
  while (description.comments.length < commentsAmount) {
    var comment = {
      avatar: 'img/avatar-' + random(1, 6) + '.svg',
      message: FAKE_COMMENTS[random(0, FAKE_COMMENTS.length - 1)],
      name: FAKE_NAMES[random(0, FAKE_NAMES.length - 1)]
    };
    description.comments.push(comment);
  }
  return description;
}

function generatePhotoElement(photoDescription) {
  var photoTemplate = document.querySelector('template[id="picture"]');
  var photoNode = document.importNode(photoTemplate.content, true);
  photoNode.querySelector('.picture__img').src = photoDescription.url;
  photoNode.querySelector('.picture__comments').textContent = photoDescription.comments.length;
  photoNode.querySelector('.picture__likes').textContent = photoDescription.likes;
  return photoNode;
}

function generateFakePhotos(amount) {
  var photos = [];
  for (var i = 1; i <= amount; i++) {
    photos.push(generateFakePhotoDescription(i));
  }
  return photos;
}

function addPhotosToPage() {
  var picturesFragment = document.createDocumentFragment();
  generateFakePhotos(25).forEach(function (photoDescription) {
    picturesFragment.appendChild(generatePhotoElement(photoDescription));
  });
  document.querySelector('.pictures').appendChild(picturesFragment);
}

addPhotosToPage();
