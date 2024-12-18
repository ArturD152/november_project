// Класс для работы с API
class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getItemById(id) {
        try {
            console.log(this)
            const response = await fetch(`${this.baseUrl}?id=${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data[0];
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }
}

// Класс для работы с модальным окном
class Modal {
    constructor(modalElement, modalImageElement, closeButton, prevButton, nextButton) {
        this.modal = modalElement;
        this.modalImage = modalImageElement;
        this.closeButton = closeButton;
        this.prevButton = prevButton;
        this.nextButton = nextButton;
        this.currentIndex = 0;
        this.images = [];

        // Привязка событий
        this.closeButton.addEventListener('click', () => this.close());
        this.prevButton.addEventListener('click', () => this.showPrevImage());
        this.nextButton.addEventListener('click', () => this.showNextImage());
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.close();
            }
        });
    }

    open(index) {
        this.currentIndex = index;
        this.modalImage.src = this.images[this.currentIndex];
        this.modal.style.display = 'block';
    }

    close() {
        this.modal.style.display = 'none';
    }

    showPrevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.modalImage.src = this.images[this.currentIndex];
    }

    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.modalImage.src = this.images[this.currentIndex];
    }

    setImages(images) {
        this.images = images;
    }
}

// Класс для работы с отображением информации
class InformationDisplay {
    constructor(titleElement, imageContainerElement) {
        this.titleElement = titleElement;
        this.imageContainer = imageContainerElement;
    }

    setTitle(title) {
        this.titleElement.textContent = title || 'Без названия';
    }

    displayImages(images, onClickCallback) {
        this.imageContainer.innerHTML = '';
        if (Array.isArray(images) && images.length > 0) {
            images.forEach((imageUrl, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Изображение';
                imgElement.className = 'information__image-item';
                imgElement.addEventListener('click', () => onClickCallback(index));
                this.imageContainer.appendChild(imgElement);
            });
        } else {
            const noImageMessage = document.createElement('p');
            noImageMessage.textContent = 'Изображения отсутствуют';
            this.imageContainer.appendChild(noImageMessage);
        }
    }
}

// Основной код
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // Элементы DOM
    const titleElement = document.querySelector('.information__title');
    const imageContainer = document.querySelector('.information__image');
    const modalElement = document.getElementById('modal');
    const modalImageElement = document.getElementById('modal-image');
    const closeButton = document.getElementById('close');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Создаем экземпляры классов
    const apiService = new ApiService('https://6732eb2a2a1b1a4ae1114d3d.mockapi.io/tasks');
    const modal = new Modal(modalElement, modalImageElement, closeButton, prevButton, nextButton);
    const informationDisplay = new InformationDisplay(titleElement, imageContainer);

    // Получаем данные
    const item = await apiService.getItemById(id);
    if (item) {
        // Устанавливаем заголовок
        informationDisplay.setTitle(item.title);

        // Отображаем изображения
        if (Array.isArray(item.images) && item.images.length > 0) {
            modal.setImages(item.images);
            informationDisplay.displayImages(item.images, (index) => modal.open(index));
        } else {
            informationDisplay.displayImages([]);
        }
    }
});