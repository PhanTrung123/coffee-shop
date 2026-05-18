const user = document.querySelector(".user");
const card = document.querySelector(".user-card");
const icon = document.querySelector(".icon");
const listItem = document.querySelectorAll(".item");
const menu = document.querySelector(".menu");
const box = document.querySelectorAll("main .box");
const listMenu = document.querySelectorAll(".left li");

user.addEventListener("mouseenter", () => {
  card.classList.add("show");
});

user.addEventListener("mouseleave", () => {
  card.classList.remove("show");
});

// ---------------------------------------- //
icon.addEventListener("click", () => {
  listItem.forEach((e) => e.classList.toggle("d-none"));
  menu.classList.toggle("menu");
});

listMenu.forEach((item, index) => {
  item.addEventListener("click", () => {
    box.forEach((e) => (e.style.display = "none"));
    box[index].style.display = "block";
    localStorage.setItem("index",index);
  });
});

card.addEventListener("click", () => {
  window.location.href = "login.html";
});

const index = localStorage.getItem("index");
if(index){
     box[index].style.display = "block";
}