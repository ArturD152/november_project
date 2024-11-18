const items = Array.from(document.querySelectorAll('.content__block'));
let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
const itemsPerPage = 4;
let filteredItems = [...items];
const btn = document.querySelector(".filte_search__filter__btn");
const win = document.querySelector(".all__btn");
const strel = document.querySelector(".filte_search__filter__img") ;
const buttons = Array.from(document.querySelectorAll('.all__btn__btns'));
const text = document.querySelector('.filte_search__filter__text')

// Восстановление состояния поиска и фильтра из localStorage
const savedSearchInput = localStorage.getItem('searchInput') || '';
const savedCategory = localStorage.getItem('category') || 'all';
document.getElementById('searchInput').value = savedSearchInput.toLowerCase();
// const textbtn = localStorage.getItem('text')||"Без фильтра";
// text.textContent = textbtn;

function applyFilters() {
    const searchInput = localStorage.getItem('searchInput');
    const category = localStorage.getItem('category');
    console.log(searchInput)
    filteredItems = items.filter(item =>
        (category === 'all' || item.getAttribute('data-category') === category) && item.textContent.toLowerCase().includes(searchInput)
    );

    currentPage = 1; // Сбрасываем на первую страницу
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
        // console.log(totalPages)
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
// Инициализация


applyFilters();
let c =0;

// btn.addEventListener("click", (e) =>{
//     if(c==0){
//         win.style.display = 'flex';
//         c=c+1
//     }else{
//         win.style.display = 'none';
//         c=c-1
//     }
// })
// window.addEventListener('click', function (event) {
//     if (!event.target.matches('#btn')) {
//         if(win.style.display != 'none'){
//             win.style.display = 'none';
//             strel.classList.toggle('rotate');
//             c=c-1
//         }
//     }
//     // else{
//     //     win.style.display = 'none';
//     //     strel.classList.toggle('rotate');
//     // }
// });

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

// btn.addEventListener('click', ()=>{
//     strel.classList.toggle('rotate');
// })


function postId(id){
    const URL=`file:///C:/Users/hp/Desktop/NovemberProject/attraction_post.html?i=${encodeURIComponent(id)}`;
    window.location.href = URL
}
