let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
const itemsPerPage = 4;

const btn = document.querySelector(".filte_search__filter__btn");
const win = document.querySelector(".all__btn");
const strel = document.querySelector(".filte_search__filter__img");
const buttons = Array.from(document.querySelectorAll('.filter-btn'));
const text = document.querySelector('.filte_search__filter__text');

const savedSearchInput = localStorage.getItem('searchInput') || '';
const savedCategory = localStorage.getItem('category') || 'all';
document.getElementById('searchInput').value = savedSearchInput.toLowerCase();

document.getElementById('burger').addEventListener('click', function() {
    document.getElementById("module").classList.toggle("open");
});

// URL для запроса
const baseUrl = 'https://6732eb2a2a1b1a4ae1114d3d.mockapi.io/tasks';

// Функция для выполнения fetch запроса с фильтрацией и пагинацией
function fetchData(searchInput, category, page) {
    const url = new URL(baseUrl);
    if (searchInput) url.searchParams.append('title', searchInput);
    if (category && category !== 'all') url.searchParams.append('category', category);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', itemsPerPage);

    console.log('Fetching data from URL:', url.toString()); // Добавьте эту строку для отладки

    fetch(url, {
        method: 'GET',
        headers: {'content-type': 'application/json'},
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Полученные данные:', data);
        displayData(data);
        renderPagination(data.length);
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });
}

// Функция для отображения данных в HTML
function displayData(data) {
    const container = document.getElementById('data-container');
    if (!container) {
        console.error('Контейнер data-container не найден');
        return;
    }
    container.innerHTML = ''; // Очищаем контейнер перед добавлением новых данных
    data.forEach(item => {
        const block = document.createElement('div');
        block.className = 'block';
        block.setAttribute('data-category', item.category); // Добавляем атрибут категории
        block.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.image}" alt="${item.title}">
        `;
        block.addEventListener('click', () => nextIndex(item.id));
        container.appendChild(block);
    });
}

// Функция для перехода на страницу с подробной информацией
function nextIndex(cardId) {
    window.location.href = `attraction_post.html?id=${cardId}`;
}

// Функция для отображения подробной информации на странице attraction_post.html
function showDetailsOnPostPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get('id');

    if (cardId) {
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                const item = data.find(item => item.id === cardId);
                if (item) {
                    const detailsContainer = document.getElementById('details-container');
                    if (!detailsContainer) {
                        console.error('Контейнер details-container не найден');
                        return;
                    }
                    detailsContainer.innerHTML = `
                        <h2>${item.title}</h2>
                        <img src="${item.image}" alt="${item.title}">
                        <p>${item.text}</p>
                    `;
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

if (window.location.pathname.includes('attraction_post.html')) {
    showDetailsOnPostPage();
}

// Функция для применения фильтров и пагинации
function applyFilters() {
    const searchInput = localStorage.getItem('searchInput').toLowerCase();
    const category = localStorage.getItem('category');
    fetchData(searchInput, category, currentPage);
}

// Функция для рендеринга пагинации
function renderPagination(totalItems) {
    const pagination = document.getElementById('pagination');
    if (!pagination) {
        console.error('Контейнер pagination не найден');
        return;
    }
    pagination.innerHTML = '';

    const totalPages = Math.ceil(7 / itemsPerPage);
    console.log('Total Pages:', totalPages); // Добавьте эту строку для отладки
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            localStorage.setItem('currentPage', currentPage);
            applyFilters();
        };
        pagination.appendChild(button);
    }
}

// Функция для фильтрации по поисковому запросу
function filterItems() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    localStorage.setItem('searchInput', searchInput);
    applyFilters();
}

// Функция для фильтрации по категории
function filterByCategory(category) {
    localStorage.setItem('category', category);
    applyFilters();
}

let c = 0;

buttons.forEach(button => {
    button.addEventListener('click', function () {
        if (!text) {
            console.error('Элемент text не найден');
            return;
        }
        text.textContent = this.textContent;
        strel.classList.toggle('rotate');
        win.style.display = 'none';
        localStorage.setItem('text', text.textContent);
        c = c - 1;
        filterByCategory(this.getAttribute('data-category'));
    });
});

function postId(id) {
    const URL = `file:///C:/Users/hp/Desktop/NovemberProject/attraction_post.html?i=${encodeURIComponent(id)}`;
    window.location.href = URL;
}

// Инициализация при загрузке страницы
applyFilters();

// Добавляем обработчик событий для поиска
document.getElementById('searchInput').addEventListener('input', filterItems);

// Добавляем обработчик событий для фильтрации по категориям
buttons.forEach(button => {
    button.addEventListener('click', function () {
        if (!text) {
            console.error('Элемент text не найден');
            return;
        }
        text.textContent = this.textContent;
        strel.classList.toggle('rotate');
        win.style.display = 'none';
        localStorage.setItem('text', text.textContent);
        c = c - 1;
        filterByCategory(this.getAttribute('data-category'));
    });
});

// Исправление ошибки с поиском: при пустом значении поискового запроса сбрасываем фильтрацию
document.getElementById('searchInput').addEventListener('input', function() {
    const searchInput = this.value.toLowerCase();
    if (searchInput === '') {
        localStorage.removeItem('searchInput');
        applyFilters();
    }
});