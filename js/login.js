const btnLogin = document.querySelector(".btn-login");
btnLogin.addEventListener("click", async () => {
    const inputEmail = document.querySelector(".input-email");
    const inputPassword = document.querySelector(".input-password");
     const profile = await getAll(URL_PROFILE);
     console.log(profile);
     
   if(profile.email == inputEmail.value && profile.password == inputPassword.value){
      window.location.href = "home.html";
   }else{
     alert("nhap mk or email sai");
   }
});