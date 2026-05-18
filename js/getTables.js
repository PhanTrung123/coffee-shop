async function getDataTables() {
  const data = await getAll(URL_TABLE);

  const listTable = document.querySelector(".table-cofee");

  const selectTable = document.querySelector(".select-table");

  data.forEach((list) => {
    if (!list.status) {
      selectTable.innerHTML += `<option value="${list.id}" >Table ${list.id}</option>`;
    }
    const img = list.status
      ? "../images/icons/dining-room.png"
      : "../images/icons/dining-room-people.png";

    const btns = list.status
      ? `<div onClick=getbyid(${list.id}) class="btn bg-warning" data-bs-toggle="modal" data-bs-target="#booking">
          <i class="fa-solid fa-calendar-days icon-menu"></i>
          <span>BOOKING</span>
        </div>`
      : `<div onClick=getAddFood(${list.id}) class=" btn bg-success text-light">
          <i class="fa-solid fa-calendar-days icon-menu"></i>
          <span>ADD</span>
        </div>
        <div onClick=getbtidCart(${list.id}) class="btn bg-danger text-light" data-bs-toggle="modal" data-bs-target="#cartFoods">
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
const bookingBtn = document.querySelector("#addBooking");
bookingBtn.addEventListener("click", () => {
  const customerName = document.getElementById("customername");
  const quantity = document.getElementById("quantity");
  const showID = document.getElementById("bookingid");
  const newUpdate = {
    id: showID.innerText,
    quantity: quantity.value,
    status: false,
    customerName: customerName.value,
  };
  edit(URL_TABLE, newUpdate);
});

function getbyid(id) {
  const showID = document.getElementById("bookingid");
  showID.innerText = id;
}

async function getbtidCart(id) {
  const showIDCart = document.getElementById("bookingCart");
  showIDCart.innerText = id;
  const data = await getAll(URL_ORDER);
  const dataFood = await getAll(URL_DISH);
  const order = data.find((e) => e.id == id);
  // kiem thung chua bien
  // order.bill chay vong lap => find kiem mon an
  const listBill = document.querySelector(".list-bill");
  let total = 0;
  listBill.innerHTML = "";
  order.bill.forEach((item, index) => {
    const food = dataFood.find((e) => e.id == item.idFood);
     total += item.quantity * food.price ;
    listBill.innerHTML += ` <tr class="text-nowrap">
                  <th scope="row">${index + 1}</th>
                  <td>
                    <img class="w-25" src=${food.imgUrl} alt="">
                  </td>
                  <td>${food.name}</td>
                  <td>${item.quantity}</td>
                  <td class="">${item.quantity * food.price} VND</td>
                </tr>`;
  });
  listBill.innerHTML += ` <tfoot>
                   <th colspan="4">Total</th>
                   <th  class="text-nowrap"><strong id="totalPay">${total}</strong> VND</th>
              </tfoot>`;
}

// -----------------------------------
function getAddFood(id) {
  console.log(id);
  box[1].style.display = "none";
  box[2].style.display = "block";
  const selectTable = document.querySelector(".select-table");
  selectTable.value = id;


}
