window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementsByClassName("social-buttons")[0].style.flexDirection = "row";
    document.getElementsByClassName("headshot")[0].style.width = "50px";
    document.getElementsByClassName("headshot")[0].style.height = "50px";
    document.getElementById("role").style.display = "none";
  } else {
    document.getElementsByClassName("social-buttons")[0].style.flexDirection = "column";
    document.getElementById("role").style.display = "inline";
    document.getElementsByClassName("headshot")[0].style.width = "90px";
    document.getElementsByClassName("headshot")[0].style.height = "90px";
  }
}