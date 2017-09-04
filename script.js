var objArr;
var imageDiv;
var imageArr = [];
var main = document.getElementsByTagName('main');
var container;
var containerItem;
var pageHowMuch;
var authorArr = [];
var authorFilter = document.getElementsByClassName('author__filter');

var request = new XMLHttpRequest();
request.open('GET', 'https://unsplash.it/list');
request.onreadystatechange = function (e) {
    console.log(this.status);
    if (this.readyState = 4) {
        if (this.status = 200) {
            objArr = JSON.parse(this.responseText);
            go();
        }
        else {
            // тут сообщаем о сетевой ошибке
        }
    }
}
request.send(null);


function go() {
    // creating pages
    pageHowMuch = Math.ceil(objArr.length / 20);
    for (n = 0; n <= pageHowMuch; n++) {
        containerItem = document.createElement('div');
        containerItem.className = 'image__container';
        containerItem.classList.add('page' + (n + 1).toString());
        if (containerItem.classList.contains('page1')) {
            containerItem.style.display = 'flex';
        } else {
            containerItem.style.display = 'none';
        }
        main[0].insertBefore(containerItem, document.getElementsByTagName('nav')[0]);
    }


    // creating images

    for (i = 0; i < objArr.length; i++) {
        imageDiv = document.createElement('div');
        imageDiv.className = 'image';
        imageDiv.setAttribute('id', objArr[i].id);
        imageDiv.setAttribute('author', objArr[i].author);
        imageArr.push(imageDiv);
        if (authorArr[i] !== objArr[i].author) {
            authorArr.push(objArr[i].author)
        }
    }

    sortAuthor(authorArr);
    authorAppend()

    container = document.getElementsByClassName('image__container');
// creating backgrounds and appending images to page

    for (j = 0; j <= pageHowMuch + 1; j++) {

        // imageArr[j].style.background = 'url('+ objArr[j].post_url +'/download?force=true) center no-repeat';


        for (k = 0; k < 20; k++) {
            container[j].appendChild(imageArr.slice(j * 20, j * 20 + 20)[k]);
            // if (imageArr[k].parentNode[j].classList.contains('page1')) {
            imageArr[k].style.background = 'url(' + objArr[k].post_url + '/download?force=true) center no-repeat';
            imageArr[k].style.backgroundSize = 'cover';
            // }

        }
    }
}

function sortAuthor(x) {
    x.sort();
    for (var q = 1, i = 1; q < x.length; ++q) {
        if (x[q] !== x[q - 1]) {
            x[i++] = x[q];
        }
    }


    x.length = i;
    return x;
}

function authorAppend() {
    for (i = 0; i <= authorArr.length; i++) {
        var authorLi = document.createElement('li');
        authorLi.textContent = authorArr[i];
        authorFilter[0].appendChild(authorLi);
    }
}