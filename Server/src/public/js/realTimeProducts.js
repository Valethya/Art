const socket = io();
const cardContainer = document.querySelector(".cardContainer");
const add = document.querySelector(".add");

socket.on("newProducts", (data) => {
  cardContainer.innerHTML = "";
  createCardProducts(data.payload);
});
socket.on("deleteProduct", (data) => {
  cardContainer.innerHTML = "";
  createCardProducts(data.payload);
});
const createCardProducts = (data) => {
  data.map((prod) => {
    cardContainer.innerHTML += `<div class="card add" ">
            <div class="contentCard">
            <div class="contentImg">
            <img src="${prod.thumbnail}">
            </div>
                <div class="cardDetail">
                    <div class="cardTitle">
                        <h4>${prod.title}</h4>
                    </div><span>${prod.price}</span><button data-id="${prod.id}" class="btn">agregar</button>
                </div>
            </div>
        </div>`;
  });
};
