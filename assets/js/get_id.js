const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const title = document.querySelector(".information__title");
const imageContainer = document.querySelector(".information__image");

console.log(id);

fetch(`https://6732eb2a2a1b1a4ae1114d3d.mockapi.io/tasks?id=${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const item = data[0];

        // Обновляем заголовок
        title.textContent = item.title || 'Без названия';

        // Очищаем контейнер для изображений
        imageContainer.innerHTML = '';

        // Отображаем все изображения из массива item.images
        if (Array.isArray(item.images) && item.images.length > 0) {
            item.images.forEach(imageUrl => {
                console.log('Отображаем изображение:', imageUrl);
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = item.title || 'Изображение';
                imgElement.className = 'information__image-item';
                imageContainer.appendChild(imgElement);
            });
        } else {
            console.log('Изображения отсутствуют');
            const noImageMessage = document.createElement('p');
            noImageMessage.textContent = 'Изображения отсутствуют';
            imageContainer.appendChild(noImageMessage);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });