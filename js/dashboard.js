const totalTable = document.querySelector(".total-table");
const availableTables = document.querySelector(".available-tables");
const unpaidOrder = document.querySelector(".unpaid-orders");
const todayRevenue = document.querySelector(".today-revenue");

async function dashboard() {
  const data = await getAll(URL_TABLE);
  totalTable.innerText = data.length;
  const tableCount = data.reduce(
    (count, item) => (item.status ? (count += 1) : count),
    0,
  );
  availableTables.innerText = tableCount;
  const dataOrder = await getAll(URL_ORDER);
  unpaidOrder.innerText = dataOrder.length;
  const dataPay = await getAll(URL_PAYPAL);
  const doanhthu = dataPay.reduce(
    (total, item) =>
      isToday(item.creatAt) ? (total += parseInt(item.total)) : total,
    0,
  );
  todayRevenue.innerText =  `${Number(doanhthu).toLocaleString("vi-VN")} VND`;
}

function isToday(dateString) {
  const today = new Date();

  const inputDate = new Date(dateString);

  return (
    today.getFullYear() === inputDate.getFullYear() &&
    today.getMonth() === inputDate.getMonth() &&
    today.getDate() === inputDate.getDate()
  );
}

dashboard();
