"use strict"

const PICTURES_QUANTITY = 25;

//Генерируем рандомное неповторяющееся число
function generateRandomNumber() {
    let from = 1, to = PICTURES_QUANTITY, n = PICTURES_QUANTITY;
    let result = [...Array(to-from+1).keys()].map(i=>i+from) // range
      .reduce((arr, elt) => (arr.splice(Math.random() * (arr.length + 1), 0, elt), arr), []) // shuffle
      .slice(0, n); // slice n
    return result;
   }

let randomNumber = generateRandomNumber();
  
// Генерируем объект с данными для картинки
function generatePictureObject(quantity) {
    let pictureObject = {}; 

    let commentsArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
    
    let descriptionArray = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!']

    function generateComment(array) {
        let firstSentence = commentsArray[Math.floor(Math.random()*array.length)];
        let secondSentence = ' ' + commentsArray[Math.floor(Math.random()*array.length)];
        
        if (Math.floor(Math.random()*2)) {
            secondSentence = '';
        }
        
        let comment = firstSentence + secondSentence;

        return comment;
    }

    let url = '';
    pictureObject.url = url;

    let likes = Math.min(Math.max(Math.round(Math.random()*200), 15), 200);
    pictureObject.likes = likes;

    let comments = Math.min(Math.max(Math.round(Math.random()*200), 15), 200);
    pictureObject.comments = comments;

    let comment = generateComment(commentsArray);
    pictureObject.comment = comment;

    let description = descriptionArray[Math.floor(Math.random()*descriptionArray.length)];
    pictureObject.description = description;

    return pictureObject;
}


// Генерируем массив объектов с данными для картинки
function generatePicturesArray(quantity) {
    let array = [];

    for (let i = 0; i < quantity; i++) {
        let pictureObject = generatePictureObject(quantity);
        pictureObject.url = 'photos/' + randomNumber[i] + '.jpg';
        array.push(pictureObject);
    }
    return array;
}

let picturesArray = generatePicturesArray(PICTURES_QUANTITY);
console.log(picturesArray);


// Создаем DOM-элементы из шаблона #picture
function createPictures() {
    let fragment = document.createDocumentFragment();
    let pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
    let picturesContainer = document.querySelector('.pictures.container');

    
    
    for (let i = 0; i < PICTURES_QUANTITY; i++) {
        let pictureElement = pictureTemplate.cloneNode(true);
        let pictureUrl = pictureElement.querySelector('img');
        let pictureLikes = pictureElement.querySelector('.picture-stat.picture-likes');
        let pictureComment = pictureElement.querySelector('.picture-stat.picture-comments');
        
        pictureUrl.src = picturesArray[i].url;
        pictureLikes.textContent = picturesArray[i].likes;
        pictureComment.textContent = picturesArray[i].comment;
        fragment.appendChild(pictureElement);
    }
    picturesContainer.appendChild(fragment);
}

createPictures();

let bigPicture = document.querySelector('.gallery-overlay');
bigPicture.classList.remove('hidden');

let galleryImage = bigPicture.querySelector('.gallery-overlay-image');
galleryImage.src = picturesArray[1].url;

let galleryLikes = bigPicture.querySelector('.likes-count');
galleryLikes.textContent = picturesArray[1].likes;

let galleryComments = bigPicture.querySelector('.comments-count');
galleryComments.textContent = picturesArray[1].comments;

console.log(picturesArray);