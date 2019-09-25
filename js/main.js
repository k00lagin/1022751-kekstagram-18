'use strict';
// TASK DEFINED CONSTANTS
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
var FAKE_AVATARS = [
  'avatar-1.svg',
  'avatar-2.svg',
  'avatar-3.svg',
  'avatar-4.svg',
  'avatar-5.svg',
  'avatar-6.svg'
];
var FIRST_FAKE_PHOTO_INDEX = 1;
var AMOUNT_OF_FAKE_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 0;
var MAX_COMMENTS = 3;

var photos = [];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateFakePhotoDescription(photoIndex) {
  var description = {
    url: 'photos/' + photoIndex + '.jpg',
    description: '',
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: []
  };
  var commentsAmount = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
  while (description.comments.length < commentsAmount) {
    var comment = {
      avatar: 'img/' + getRandomElement(FAKE_AVATARS),
      message: getRandomElement(FAKE_COMMENTS),
      name: getRandomElement(FAKE_NAMES)
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

function generateFakePhotos() {
  for (var i = FIRST_FAKE_PHOTO_INDEX; i <= AMOUNT_OF_FAKE_PHOTOS; i++) {
    photos.push(generateFakePhotoDescription(i));
  }
  return photos;
}

function fillPageWFakePhotos() {
  var picturesFragment = document.createDocumentFragment();
  generateFakePhotos().forEach(function (photoDescription) {
    picturesFragment.appendChild(generatePhotoElement(photoDescription));
  });
  document.querySelector('.pictures').appendChild(picturesFragment);
}

function showBigPicture(photoIndex) {
  var bigPictureNode = document.querySelector('.big-picture');
  bigPictureNode.classList.remove('hidden');
  bigPictureNode.querySelector('.big-picture__img > img').src = photos[photoIndex].url;
  bigPictureNode.querySelector('.likes-count').textContent = photos[photoIndex].likes;
  bigPictureNode.querySelector('.comments-count').textContent = photos[photoIndex].comments.length;
  bigPictureNode.querySelector('.social__caption').textContent = photos[photoIndex].description;
  bigPictureNode.querySelector('.social__comments').innerHTML = '';
  bigPictureNode.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureNode.querySelector('.comments-loader').classList.add('visually-hidden');
  var commentsFragment = document.createDocumentFragment();
  photos[photoIndex].comments.forEach(function (comment) {
    var commentNode = document.createElement('li');
    commentNode.classList.add('social__comment');

    var commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.src = comment.avatar;
    commentImg.alt = comment.name;
    commentImg.width = commentImg.height = '35';
    commentNode.appendChild(commentImg);

    var commentText = document.createElement('p');
    commentText.textContent = comment.message;
    commentText.classList.add('social__text');
    commentNode.appendChild(commentText);

    commentsFragment.appendChild(commentNode);
  });
  bigPictureNode.querySelector('.social__comments').appendChild(commentsFragment);
}

fillPageWFakePhotos();
showBigPicture(0);
