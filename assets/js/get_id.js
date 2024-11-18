const params = new URLSearchParams(window.location.search);
const id = params.get('i')
console.log(id)

function render(n){
    const modal = document.getSelection('.loader')
    modal.innerHTML = `
        <a href='https://vk.com'></a>
    `
}
