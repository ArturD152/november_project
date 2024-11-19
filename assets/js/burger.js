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
        container.appendChild(block);
    });
}   