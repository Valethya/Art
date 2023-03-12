const form = document.querySelector(".formLogin");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const dataForm = {};

  data.forEach((value, key) => (dataForm[key] = value));

  const url = "/auth";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    });
    const data = await response.json();
    // localStorage.setItem("authToken", data.token);
    console.log(data);
    if (data.message) {
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
});
