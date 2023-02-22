/* Menu Navegation; */

const btn = document.querySelector("#btn-menu");

btn.addEventListener("click", () => {
  const navbar = document.querySelector("#navbar");
  const linksNavBar = document.querySelectorAll('li a[href^="#"]');

  navbar.classList.toggle("active");
  if (btn.innerHTML == '<i class="fa-solid fa-x"></i>') {
    btn.innerHTML = '<i id="btn-menu">&equiv;</i>';
    document.body.style.overflowX = "hidden";
    btn.style.top = "0px";
    btn.style.right = "0px";
    btn.style.fontSize = "70px";
  } else {
    btn.innerHTML = '<i class="fa-solid fa-x"></i>';
    btn.style.top = "50px";
    btn.style.right = "30px";
    btn.style.fontSize = "50px";
  }

  function removeMenu() {
    const navbarActive = document.querySelector("#navbar.active");
    navbarActive.classList.remove("active");
    btn.innerHTML = '<i id="btn-menu">&equiv;</i>';
  }

  linksNavBar[0].addEventListener("click", (e) => removeMenu());
  linksNavBar[1].addEventListener("click", (e) => removeMenu());
  linksNavBar[2].addEventListener("click", (e) => removeMenu());
  linksNavBar[3].addEventListener("click", (e) => removeMenu());
  linksNavBar[4].addEventListener("click", (e) => removeMenu());
});

/* Opção Pág. Norturna; */

let logoGhost = document.querySelector("#logo");
const night = document.querySelector("#night");

night.addEventListener("click", () => {
  document.body.classList.toggle("backgroud-black");
  

  if (document.body.classList == "backgroud-black") {
    btn.style.color = "#fff"
    night.innerHTML = "🌖";
    logoGhost.src = "./img/logo-copy.png";
  } else {
    btn.style.color = "#000"
    night.innerHTML = "🌘";
    logoGhost.src = "./img/logo.png";
  }
});
