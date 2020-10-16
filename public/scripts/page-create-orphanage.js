const map = L.map('mapid').setView([-27.222633, -49.6455874], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});


//L.marker([-27.222633, -49.6455874], {icon}).addTo(map);

let marker;

//Create and add maker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    //Save lat and lng on form fields
    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //remove icon
    marker && map.removeLayer(marker);

    //add icon layer
    marker = L.marker([lat, lng], {icon}).addTo(map);
});

//adiciona camp ode fotos
function addPhotoField() {
    //pegar o container de fotos (#images)
    const container = document.querySelector("#images");
    //pegar o container para duplicar (.new-image)
    const fieldsContainer = document.querySelectorAll('.new-upload'); 
    //realizar o clone da última image adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length -1].cloneNode(true);
    //Verificar se o campo está vazio, se sim não adicionar um novo campo
    const input = newFieldContainer.children[0];

    if (input.value == "") {
        return;
    }

    //limpar o campo de imagem
    newFieldContainer.children[0].value = "";
    //adiconar o clone ao container de imagens
    container.appendChild(newFieldContainer);
}

function deleteField(event) {
    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload'); 

    if (fieldsContainer.length <= 1) {
        
        //limpar o cvalor do campo
        span.parentNode.children[0].value = "";
        //Saindo da função
        return;
    }

    //deletar o campo
    span.parentNode.remove();
}

//Troca do sim e não
function toggleSelect(event) {

    //Retirar a classe '.active'
    document.querySelectorAll('.button-select button')
    .forEach((button) => {button.classList.remove('active')});

    //Adicionar a classe '.active' para o botão clicado
    const button = event.currentTarget;
    button.classList.add('active');

    //Atualizar o campo escondido com o valor selecionado
    const input = document.querySelector("[name=open_on_weekend]");
    input.value = button.dataset.value;
}