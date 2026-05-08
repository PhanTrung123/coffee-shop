async function getDataTables() {
  const data = await getAll(URL_TABLE);
  console.log(data);
  // kiem thung chua queryselector
  // chay foreach

  const listTable = document.querySelector(".table-cofee");

  data.forEach((list) => {
    const img = list.status
      ? "../images/icons/dining-room.png"
      : "../images/icons/dining-room-people.png";

    const btns = list.status
      ? `<div onClick=getbyid(${list.id}) class="btn bg-warning" data-bs-toggle="modal" data-bs-target="#booking">
          <i class="fa-solid fa-calendar-days icon-menu"></i>
          <span>BOOKING</span>
        </div>`
      : `<div class="btn bg-success text-light">
          <i class="fa-solid fa-calendar-days icon-menu"></i>
          <span>ADD</span>
        </div>
        <div class="btn bg-danger text-light">
          <i class="fa-solid fa-cart-shopping"></i>
          <span>CART</span>
        </div>`;

    listTable.innerHTML += `
        <div class="col">
              <div
                class="card px-3 py-4 d-flex flex-column justify-content-center align-content-center align-items-center"
              >
                <div
                  class="numbers rounded-pill bg-success align-self-start d-flex justify-content-center align-items-center"
                >
                  <span class="text-light fw-bold">${list.id}</span>
                </div>
                <div class="">
                  <img src=${img} alt="" />
                </div>
                <div class="pt-3 buttons-table">
                  ${btns}
                </div>
              </div>
            </div>
        `;
  });
}
getDataTables();

// --------------------------------

const bookingBtn = document.querySelector("#addBooking")


bookingBtn.addEventListener("click", () => {
  const customerName = document.getElementById("customername");
  const quantity = document.getElementById("quantity");
   const showID = document.getElementById("bookingid");
  const newUpdate = {
      id: showID.innerText,
      quantity: quantity.value,
      status: false,
      customerName: customerName.value
  }
  edit(URL_TABLE, newUpdate);
});

function getbyid(id) {
   const showID = document.getElementById("bookingid");
   showID.innerText = id ;
}
