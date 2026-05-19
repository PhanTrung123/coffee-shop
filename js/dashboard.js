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
  todayRevenue.innerText = `${Number(doanhthu).toLocaleString("vi-VN")} VND`;
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
barChar();
async function barChar() {
  const dataTable = await getAll(URL_TABLE);
  const labels = dataTable.map((e) => `Table ${e.id}`);
  const quantity = dataTable.map((e) => e.quantity);
  const barChart = document.querySelector(".bar-chart");
  const ctx = document.createElement("canvas");
  barChart.appendChild(ctx);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: quantity,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

lineChart();
async function lineChart() {
  const dataPayPal = await getAll(URL_PAYPAL);
  const lineChart = document.querySelector(".line-chart");
  const ctx = document.createElement("canvas");
  const thongke = {};
   dataPayPal.sort((a,b) => a.idTable - b.idTable).forEach(element => {
       if(thongke[element.idTable]){           
          thongke[element.idTable] = parseInt(thongke[element.idTable]) + parseInt(element.total);
       }else{
         thongke[element.idTable] = element.total
       }
   });
  console.log(thongke);
  
  lineChart.appendChild(ctx);
  const data = {
    labels: Object.keys(thongke).map(e => `Table ${e}`),
    datasets: [
      {
        label: "My First Dataset",
        data: Object.values(thongke).map(e => e),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  new Chart(ctx, {
      type: "line",
    data: data,
  });
}
