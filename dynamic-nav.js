let showMenu = false;

const socialButtons = document.querySelector(".social-buttons");
const socialBtns = document.querySelectorAll(".social-btn");
const headshot = document.querySelector(".headshot");
const role = document.querySelector(".role");
const navBar = document.querySelector(".nav-bar");
const navLinks = document.querySelector(".nav-links");
const mobileMenu = document.querySelector(".mobile-menu");
const title = document.querySelector(".title");
const pageContent = document.querySelector(".page-content");

const navStateHandler = () => {
  const scrolled = (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80);
  const fullSize = window.innerWidth > 975;

  if (!scrolled && fullSize) {
    socialButtons.style.flexDirection = "column";
    socialButtons.style.display = "flex";
    socialButtons.style.margin = "0";

    // for (btn of socialBtns) { btn.style.width = "30px"; }
    socialBtns.forEach((btn) => {btn.style.width = "30px"});

    role.style.display = "inline";
    title.style.alignSelf = "center";

    headshot.style.width = "90px";
    headshot.style.height = "90px";

    mobileMenu.style.display = "none";

    navBar.style.padding = "10px 20px";
    navBar.style.width = "calc(100% - 40px)";
    navBar.style.flexDirection = "row";
    
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "row";
    navLinks.style.alignSelf = "flex-end";
    navLinks.style.alignItems = "flex-end";
    navLinks.style.padding = "0 10px 0 0";

    pageContent.style.marginTop = "115px";

  } else if (scrolled && fullSize) {

    console.log("scrolled and full size")
    socialButtons.style.flexDirection = "row";
    socialButtons.style.display = "flex";
    socialButtons.style.margin = "0";

    socialBtns.forEach((btn) => {btn.style.width = "30px"});
    
    role.style.display = "none";
    title.style.alignSelf = "center";
    
    headshot.style.width = "45px";
    headshot.style.height = "45px";
    
    mobileMenu.style.display = "none";
    navBar.style.padding = "5px 10px";
    navBar.style.width = "calc(100% - 20px)";
    navBar.style.flexDirection = "row";
    
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "row";
    navLinks.style.alignSelf = "flex-end";
    navLinks.style.alignItems = "flex-end";
    navLinks.style.padding = "0 10px 0 0";

    pageContent.style.marginTop = "115px";

  } else { //not fullSize

    socialButtons.style.flexDirection = "row";
    socialButtons.style.display = "none";
    socialButtons.style.margin = "10px 0 0 0";

    socialBtns.forEach((btn) => {btn.style.width = "60px"});
    
    role.style.display = "none";
    title.style.alignSelf = "stretch";
    
    headshot.style.width = "45px";
    headshot.style.height = "45px";
    
    mobileMenu.style.display = "inline";
    
    navBar.style.padding = "5px 10px";
    navBar.style.width = "calc(100% - 20px)";
    navBar.style.flexDirection = "column";
    
    navLinks.style.display = "none";
    navLinks.style.flexDirection = "column";
    navLinks.style.alignSelf = "stretch";
    navLinks.style.alignItems = "stretch";
    navLinks.style.padding = "45px 10px 30px 0";

    pageContent.style.marginTop = "50px";

    mobileMenu.classList.remove("close");
    showMenu = false;
  }

};

const toggleMenu = () => {
  if (showMenu) {
    navLinks.style.display = "none";
    socialButtons.style.display = "none";
    mobileMenu.classList.remove("close");
    showMenu = false;
  } else {
    navLinks.style.display = "flex";
    socialButtons.style.display = "flex";
    mobileMenu.classList.add("close");
    showMenu = true;
  }
};

window.onscroll = navStateHandler;
window.onresize = navStateHandler;

navStateHandler();
navBar.style.display = "flex";