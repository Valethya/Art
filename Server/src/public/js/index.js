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

const rol = document.querySelector(".rolRendered");
const logout = document.querySelector(".logout");
const userBox = document.querySelector(".user");
const avatar = document.querySelector(".avatar");

async function fetchData() {
  try {
    const response = await fetch("/auth/infoUser");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const displayRol = async () => {
  const user = await fetchData();

  let letter = user.user ? user.user.firstName : "";

  letter = letter.split("");
  if (user.user) {
    rol.innerHTML = `
  ${user?.user.firstName}<br>
  ${user?.user.email}
  `;
    logout.innerHTML = `<a href="/auth/logout"><i class="exit material-icons">exit_to_app
    </i></a>`;
    avatar.innerHTML = `${letter[0].toUpperCase()}`;
  } else {
    userBox.style.display = "none";
    rol.innerHTML = "";
    logout.innerHTML = "";
    avatar.innerHTML = `<a href="/"><i class="exit material-icons">account_circle
    </i></a>`;
  }
};

displayRol();
