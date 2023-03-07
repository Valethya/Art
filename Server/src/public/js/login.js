const form = document.querySelector(".formLogin");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const dataForm = {};

  data.forEach((value, key) => (dataForm[key] = value));

  const url = "/auth";
  console.log(dataForm);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    });
    const data = await response.json();
    console.log(data, "esto es data desde login.js");

    if (data.message) {
      window.location.href = "/products";
    }
  } catch (error) {
    console.log(error);
  }
});
