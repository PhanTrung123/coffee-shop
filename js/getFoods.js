async function getDataFoods() {
  const data = await getAll(URL_DISH);

  const foodsList = document.querySelector(".foods-list");

  data
    .sort((a, b) => a.id - b.id)
    .forEach((list) => {
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
                    <span class="text-light fw-bold">${list.id}</span>
                  </div>
                  <p class="mb-0 fw-bold">${list.name}</p>
                  <div class="foods-list-btns">
                    <i onClick=handleEditFood(${list.id}) class="fa-solid text-primary fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#foods"></i>
                    <i onClick=getByIdFoods(${list.id}) class="fa-solid fa-trash-can" data-bs-toggle="modal" data-bs-target="#deleteFoods"></i>
                  </div>
                </div>
                <div class="m-auto w-50">
                  <img class="hieuung" src="${list.imgUrl}" alt="" />
                </div>
                <div class="price d-flex justify-content-center pt-2">
                  <span class="fw-bold ">${list.price}</span>
                </div>
                <div class="quanlity mt-2 d-flex justify-content-center align-content-center align-items-center gap-2">
                  <button class="rounded-pill"><i class="fa-solid fa-minus"></i></button>
                  <input type="text" value="0">
                   <button class="rounded-pill"><i class="fa-solid fa-plus"></i></button>
                </div>

              </div>
        `;
      foodsList.appendChild(item);
    });
}
getDataFoods();

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
 })

