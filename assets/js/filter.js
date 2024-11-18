document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.dropdown-content .filter-btn');
    const blocks = document.querySelectorAll('.section__block2');

    function filterBlocks(category) {
        blocks.forEach(block => {
            if (category === 'all' || block.getAttribute('data-category') === category) {
                block.classList.add('active');
            } else {
                block.classList.remove('active');
            }
        });

        // Update active class for buttons
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBlocks(this.getAttribute('data-filter'));
        });
    });

    filterBlocks('all');
});

document.addEventListener('DOMContentLoaded', function () {
    const content = document.querySelector('.section');
    const itemsPerPage = 5;
    let currentPage = 0;
    const items = Array.from(content.querySelectorAll('.section__block2'));
    const paginationContainer = document.getElementById('pagination');

    function showPage(page) {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        items.forEach((item, index) => {
            item.classList.toggle('active', index >= startIndex && index < endIndex);
        });
        updateActiveButtonStates();
    }

    function createPageButtons() {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        paginationContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых кнопок

        for (let i = 0; i < totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i + 1;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
                updateActiveButtonStates();
            });
            paginationContainer.appendChild(pageButton);
        }
    }

    function updateActiveButtonStates() {
        const pageButtons = document.querySelectorAll('#pagination button');
        pageButtons.forEach((button, index) => {
            if (index === currentPage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    createPageButtons();
    showPage(currentPage);
});