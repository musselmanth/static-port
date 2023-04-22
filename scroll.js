window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementsByClassName("social-buttons")[0].style.flexDirection = "row";
    document.getElementsByClassName("headshot")[0].style.width = "45px";
    document.getElementsByClassName("headshot")[0].style.height = "45px";
    document.getElementsByClassName("role")[0].style.display = "none";
    document.getElementsByClassName("nav-bar")[0].style.padding = "5px 10px"
    document.getElementsByClassName("nav-bar")[0].style.width = "calc(100% - 20px)"
  } else {
    document.getElementsByClassName("social-buttons")[0].style.flexDirection = "column";
    document.getElementsByClassName("role")[0].style.display = "inline";
    document.getElementsByClassName("headshot")[0].style.width = "90px";
    document.getElementsByClassName("headshot")[0].style.height = "90px";
    document.getElementsByClassName("nav-bar")[0].style.padding = "10px 20px"
    document.getElementsByClassName("nav-bar")[0].style.width = "calc(100% - 40px)"
  }
}