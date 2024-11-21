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