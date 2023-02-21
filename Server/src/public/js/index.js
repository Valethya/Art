const navBar = document.querySelector(".navBar");
let prevScrollPos = 0;
const handleScroll = () => {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    navBar.style.top = "0";
  } else {
    navBar.style.top = "-10vh";
  }
  prevScrollPos = currentScrollPos;
};

window.addEventListener("scroll", handleScroll);
