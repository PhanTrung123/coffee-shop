const payPalBtn = document.querySelector(".pay-pal");
payPalBtn.addEventListener("click", async () => {
  const showIDCart = document.getElementById("bookingCart");
  const totalPay = document.getElementById("totalPay");
  // all ve => find tra order theo id
  const data = await getAll(URL_ORDER);
  const idOrder = data.find((e) => e.id == showIDCart.innerText);
  if (!idOrder) {
    alert("Ban nay chua co dat mon");
    return;
  }
  const dataTable = await getAll(URL_TABLE);
  const tablebyid = dataTable.find((e) => e.id == idOrder.id);

  const paypal = {
    idTable: idOrder.id,
    bill: idOrder.bill,
    creatAt: new Date(),
    total: totalPay.innerText,
    customerName: tablebyid.customerName,
    quantityCustomer: tablebyid.quantity,
  };
  const resetTable = {
    id: idOrder.id,
    quantity: "",
    status: true,
    customerName: "",
  };
  // reset ban
  edit(URL_TABLE, resetTable);
  // them thanh toan
  add(URL_PAYPAL, paypal);
  // xoa trong order
  deleted(URL_ORDER, showIDCart.innerText);
});

// ----------------------

// kiem ve thung chua => a
// kiem ve tat ca paypal  => b
// b chay vong lap => a.innerHTML += ``
async function getidPayPad() {
  const paymentList = document.querySelector(".bill-completed");
  const dataPayPal = await getAll(URL_PAYPAL);
  const dataFood = await getAll(URL_DISH);
  dataPayPal.forEach((list) => {
    const itemList = document.createElement("div");
    itemList.classList.add("col");
    itemList.innerHTML = `   
                  <div class="card">
                    <div class="card-header bg-success text-light">Table ${list.idTable}</div>
                    <div class="card-body">
                      <div class="mb-0 paybody">
                             
                      </div>
                         <hr />
                        <div class="d-flex g-3 gap-3">
                          <span><b>Total: ${Number(list.total).toLocaleString("vi-VN")} VND </b></span>
                          <span>
                    Payment time: ${new Date(list.creatAt).toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                        })}
                     </span>
                        </div>
                    </div>
                  </div>
        `;
    list.bill.forEach((item) => {
      const paybody = itemList.querySelector(".paybody");
      const food = dataFood.find((e) => e.id == item.idFood);
      paybody.innerHTML += `<p class="mb-1"><i class="fa-solid fa-caret-right"></i> ${food.name} x ${item.quantity} = ${Number(food.price * item.quantity).toLocaleString("vi-VN")} VND </p>`;
    });
    paymentList.appendChild(itemList);
  });
}
getidPayPad("");
