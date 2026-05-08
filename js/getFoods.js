async function getDataFoods() {
  const data = await getAll(URL_DISH);

  const foodsList = document.querySelector(".foods-list");

  data.forEach((list) => {
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
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash-can"></i>
                  </div>
                </div>
                <div class="m-auto w-50">
                  <img src="${list.imgUrl}" alt="" />
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
let selectedFoodImageFile ;
 imgFood.addEventListener("change", handleFoodImageSelect);
addFoodBtn.addEventListener("click", async () => {
  const foodName = document.getElementById("foodName");
  const price = document.getElementById("price");
  const imgUrl = await uploadImageToCloudinary(selectedFoodImageFile);
  let idFood = 1 ;
  const data = await getAll(URL_DISH);
  data.sort((a,b) => a.id - b.id).forEach(e => {
     if(idFood == e.id){
       idFood++ ;
     }else {
         return; 
     }
  })
  const newUpdate = {
      "id" : "44",
      "imgUrl": imgUrl,
      "name": foodName.value,
      "price": price.value
    }
  add(URL_DISH, newUpdate);
  }
)