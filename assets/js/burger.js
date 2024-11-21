let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
const itemsPerPage = 4;

const btn = document.querySelector(".filte_search__filter__btn");
const win = document.querySelector(".all__btn");
const strel = document.querySelector(".filte_search__filter__img") ;
const buttons = Array.from(document.querySelectorAll('.filter-btn'));
const text = document.querySelector('.filte_search__filter__text')

const savedSearchInput = localStorage.getItem('searchInput') || '';
const savedCategory = localStorage.getItem('category') || 'all';
document.getElementById('searchInput').value = savedSearchInput.toLowerCase();

document.getElementById('burger').addEventListener('click', function() {
    //
    document.getElementById("module").classList.toggle("open");

});


// URL для запроса
const url = 'https://6732eb2a2a1b1a4ae1114d3d.mockapi.io/tasks';

// Выполнение fetch запроса
fetch(url)
    .then(response => {
        // Проверка статуса ответа
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        // Преобразование ответа в JSON
        return response.json();
    })
    .then(data => {
        // Обработка данных
        console.log('Полученные данные:', data);
        // Вывод данных в HTML
        displayData(data);
    })
    .catch(error => {
        // Обработка ошибок
        console.error('Произошла ошибка:', error);
    });


// Функция для отображения данных в HTML
function displayData(data) {
    const container = document.getElementById('data-container');
    data.forEach(item => {
        const block = document.createElement('div');
        block.className = 'block';
        block.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.image}" alt="${item.title}">
        `;
        // Добавляем обработчик событий для каждого блока
        block.addEventListener('click', () => nextIndex(item.id));
        container.appendChild(block);
    });
}   


// Функция для отображения подробной информации на странице attraction_post.html
// Функция для перехода на страницу с подробной информацией
function nextIndex(cardId) {
    window.location.href = `attraction_post.html?id=${cardId}`;
}

// Функция для отображения подробной информации на странице attraction_post.html
function showDetailsOnPostPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get('id');
    

    if (cardId) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const item = data.find(item => item.id === cardId);
                if (item) {
                    const detailsContainer = document.getElementById('details-container');
                    detailsContainer.innerHTML = `
                        <h2>${item.title}</h2>
                        <img src="${item.image}" alt="${item.title}">
                        <p>${item.text}</p>
                    `;
                    applyFilters();
                } else {
                    console.error('Достопримечательность не найдена');
                }
            })
            .catch(error => {
                console.error('Произошла ошибка:', error);
            });
    } else {
        console.error('Идентификатор достопримечательности не найден');
    }
}
// Вызов функции для отображения подробной информации на странице attraction_post.html
if (window.location.pathname.includes('attraction_post.html')) {
    showDetailsOnPostPage();
}





function applyFilters() {
    const items = Array.from(document.querySelectorAll('.block'));
    let filteredItems = [...items];
    console.log(items)
    const searchInput = localStorage.getItem('searchInput');
    const category = localStorage.getItem('category');
    console.log(searchInput)
    filteredItems = items.filter(item =>
        (category === 'all' || item.getAttribute('data-category') === category) && item.textContent.toLowerCase().includes(searchInput)
    );

    currentPage = 1;
    localStorage.setItem('currentPage', currentPage);
    renderItems();
}

function renderItems() {
    const itemContainer = document.getElementById('itemContainer');
    itemContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);
    

    paginatedItems.forEach(item => {
        itemContainer.appendChild(item);
    });
    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            localStorage.setItem('currentPage', currentPage);
            renderItems();
        };
        pagination.appendChild(button);
    }
    
}

function filterItems() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    console.log(searchInput)
    localStorage.setItem('searchInput', searchInput);
    applyFilters();
}

function filterByCategory(category) {
    localStorage.setItem('category', category);
    applyFilters();
}


let c =0;


buttons.forEach(buttons => {
    buttons.addEventListener('click', function () {
        text.textContent = this.textContent; // Обновляем текст кнопки
        strel.classList.toggle('rotate');
        const textbtn = text.textContent
        win.style.display = 'none'; // Скрываем выпадающий список
        localStorage.setItem('text', textbtn);
        c=c-1
    });
});


function postId(id){
    const URL=`file:///C:/Users/hp/Desktop/NovemberProject/attraction_post.html?i=${encodeURIComponent(id)}`;
    window.location.href = URL
}
