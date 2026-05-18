async function getDataFoods(search) {
  const data = await getAll(URL_DISH);
  const foodsList = document.querySelector(".foods-list");
  foodsList.innerHTML = "" ;
  const dataFilter = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => a.id - b.id);
    dataFilter.forEach((list) => {
      const item = document.createElement("div");
      item.classList.add("col");
      item.innerHTML = `
              <div
                class="card p-3"
              >
                <div class="rounded-pill d-flex justify-content-between align-items-center">
                  <div
                    class="numbers rounded-pill bg-success align-self-start d-flex justify-content-center align-items-center"
                  >
                    <span class="text-light fw-bold idFood">${list.id}</span>
                  </div>
                  <p class="mb-0 fw-bold name-food">${list.name}</p>
                  <div class="foods-list-btns">
                    <i onClick=handleEditFood(${list.id}) class="fa-solid text-primary fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#foods"></i>
                    <i onClick=getByIdFoods(${list.id}) class="fa-solid fa-trash-can" data-bs-toggle="modal" data-bs-target="#deleteFoods"></i>
                  </div>
                </div>
                <div class="m-auto">
                  <img class="img-food hieuung" src="${list.imgUrl}" alt="" />
                </div>
                <div class="price d-flex justify-content-center pt-2">
                  <span class="fw-bold ">${Number(list.price).toLocaleString("vi-VN")} VNĐ</span>
                </div>
                <div class="quanlity mt-2 d-flex justify-content-center align-content-center align-items-center gap-2">
                  <button class="rounded-pill minus"><i class="fa-solid fa-minus"></i></button>
                  <input class="quantity" type="text" value="0">
                   <button class="rounded-pill plus"><i class="fa-solid fa-plus"></i></button>
                </div>

              </div>
        `;
      foodsList.appendChild(item);

      // -------------------------------------
      const minusBtn = item.querySelector(".minus");
      const plusBtn = item.querySelector(".plus");
      const quantity = item.querySelector(".quantity");

      minusBtn.addEventListener("click", () => {
        if (quantity.value > 0) {
          quantity.value = parseInt(quantity.value) - 1;
        }
      });
      plusBtn.addEventListener("click", () => {
        quantity.value = parseInt(quantity.value) + 1;
      });
    });

  // -------------------------------------
  const cartBtn = document.querySelector(".btn-cart");

  cartBtn.addEventListener("click", async () => {
    const selectTable = document.querySelector(".select-table");
    if (!selectTable.value) {
      alert("Please select a table!");
      return;
    }
    const data = await getAll(URL_ORDER);
    const listFoods = document.querySelectorAll(".foods-list .col");
    const orderOld = data.find(e => e.id == selectTable.value);
    
    const bill = orderOld ? orderOld.bill : [];
    listFoods.forEach((item) => {
      const quantity = item.querySelector(".quantity");
      if (quantity.value > 0) {
        const idFood = item.querySelector(".idFood");
        console.log(bill);
        
        const indexFood = bill.findIndex(e => e.idFood == idFood.innerText) ; // tra ve tri tri mon an da dat 
        console.log(indexFood);
        
        if(indexFood == -1){
           bill.push({ idFood : idFood.innerText, quantity : quantity.value });
        }else {
           bill[indexFood].quantity =  parseInt(bill[indexFood].quantity) + parseInt(quantity.value) ;
        } 
      }
    });
    const order = {
      id: selectTable.value,
      bill: bill,
    };
    orderOld ? edit(URL_ORDER, order) : add(URL_ORDER, order);
  });
}
getDataFoods("");

// --------------------------------

const addFoodBtn = document.getElementById("addFoods");
const imgFood = document.getElementById("productImg");
let selectedFoodImageFile;
let idEdit;
imgFood.addEventListener("change", handleFoodImageSelect);
addFoodBtn.addEventListener("click", async () => {
  const foodName = document.getElementById("foodName");
  const price = document.getElementById("price");
  const imgUrl = await uploadImageToCloudinary(selectedFoodImageFile);
  let idFood = 1;
  const data = await getAll(URL_DISH);
  data
    .sort((a, b) => a.id - b.id)
    .forEach((e) => {
      if (idFood == e.id) {
        idFood++;
      } else {
        return;
      }
    });
  const newUpdate = {
    id: idEdit ? idEdit : idFood,
    imgUrl: imgUrl,
    name: foodName.value,
    price: price.value,
  };
  if (idEdit) {
    edit(URL_DISH, newUpdate);
  } else {
    add(URL_DISH, newUpdate);
  }
});

function getByIdFoods(id) {
  const showID = document.getElementById("idFood");
  showID.innerText = id;
}

// --------------------------------
const deleteFoodItem = document.getElementById("deleteFood");

deleteFoodItem.addEventListener("click", () => {
  const idFood = document.getElementById("idFood");
  deleted(URL_DISH, idFood.innerText);
});

// --------------------------------
async function handleEditFood(id) {
  idEdit = id;
  const data = await getAll(URL_DISH);
  const food = data.find((e) => e.id == id);
  const foodName = document.getElementById("foodName");
  foodName.value = food.name;
  const price = document.getElementById("price");
  price.value = food.price;
  const title = document.getElementById("title");
  title.innerText = "Edit Info Food";
  const img = document.getElementById("imgfood");
  img.src = food.imgUrl;
  const EditBtn = document.getElementById("addFoods");
  EditBtn.innerText = "Edit Food";
}

// ---------------------------------
const reset = document.querySelector(".add");
reset.addEventListener("click", () => {
  const foodName = document.getElementById("foodName");
  foodName.value = "";
  const price = document.getElementById("price");
  price.value = "";
  const title = document.getElementById("title");
  title.innerText = "Add Food";
  const img = document.getElementById("imgfood");
  img.src = "../images/logo.png";
  const EditBtn = document.getElementById("addFoods");
  EditBtn.innerText = "Add Food";
});

//------------------------------------
const searchFood = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-submit");

searchBtn.addEventListener("click", ()=> {
    getDataFoods(searchFood.value);
})

