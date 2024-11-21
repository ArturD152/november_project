const params = new URLSearchParams(window.location.search);
const id = params.get('id')
const title = document.querySelector(".information__title")
const image = document.querySelector(".information__image")
const text = document.querySelector(".information__text")
const address = document.querySelector(".information__address")
const map = document.querySelector(".information__map")
const texts = document.querySelector(".information__text")
console.log(id)

function render(n){
    const modal = document.getSelection('.loader')
    modal.innerHTML = `
        <h2>${item.title}</h2>
        <img src="${item.image}" alt="${item.title}">
        <p>${item.text}</p>
        <iframe src="${item.map}" width="100%" height="100%"></iframe>
    `
}

axios({
    method: 'get',
    url: 'https://6732eb2a2a1b1a4ae1114d3d.mockapi.io/tasks',
    params: {
        id: id
    }
})
.then(function (response){
    console.log(response.data)
    title.textContent = response.data[0]['title']
    image.src = response.data[0]['image']
    text.textContent = response.data[0]['text']
    address.textContent = response.data[0]['address']
    map.src = response.data[0]['map']

    for(i=0;i<dct[0]['text'].length;i++){
        const text = document.createElement('div')
        text.textContent = response.data[0]['text'][i]
        text.className = 'information__texts'
        texts.appendChild(text)
    }
})  

