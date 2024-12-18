let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
const itemsPerPage = 10;

const btn = document.querySelector(".filte_search__filter__btn");
const win = document.querySelector(".all__btn");
const strel = document.querySelector(".filte_search__filter__img");
const buttons = Array.from(document.querySelectorAll('.filter-btn'));
const text = document.querySelector('.filte_search__filter__text');

const savedSearchInput = localStorage.getItem('searchInput') || '';
const savedCategory = localStorage.getItem('category') || 'all';
document.getElementById('searchInput').value = savedSearchInput.toLowerCase();

document.getElementById('burger').addEventListener('click', function () {
    document.getElementById("module").classList.toggle("open");
});

const baseUrl = 'https://6732eb2a2a1b1a4ae1114d3d.mockapi.io/tasks';

function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'block'; // Показываем Loader
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none'; // Скрываем Loader
    }
}

function sortData(data, sortBy, order) {
    if(sortBy === 'date') {
        return data.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }else if (sortBy === 'popularity') {
        return data.sort((a, b) => {
            return order === 'asc' ? a.popularity - b.popularity : b.popularity - a.popularity;
        });
    }else {
        return data;
    }
}

function fetchData(page, searchInput = '', category = 'all', sortBy = 'title', order = 'desc') {
    showLoader();
    const url = new URL(baseUrl);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', itemsPerPage);

    if (searchInput) url.searchParams.append('title', searchInput);
    if (category && category !== 'all') url.searchParams.append('category', category);
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('order', order);

    console.log('Fetching data from URL:', url.toString());

    fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Полученные данные:', data);
            const sortedData = sortData(data, sortBy, order);
            displayData(sortedData);
            renderPagination(data.length);
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        })
        .finally(() => {
            hideLoader();
        });
}

function displayData(data) {
    const container = document.getElementById('data-container');
    if (!container) {
        console.error('Контейнер data-container не найден');
        return;
    }
    container.innerHTML = '';
    data.forEach(item => {
        const block = document.createElement('div');
        block.className = 'block';
        block.setAttribute('data-category', item.category);

        const firstImage = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : '';

        block.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${firstImage}" alt="${item.title}">
        `;
        block.addEventListener('click', () => nextIndex(item.id));
        container.appendChild(block);

        console.log('Отображаем изображение:', firstImage);
    });
}

function nextIndex(cardId) {
    window.location.href = `attraction_post.html?id=${cardId}`;
}

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

function applyFilters() {
    const searchInput = localStorage.getItem('searchInput') || '';
    const category = localStorage.getItem('category') || 'all';
    const sortBy = localStorage.getItem('sortBy') || 'title';
    const order = localStorage.getItem('order') || 'desc';

    fetchData(currentPage, searchInput, category, sortBy, order);
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) {
        console.error('Контейнер pagination не найден');
        return;
    }
    pagination.innerHTML = '';

    const totalPages = Math.ceil(20 / itemsPerPage);
    console.log('Total Pages:', totalPages); 
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

function filterItems() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    localStorage.setItem('searchInput', searchInput);
    applyFilters();
}

function filterByCategory(category) {
    localStorage.setItem('category', category);
    applyFilters();
}

function sortBy(sortBy, order) {
    localStorage.setItem('sortBy', sortBy);
    localStorage.setItem('order', order);
    applyFilters();
}

let c = 0;

buttons.forEach(button => {
    button.addEventListener('click', function () {
        text.textContent = this.textContent;
        strel.classList.toggle('rotate');
        win.style.display = 'none';
        localStorage.setItem('text', text.textContent);
        c = c - 1;
        filterByCategory(this.getAttribute('data-category'));
    });
});

document.querySelectorAll('.sort-btn').forEach(button => {
    button.addEventListener('click', function () {
        const sortType = this.getAttribute('data-sort');
        switch (sortType) {
            case 'popularity-desc':
                sortBy('popularity', 'desc');
                break;
            case 'popularity-asc':
                sortBy('popularity', 'asc');
                break;
            case 'date-desc':
                sortBy('date', 'desc');
                break;
            case 'date-asc':
                sortBy('date', 'asc');
                break;
            default:
                sortBy('title', 'desc');
                break;
        }
    });
});


applyFilters();


document.getElementById('searchInput').addEventListener('input', filterItems);


document.getElementById('searchInput').addEventListener('input', function () {
    const searchInput = this.value.toLowerCase();
    if (searchInput === '') {
        localStorage.removeItem('searchInput');
        applyFilters();
    }
});

