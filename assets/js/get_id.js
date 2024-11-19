const params = new URLSearchParams(window.location.search);
const id = params.get('i')
console.log(id)

function render(n){
    const modal = document.getSelection('.loader')
    modal.innerHTML = `
        <h2>${item.title}</h2>
        <img src="${item.image}" alt="${item.title}">
        <p>${item.text}</p>
    `
}
