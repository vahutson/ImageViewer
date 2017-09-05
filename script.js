var objArr;
var imageDiv;
var imageArr = [];
var main = document.getElementsByTagName('main');
var container;
var containerItem;
var pageHowMuch;
var authorArr = [];
var authorFilter = document.getElementsByClassName('author__filter');
var sizeFilter = document.getElementsByClassName('size__filter');
var pageCounter = 1;
var buttonPrev = document.getElementsByClassName('prev');
var buttonNext = document.getElementsByClassName('next');
var request = new XMLHttpRequest();
request.open('GET', 'https://unsplash.it/list');
request.onreadystatechange = function (e) {
    console.log(this.status);
    if (this.readyState = 4) {
        if (this.status = 200 && this.responseText.length !== 0) {
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
    buttonPrev[0].disabled = true;
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
        imageDiv.setAttribute('index', objArr[i].id);
        imageDiv.setAttribute('author', objArr[i].author);
        imageDiv.setAttribute('width', objArr[i].width);
        imageDiv.setAttribute('height', objArr[i].height);
        imageArr.push(imageDiv);
        if (authorArr[i] !== objArr[i].author) {
            authorArr.push(objArr[i].author)
        }
    }

    sortAuthor(authorArr);
    authorAppend();


    container = document.getElementsByClassName('image__container');

// creating backgrounds and appending images to page

    for (j = 0; j <= pageHowMuch + 1; j++) {
        container[j].addEventListener('click', zoom);

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
        authorLi.classList.add('filterItem');
        authorFilter[0].appendChild(authorLi);
        authorFilter[0].addEventListener('click', filter);
        sizeFilter[0].addEventListener('click', filter);
    }
}

function leaf(where) {
    if (where === 'next') {
        buttonPrev[0].disabled = false;
        pageCounter += 1;

        if (pageCounter === pageHowMuch) {
            buttonNext[0].disabled = true;
        }

        document.getElementsByClassName('page__counter')[0].textContent = pageCounter;
        for (i = 0; i <= pageHowMuch; i++) {
            container[i].style.display = 'none';
            for (k = 0; k < 20; k++) {
                imageArr[k + (pageCounter - 1) * 20].style.background = 'url(' + objArr[k + (pageCounter - 1) * 20].post_url + '/download?force=true) center no-repeat';
                imageArr[k + (pageCounter - 1) * 20].style.backgroundSize = 'cover';
            }
        }
        container[pageCounter - 1].style.display = 'flex';
    } else {
        pageCounter -= 1;
        if (pageCounter === 1) {
            buttonPrev[0].disabled = true;
        }
        buttonNext[0].disabled = false;
        document.getElementsByClassName('page__counter')[0].textContent = pageCounter;
        for (j = 0; j <= pageHowMuch; j++) {
            container[j].style.display = 'none';
        }
        container[pageCounter - 1].style.display = 'flex';
    }
}

function zoom(event) {
    if (event.target.classList.contains('image')) {
        event.target.classList.toggle('zoomed');
    }

}


function filter(event) {
    if (event.target.classList.contains("filterItem")) {
        event.target.classList.toggle('active');
    }
    var filterArr = document.getElementsByClassName('active');
    var filterArrContent = [];
    for (i = 0; i < filterArr.length; i++) {
        filterArrContent.push(filterArr[i].textContent);
    }
    console.log(filterArrContent);
}